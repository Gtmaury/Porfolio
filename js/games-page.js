let lang = 'es';

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

(function initLang() {
  const savedLang = localStorage.getItem('portfolio-lang');
  if (savedLang === 'es' || savedLang === 'en') {
    setLang(savedLang);
  } else {
    const browserLang = navigator.language || navigator.userLanguage || 'es';
    setLang(browserLang.startsWith('en') ? 'en' : 'es');
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
