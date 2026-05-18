import { DEFAULT_OG_IMAGE } from '../config/pages.js';

export class SeoManager {
  constructor({ siteName = 'Lotus Foto', defaultImage = DEFAULT_OG_IMAGE } = {}) {
    this.siteName = siteName;
    this.defaultImage = defaultImage;
  }

  apply(page, legacyDocument) {
    const title = legacyDocument.querySelector('title')?.textContent?.trim() || page.title;
    const description =
      legacyDocument.querySelector('meta[name="description"]')?.getAttribute('content') ||
      page.description;
    const canonicalUrl = new URL(page.path, window.location.origin).href;
    const imageUrl = new URL(this.defaultImage, window.location.origin).href;

    document.documentElement.lang = 'en';
    document.title = title;

    this.setMeta('name', 'description', description);
    this.setMeta('name', 'robots', 'index, follow');
    this.setMeta('property', 'og:type', 'website');
    this.setMeta('property', 'og:site_name', this.siteName);
    this.setMeta('property', 'og:title', title);
    this.setMeta('property', 'og:description', description);
    this.setMeta('property', 'og:url', canonicalUrl);
    this.setMeta('property', 'og:image', imageUrl);
    this.setMeta('name', 'twitter:card', 'summary_large_image');
    this.setMeta('name', 'twitter:title', title);
    this.setMeta('name', 'twitter:description', description);
    this.setMeta('name', 'twitter:image', imageUrl);
    this.setCanonical(canonicalUrl);
  }

  setMeta(attributeName, attributeValue, content) {
    let meta = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attributeName, attributeValue);
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
  }

  setCanonical(href) {
    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', href);
  }
}
