// Main JavaScript functionality
console.log('Lotus Foto website loaded');

// Smooth scroll for contact links
function initSmoothScroll() {
    console.log('Initializing smooth scroll...');
    const contactLinks = document.querySelectorAll('a[href="#footer"]');
    console.log('Found contact links:', contactLinks.length);
    
    contactLinks.forEach((link, index) => {
        console.log(`Setting up link ${index + 1}:`, link);
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Contact link clicked!');
            const footer = document.getElementById('footer');
            console.log('Footer element:', footer);
            if (footer) {
                console.log('Scrolling to footer...');
                footer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error('Footer not found!');
            }
        });
    });
}

// Smooth scroll for CTA button
function initCTAScroll() {
    console.log('Initializing CTA scroll...');
    const ctaButton = document.querySelector('.cta-button');
    console.log('Found CTA button:', ctaButton);
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('CTA button clicked!');
            const whatWeDoSection = document.getElementById('what-we-do');
            console.log('What we do section:', whatWeDoSection);
            if (whatWeDoSection) {
                console.log('Scrolling to what we do section...');
                whatWeDoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error('What we do section not found!');
            }
        });
    } else {
        console.log('CTA button not found');
    }
}

// Order buttons functionality
function initOrderButtons() {
    console.log('Initializing order buttons...');
    
    // Find all order-related buttons (exclude the main CTA button)
    const orderButtons = document.querySelectorAll('.free-trial-btn, .create-order-btn, .pricing-btn, .pe-cta .cta-button');
    console.log('Found order buttons:', orderButtons.length);
    
    orderButtons.forEach((btn, index) => {
        console.log(`Setting up order button ${index + 1}:`, btn);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Order button clicked!');
            
            // Redirect to order page
            window.location.href = 'order.html';
        });
    });
}

// Sticky Header functionality
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let isScrolled = false;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100 && !isScrolled) {
            header.classList.add('header-scrolled');
            isScrolled = true;
        } else if (currentScrollY <= 100 && isScrolled) {
            header.classList.remove('header-scrolled');
            isScrolled = false;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Before/After Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing sliders...');
    const sliders = document.querySelectorAll('.before-after-image');
    console.log('Found sliders:', sliders.length);
    
    sliders.forEach((slider, index) => {
        console.log(`Setting up slider ${index + 1}`);
        
        const beforeImage = slider.querySelector('.before-image');
        const afterImage = slider.querySelector('.after-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        const sliderLine = slider.querySelector('.slider-line');
        
        if (!beforeImage || !afterImage || !sliderHandle || !sliderLine) {
            console.log(`Slider ${index + 1} missing elements`);
            return;
        }
        
        let isDragging = false;
        
        function updateSlider(percentage) {
            // Update clip-path for before image (left side)
            beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            
            // Update clip-path for after image (right side)
            afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
            
            // Update slider handle position
            sliderHandle.style.left = `${percentage}%`;
            sliderLine.style.left = `${percentage}%`;
        }
        
        function startDrag(e) {
            isDragging = true;
            sliderHandle.style.cursor = 'grabbing';
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            const rect = slider.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            updateSlider(percentage);
        }
        
        function stopDrag() {
            isDragging = false;
            sliderHandle.style.cursor = 'grab';
        }
        
        // Mouse events
        sliderHandle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDrag);
        
        // Click on slider area
        slider.addEventListener('click', function(e) {
            if (!isDragging) {
                const rect = slider.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                updateSlider(percentage);
            }
        });
        
        // Initialize slider at 50%
        updateSlider(50);
    });
    // If Photo Editing page, Day to Dusk page, or Item Removal page, init slider
    if (document.getElementById('photo-editing-page') || document.getElementById('day-to-dusk-page') || document.getElementById('item-removal-page')) {
        initMultiSlider();
    }
    
    function initMultiSlider(){
        console.log('Initializing multi slider...');
        const slider = document.querySelector('.pe-multi-slider');
        if (!slider) {
            console.log('No slider found');
            return;
        }
        console.log('Slider found, initializing...');
        // hide skeleton, show slider
        const sk = document.getElementById('peTopSkeleton');
        if (sk) {
            console.log('Hiding skeleton');
            sk.style.display = 'none';
        }
        slider.classList.remove('is-hidden');
        console.log('Slider should be visible now');
        const viewport = slider.querySelector('.pe-viewport');
        const track = slider.querySelector('.pe-track');
        let slides = Array.from(track.querySelectorAll('img'));
        if (!viewport || !track || slides.length === 0) return;
        
        const visible = Math.max(1, parseInt(slider.getAttribute('data-visible')) || 3);
        let index = 0; // first visible slide index
        const GAP = 16; // must match CSS gap
        
        // Clone edges for seamless loop
        // Only clone once
        const alreadyCloned = track.getAttribute('data-cloned') === 'true';
        const clonesBefore = alreadyCloned ? [] : slides.slice(-visible).map(n => n.cloneNode(true));
        const clonesAfter = alreadyCloned ? [] : slides.slice(0, visible).map(n => n.cloneNode(true));
        clonesBefore.forEach(n => track.insertBefore(n, track.firstChild));
        clonesAfter.forEach(n => track.appendChild(n));
        if (!alreadyCloned) track.setAttribute('data-cloned', 'true');
        slides = Array.from(track.querySelectorAll('img'));
        let logicalCount = slides.length - (visible * 2);
        
        function updateWidths(){
            const gap = GAP;
            const containerWidth = viewport.clientWidth;
            const perWidth = (containerWidth - gap * (visible - 1)) / visible;
            slides.forEach(img => { img.style.width = perWidth + 'px'; });
        }
        function goTo(newIndex){
            index = newIndex;
            const slideWidth = slides[0].clientWidth + GAP; // include gap
            track.style.transition = 'transform 320ms ease';
            track.style.transform = `translate3d(${-(index + visible) * slideWidth}px,0,0)`;
        }
        function jumpWithoutAnim(targetIndex){
            const slideWidth = slides[0].clientWidth + GAP;
            track.style.transition = 'none';
            track.style.transform = `translate3d(${-(targetIndex + visible) * slideWidth}px,0,0)`;
        }
        function normalize(){
            // When we slide past ends, jump to real position without flash
            if (index < 0){
                index = logicalCount - 1;
                jumpWithoutAnim(index);
            } else if (index >= logicalCount){
                index = 0;
                jumpWithoutAnim(index);
            }
        }
        
        slider.querySelector('.pe-prev')?.addEventListener('click', () => { goTo(index - 1); });
        slider.querySelector('.pe-next')?.addEventListener('click', () => { goTo(index + 1); });
        track.addEventListener('transitionend', normalize);
        window.addEventListener('resize', () => { updateWidths(); goTo(index); });
        
        // Preload helper to avoid blank frames when skipping fast
        const originalSrcs = slides.slice(visible, visible + logicalCount).map(img => img.getAttribute('src'));
        const preloadCache = new Set();
        function preloadSrc(src){
            if (!src || preloadCache.has(src)) return;
            preloadCache.add(src);
            const img = new Image();
            img.decoding = 'async';
            img.src = src;
        }
        function preloadAround(centerIdx){
            for (let k = 0; k <= 4; k++) {
                const next = (centerIdx + k + logicalCount) % logicalCount;
                preloadSrc(originalSrcs[next]);
            }
        }

        // autoplay
        const doAutoplay = slider.getAttribute('data-autoplay') === 'true';
        const intervalMs = parseInt(slider.getAttribute('data-interval')) || 3500;
        let timer;
        function start(){ if (doAutoplay){ stop(); timer = setInterval(() => goTo(index + 1), intervalMs); } }
        function stop(){ if (timer) clearInterval(timer); }
        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);
        // Pause autoplay when slider is off-screen to avoid updates while scrolling elsewhere
        const visObserver = new IntersectionObserver((entries)=>{
            entries.forEach(entry => { if(entry.isIntersecting) start(); else stop(); });
        }, { threshold: 0.1 });
        visObserver.observe(slider);
        
        updateWidths();
        jumpWithoutAnim(0);
        // slight delay to allow layout before first animated move
        requestAnimationFrame(() => { goTo(0); });
        preloadAround(0);
        track.addEventListener('transitionstart', () => preloadAround(index + 1));
        start();
    }

    function preloadPEImages(){
        const container = document.querySelector('#photo-editing-page .pe-track');
        if (!container) return;
        const sources = Array.from(container.querySelectorAll('img')).map(i => i.getAttribute('src'));
        // Prioritize first 3 images
        const priority = sources.slice(0, 3);
        const rest = sources.slice(3);
        function load(src){
            return new Promise(resolve => {
                const img = new Image();
                img.decoding = 'async';
                img.loading = 'eager';
                img.onload = img.onerror = () => resolve();
                img.src = src;
            });
        }
        // Load first 3 quickly, others when idle
        Promise.allSettled(priority.map(load)).finally(() => {
            if ('requestIdleCallback' in window){
                window.requestIdleCallback(() => rest.forEach(s => load(s)));
            } else {
                setTimeout(() => rest.forEach(s => load(s)), 500);
            }
        });
    }
    
    // Initialize one-time lazy loader for images that use data-src
    initLazyLoader();

    // Initialize sticky header
    initStickyHeader();

    // Gallery functionality
    initializeGallery();
});

// Gallery functionality
function initializeGallery() {
    const mainImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.getElementById('prevMainBtn');
    const nextBtn = document.getElementById('nextMainBtn');
    const nextThumbBtn = document.getElementById('nextThumbBtn');
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    const filterButtons = document.querySelectorAll('.gallery-filter');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    let currentIndex = 0;
    const images = Array.from(thumbnails).map(thumb => thumb.dataset.main);
    
    // Thumbnail click handler
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage();
            updateActiveThumbnail();
        });
    });
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            updateMainImage();
            updateActiveThumbnail();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            updateMainImage();
            updateActiveThumbnail();
        });
    }
    
    // Thumbnail scroll
    if (nextThumbBtn && thumbnailsContainer) {
        nextThumbBtn.addEventListener('click', () => {
            thumbnailsContainer.scrollBy({
                left: 150,
                behavior: 'smooth'
            });
        });
    }
    
    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter thumbnails based on category
            const filter = btn.dataset.filter;
            filterThumbnails(filter);
        });
    });
    
    function updateMainImage() {
        if (mainImage && images[currentIndex]) {
            mainImage.src = images[currentIndex];
        }
    }
    
    function updateActiveThumbnail() {
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }
    
    function filterThumbnails(filter) {
        thumbnails.forEach(thumb => {
            if (filter === 'all') {
                thumb.style.display = 'block';
            } else {
                // You can add data-category attributes to thumbnails for filtering
                // For now, show all thumbnails
                thumb.style.display = 'block';
            }
        });
    }
    
    // Auto-play functionality (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            updateMainImage();
            updateActiveThumbnail();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    const galleryMain = document.querySelector('.gallery-main-image');
    if (galleryMain) {
        galleryMain.addEventListener('mouseenter', stopAutoPlay);
        galleryMain.addEventListener('mouseleave', startAutoPlay);
    }
}

// One-time lazy loader using IntersectionObserver
function initLazyLoader(){
    const lazyImgs = Array.from(document.querySelectorAll('img[data-src]'));
    if (lazyImgs.length === 0) return;
    const onIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            const actual = img.getAttribute('data-src');
            if (actual && !img.dataset.loaded){
                img.classList.add('progressive-img');
                // Defer class application to ensure transition
                requestAnimationFrame(() => img.src = actual);
                img.decoding = 'async';
                img.loading = img.loading || 'lazy';
                img.addEventListener('load', () => {
                    img.dataset.loaded = 'true';
                    img.classList.add('is-loaded');
                }, { once: true });
            }
            observer.unobserve(img);
        });
    };
    const io = new IntersectionObserver(onIntersect, { rootMargin: '200px 0px' });
    lazyImgs.forEach(img => io.observe(img));
}


// Before/After Sliders Functionality
function initBeforeAfterSliders() {
    console.log('Initializing before/after sliders...');
    // This function can be implemented later if needed
}

// Portfolio Gallery Functionality
function initPortfolio() {
    console.log('Initializing portfolio...');
    
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Portfolio images data
    const portfolioImages = [
        // HDR Blending
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05851.jpg', category: 'hdr', title: 'HDR Blending Sample 1' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05895.jpg', category: 'hdr', title: 'HDR Blending Sample 2' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05904.jpg', category: 'hdr', title: 'HDR Blending Sample 3' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05935.jpg', category: 'hdr', title: 'HDR Blending Sample 4' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05970.jpg', category: 'hdr', title: 'HDR Blending Sample 5' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06031.jpg', category: 'hdr', title: 'HDR Blending Sample 6' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06034.jpg', category: 'hdr', title: 'HDR Blending Sample 7' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06037.jpg', category: 'hdr', title: 'HDR Blending Sample 8' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06040.jpg', category: 'hdr', title: 'HDR Blending Sample 9' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06043.jpg', category: 'hdr', title: 'HDR Blending Sample 10' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06046.jpg', category: 'hdr', title: 'HDR Blending Sample 11' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06049.jpg', category: 'hdr', title: 'HDR Blending Sample 12' },
        
        // Virtual Staging
        { src: 'images/Sample Lotus Foto/Virtual Staging/1after.jpg', category: 'staging', title: 'Virtual Staging Sample 1' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/2after.jpg', category: 'staging', title: 'Virtual Staging Sample 2' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/3after.jpg', category: 'staging', title: 'Virtual Staging Sample 3' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/4after.jpg', category: 'staging', title: 'Virtual Staging Sample 4' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/5after.jpg', category: 'staging', title: 'Virtual Staging Sample 5' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/6after.jpg', category: 'staging', title: 'Virtual Staging Sample 6' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/7after.jpg', category: 'staging', title: 'Virtual Staging Sample 7' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/8after.jpg', category: 'staging', title: 'Virtual Staging Sample 8' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/9after.jpg', category: 'staging', title: 'Virtual Staging Sample 9' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/10after.jpg', category: 'staging', title: 'Virtual Staging Sample 10' },
        
        // Virtual Renovation
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-2bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 1' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-3bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 2' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-4bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 3' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-5.jpg', category: 'renovation', title: 'Virtual Renovation Sample 4' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-6bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 5' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/2.1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 6' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/2.jpg', category: 'renovation', title: 'Virtual Renovation Sample 7' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/37.jpg', category: 'renovation', title: 'Virtual Renovation Sample 8' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/str.jpg', category: 'renovation', title: 'Virtual Renovation Sample 9' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/str1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 10' },
        
        // Item Removal
        { src: 'images/Sample Lotus Foto/Item Removal/1.jpg', category: 'removal', title: 'Item Removal Sample 1' },
        { src: 'images/Sample Lotus Foto/Item Removal/2.jpg', category: 'removal', title: 'Item Removal Sample 2' },
        { src: 'images/Sample Lotus Foto/Item Removal/3.jpg', category: 'removal', title: 'Item Removal Sample 3' },
        { src: 'images/Sample Lotus Foto/Item Removal/4.jpg', category: 'removal', title: 'Item Removal Sample 4' },
        { src: 'images/Sample Lotus Foto/Item Removal/5.jpg', category: 'removal', title: 'Item Removal Sample 5' },
        { src: 'images/Sample Lotus Foto/Item Removal/6.jpg', category: 'removal', title: 'Item Removal Sample 6' },
        { src: 'images/Sample Lotus Foto/Item Removal/7.jpg', category: 'removal', title: 'Item Removal Sample 7' },
        { src: 'images/Sample Lotus Foto/Item Removal/8.jpg', category: 'removal', title: 'Item Removal Sample 8' },
        { src: 'images/Sample Lotus Foto/Item Removal/9.jpg', category: 'removal', title: 'Item Removal Sample 9' },
        { src: 'images/Sample Lotus Foto/Item Removal/10.jpg', category: 'removal', title: 'Item Removal Sample 10' },
        { src: 'images/Sample Lotus Foto/Item Removal/11.jpg', category: 'removal', title: 'Item Removal Sample 11' },
        { src: 'images/Sample Lotus Foto/Item Removal/12.jpg', category: 'removal', title: 'Item Removal Sample 12' }
    ];
    
    // Render portfolio images
    function renderPortfolio(filter = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredImages = filter === 'all' ? portfolioImages : portfolioImages.filter(img => img.category === filter);
        
        filteredImages.forEach((image, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', image.category);
            
            portfolioItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            
            // Add click event for modal
            portfolioItem.addEventListener('click', () => {
                openPortfolioModal(image.src, image.title);
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            renderPortfolio(filter);
        });
    });
    
    // Portfolio modal functionality
    function openPortfolioModal(src, title) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('portfolioModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'portfolioModal';
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="portfolio-modal-content">
                    <span class="portfolio-modal-close">&times;</span>
                    <img src="" alt="">
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add close functionality
            modal.querySelector('.portfolio-modal-close').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Set image and show modal
        modal.querySelector('img').src = src;
        modal.querySelector('img').alt = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Initial render
    renderPortfolio();
}

// Gallery Functionality
function initGallery() {
    console.log('Initializing gallery...');
    // This function can be implemented later if needed
}


// Initialize Services dropdown click handler
function initServicesDropdown() {
    const servicesLinks = document.querySelectorAll('.dropdown-toggle[href="services.html"]');
    
    servicesLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'services.html';
        });
    });
}

// Mobile Menu Toggle functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navigation = document.getElementById('navigation');
    
    if (mobileMenuToggle && navigation) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on navigation
            navigation.classList.toggle('active');
            
            // Toggle active class on button
            mobileMenuToggle.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navigation.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navigation.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navigation.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBeforeAfterSliders();
    initGallery();
    initLazyLoader();
    initServicesDropdown();
    initSmoothScroll();
    initCTAScroll();
    initOrderButtons();
    initMobileMenu();
    
    // Only initialize portfolio if we're on the portfolio page
    if (document.getElementById('portfolioGrid')) {
        initPortfolio();
    }
});