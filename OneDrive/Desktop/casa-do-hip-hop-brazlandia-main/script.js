/*!
 * ==================================================================
 * Casa do Hip Hop Brazlandia - JavaScript
 * ==================================================================
 * Business Logic & Interactivity
 * Version: 1.0.0
 * ==================================================================
 */

(function() {
    'use strict';

    // ========================================================================
    // CONFIGURATION
    // ========================================================================

    // Phone number for WhatsApp enrollment (format: country code + number)
    const WHATSAPP_NUMBER = '5561990226748';

    // ========================================================================
    // DOM ELEMENTS
    // ========================================================================

    const elements = {
        // Navigation
        mainNav: document.getElementById('main-nav'),
        mobileMenuBtn: document.getElementById('mobile-menu-btn'),
        navMenu: document.getElementById('nav-menu'),

        // Scroll Progress
        scrollProgress: document.getElementById('scroll-progress')
    };

    // ========================================================================
    // ANIMATIONS INITIALIZATION
    // ========================================================================

    /**
     * Initialize AOS (Animate On Scroll) library
     * Configures animation duration, repetition, and mirror effect
     */
    function initializeAnimations() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000, // Animation duration in ms
                once: false, // Allow repeated animations
                mirror: true // Animate on scroll up as well
            });
        }
    }

    /**
     * Initialize Instagram Carousel
     * Handles navigation between Instagram posts
     */
    function initializeInstagramCarousel() {
        const carousel = document.querySelector('.instagram-carousel');
        if (!carousel) return;

        const posts = carousel.querySelectorAll('.instagram-post');
        const dots = document.querySelectorAll('.instagram-dot');
        const prevBtn = carousel.querySelector('.instagram-nav-prev');
        const nextBtn = carousel.querySelector('.instagram-nav-next');

        if (posts.length === 0) return;

        let currentIndex = 0;
        const totalPosts = posts.length;

        function showPost(index) {
            // Remove active class from all posts and dots
            posts.forEach(post => post.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current post and dot
            posts[index].classList.add('active');
            dots[index].classList.add('active');

            // Re-process Instagram embed for the new post
            if (window.instgrm) {
                setTimeout(() => {
                    window.instgrm.Embeds.process();
                }, 100);
            }
        }

        function nextPost() {
            currentIndex = (currentIndex + 1) % totalPosts;
            showPost(currentIndex);
        }

        function prevPost() {
            currentIndex = (currentIndex - 1 + totalPosts) % totalPosts;
            showPost(currentIndex);
        }

        // Add event listeners to navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', prevPost);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextPost);
        }

        // Add event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showPost(currentIndex);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevPost();
            if (e.key === 'ArrowRight') nextPost();
        });

        // Initial setup - show first post
        showPost(0);
    }

    // ========================================================================
    // SCROLL PROGRESS BAR
    // ========================================================================

    /**
     * Updates the scroll progress bar based on current scroll position
     * Calculates percentage of page scrolled and updates width
     */
    function updateScrollProgress() {
        // Get scroll position (cross-browser support)
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Calculate scroll percentage (avoid division by zero)
        const scrollPercentage = scrollHeight > 0 ?
            (scrollTop / scrollHeight) * 100 :
            0;

        // Update progress bar width
        elements.scrollProgress.style.width = scrollPercentage + '%';

        // Update ARIA value for accessibility
        elements.scrollProgress.setAttribute('aria-valuenow', Math.round(scrollPercentage));
    }

    // ========================================================================
    // NAVIGATION EFFECTS
    // ========================================================================

    /**
     * Manages navigation appearance on scroll
     * Adds/removes scrolled state class and adjusts nav height
     */
    function handleNavigationScroll() {
        const scrollY = window.scrollY;
        const threshold = 80; // Scroll threshold to trigger nav change

        if (scrollY > threshold) {
            // Add scrolled state
            elements.mainNav.classList.add('main-nav--scrolled');

            // Adjust nav height using CSS class
            const navContainer = elements.mainNav.querySelector('.container');
            if (navContainer) {
                navContainer.classList.add('nav-container--scrolled');
            }
        } else {
            // Remove scrolled state
            elements.mainNav.classList.remove('main-nav--scrolled');

            // Reset nav height - remove scrolled class
            const navContainer = elements.mainNav.querySelector('.container');
            if (navContainer) {
                navContainer.classList.remove('nav-container--scrolled');
            }
        }
    }

    // ========================================================================
    // MOBILE MENU
    // ========================================================================

    /**
     * Toggles mobile navigation menu open/closed state
     * Updates ARIA attributes for accessibility
     */
    function toggleMobileMenu() {
        const isOpen = elements.navMenu.classList.contains('nav-menu--open');

        if (isOpen) {
            // Close menu
            elements.navMenu.classList.remove('nav-menu--open');
            elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            elements.mobileMenuBtn.setAttribute('aria-label', 'Abrir menu de navegação');

            // Re-enable body scroll
            document.body.style.overflow = '';
        } else {
            // Open menu
            elements.navMenu.classList.add('nav-menu--open');
            elements.mobileMenuBtn.setAttribute('aria-expanded', 'true');
            elements.mobileMenuBtn.setAttribute('aria-label', 'Fechar menu de navegação');

            // Disable body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Closes mobile menu
     * Used when clicking outside or on a link
     */
    function closeMobileMenu() {
        if (elements.navMenu.classList.contains('nav-menu--open')) {
            elements.navMenu.classList.remove('nav-menu--open');
            elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            elements.mobileMenuBtn.setAttribute('aria-label', 'Abrir menu de navegação');
            document.body.style.overflow = '';
        }
    }

    /**
     * Initializes mobile menu event listeners
     */
    function initializeMobileMenu() {
        // Toggle button click
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking on a link
        const navLinks = elements.navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && elements.navMenu.classList.contains('nav-menu--open')) {
                closeMobileMenu();
                elements.mobileMenuBtn.focus();
            }
        });
    }

    // ========================================================================
    // ENROLLMENT FUNCTIONALITY
    // ========================================================================

    /**
     * Opens WhatsApp with pre-filled enrollment message
     * @param {string} workshopName - Name of the workshop for enrollment
     */
    function handleEnrollment(workshopName) {
        // Create personalized message
        const message = `Olá! Tenho interesse em inscribber-me na oficina de ${workshopName}. Gostaria de saber mais informações sobre horários e vagas.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Build WhatsApp URL
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    /**
     * Initialize event delegation for enrollment buttons
     * Replaces inline onclick handlers
     */
    function initializeEnrollmentButtons() {
        document.addEventListener('click', function(event) {
            const button = event.target.closest('[data-workshop]');
            if (button) {
                event.preventDefault();
                const workshopName = button.getAttribute('data-workshop');
                handleEnrollment(workshopName);
            }
        });
    }

    /**
     * Initialize Instagram Embed
     * Handles lazy loading of Instagram posts
     */
    function initializeInstagramEmbed() {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        } else {
            // Retry if Instagram script not loaded yet
            window.addEventListener('load', function() {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            });
        }
    }

    // ========================================================================
    // SCROLL BAR & NAV EFFECT (New Custom)
    // ========================================================================

    /**
     * Initialize scroll bar and glass nav effect
     */
    function initializeScrollBarAndNav() {
        const scrollBar = document.getElementById('scrollBar');
        const mainNav = document.getElementById('main-nav');

        if (!scrollBar && !mainNav) return;

        window.addEventListener('scroll', () => {
            // Scroll Bar
            if (scrollBar) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                scrollBar.style.width = scrolled + "%";
            }

            // Glass Nav Effect
            if (mainNav) {
                if (window.scrollY > 50) {
                    mainNav.classList.add('glass-nav');
                    mainNav.classList.add('h-20');
                } else {
                    mainNav.classList.remove('glass-nav');
                    mainNav.classList.remove('h-20');
                }
            }
        });
    }

    // ========================================================================
    // SCROLL HANDLER (Combined)
    // ========================================================================

    /**
     * Combined scroll event handler
     * Calls all scroll-related functions
     */
    function handleScroll() {
        if(elements.scrollProgress) {
            updateScrollProgress();
        }
        if(elements.mainNav) {
            handleNavigationScroll();
        }
    }

    // ========================================================================
    // DEBOUNCE UTILITY
    // ========================================================================

    /**
     * Creates a debounced function that delays invoking func
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to delay
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Create debounced scroll handler for better performance
    const debouncedScrollHandler = debounce(handleScroll, 10);

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    /**
     * Initialize all functionality when DOM is ready
     */
    function initialize() {
        // Initialize animations
        initializeAnimations();

        if(elements.mobileMenuBtn) {
            // Initialize mobile menu
            initializeMobileMenu();
        }

        // Initialize Instagram carousel
        initializeInstagramCarousel();

        // Initialize enrollment buttons (event delegation)
        initializeEnrollmentButtons();

        // Initialize Instagram embed
        initializeInstagramEmbed();

        // Initialize scroll bar and glass nav
        initializeScrollBarAndNav();

        // Set up scroll event listener (debounced for performance)
        window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

        // Initial call to set correct state on page load
        handleScroll();

        // Close mobile menu on window resize (when switching to desktop)
        window.addEventListener('resize', debounce(closeMobileMenu, 250));
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM already loaded
        initialize();
    }

})();


// ========================================================================
// PARTICLES SCRIPT
// ========================================================================
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const cursorDot = document.getElementById('cursor-dot');

    let particles = [];
    const particleCount = 120;
    let mouse = { x: null, y: null, radius: 180 };

    class Particle {
        constructor() {
            this.initPosition();
            this.size = Math.random() * 1.5 + 0.5;
            this.density = (Math.random() * 20) + 5;
            this.velocity = Math.random() * 0.5;
        }

        initPosition() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.baseY -= this.velocity;
            if (this.baseY < 0) this.baseY = canvas.height;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dxBack = this.x - this.baseX;
                    this.x -= dxBack / 15;
                }
                if (this.y !== this.baseY) {
                    let dyBack = this.y - this.baseY;
                    this.y -= dyBack / 15;
                }
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function resizeParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (particles.length === 0) {
            initParticles();
        } else {
            particles.forEach(p => p.initPosition());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 140) {
                    let opacity = 1 - (distance / 140);
                    ctx.strokeStyle = `rgba(212, 255, 0, ${opacity * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        if (cursorDot) {
            cursorDot.style.left = e.x + 'px';
            cursorDot.style.top = e.y + 'px';
        }
    });

    window.addEventListener('resize', resizeParticles);

    window.onload = () => {
        resizeParticles();
        animateParticles();
    };
}


// ========================================================================
// HORIZONTAL SLIDER SCRIPT
// ========================================================================
const viewport = document.getElementById('main-viewport');
if (viewport) {
    const sessions = document.querySelectorAll('.session');
    const dotsContainer = document.getElementById('dots-container');
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    let currentIndex = 0;
    let isTransitioning = false;
    const totalSessions = sessions.length;

    if (dotsContainer) {
        sessions.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSession(i);
            dotsContainer.appendChild(dot);
        });
    }

    function goToSession(index) {
        if (isTransitioning || index === currentIndex) return;
        if (index < 0 || index >= totalSessions) return;

        isTransitioning = true;
        currentIndex = index;

        viewport.style.transform = `translateX(-${currentIndex * 100}vw)`;

        sessions.forEach((s, i) => {
            s.classList.toggle('active', i === currentIndex);
        });

        if (dotsContainer) {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        }

        // Atualiza a barra de progresso do carousel
        updateCarouselProgress();

        setTimeout(() => {
            isTransitioning = false;
        }, 1200);
    }

    // Atualiza a barra de progresso do carousel
    function updateCarouselProgress() {
        const progressBar = document.getElementById('carousel-progress');
        if (progressBar) {
            const progress = ((currentIndex + 1) / totalSessions) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    // Inicializa a barra de progresso
    updateCarouselProgress();

    window.addEventListener('wheel', (e) => {
        if (isTransitioning) return;
        
        if (Math.abs(e.deltaY) > 30) {
            if (e.deltaY > 0) goToSession(currentIndex + 1);
            else goToSession(currentIndex - 1);
        }
    }, { passive: true });

    // ========================================================================
    // AUTO-ROTATION CAROUSEL (ELEMENTOS DO HIP HOP)
    // ========================================================================
    let autoRotateInterval;
    const AUTO_ROTATE_DELAY = 5000; // 5 segundos entre cada troca

    function startAutoRotation() {
        if (autoRotateInterval) return;
        autoRotateInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalSessions;
            goToSession(nextIndex);
        }, AUTO_ROTATE_DELAY);
    }

    function stopAutoRotation() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    // Inicia a rotação automática
    startAutoRotation();
    
    // Começa na terceira sessão (índice 2)
    goToSession(2);

    if (cursor && follower) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';

            const target = e.target;
            if (target.closest('button') || target.closest('.dot')) {
                document.body.classList.add('is-hovering');
            } else {
                document.body.classList.remove('is-hovering');
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToSession(currentIndex + 1);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToSession(currentIndex - 1);
    });

    let touchStartX = 0;
    window.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    window.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToSession(currentIndex + 1);
            else goToSession(currentIndex - 1);
        }
    });
}

// ========================================================================
// VIDEO CAROUSEL - SEÇÃO SOBRE/HISTÓRIA
// ========================================================================
function initializeVideoCarousel() {
    const container = document.querySelector('.video-carousel-container');
    if (!container) return;

    const slides = container.querySelectorAll('.video-slide');
    const videos = container.querySelectorAll('.video-element');
    const dots = container.querySelectorAll('.video-dot');
    const prevBtn = container.querySelector('.video-nav-prev');
    const nextBtn = container.querySelector('.video-nav-next');

    if (slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const AUTO_ROTATE_DELAY = 6000;
    let autoRotateInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        videos.forEach(video => video.pause());

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        const currentVideo = slides[index].querySelector('video');
        if (currentVideo) {
            currentVideo.play().catch(() => {});
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            showSlide(currentIndex);
            resetAutoRotate();
        }
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, AUTO_ROTATE_DELAY);
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    function resetAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoRotate(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoRotate(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    container.addEventListener('mouseenter', stopAutoRotate);
    container.addEventListener('mouseleave', startAutoRotate);

    showSlide(0);
    startAutoRotate();
}

document.addEventListener('DOMContentLoaded', initializeVideoCarousel);
