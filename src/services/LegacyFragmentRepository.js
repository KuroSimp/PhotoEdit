export class LegacyFragmentRepository {
  constructor({ basePath = '/legacy/fragments' } = {}) {
    this.basePath = basePath;
    this.cache = new Map();
  }

  async load(name, variant = 'default') {
    const key = `${name}:${variant}`;

    if (!this.cache.has(key)) {
      this.cache.set(key, this.fetchFragment(name, variant));
    }

    return this.cache.get(key);
  }

  async fetchFragment(name, variant) {
    const response = await fetch(`${this.basePath}/${name}-${variant}.html`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Cannot load fragment ${name}-${variant}`);
    }

    return response.text();
  }
}
