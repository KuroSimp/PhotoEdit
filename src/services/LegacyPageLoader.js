export class LegacyPageLoader {
  constructor({ basePath = '/legacy', imageUrlResolver = null } = {}) {
    this.basePath = basePath;
    this.imageUrlResolver = imageUrlResolver;
  }

  cleanup() {
    document.querySelectorAll('[data-legacy-style]').forEach((node) => node.remove());
  }

  async load(pageFile) {
    const response = await fetch(`${this.basePath}/${pageFile}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Cannot load ${this.basePath}/${pageFile}`);
    }

    const text = await response.text();
    const documentFragment = new DOMParser().parseFromString(text, 'text/html');
    const scripts = Array.from(documentFragment.querySelectorAll('script'));
    scripts.forEach((script) => script.remove());

    this.imageUrlResolver?.rewriteDocument(documentFragment);
    this.injectInlineStyles(documentFragment, pageFile);

    return {
      document: documentFragment,
      html: documentFragment.body.innerHTML,
      scripts,
    };
  }

  injectInlineStyles(documentFragment, pageFile) {
    documentFragment.querySelectorAll('head style').forEach((style, index) => {
      const nextStyle = document.createElement('style');
      nextStyle.dataset.legacyStyle = `${pageFile}-${index}`;
      nextStyle.textContent = style.textContent;
      document.head.appendChild(nextStyle);
    });
  }
}
