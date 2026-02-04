/* ===================================
   SOYTUTAXI - Main JavaScript
   GSAP Animations + i18n
   ================================== */

// ============ TRANSLATIONS (i18n) - Dynamic JSON Loading ============

// Cache for loaded translations
let translations = {};

// Language names for selector
const languageNames = {
  en: "English",
  es: "Español",
  ru: "Русский",
  zh: "中文",
  pt: "Português",
  de: "Deutsch",
  fr: "Français"
};

// Default language is English
const DEFAULT_LANG = 'en';

// Current language
let currentLang = localStorage.getItem('soytutaxi-lang') || DEFAULT_LANG;

// ============ i18n FUNCTIONS ============

/**
 * Load translations from JSON file
 * @param {string} lang - Language code (en, es, ru, zh, pt, de, fr)
 * @returns {Promise<Object>} - Translations object
 */
async function loadTranslations(lang) {
  // Return from cache if already loaded
  if (translations[lang]) {
    return translations[lang];
  }

  try {
    const response = await fetch(`locales/${lang}.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    translations[lang] = data;
    return data;

  } catch (error) {
    console.error(`Error loading ${lang} translations:`, error);

    // Fallback to English if not already trying English
    if (lang !== DEFAULT_LANG) {
      console.warn(`Falling back to ${DEFAULT_LANG} translations`);
      return loadTranslations(DEFAULT_LANG);
    }

    // If English also fails, return empty object
    return {};
  }
}

/**
 * Update all page elements with new language
 * @param {string} lang - Language code
 */
async function setLanguage(lang) {
  // Load translations for this language
  const langData = await loadTranslations(lang);

  if (!langData || Object.keys(langData).length === 0) {
    console.error(`No translations available for ${lang}`);
    return;
  }

  currentLang = lang;
  localStorage.setItem('soytutaxi-lang', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      el.textContent = langData[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (langData[key]) {
      el.placeholder = langData[key];
    }
  });

  // Update current language display
  const langBtn = document.querySelector('.lang-selector__current');
  if (langBtn) {
    langBtn.textContent = languageNames[lang];
  }

  // Update active state in dropdown
  document.querySelectorAll('.lang-selector__option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Fire custom event for other scripts
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
}

/**
 * Initialize language selector
 */
function initLanguageSelector() {
  const selector = document.querySelector('.lang-selector');
  if (!selector) return;

  const btn = selector.querySelector('.lang-selector__btn');
  const dropdown = selector.querySelector('.lang-selector__dropdown');

  // Toggle dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    selector.classList.toggle('open');
  });

  // Select language
  dropdown.querySelectorAll('.lang-selector__option').forEach(opt => {
    opt.addEventListener('click', () => {
      setLanguage(opt.dataset.lang);
      selector.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', () => {
    selector.classList.remove('open');
  });

  // Set initial language
  setLanguage(currentLang);
}

// ============ GSAP SETUP ============

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ============ NAVIGATION ============

function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  // Scroll effect on nav
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Mobile menu toggle
  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close menu on link click
    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }
}

// ============ HERO ANIMATIONS ============

function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Animate hero elements
  tl.from('.hero__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8
  })
    .from('.hero__title span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    }, '-=0.4')
    .from('.hero__tagline', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from('.hero__cta', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.3')
    .from('.hero__scroll', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.2');

  // Parallax effect on hero background
  gsap.to('.hero__bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

// ============ SECTION ANIMATIONS ============

function initSectionAnimations() {
  // Animate section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    const children = header.children;
    // Set initial state
    gsap.set(children, { opacity: 1, y: 0 });

    gsap.fromTo(children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Animate cards with stagger
  gsap.utils.toArray('.services-grid, .pricing-grid').forEach(grid => {
    const cards = grid.children;
    // Ensure cards are visible by default
    gsap.set(cards, { opacity: 1, y: 0 });

    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ============ COUNTER ANIMATION ============

function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.counter, 10);

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const progress = this.progress();
            counter.textContent = Math.round(progress * target).toLocaleString('es-AR');
          }
        });
      },
      once: true
    });
  });
}

// ============ GALLERY ANIMATIONS ============

function initGalleryAnimations() {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery) return;

  const items = document.querySelectorAll('.gallery-item');
  gsap.set(items, { opacity: 1, scale: 1 });

  gsap.fromTo(items,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        grid: 'auto',
        from: 'start'
      },
      scrollTrigger: {
        trigger: gallery,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
}

// ============ RECOMMENDATION ANIMATIONS ============

function initRecommendationAnimations() {
  gsap.utils.toArray('.recommendation-card').forEach((card, i) => {
    const direction = i % 2 === 0 ? -100 : 100;

    gsap.set(card, { opacity: 1, x: 0 });

    gsap.fromTo(card,
      { x: direction, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ============ FOOTER ANIMATIONS ============

function initFooterAnimations() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const footerItems = document.querySelectorAll('.footer-grid > div');
  gsap.set(footerItems, { opacity: 1, y: 0 });

  gsap.fromTo(footerItems,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );
}

// ============ FORM ANIMATIONS ============

function initFormAnimations() {
  const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ============ MOBILE OPTIMIZATIONS ============

function initMobileOptimizations() {
  // Use matchMedia for responsive animations
  ScrollTrigger.matchMedia({
    // Desktop
    "(min-width: 992px)": function () {
      // Full animations on desktop
    },

    // Mobile
    "(max-width: 991px)": function () {
      // Reduce parallax on mobile for performance
      gsap.set('.hero__bg', { clearProps: 'all' });
    }
  });
}

// ============ WHATSAPP BUTTON ============

function initWhatsAppButton() {
  const btn = document.querySelector('.whatsapp-btn');
  if (!btn) return;

  // Show after scroll
  gsap.set(btn, { scale: 0, opacity: 0 });

  ScrollTrigger.create({
    start: 'top -200',
    onEnter: () => {
      gsap.to(btn, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    },
    onLeaveBack: () => {
      gsap.to(btn, {
        scale: 0,
        opacity: 0,
        duration: 0.3
      });
    }
  });
}

// ============ SMOOTH SCROLL ============

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut'
        });
      }
    });
  });
}

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
  // Init language selector
  initLanguageSelector();

  // Init navigation
  initNavigation();

  // Init all animations
  initHeroAnimations();
  initSectionAnimations();
  initCounterAnimations();
  initGalleryAnimations();
  initRecommendationAnimations();
  initFooterAnimations();
  initFormAnimations();
  initWhatsAppButton();

  // Mobile optimizations
  initMobileOptimizations();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
