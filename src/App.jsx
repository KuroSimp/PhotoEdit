import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_SEO, PAGE_DEFINITIONS } from './config/pages.js';
import { LegacyPageLoader } from './services/LegacyPageLoader.js';
import { LegacyFragmentRepository } from './services/LegacyFragmentRepository.js';
import { LegacyPageComposer } from './services/LegacyPageComposer.js';
import { LegacyScriptRunner } from './services/LegacyScriptRunner.js';
import { ImageUrlResolver } from './services/ImageUrlResolver.js';
import { PageRegistry } from './services/PageRegistry.js';
import { SeoManager } from './services/SeoManager.js';
import { PageAnimationController } from './services/PageAnimationController.js';
import './legacy.css';

const pageRegistry = new PageRegistry(PAGE_DEFINITIONS, DEFAULT_SEO);
const imageUrlResolver = new ImageUrlResolver();
const fragmentRepository = new LegacyFragmentRepository();
const pageComposer = new LegacyPageComposer({ fragmentRepository });
const pageLoader = new LegacyPageLoader({ imageUrlResolver, pageComposer });
const scriptRunner = new LegacyScriptRunner({
  skippedScriptPatterns: ['react@', 'react-dom@', 'bootstrap.bundle'],
  imageUrlResolver,
});
const seoManager = new SeoManager();
const animationController = new PageAnimationController();

function resetDocumentState() {
  document.body.style.margin = '0';
  document.body.style.overflow = 'auto';
  document.body.classList.remove('lotus-page-leaving');
  pageLoader.cleanup();
  scriptRunner.cleanup();
  animationController.cleanup();
}

function isInternalPageLink(url) {
  return url.origin === window.location.origin && pageRegistry.isKnownPath(url.pathname);
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');
  const page = useMemo(() => pageRegistry.getPageFromPath(path), [path]);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const url = new URL(link.getAttribute('href'), window.location.href);
      if (!isInternalPageLink(url)) return;
      if (url.hash && url.pathname === window.location.pathname) return;

      event.preventDefault();
      document.body.classList.add('lotus-page-leaving');
      window.setTimeout(() => {
        window.location.assign(`${pageRegistry.normalizePath(url.pathname)}${url.hash}`);
      }, 160);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    let isActive = true;
    const stillActive = () => isActive;

    async function loadPage() {
      setError('');
      setHtml('');
      resetDocumentState();

      try {
        await imageUrlResolver.load();
        const legacyPage = await pageLoader.load(page.file);
        if (!isActive) return;

        seoManager.apply(page, legacyPage.document);
        setHtml(legacyPage.html);

        await new Promise((resolve) => requestAnimationFrame(resolve));
        animationController.apply(document.getElementById('legacy-page-root'));
        await scriptRunner.runAll(legacyPage.scripts, page.file, stillActive);
      } catch (caughtError) {
        if (!isActive) return;
        setError(caughtError.message);
      }
    }

    loadPage();

    return () => {
      isActive = false;
      animationController.cleanup();
    };
  }, [page]);

  if (error) {
    return (
      <main style={{ padding: 32, fontFamily: 'Arial, sans-serif' }}>
        <h1>Cannot load page</h1>
        <p>{error}</p>
      </main>
    );
  }

  return <div id="legacy-page-root" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default App;
