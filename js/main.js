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

// Make entire project cards clickable
document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const link = card.querySelector('.project-link');
    if (link) link.click();
  });
});

// ══════════════════════════════════════════════
// LAYERED PAGE SYSTEM
// Page stays fixed. Wheel changes content.
// Previous content blurs into background.
// ══════════════════════════════════════════════

(function initLayeredPage() {
  // Grab each section + footer and wrap them in layer divs
  const sectionSelectors = [
    'section.hero',
    'section#proyectos',
    'section#habilidades',
    'section#contacto'
  ];

  const layers = [];

  sectionSelectors.forEach((sel, i) => {
    const section = document.querySelector(sel);
    if (!section) return;

    // Create a wrapper div that will be our fixed layer
    const layer = document.createElement('div');
    layer.className = 'page-layer';
    layer.dataset.index = i;

    // Insert the layer before the section, then move section inside
    section.parentNode.insertBefore(layer, section);
    layer.appendChild(section);

    layers.push(layer);
  });

  let currentLayer = 0;
  let isTransitioning = false;

  function goToLayer(index, fromNav = false) {
    if (index < 0 || index >= layers.length || index === currentLayer || isTransitioning) return;
    isTransitioning = true;

    const oldLayer = layers[currentLayer];
    const newLayer = layers[index];

    // Remove all states from all layers
    layers.forEach(l => {
      l.classList.remove('active', 'behind');
    });

    // Old layer goes behind (blurs and darkens)
    oldLayer.classList.add('behind');

    // New layer becomes active (sharp and visible)
    newLayer.classList.add('active');
    
    if (fromNav || index > currentLayer) {
      newLayer.scrollTop = 0; // Start at top
    } else {
      newLayer.scrollTop = newLayer.scrollHeight; // Start at bottom when scrolling up
    }

    currentLayer = index;

    // Update nav
    if (currentLayer > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Update progress bar
    if (scrollBar) {
      scrollBar.style.width = ((currentLayer / (layers.length - 1)) * 100) + '%';
    }

    setTimeout(() => {
      isTransitioning = false;
    }, 700);
  }

  // Initialize: first layer is active
  if (layers.length > 0) {
    layers[0].classList.add('active');
  }

  // Handle navigation arrows
  document.querySelectorAll('.nav-arrow').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      e.stopPropagation();
      if (arrow.classList.contains('up')) {
        goToLayer(currentLayer - 1, true);
      } else if (arrow.classList.contains('down')) {
        goToLayer(currentLayer + 1, true);
      }
    });
  });

  // ── WHEEL EVENT ──
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isTransitioning) return;

    const activeLayer = layers[currentLayer];
    const section = activeLayer.querySelector('section, footer');

    // Check if the active layer has significant internal scrollable content
    const canScrollInside = activeLayer.scrollHeight > activeLayer.clientHeight + 50;
    const atTop = activeLayer.scrollTop <= 5;
    const atBottom = activeLayer.scrollTop + activeLayer.clientHeight >= activeLayer.scrollHeight - 5;

    if (e.deltaY > 0) {
      // Scrolling DOWN
      if (canScrollInside && !atBottom) {
        // Let internal scroll happen
        activeLayer.scrollTop += Math.min(e.deltaY, 100);
      } else {
        // Go to next layer
        goToLayer(currentLayer + 1);
      }
    } else {
      // Scrolling UP
      if (canScrollInside && !atTop) {
        // Let internal scroll happen
        activeLayer.scrollTop += Math.max(e.deltaY, -100);
      } else {
        // Go to previous layer
        goToLayer(currentLayer - 1);
      }
    }
  }, { passive: false });

  // ── TOUCH SUPPORT ──
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isTransitioning) return;
    const diff = touchStartY - e.changedTouches[0].clientY;
    
    if (Math.abs(diff) > 50) {
      const activeLayer = layers[currentLayer];
      const canScrollInside = activeLayer.scrollHeight > activeLayer.clientHeight + 50;
      const atTop = activeLayer.scrollTop <= 5;
      const atBottom = activeLayer.scrollTop + activeLayer.clientHeight >= activeLayer.scrollHeight - 5;

      if (diff > 0) {
        // Swiping up (scrolling down)
        if (canScrollInside && !atBottom) return; // Let native scroll happen
        goToLayer(currentLayer + 1);
      } else {
        // Swiping down (scrolling up)
        if (canScrollInside && !atTop) return; // Let native scroll happen
        goToLayer(currentLayer - 1);
      }
    }
  });

  // ── NAV LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId) return;
      e.preventDefault();

      if (targetId === '#' || targetId === '#hero') goToLayer(0, true);
      else if (targetId === '#proyectos') goToLayer(1, true);
      else if (targetId === '#habilidades') goToLayer(2, true);
      else if (targetId === '#contacto') goToLayer(3, true);
    });
  });

  // ── KEYBOARD SUPPORT ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goToLayer(currentLayer + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goToLayer(currentLayer - 1);
    }
  });
})();
