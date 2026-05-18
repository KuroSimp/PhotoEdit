const imageUrlPattern = /\/images\/[^'"<>]+?\.(?:jpe?g|png|webp)/gi;
const rewritableAttributes = ['src', 'data-src', 'data-bg', 'href', 'poster'];

export class ImageUrlResolver {
  constructor({ manifestPath = '/optimized/manifest.json' } = {}) {
    this.manifestPath = manifestPath;
    this.bySource = new Map();
    this.byOptimized = new Map();
    this.loadPromise = null;
  }

  async load() {
    if (!this.loadPromise) {
      this.loadPromise = fetch(this.manifestPath, { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) throw new Error(`Cannot load ${this.manifestPath}`);
          return response.json();
        })
        .then((manifest) => {
          manifest.images.forEach((image) => {
            this.bySource.set(image.source, image);
            this.byOptimized.set(image.optimized, image);
          });
          return manifest;
        })
        .catch(() => null);
    }

    return this.loadPromise;
  }

  rewriteDocument(documentFragment) {
    documentFragment.querySelectorAll('*').forEach((element) => {
      rewritableAttributes.forEach((attributeName) => {
        const value = element.getAttribute(attributeName);
        if (value) element.setAttribute(attributeName, this.rewriteText(value));
      });

      const srcset = element.getAttribute('srcset');
      if (srcset) element.setAttribute('srcset', this.rewriteSrcset(srcset));

      const style = element.getAttribute('style');
      if (style) element.setAttribute('style', this.rewriteText(style));
    });

    documentFragment.querySelectorAll('img').forEach((image) => this.applyImageHints(image));
  }

  rewriteText(text) {
    return text.replace(imageUrlPattern, (match) => this.resolve(match));
  }

  resolve(url) {
    const normalized = this.normalize(url);
    const image = this.bySource.get(normalized);
    return image?.optimized ?? url;
  }

  getDimensions(optimizedUrl) {
    return this.byOptimized.get(this.normalize(optimizedUrl));
  }

  applyImageHints(image) {
    if (!image.hasAttribute('decoding')) {
      image.setAttribute('decoding', 'async');
    }

    if (image.classList.contains('logo-image')) {
      image.setAttribute('loading', 'eager');
      image.setAttribute('fetchpriority', 'high');
    }

    if (!image.hasAttribute('loading') && image.getAttribute('fetchpriority') !== 'high') {
      image.setAttribute('loading', 'lazy');
    }

    const dimensions = this.getDimensions(image.getAttribute('src'));
    if (dimensions?.width && dimensions?.height) {
      if (!image.hasAttribute('width')) image.setAttribute('width', dimensions.width);
      if (!image.hasAttribute('height')) image.setAttribute('height', dimensions.height);
    }
  }

  rewriteSrcset(srcset) {
    return srcset
      .split(',')
      .map((part) => {
        const [url, ...descriptors] = part.trim().split(/\s+/);
        return [this.resolve(url), ...descriptors].join(' ');
      })
      .join(', ');
  }

  normalize(url) {
    try {
      const parsed = new URL(url, window.location.origin);
      return decodeURI(parsed.pathname);
    } catch {
      return decodeURI(url.split(/[?#]/)[0]);
    }
  }
}
