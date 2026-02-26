// Portfolio Gallery with Lazy Loading and Performance Optimization
function initPortfolioOptimized() {
    console.log('Initializing optimized portfolio...');
    
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Comprehensive portfolio images data with lazy loading
    const portfolioImages = [
        // Day To Dusk - All images
        { src: 'images/Sample Lotus Foto/Day To Dusk/1.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 1' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/11.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 2' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/2.JPG', category: 'daytodusk', title: 'Day To Dusk Sample 3' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/22.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 4' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/3.JPG', category: 'daytodusk', title: 'Day To Dusk Sample 5' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/33.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 6' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/4.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 7' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/5.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 8' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/6.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 9' },
        
        // HDR Blending - All images from folder 1
        { src: 'images/Sample Lotus Foto/HDR Blending/1/DSC00287.jpg', category: 'hdr', title: 'HDR Blending Sample 1' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5121.jpg', category: 'hdr', title: 'HDR Blending Sample 2' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5129.jpg', category: 'hdr', title: 'HDR Blending Sample 3' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5164.jpg', category: 'hdr', title: 'HDR Blending Sample 4' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5192.jpg', category: 'hdr', title: 'HDR Blending Sample 5' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5197.jpg', category: 'hdr', title: 'HDR Blending Sample 6' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5217.jpg', category: 'hdr', title: 'HDR Blending Sample 7' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5230.jpg', category: 'hdr', title: 'HDR Blending Sample 8' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5252.jpg', category: 'hdr', title: 'HDR Blending Sample 9' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5813.jpg', category: 'hdr', title: 'HDR Blending Sample 10' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5819.jpg', category: 'hdr', title: 'HDR Blending Sample 11' },
        
        // HDR Blending - All images from folder 2
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05851.jpg', category: 'hdr', title: 'HDR Blending Sample 1' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05854.jpg', category: 'hdr', title: 'HDR Blending Sample 2' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05860.jpg', category: 'hdr', title: 'HDR Blending Sample 3' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05866.jpg', category: 'hdr', title: 'HDR Blending Sample 4' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05872.jpg', category: 'hdr', title: 'HDR Blending Sample 5' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05875.jpg', category: 'hdr', title: 'HDR Blending Sample 6' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05884.jpg', category: 'hdr', title: 'HDR Blending Sample 7' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05887.jpg', category: 'hdr', title: 'HDR Blending Sample 8' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05890.jpg', category: 'hdr', title: 'HDR Blending Sample 9' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05895.jpg', category: 'hdr', title: 'HDR Blending Sample 10' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05901.jpg', category: 'hdr', title: 'HDR Blending Sample 11' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05904.jpg', category: 'hdr', title: 'HDR Blending Sample 12' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05908.jpg', category: 'hdr', title: 'HDR Blending Sample 13' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05911.jpg', category: 'hdr', title: 'HDR Blending Sample 14' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05914.jpg', category: 'hdr', title: 'HDR Blending Sample 15' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05917.jpg', category: 'hdr', title: 'HDR Blending Sample 16' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05920.jpg', category: 'hdr', title: 'HDR Blending Sample 17' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05923.jpg', category: 'hdr', title: 'HDR Blending Sample 18' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05926.jpg', category: 'hdr', title: 'HDR Blending Sample 19' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05929.jpg', category: 'hdr', title: 'HDR Blending Sample 20' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05935.jpg', category: 'hdr', title: 'HDR Blending Sample 21' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05941.jpg', category: 'hdr', title: 'HDR Blending Sample 22' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05944.jpg', category: 'hdr', title: 'HDR Blending Sample 23' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05947.jpg', category: 'hdr', title: 'HDR Blending Sample 24' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05952.jpg', category: 'hdr', title: 'HDR Blending Sample 25' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05955.jpg', category: 'hdr', title: 'HDR Blending Sample 26' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05958.jpg', category: 'hdr', title: 'HDR Blending Sample 27' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05961.jpg', category: 'hdr', title: 'HDR Blending Sample 28' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05964.jpg', category: 'hdr', title: 'HDR Blending Sample 29' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05967.jpg', category: 'hdr', title: 'HDR Blending Sample 30' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05970.jpg', category: 'hdr', title: 'HDR Blending Sample 31' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05973.jpg', category: 'hdr', title: 'HDR Blending Sample 32' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05976.jpg', category: 'hdr', title: 'HDR Blending Sample 33' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06007.jpg', category: 'hdr', title: 'HDR Blending Sample 34' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06016.jpg', category: 'hdr', title: 'HDR Blending Sample 35' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06019.jpg', category: 'hdr', title: 'HDR Blending Sample 36' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06021.jpg', category: 'hdr', title: 'HDR Blending Sample 37' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06025.jpg', category: 'hdr', title: 'HDR Blending Sample 38' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06028.jpg', category: 'hdr', title: 'HDR Blending Sample 39' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06031.jpg', category: 'hdr', title: 'HDR Blending Sample 40' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06034.jpg', category: 'hdr', title: 'HDR Blending Sample 41' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06037.jpg', category: 'hdr', title: 'HDR Blending Sample 42' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06040.jpg', category: 'hdr', title: 'HDR Blending Sample 43' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06043.jpg', category: 'hdr', title: 'HDR Blending Sample 44' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06046.jpg', category: 'hdr', title: 'HDR Blending Sample 45' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06049.jpg', category: 'hdr', title: 'HDR Blending Sample 46' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06052.jpg', category: 'hdr', title: 'HDR Blending Sample 47' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06055.jpg', category: 'hdr', title: 'HDR Blending Sample 48' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06058.jpg', category: 'hdr', title: 'HDR Blending Sample 49' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06061.jpg', category: 'hdr', title: 'HDR Blending Sample 50' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06064.jpg', category: 'hdr', title: 'HDR Blending Sample 51' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06067.jpg', category: 'hdr', title: 'HDR Blending Sample 52' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06070.jpg', category: 'hdr', title: 'HDR Blending Sample 53' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06073.jpg', category: 'hdr', title: 'HDR Blending Sample 54' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06076.jpg', category: 'hdr', title: 'HDR Blending Sample 55' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06079.jpg', category: 'hdr', title: 'HDR Blending Sample 56' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06084.jpg', category: 'hdr', title: 'HDR Blending Sample 57' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06087.jpg', category: 'hdr', title: 'HDR Blending Sample 58' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06090.jpg', category: 'hdr', title: 'HDR Blending Sample 59' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06093.jpg', category: 'hdr', title: 'HDR Blending Sample 60' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06097.jpg', category: 'hdr', title: 'HDR Blending Sample 61' },
        
        // Virtual Staging - All images including before and after
        { src: 'images/Sample Lotus Foto/Virtual Staging/1before.jpg', category: 'staging', title: 'Virtual Staging Before 1' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/1after.jpg', category: 'staging', title: 'Virtual Staging After 1' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/2before.jpg', category: 'staging', title: 'Virtual Staging Before 2' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/2after.jpg', category: 'staging', title: 'Virtual Staging After 2' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/3before.jpg', category: 'staging', title: 'Virtual Staging Before 3' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/3after.jpg', category: 'staging', title: 'Virtual Staging After 3' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/4before.jpg', category: 'staging', title: 'Virtual Staging Before 4' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/4after.jpg', category: 'staging', title: 'Virtual Staging After 4' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/5after.jpg', category: 'staging', title: 'Virtual Staging After 5' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/6after.jpg', category: 'staging', title: 'Virtual Staging After 6' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/7after.jpg', category: 'staging', title: 'Virtual Staging After 7' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/8before.jpg', category: 'staging', title: 'Virtual Staging Before 8' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/8after.jpg', category: 'staging', title: 'Virtual Staging After 8' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/9after.jpg', category: 'staging', title: 'Virtual Staging After 9' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/10after.jpg', category: 'staging', title: 'Virtual Staging After 10' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/11before.jpg', category: 'staging', title: 'Virtual Staging Before 11' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/11after.jpg', category: 'staging', title: 'Virtual Staging After 11' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/12after.jpg', category: 'staging', title: 'Virtual Staging After 12' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/13after.jpg', category: 'staging', title: 'Virtual Staging After 13' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/14after.jpg', category: 'staging', title: 'Virtual Staging After 14' },
        
        // Virtual Renovation - All images
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122303_.jpg', category: 'renovation', title: 'Virtual Renovation Sample 1' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122303.jpg', category: 'renovation', title: 'Virtual Renovation Sample 2' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122310_.jpg', category: 'renovation', title: 'Virtual Renovation Sample 3' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122310.jpg', category: 'renovation', title: 'Virtual Renovation Sample 4' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122323_Room2_.jpg', category: 'renovation', title: 'Virtual Renovation Sample 5' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122323_Room2.jpg', category: 'renovation', title: 'Virtual Renovation Sample 6' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-1bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 7' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-2bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 8' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-3bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 9' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-4bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 10' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-6bf.jpg', category: 'renovation', title: 'Virtual Renovation Sample 11' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/2.1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 12' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/2.jpg', category: 'renovation', title: 'Virtual Renovation Sample 13' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/37_compressed.jpg', category: 'renovation', title: 'Virtual Renovation Sample 14' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/37..jpg', category: 'renovation', title: 'Virtual Renovation Sample 15' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/37.jpg', category: 'renovation', title: 'Virtual Renovation Sample 16' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/5 (kopie 2).jpg', category: 'renovation', title: 'Virtual Renovation Sample 17' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/5 (kopie).jpg', category: 'renovation', title: 'Virtual Renovation Sample 18' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/7 (kopie)..jpg', category: 'renovation', title: 'Virtual Renovation Sample 19' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/7 (kopie).jpg', category: 'renovation', title: 'Virtual Renovation Sample 20' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/b1-1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 21' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/b1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 22' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/bath1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 23' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/bath2.jpg', category: 'renovation', title: 'Virtual Renovation Sample 24' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC02106-Edit copy_1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 25' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC02106-Edit copy.jpg', category: 'renovation', title: 'Virtual Renovation Sample 26' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09914_1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 27' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09914.jpg', category: 'renovation', title: 'Virtual Renovation Sample 28' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09920_1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 29' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09920.jpg', category: 'renovation', title: 'Virtual Renovation Sample 30' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09921_1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 31' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09921.jpg', category: 'renovation', title: 'Virtual Renovation Sample 32' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/str.jpg', category: 'renovation', title: 'Virtual Renovation Sample 33' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/str1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 34' },
        
        // Item Removal - All images including PNG files
        { src: 'images/Sample Lotus Foto/Item Removal/1.jpg', category: 'removal', title: 'Item Removal Sample 1' },
        { src: 'images/Sample Lotus Foto/Item Removal/1.png', category: 'removal', title: 'Item Removal Sample 1 (PNG)' },
        { src: 'images/Sample Lotus Foto/Item Removal/2.jpg', category: 'removal', title: 'Item Removal Sample 2' },
        { src: 'images/Sample Lotus Foto/Item Removal/3.jpg', category: 'removal', title: 'Item Removal Sample 3' },
        { src: 'images/Sample Lotus Foto/Item Removal/4.jpg', category: 'removal', title: 'Item Removal Sample 4' },
        { src: 'images/Sample Lotus Foto/Item Removal/5.jpg', category: 'removal', title: 'Item Removal Sample 5' },
        { src: 'images/Sample Lotus Foto/Item Removal/6.jpg', category: 'removal', title: 'Item Removal Sample 6' },
        { src: 'images/Sample Lotus Foto/Item Removal/6.png', category: 'removal', title: 'Item Removal Sample 6 (PNG)' },
        { src: 'images/Sample Lotus Foto/Item Removal/7.jpg', category: 'removal', title: 'Item Removal Sample 7' },
        { src: 'images/Sample Lotus Foto/Item Removal/8.jpg', category: 'removal', title: 'Item Removal Sample 8' },
        { src: 'images/Sample Lotus Foto/Item Removal/8.png', category: 'removal', title: 'Item Removal Sample 8 (PNG)' },
        { src: 'images/Sample Lotus Foto/Item Removal/9.jpg', category: 'removal', title: 'Item Removal Sample 9' },
        { src: 'images/Sample Lotus Foto/Item Removal/10.jpg', category: 'removal', title: 'Item Removal Sample 10' },
        { src: 'images/Sample Lotus Foto/Item Removal/11.jpg', category: 'removal', title: 'Item Removal Sample 11' },
        { src: 'images/Sample Lotus Foto/Item Removal/12.jpg', category: 'removal', title: 'Item Removal Sample 12' },
        { src: 'images/Sample Lotus Foto/Item Removal/13.jpg', category: 'removal', title: 'Item Removal Sample 13' },
        { src: 'images/Sample Lotus Foto/Item Removal/14.jpg', category: 'removal', title: 'Item Removal Sample 14' },
        { src: 'images/Sample Lotus Foto/Item Removal/15.jpg', category: 'removal', title: 'Item Removal Sample 15' },
        { src: 'images/Sample Lotus Foto/Item Removal/16.jpg', category: 'removal', title: 'Item Removal Sample 16' },
        { src: 'images/Sample Lotus Foto/Item Removal/17.jpg', category: 'removal', title: 'Item Removal Sample 17' },
        { src: 'images/Sample Lotus Foto/Item Removal/18.jpg', category: 'removal', title: 'Item Removal Sample 18' }
    ];
    
    // Performance optimization variables
    let currentFilter = 'all';
    let isLoading = false;
    let loadedImages = new Set();
    
    // Pagination variables
    let currentPage = 1;
    const imagesPerPage = 8;
    let totalPages = 1;
    
    // Lazy loading with Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;
                if (src && !loadedImages.has(src)) {
                    img.src = src;
                    img.classList.remove('lazy');
                    loadedImages.add(src);
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Render portfolio images with lazy loading and pagination
    function renderPortfolio(filter = 'all', page = 1) {
        if (isLoading) return;
        isLoading = true;
        
        console.log('Rendering portfolio with filter:', filter);
        portfolioGrid.innerHTML = '';
        
        const filteredImages = filter === 'all' ? portfolioImages : portfolioImages.filter(img => img.category === filter);
        console.log('Filtered images count:', filteredImages.length);
        console.log('Filtered images:', filteredImages);
        
        // Calculate pagination
        totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        currentPage = Math.max(1, Math.min(page, totalPages));
        
        // Get images for current page
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const currentPageImages = filteredImages.slice(startIndex, endIndex);
        
        // Use requestAnimationFrame for smooth rendering
        requestAnimationFrame(() => {
            currentPageImages.forEach((image, index) => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item';
                portfolioItem.setAttribute('data-category', image.category);
                
                portfolioItem.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" loading="lazy" onerror="console.error('Failed to load image:', this.src); this.style.border='2px solid red';">
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
            
            // Update pagination UI
            updatePaginationUI();
            
            isLoading = false;
        });
    }
    
    // Filter functionality with debouncing
    let filterTimeout;
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filter = btn.getAttribute('data-filter');
                currentFilter = filter;
                currentPage = 1; // Reset to first page when changing filter
                renderPortfolio(filter, currentPage);
            }, 100);
        });
    });
    
    // Pagination functions
    function updatePaginationUI() {
        let paginationContainer = document.getElementById('paginationContainer');
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = 'paginationContainer';
            paginationContainer.className = 'pagination-container';
            portfolioGrid.parentNode.appendChild(paginationContainer);
        }
        
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `<button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                          onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                          <i class="fas fa-chevron-left"></i> Previous</button>`;
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            paginationHTML += `<button class="pagination-btn page-number" onclick="changePage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-dots">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="pagination-btn page-number ${i === currentPage ? 'active' : ''}" 
                              onclick="changePage(${i})">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-dots">...</span>`;
            }
            paginationHTML += `<button class="pagination-btn page-number" onclick="changePage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        paginationHTML += `<button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                          onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                          Next <i class="fas fa-chevron-right"></i></button>`;
        
        // Page info
        paginationHTML += `<div class="pagination-info">
                          Page ${currentPage} of ${totalPages}
                          </div>`;
        
        paginationContainer.innerHTML = paginationHTML;
    }
    
    // Change page function
    window.changePage = function(page) {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            renderPortfolio(currentFilter, page);
            // Scroll to top of portfolio section
            document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
        }
    };
    
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('portfolioGrid')) {
        initPortfolioOptimized();
    }
});
