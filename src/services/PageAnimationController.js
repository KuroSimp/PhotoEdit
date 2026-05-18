const revealSelector = [
  'section',
  '.portfolio-item',
  '.service-card',
  '.pricing-card',
  '.feature-card',
  '.before-after-image',
  '.before-after-slider',
  '.gallery-container',
  '.carousel-container',
  '.footer-column',
].join(',');

const parallaxSelector = [
  '.banner-slide',
  '.banner-img',
  '.hero-image img',
].join(',');

const counterSelector = ['[data-count]', '.step-number'].join(',');

export class PageAnimationController {
  constructor({ selector = revealSelector } = {}) {
    this.selector = selector;
    this.observer = null;
    this.counterObserver = null;
    this.abortController = null;
    this.parallaxElements = [];
    this.parallaxFrame = 0;
  }

  apply(root = document) {
    this.cleanup();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.abortController = new AbortController();
    this.applyReveal(root);
    this.applyImageBlurUp(root);
    this.applyCounters(root);
    this.applyParallax(root);
  }

  applyReveal(root) {
    const elements = Array.from(root.querySelectorAll(this.selector));
    elements.forEach((element, index) => {
      element.classList.add('lotus-reveal');
      element.style.setProperty('--lotus-reveal-delay', `${Math.min(index % 8, 7) * 45}ms`);
    });

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('lotus-reveal-visible');
          this.observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    elements.forEach((element) => this.observer.observe(element));
  }

  applyImageBlurUp(root) {
    const images = Array.from(root.querySelectorAll('img'));

    images.forEach((image) => {
      if (
        image.closest('.gallery-main-image') ||
        image.classList.contains('thumbnail') ||
        image.classList.contains('before-image') ||
        image.classList.contains('after-image') ||
        image.classList.contains('logo-image')
      ) {
        return;
      }

      image.classList.add('lotus-image-loading');

      const markLoaded = () => {
        image.classList.remove('lotus-image-loading');
        image.classList.add('lotus-image-loaded');
      };

      if (image.complete && image.naturalWidth > 0) {
        markLoaded();
        return;
      }

      image.addEventListener('load', markLoaded, {
        once: true,
        signal: this.abortController.signal,
      });
      image.addEventListener(
        'error',
        () => {
          image.classList.remove('lotus-image-loading');
        },
        {
          once: true,
          signal: this.abortController.signal,
        },
      );
    });
  }

  applyCounters(root) {
    const counters = Array.from(root.querySelectorAll(counterSelector)).filter((element) => {
      const rawValue = element.dataset.count ?? element.textContent.trim();
      return /^\d+$/.test(rawValue);
    });

    this.counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.animateCounter(entry.target);
          this.counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => this.counterObserver.observe(counter));
  }

  animateCounter(element) {
    const target = Number(element.dataset.count ?? element.textContent.trim());
    const duration = 850;
    const start = performance.now();

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = String(target);
      }
    };

    element.textContent = '0';
    requestAnimationFrame(tick);
  }

  applyParallax(root) {
    this.parallaxElements = Array.from(root.querySelectorAll(parallaxSelector)).slice(0, 8);
    if (this.parallaxElements.length === 0) return;

    const update = () => {
      this.parallaxFrame = 0;

      this.parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = Math.max(-18, Math.min(18, (viewportCenter - elementCenter) * 0.025));
        element.style.setProperty('--lotus-parallax-y', `${offset}px`);
      });
    };

    const requestUpdate = () => {
      if (this.parallaxFrame) return;
      this.parallaxFrame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, {
      passive: true,
      signal: this.abortController.signal,
    });
    window.addEventListener('resize', requestUpdate, {
      passive: true,
      signal: this.abortController.signal,
    });
    requestUpdate();
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.counterObserver) {
      this.counterObserver.disconnect();
      this.counterObserver = null;
    }

    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }

    if (this.parallaxFrame) {
      cancelAnimationFrame(this.parallaxFrame);
      this.parallaxFrame = 0;
    }

    this.parallaxElements.forEach((element) => {
      element.style.removeProperty('--lotus-parallax-y');
    });
    this.parallaxElements = [];
  }
}
