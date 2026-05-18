export class LegacyScriptRunner {
  constructor({ skippedScriptPatterns = [], imageUrlResolver = null } = {}) {
    this.skippedScriptPatterns = skippedScriptPatterns;
    this.imageUrlResolver = imageUrlResolver;
  }

  cleanup() {
    document.querySelectorAll('[data-legacy-script]').forEach((node) => node.remove());
  }

  async runAll(scripts, pageFile, isActive) {
    for (const [index, script] of scripts.entries()) {
      if (!isActive()) return;
      await this.run(script, index, pageFile);
    }

    if (isActive()) {
      this.dispatchReadyEvents();
    }
  }

  run(script, index, pageFile) {
    return new Promise((resolve) => {
      const nextScript = document.createElement('script');
      const src = script.getAttribute('src');

      Array.from(script.attributes).forEach((attribute) => {
        if (attribute.name !== 'src' && attribute.name !== 'defer') {
          nextScript.setAttribute(attribute.name, attribute.value);
        }
      });

      nextScript.dataset.legacyScript = 'true';

      if (src) {
        if (this.shouldSkip(src)) {
          resolve();
          return;
        }

        if (this.shouldInlineAndRewrite(src)) {
          this.fetchAndRunLocalScript(src, nextScript, index, pageFile, resolve);
          return;
        }

        nextScript.src = `${src}${src.includes('?') ? '&' : '?'}v=${Date.now()}-${index}`;
        nextScript.onload = resolve;
        nextScript.onerror = resolve;
        document.body.appendChild(nextScript);
        return;
      }

      nextScript.textContent = `${this.rewriteScriptText(script.textContent)}\n//# sourceURL=/legacy/${pageFile}-inline-${index}.js`;
      document.body.appendChild(nextScript);
      resolve();
    });
  }

  shouldSkip(src) {
    return this.skippedScriptPatterns.some((pattern) => src.includes(pattern));
  }

  shouldInlineAndRewrite(src) {
    const url = new URL(src, window.location.origin);
    return url.origin === window.location.origin && url.pathname.startsWith('/legacy/js/');
  }

  async fetchAndRunLocalScript(src, scriptElement, index, pageFile, resolve) {
    try {
      const response = await fetch(src, { cache: 'no-store' });
      const scriptText = await response.text();
      scriptElement.textContent = `${this.rewriteScriptText(scriptText)}\n//# sourceURL=/legacy/${pageFile}-script-${index}.js`;
      document.body.appendChild(scriptElement);
    } catch {
      scriptElement.src = `${src}${src.includes('?') ? '&' : '?'}v=${Date.now()}-${index}`;
      scriptElement.onload = resolve;
      scriptElement.onerror = resolve;
      document.body.appendChild(scriptElement);
      return;
    }

    resolve();
  }

  rewriteScriptText(scriptText) {
    return this.imageUrlResolver ? this.imageUrlResolver.rewriteText(scriptText) : scriptText;
  }

  dispatchReadyEvents() {
    document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true, cancelable: true }));
    window.dispatchEvent(new Event('load'));
  }
}
