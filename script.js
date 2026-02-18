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
    const WHATSAPP_NUMBER = '5561999999999';

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

    // Make function globally available for inline onclick handlers
    window.handleEnrollment = handleEnrollment;

    // ========================================================================
    // SCROLL HANDLER (Combined)
    // ========================================================================

    /**
     * Combined scroll event handler
     * Calls all scroll-related functions
     */
    function handleScroll() {
        updateScrollProgress();
        handleNavigationScroll();
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

        // Initialize mobile menu
        initializeMobileMenu();

        // Initialize Instagram carousel
        initializeInstagramCarousel();

        // Initialize enrollment buttons (event delegation)
        initializeEnrollmentButtons();

        // Initialize Instagram embed
        initializeInstagramEmbed();

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