/* ===================================================================
 *  Mohamad Al Kayal — Portfolio v2
 *  Main JavaScript — GSAP + Lenis + Vanilla JS
 * =================================================================== */

(function () {
    'use strict';

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

        const text = textEl.textContent;
        textEl.innerHTML = text.split('').map(char =>
            char === ' '
                ? '<span class="char" style="width:0.3em">&nbsp;</span>'
                : `<span class="char">${char}</span>`
        ).join('');

        const chars = $$('.char', textEl);
        const tl = gsap.timeline();

        tl.to(chars, {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.2
        });

        tl.to(barEl, { width: '100%', duration: 0.8, ease: 'power2.inOut' }, '-=0.2');

        tl.to(preloader, {
            yPercent: -100, duration: 0.8, ease: 'power4.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
                initHeroAnimations();
            }
        }, '+=0.1');
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

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, { offset: 0, duration: 1.2 });
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

        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: () => {
                if (window.scrollY > 80) {
                    nav.classList.add('nav--scrolled');
                } else {
                    nav.classList.remove('nav--scrolled');
                }
            }
        });

        const toggle = $('#nav-toggle');
        const mobileMenu = $('#mobile-menu');
        if (toggle && mobileMenu) {
            toggle.addEventListener('click', () => {
                if (mobileMenu.classList.contains('mobile-menu--open')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });
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
        const badge = $('.hero__badge');
        const titleLines = $$('.hero__title-line');
        const desc = $('.hero__desc');
        const subtitle = $('.hero__subtitle');
        const ctas = $('.hero__ctas');
        const statsGrid = $('.hero__stats-grid');
        const scroll = $('.hero__scroll');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (badge) {
            tl.fromTo(badge, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 });
        }

        if (titleLines.length) {
            tl.fromTo(titleLines,
                { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
                { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.12 },
                '-=0.2'
            );
        }

        if (desc) {
            tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
        }

        if (subtitle) {
            tl.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3');
        }

        if (ctas) {
            tl.fromTo(ctas, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
        }

        if (statsGrid) {
            tl.fromTo(statsGrid,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7 },
                '-=0.4'
            );
        }

        if (scroll) {
            tl.fromTo(scroll, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
            gsap.to(scroll, {
                opacity: 0,
                scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true }
            });
        }

        initRotatingText();
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

        function type() {
            const current = words[wordIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            el.textContent = current.substring(0, charIndex);

            let delay = isDeleting ? 35 : 70;
            if (!isDeleting && charIndex === current.length) {
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }
            setTimeout(type, delay);
        }
        type();
    }

    // -------------------------------------------------------------------
    // # Scroll Reveal Animations
    // -------------------------------------------------------------------
    function initScrollAnimations() {
        const reveal = (selector, opts = {}) => {
            const el = typeof selector === 'string' ? $$(selector) : [selector];
            if (!el.length) return;
            el.forEach(e => {
                gsap.fromTo(e,
                    { opacity: 0, y: opts.y || 35 },
                    {
                        opacity: 1, y: 0,
                        duration: opts.duration || 0.7,
                        ease: 'power3.out',
                        stagger: opts.stagger || 0,
                        scrollTrigger: { trigger: opts.trigger || e, start: opts.start || 'top 85%' }
                    }
                );
            });
        };

        // About
        reveal('.about .section-header');
        reveal('.about__bio');
        reveal('.about__detail-card', { stagger: 0.1, trigger: '.about__aside' });

        // Experience
        reveal('.experience .section-header');

        // Portfolio
        reveal('.portfolio .section-header');
        reveal('.project--featured', { y: 50 });
        reveal('.project-card', { stagger: 0.08, trigger: '.portfolio__grid', y: 20 });

        // Contact
        reveal('.contact .section-header');
        reveal('.contact__content');
        reveal('.contact__social', { stagger: 0.08, trigger: '.contact__socials', y: 15 });
    }

    // -------------------------------------------------------------------
    // # Counter Animation (hero stats)
    // -------------------------------------------------------------------
    function initCounters() {
        $$('.hero__stat-number').forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            if (isNaN(target)) return;

            // Animate immediately for hero counters (they're visible on load after preloader)
            const animateCounter = () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: function () {
                        counter.textContent = Math.round(this.targets()[0].val);
                    }
                });
            };

            // Run after preloader finishes (slight delay)
            setTimeout(animateCounter, 1200);
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

        $$('.experience__card').forEach(card => {
            gsap.fromTo(card.querySelector('.experience__card-inner'),
                { opacity: 0.3, scale: 0.96 },
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
                    x: x * 15, y: y * 15,
                    duration: 0.4, ease: 'power2.out'
                });
            });

            img.addEventListener('mouseleave', () => {
                gsap.to(img.querySelector('img'), {
                    x: 0, y: 0, duration: 0.6, ease: 'power3.out'
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
            gsap.set(dot, { x: mouseX, y: mouseY });
        });

        function animateCircle() {
            circleX = lerp(circleX, mouseX, 0.15);
            circleY = lerp(circleY, mouseY, 0.15);
            gsap.set(circle, { x: circleX, y: circleY });
            requestAnimationFrame(animateCircle);
        }
        animateCircle();

        const interactiveEls = 'a, button, [role="button"], .magnetic, .project-card, .btn, .nav__link';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveEls)) cursor.classList.add('cursor--hover');
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveEls)) cursor.classList.remove('cursor--hover');
        });
        document.addEventListener('mouseleave', () => { gsap.to(cursor, { opacity: 0, duration: 0.3 }); });
        document.addEventListener('mouseenter', () => { gsap.to(cursor, { opacity: 1, duration: 0.3 }); });
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
                gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
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

        window.addEventListener('load', () => { ScrollTrigger.refresh(); });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 250);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
