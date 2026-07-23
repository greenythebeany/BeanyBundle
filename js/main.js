(function () {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- theme ---------------- */
  const THEME_KEY = 'beanybundle-theme';
  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === theme);
    });
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem(THEME_KEY, btn.dataset.theme);
        applyTheme(btn.dataset.theme);
      });
    });
  }

  /* ---------------- language ---------------- */
  const LANG_KEY = 'beanybundle-lang';
  function initLang() {
    const saved = localStorage.getItem(LANG_KEY) || 'en';
    applyI18n(saved);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === saved));
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem(LANG_KEY, btn.dataset.lang);
        applyI18n(btn.dataset.lang);
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });
  }

  /* ---------------- boot sequence ---------------- */
  function initBoot() {
    const overlay = document.getElementById('boot-overlay');
    if (!overlay) return;
    if (prefersReduced || sessionStorage.getItem('beanybundle-booted')) {
      overlay.remove();
      return;
    }
    sessionStorage.setItem('beanybundle-booted', '1');
    const linesEl = document.getElementById('boot-lines');
    const lang = localStorage.getItem(LANG_KEY) || 'en';
    const dict = I18N[lang] || I18N.en;
    const lines = [dict['boot.l1'], dict['boot.l2'] + '[||||||||||] 100%', dict['boot.l3'], dict['boot.l4']];
    let i = 0;
    function nextLine() {
      if (i >= lines.length) {
        setTimeout(() => overlay.classList.add('hidden'), 350);
        setTimeout(() => overlay.remove(), 800);
        return;
      }
      const p = document.createElement('div');
      p.className = 'line';
      p.textContent = '> ' + lines[i];
      linesEl.appendChild(p);
      i++;
      setTimeout(nextLine, 220);
    }
    nextLine();
  }

  /* ---------------- typed hero line ---------------- */
  function initTyped() {
    const el = document.querySelector('[data-typed]');
    if (!el) return;
    const key = el.getAttribute('data-typed');
    function type() {
      const lang = localStorage.getItem(LANG_KEY) || 'en';
      const text = (I18N[lang] || I18N.en)[key] || '';
      el.textContent = '';
      if (prefersReduced) { el.textContent = text; return; }
      let i = 0;
      const iv = setInterval(() => {
        el.textContent = text.slice(0, i);
        i++;
        if (i > text.length) clearInterval(iv);
      }, 45);
    }
    type();
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', type));
  }

  /* ---------------- carousel ---------------- */
  function initCarousel() {
    const track = document.querySelector('.carousel');
    if (!track) return;
    const prev = document.querySelector('[data-carousel-prev]');
    const next = document.querySelector('[data-carousel-next]');
    const dotsWrap = document.querySelector('.carousel-dots');
    const cards = Array.from(track.children);

    if (dotsWrap) {
      cards.forEach((_, idx) => {
        const d = document.createElement('button');
        d.className = 'dot';
        d.setAttribute('aria-label', 'slide ' + (idx + 1));
        d.addEventListener('click', () => scrollToCard(idx));
        dotsWrap.appendChild(d);
      });
    }

    function cardWidth() {
      return cards[0] ? cards[0].getBoundingClientRect().width + 20 : 300;
    }
    function scrollToCard(idx) {
      track.scrollTo({ left: cardWidth() * idx, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
    function updateDots() {
      if (!dotsWrap) return;
      const idx = Math.round(track.scrollLeft / cardWidth());
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    track.addEventListener('scroll', () => requestAnimationFrame(updateDots));
    updateDots();

    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: cardWidth(), behavior: 'smooth' }));

    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });

    cards.forEach(card => {
      const href = card.getAttribute('data-href');
      if (!href) return;
      card.addEventListener('click', () => { window.location.href = href; });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = href; }
      });
    });
  }

  /* ---------------- scroll reveal ---------------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .feature-list li');
    if (!els.length) return;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLang();
    initBoot();
    initTyped();
    initCarousel();
    initReveal();
  });
})();
