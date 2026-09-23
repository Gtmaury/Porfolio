let lang = 'en';

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('portfolio-lang', lang);
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'es' ? '🌐 EN' : '🌐 ES';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach((el) => {
    const target = el.getAttribute('data-' + lang);
    if (target) el.textContent = target;
  });
}

function toggleLang() {
  setLang(lang === 'es' ? 'en' : 'es');
}

(function initMobileNav() {
  const nav = document.querySelector('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!nav || !toggle || !links) return;

  const closeNav = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
})();

(function initLang() {
  const savedLang = localStorage.getItem('portfolio-lang');
  if (savedLang === 'es' || savedLang === 'en') {
    setLang(savedLang);
  } else {
    setLang('en');
  }
})();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  if (!scrollBar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollBar.style.width = progress + '%';
}, { passive: true });
