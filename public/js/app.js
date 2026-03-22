/* ===================================================================
 *  Mohamad Al Kayal — Portfolio
 *  Main JavaScript — GSAP + Lenis + Vanilla JS
 * =================================================================== */

(function () {
    'use strict';

    // -------------------------------------------------------------------
    // # Utilities
    // -------------------------------------------------------------------
    const lerp = (a, b, t) => a + (b - a) * t;
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    // -------------------------------------------------------------------
    // # Preloader
    // -------------------------------------------------------------------
    function initPreloader() {
        const preloader = $('#preloader');
        const textEl = $('#preloader-text');
        const barEl = $('#preloader-bar');

        if (!preloader || !textEl) return;

        // Split text into characters
        const text = textEl.textContent;
        textEl.innerHTML = text.split('').map(char =>
            char === ' '
                ? '<span class="char" style="width:0.3em">&nbsp;</span>'
                : `<span class="char">${char}</span>`
        ).join('');

        const chars = $$('.char', textEl);

        const tl = gsap.timeline();

        // Animate characters in
        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power3.out',
            delay: 0.2
        });

        // Animate progress bar
        tl.to(barEl, {
            width: '100%',
            duration: 1,
            ease: 'power2.inOut'
        }, '-=0.3');

        // Slide preloader out
        tl.to(preloader, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
                // Trigger hero animations after preloader
                initHeroAnimations();
            }
        }, '+=0.2');
    }

    // -------------------------------------------------------------------
    // # Smooth Scroll (Lenis)
    // -------------------------------------------------------------------
    let lenis;

    function initSmoothScroll() {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true
        });

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Handle anchor clicks
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, { offset: 0, duration: 1.2 });
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    }

    // -------------------------------------------------------------------
    // # Navigation
    // -------------------------------------------------------------------
    function initNavigation() {
        const nav = $('#nav');

        // Scroll state
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: (self) => {
                if (self.direction === 1 || window.scrollY > 80) {
                    nav.classList.add('nav--scrolled');
                }
                if (window.scrollY <= 80) {
                    nav.classList.remove('nav--scrolled');
                }
            }
        });

        // Mobile toggle
        const toggle = $('#nav-toggle');
        const mobileMenu = $('#mobile-menu');

        if (toggle && mobileMenu) {
            toggle.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.contains('mobile-menu--open');
                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            // Close on link click
            $$('.mobile-menu__link').forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
        }
    }

    function openMobileMenu() {
        const toggle = $('#nav-toggle');
        const mobileMenu = $('#mobile-menu');
        toggle.classList.add('nav__toggle--active');
        mobileMenu.classList.add('mobile-menu--open');
        if (lenis) lenis.stop();
    }

    function closeMobileMenu() {
        const toggle = $('#nav-toggle');
        const mobileMenu = $('#mobile-menu');
        if (toggle) toggle.classList.remove('nav__toggle--active');
        if (mobileMenu) mobileMenu.classList.remove('mobile-menu--open');
        if (lenis) lenis.start();
    }

    // -------------------------------------------------------------------
    // # Hero Animations
    // -------------------------------------------------------------------
    function initHeroAnimations() {
        const greeting = $('.hero__greeting');
        const title = $('.hero__title');
        const subtitle = $('.hero__subtitle');
        const ctas = $('.hero__ctas');
        const scroll = $('.hero__scroll');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (greeting) {
            tl.fromTo(greeting, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
        }

        if (title) {
            tl.fromTo(title,
                { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
                { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1 },
                '-=0.3'
            );
        }

        if (subtitle) {
            tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
        }

        if (ctas) {
            tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
        }

        if (scroll) {
            tl.fromTo(scroll, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2');
        }

        // Start rotating text
        initRotatingText();

        // Fade scroll indicator on scroll
        if (scroll) {
            gsap.to(scroll, {
                opacity: 0,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '30% top',
                    scrub: true
                }
            });
        }
    }

    // -------------------------------------------------------------------
    // # Rotating Text
    // -------------------------------------------------------------------
    function initRotatingText() {
        const el = $('#rotating-text');
        if (!el) return;

        const words = ['Angular Specialist', 'UI Engineer', 'Problem Solver', 'E-Commerce Builder'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout;

        function type() {
            const current = words[wordIndex];

            if (isDeleting) {
                charIndex--;
                el.textContent = current.substring(0, charIndex);
            } else {
                charIndex++;
                el.textContent = current.substring(0, charIndex);
            }

            let delay = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === current.length) {
                delay = 2000; // Pause at complete word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 300;
            }

            timeout = setTimeout(type, delay);
        }

        type();
    }

    // -------------------------------------------------------------------
    // # Scroll Reveal Animations
    // -------------------------------------------------------------------
    function initScrollAnimations() {
        // About section
        gsap.fromTo('.about .section-header', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.about .section-header', start: 'top 85%' }
        });

        gsap.fromTo('.about__bio', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.about__bio', start: 'top 85%' }
        });

        gsap.fromTo('.about__stats', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.about__stats', start: 'top 85%' }
        });

        // Experience section
        gsap.fromTo('.experience .section-header', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.experience .section-header', start: 'top 85%' }
        });

        // Portfolio section
        gsap.fromTo('.portfolio .section-header', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.portfolio .section-header', start: 'top 85%' }
        });

        // Featured projects stagger
        $$('.project--featured').forEach((project, i) => {
            gsap.fromTo(project, { opacity: 0, y: 60 }, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: project, start: 'top 85%' }
            });
        });

        // Grid projects stagger
        gsap.fromTo('.project-card', { opacity: 0, y: 40, scale: 0.95 }, {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.portfolio__grid', start: 'top 85%' }
        });

        // Skills section
        gsap.fromTo('.skills .section-header', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.skills .section-header', start: 'top 85%' }
        });

        gsap.fromTo('.skill-card', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.skills__grid', start: 'top 85%' }
        });

        // Contact section
        gsap.fromTo('.contact .section-header', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact .section-header', start: 'top 85%' }
        });

        gsap.fromTo('.contact__content', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact__content', start: 'top 85%' }
        });

        gsap.fromTo('.contact__social', { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.contact__socials', start: 'top 90%' }
        });
    }

    // -------------------------------------------------------------------
    // # Counter Animation
    // -------------------------------------------------------------------
    function initCounters() {
        $$('.stat__number').forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);

            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 1.5,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        onUpdate: function () {
                            counter.textContent = Math.round(this.targets()[0].innerText || 0);
                        }
                    });
                }
            });
        });
    }

    // -------------------------------------------------------------------
    // # Experience Horizontal Scroll
    // -------------------------------------------------------------------
    function initExperienceScroll() {
        if (window.innerWidth <= 768) return;

        const track = $('#experience-track');
        const wrapper = $('.experience__wrapper');
        const progressBar = $('#experience-progress');

        if (!track || !wrapper) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 100);

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: 'none',
            scrollTrigger: {
                trigger: '.experience__wrapper',
                start: 'top 20%',
                end: () => '+=' + (track.scrollWidth - window.innerWidth + 200),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressBar) {
                        progressBar.style.width = (self.progress * 100) + '%';
                    }
                }
            }
        });

        // Animate individual cards as they come into view
        $$('.experience__card').forEach((card, i) => {
            gsap.fromTo(card.querySelector('.experience__card-inner'),
                { opacity: 0.3, scale: 0.95 },
                {
                    opacity: 1, scale: 1,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: tween,
                        start: 'left 80%',
                        end: 'left 40%',
                        scrub: true
                    }
                }
            );
        });
    }

    // -------------------------------------------------------------------
    // # Portfolio Hover Parallax
    // -------------------------------------------------------------------
    function initPortfolioHover() {
        if (isTouchDevice()) return;

        $$('.project--featured .project__image').forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(img.querySelector('img'), {
                    x: x * 20,
                    y: y * 20,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            img.addEventListener('mouseleave', () => {
                gsap.to(img.querySelector('img'), {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            });
        });
    }

    // -------------------------------------------------------------------
    // # Custom Cursor
    // -------------------------------------------------------------------
    function initCustomCursor() {
        if (isTouchDevice()) return;

        const cursor = $('#cursor');
        if (!cursor) return;

        const dot = cursor.querySelector('.cursor__dot');
        const circle = cursor.querySelector('.cursor__circle');

        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows exactly
            gsap.set(dot, { x: mouseX, y: mouseY });
        });

        // Circle follows with lerp
        function animateCircle() {
            circleX = lerp(circleX, mouseX, 0.15);
            circleY = lerp(circleY, mouseY, 0.15);
            gsap.set(circle, { x: circleX, y: circleY });
            requestAnimationFrame(animateCircle);
        }
        animateCircle();

        // Hover state for interactive elements
        const interactiveEls = 'a, button, [role="button"], .magnetic, .project-card, .btn, .nav__link';

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveEls)) {
                cursor.classList.add('cursor--hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveEls)) {
                cursor.classList.remove('cursor--hover');
            }
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
        });

        document.addEventListener('mouseenter', () => {
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
        });
    }

    // -------------------------------------------------------------------
    // # Magnetic Buttons
    // -------------------------------------------------------------------
    function initMagneticButtons() {
        if (isTouchDevice()) return;

        $$('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    // -------------------------------------------------------------------
    // # Initialize
    // -------------------------------------------------------------------
    function init() {
        gsap.registerPlugin(ScrollTrigger);

        initSmoothScroll();
        initPreloader();
        initNavigation();
        initScrollAnimations();
        initCounters();
        initExperienceScroll();
        initPortfolioHover();
        initCustomCursor();
        initMagneticButtons();

        // Refresh ScrollTrigger after all images load
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });

        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
