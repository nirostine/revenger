// If GSAP failed to load, unhide content and bail.
if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
  document.documentElement.classList.remove('js');
  throw new Error('GSAP failed to load');
}

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Strong UI ease-out: cubic-bezier(0.23, 1, 0.32, 1)
CustomEase.create('ui-out', '0.23, 1, 0.32, 1');

const mm = gsap.matchMedia();

mm.add(
  {
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
  },
  (ctx) => {
    const { reduce } = ctx.conditions;

    // Reduced motion: fade only, no movement.
    const from = reduce ? { autoAlpha: 0 } : { autoAlpha: 0, y: 24 };
    const base = { ease: 'ui-out', duration: reduce ? 0.2 : 0.6 };

    // Hero: one-time entrance on load, staggered so it doesn't arrive all at once.
    gsap.from('[data-hero]', { ...from, ...base, stagger: 0.06 });

    // Single elements: reveal once as they enter.
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        ...from,
        ...base,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Groups: children reveal in sequence.
    gsap.utils.toArray('[data-stagger]').forEach((group) => {
      gsap.from(group.children, {
        ...from,
        ...base,
        stagger: 0.06,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    });

    // Reading progress: tied directly to scroll position (linear, scrubbed).
    // It moves only when the user scrolls, so it stays under reduced motion too.
    gsap.to('.progress__bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    });
  }
);
