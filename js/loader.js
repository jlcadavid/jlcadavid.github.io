(function () {
  'use strict';

  const loader = document.querySelector('#pageLoader');
  if (!loader) return;

  const minimumVisibleMs = 620;
  let finished = false;

  document.documentElement.setAttribute('aria-busy', 'true');

  function waitForWindowLoad() {
    if (document.readyState === 'complete') return Promise.resolve();
    return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
  }

  function waitForFonts() {
    if (!document.fonts || !document.fonts.ready) return Promise.resolve();
    return document.fonts.ready.catch(() => {});
  }

  function waitForMedia(selector) {
    const media = selector ? document.querySelector(selector) : null;
    if (!media || media.readyState >= 2) return Promise.resolve();

    return new Promise((resolve) => {
      const timeout = window.setTimeout(resolve, 4200);
      const settle = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      media.addEventListener('loadeddata', settle, { once: true });
      media.addEventListener('error', settle, { once: true });
    });
  }

  function finish() {
    if (finished) return;
    finished = true;
    loader.classList.add('is-leaving');
    document.body.classList.remove('is-loading');
    document.documentElement.removeAttribute('aria-busy');
    loader.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => loader.remove(), 760);
  }

  async function waitForReady(options = {}) {
    const readinessStartedAt = performance.now();
    await Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
      waitForMedia(options.mediaSelector)
    ]);

    const remaining = Math.max(0, minimumVisibleMs - (performance.now() - readinessStartedAt));
    window.setTimeout(() => window.requestAnimationFrame(() => window.requestAnimationFrame(finish)), remaining);
  }

  window.JLMCPageLoader = { waitForReady, finish };

  // Never trap the visitor behind the loading layer if a third-party asset stalls.
  window.setTimeout(finish, 6800);
}());
