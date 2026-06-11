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

// ── NAVIGATION SCROLL EFFECT & PROGRESS BAR ──
const nav = document.querySelector('nav');
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  // Toggle nav scrolled class
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Update scroll progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollBar) {
    scrollBar.style.width = scrollPercent + '%';
  }
});

// ── CUSTOM CURSOR GLOW ──
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = 1;
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = 0;
  });
}

// ── ANIMATE SKILL PROGRESS BARS ON SCROLL ──
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = el.getAttribute('data-width');
      el.style.width = width;
      progressObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.progress-fill').forEach(el => progressObserver.observe(el));

// ── CUSTOM SMOOTH SCROLL FOR ANCHOR LINKS ──
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetSelector, duration = 850) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const navEl = document.querySelector('nav');
  const navHeight = navEl ? navEl.offsetHeight : 80;
  
  // Calculate offset top position
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
    window.scrollTo(0, startPosition + distance * run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Intercept all internal anchor clicks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (!targetId) return;
    
    e.preventDefault();
    if (targetId === '#') {
      smoothScrollTo('html', 800);
    } else {
      smoothScrollTo(targetId, 800);
    }
  });
});
