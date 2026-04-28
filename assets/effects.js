/* ====================================================
   ALICORN AI — VISUAL EFFECTS JAVASCRIPT
   1. Scroll Progress Bar
   2. Typewriter Effect on Hero
   3. Mouse Parallax on Floating Badges
==================================================== */

(function () {
    'use strict';

    // ══════════════════════════════════════════════
    // 1. SCROLL PROGRESS BAR
    // ══════════════════════════════════════════════
    const scrollBar = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollBar) scrollBar.style.width = pct.toFixed(2) + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // init on load


    // ══════════════════════════════════════════════
    // 2. TYPEWRITER EFFECT ON HERO HEADLINE
    // Words cycle, ending permanently on "Amplified."
    // ══════════════════════════════════════════════
    const typewriterEl = document.getElementById('typewriterText');

    if (typewriterEl) {
        const sequence = [
            { word: 'Scalable.',  pause: 1400 },
            { word: 'On-Brand.', pause: 1400 },
            { word: 'Amplified.', pause: null }, // null = stop here forever
        ];

        let seqIndex   = 0;
        let charIndex  = 0;
        let isDeleting = false;

        function type() {
            const { word, pause } = sequence[seqIndex];

            if (isDeleting) {
                typewriterEl.textContent = word.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = word.substring(0, charIndex + 1);
                charIndex++;
            }

            // Finished typing the word
            if (!isDeleting && charIndex === word.length) {
                if (pause === null) return; // Final word — stop the animation
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pause);
                return;
            }

            // Finished deleting
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                seqIndex++;
                setTimeout(type, 300);
                return;
            }

            setTimeout(type, isDeleting ? 55 : 95);
        }

        // Kick off after a short delay so the page feels settled
        setTimeout(type, 900);
    }


    // ══════════════════════════════════════════════
    // 3. MOUSE PARALLAX ON FLOATING HERO BADGES
    // ══════════════════════════════════════════════
    const heroSection  = document.getElementById('hero');
    const floatBadges  = document.querySelectorAll('.mockup-float');

    if (heroSection && floatBadges.length > 0) {
        let rafId = null;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            targetX = (e.clientX - rect.left)  / rect.width  - 0.5;  // -0.5 → 0.5
            targetY = (e.clientY - rect.top)   / rect.height - 0.5;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        }, { passive: true });

        // Smooth lerp (linear interpolation) loop
        function animateParallax() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            floatBadges.forEach((badge, i) => {
                const depth = (i === 0) ? 14 : 9; // top-right badge moves more
                badge.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
            });

            rafId = requestAnimationFrame(animateParallax);
        }

        // Only run parallax on non-touch devices
        if (!('ontouchstart' in window)) {
            animateParallax();
        }
    }

})();
