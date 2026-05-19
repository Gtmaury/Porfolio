let lang = 'es';

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('portfolio-lang', lang);
  document.getElementById('lang-btn').textContent = lang === 'es' ? '🌐 EN' : '🌐 ES';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach(el => {
    const target = el.getAttribute('data-' + lang);
    if (target) el.textContent = target;
  });
}

function toggleLang() {
  setLang(lang === 'es' ? 'en' : 'es');
}

// Initialization logic
(function initLang() {
  // 1. Check localStorage
  const savedLang = localStorage.getItem('portfolio-lang');
  if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
    setLang(savedLang);
  } else {
    // 2. Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      setLang('en');
    } else {
      setLang('es'); // Default to Spanish if not English
    }
  }
})();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
