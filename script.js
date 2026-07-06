// =========================================================
// RAHUL KUSHWAHA — PORTFOLIO SCRIPT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Scroll-to-top button ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Terminal typing effect ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeText(el, text, speed, delay) {
    if (!el) return Promise.resolve();
    if (prefersReducedMotion) {
      el.textContent = text;
      return Promise.resolve();
    }
    return new Promise(resolve => {
      setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          el.textContent = text.slice(0, i + 1);
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      }, delay);
    });
  }

  const line1 = document.getElementById('typeLine1');
  const line2 = document.getElementById('typeLine2');

  (async () => {
    await typeText(line1, '> Rahul Kushwaha', 45, 400);
    await typeText(line2, '> Learning to build the web, one line at a time.', 28, 300);
  })();

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.about, .journey, .skills, .contact, .id-card, .mentor-card, .skill-card, .contact-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in'));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
    });
  });

});
