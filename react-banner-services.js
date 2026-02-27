(() => {
    function mountBannerServices() {
        const rootEl = document.getElementById('react-banner-services');
        if (!rootEl || !window.React || !window.ReactDOM) return;

        const rawItems = (rootEl.dataset.services || '')
            .split('|')
            .map((item) => item.trim())
            .filter(Boolean);

        if (rawItems.length === 0) return;

        const e = window.React.createElement;

        function BannerServices({ items }) {
            return e(
                window.React.Fragment,
                null,
                items.map((label) =>
                    e(
                        'div',
                        { className: 'service-item', key: label },
                        e('i', { className: 'fas fa-check', 'aria-hidden': 'true' }),
                        e('span', null, label)
                    )
                )
            );
        }

        window.ReactDOM.createRoot(rootEl).render(e(BannerServices, { items: rawItems }));
    }

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(mountBannerServices, { timeout: 1500 });
    } else {
        setTimeout(mountBannerServices, 0);
    }
})();
