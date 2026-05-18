export class LegacyPageComposer {
  constructor({ fragmentRepository } = {}) {
    this.fragmentRepository = fragmentRepository;
  }

  async compose(documentFragment) {
    const placeholders = Array.from(documentFragment.querySelectorAll('[data-legacy-fragment]'));

    for (const placeholder of placeholders) {
      const name = placeholder.dataset.legacyFragment;
      const variant = placeholder.dataset.variant || 'default';
      const html = await this.fragmentRepository.load(name, variant);
      const template = documentFragment.createElement('template');
      template.innerHTML = html.trim();
      placeholder.replaceWith(template.content);
    }
  }
}
