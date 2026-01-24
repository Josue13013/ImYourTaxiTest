/* ===================================
   SOYTUTAXI - Main JavaScript
   GSAP Animations + i18n
   ================================== */

// ============ TRANSLATIONS (i18n) ============
const translations = {
  es: {
    // Navigation
    nav_welcome: "Bienvenido",
    nav_vehicles: "Vehículos",
    nav_contact: "Contacto",
    nav_visit: "Qué Visitar",

    // Hero
    hero_subtitle: "Bienvenido",
    hero_title_1: "SOY TU",
    hero_title_2: "TAXI",
    hero_tagline: "Traslados A Los Aeropuertos",
    hero_cta: "Reservar Ahora",
    hero_scroll: "Scroll",

    // Services
    services_subtitle: "Nuestros Servicios",
    services_title: "Traslados y Tours en Buenos Aires",
    service_airport_title: "Aeropuertos",
    service_airport_text: "Traslados seguros y puntuales a Ezeiza y Aeroparque Jorge Newbery.",
    service_tours_title: "Tours por Buenos Aires",
    service_tours_text: "Conoce los lugares más emblemáticos de la ciudad con nuestros tours personalizados.",
    service_taxibus_title: "Taxibus",
    service_taxibus_text: "Servicio para grupos de hasta 15 pasajeros con espacio para equipaje.",

    // Pricing
    pricing_subtitle: "Tarifas",
    pricing_title: "Precios Transparentes",
    pricing_route: "Traslado",
    pricing_ezeiza: "Aeropuerto Ezeiza → CABA",
    pricing_aeroparque: "Aeroparque → CABA",
    pricing_details: "Hasta 4 pasajeros y 6 maletas",
    pricing_cta: "Reservar",

    // Mobile
    mobile_subtitle: "Reserva Fácil",
    mobile_title: "Reserva Tu Taxi Desde El Móvil",
    mobile_text: "Estés donde estés, a cualquier hora del día, tienes a tu alcance nuestra web adaptada a smartphones para que puedas pedir tu taxi de forma rápida y fácil.",

    // Taxibus
    taxibus_title: "Taxibus: Grupos Grandes",
    taxibus_text: "Solicite su cotización para servicios de 15 pasajeros con 15 maletas.",
    taxibus_cta: "Solicitar Cotización",

    // Vehicles
    vehicles_subtitle: "Nuestra Flota",
    vehicles_title: "Siempre Hacemos Feliz A Nuestros Clientes",
    vehicles_text: "Proporcionando tantas opciones como sea posible.",

    // Contact
    contact_subtitle: "Contacto",
    contact_title: "¿Tienes Preguntas?",
    contact_name: "Nombre",
    contact_email: "Email",
    contact_message: "Mensaje",
    contact_required: "* requerido",
    contact_submit: "Enviar",
    contact_info_title: "Información de Contacto",

    // What to Visit
    visit_subtitle: "Recomendaciones",
    visit_title: "Nuestras Recomendaciones Gastronómicas en CABA",

    // Footer
    footer_links: "Enlaces",
    footer_contact: "Contacto",
    footer_share: "Compartir en",
    footer_ssl: "Desarrollado con ❤️ por Josue Chura",
    footer_powered: "Powered by",

    // Language
    lang_es: "Español",
    lang_en: "English",
    lang_zh: "中文"
  },

  en: {
    // Navigation
    nav_welcome: "Welcome",
    nav_vehicles: "Vehicles",
    nav_contact: "Contact",
    nav_visit: "What to Visit",

    // Hero
    hero_subtitle: "Welcome",
    hero_title_1: "I AM YOUR",
    hero_title_2: "TAXI",
    hero_tagline: "Airport Transfers",
    hero_cta: "Book Now",
    hero_scroll: "Scroll",

    // Services
    services_subtitle: "Our Services",
    services_title: "Transfers and Tours in Buenos Aires",
    service_airport_title: "Airports",
    service_airport_text: "Safe and punctual transfers to Ezeiza and Aeroparque Jorge Newbery.",
    service_tours_title: "Buenos Aires Tours",
    service_tours_text: "Discover the most iconic places in the city with our personalized tours.",
    service_taxibus_title: "Taxibus",
    service_taxibus_text: "Service for groups up to 15 passengers with luggage space.",

    // Pricing
    pricing_subtitle: "Rates",
    pricing_title: "Transparent Pricing",
    pricing_route: "Transfer",
    pricing_ezeiza: "Ezeiza Airport → CABA",
    pricing_aeroparque: "Aeroparque → CABA",
    pricing_details: "Up to 4 passengers and 6 suitcases",
    pricing_cta: "Book",

    // Mobile
    mobile_subtitle: "Easy Booking",
    mobile_title: "Book Your Taxi From Your Phone",
    mobile_text: "Wherever you are, at any time of day, our mobile-friendly website allows you to book your taxi quickly and easily.",

    // Taxibus
    taxibus_title: "Taxibus: Large Groups",
    taxibus_text: "Request a quote for services of 15 passengers with 15 suitcases.",
    taxibus_cta: "Request Quote",

    // Vehicles
    vehicles_subtitle: "Our Fleet",
    vehicles_title: "We Always Make Our Clients Happy",
    vehicles_text: "Providing as many options as possible.",

    // Contact
    contact_subtitle: "Contact",
    contact_title: "Have Questions?",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_required: "* required",
    contact_submit: "Send",
    contact_info_title: "Contact Information",

    // What to Visit
    visit_subtitle: "Recommendations",
    visit_title: "Our Gastronomic Recommendations in CABA",

    // Footer
    footer_links: "Links",
    footer_contact: "Contact",
    footer_share: "Share on",
    footer_ssl: "Developed with ❤️ by Josue Chura",
    footer_powered: "Powered by",

    // Language
    lang_es: "Español",
    lang_en: "English",
    lang_zh: "中文"
  },

  zh: {
    // Navigation
    nav_welcome: "欢迎",
    nav_vehicles: "车辆",
    nav_contact: "联系我们",
    nav_visit: "景点推荐",

    // Hero
    hero_subtitle: "欢迎",
    hero_title_1: "我是你的",
    hero_title_2: "出租车",
    hero_tagline: "机场接送服务",
    hero_cta: "立即预订",
    hero_scroll: "滚动",

    // Services
    services_subtitle: "我们的服务",
    services_title: "布宜诺斯艾利斯接送和旅游",
    service_airport_title: "机场接送",
    service_airport_text: "安全准时的埃塞萨和豪尔赫纽伯里机场接送服务。",
    service_tours_title: "布宜诺斯艾利斯旅游",
    service_tours_text: "通过我们的个性化旅游了解城市最具标志性的地方。",
    service_taxibus_title: "出租巴士",
    service_taxibus_text: "可容纳15名乘客的团体服务，配有行李空间。",

    // Pricing
    pricing_subtitle: "价格",
    pricing_title: "透明定价",
    pricing_route: "接送",
    pricing_ezeiza: "埃塞萨机场 → 市区",
    pricing_aeroparque: "城市机场 → 市区",
    pricing_details: "最多4名乘客和6件行李",
    pricing_cta: "预订",

    // Mobile
    mobile_subtitle: "便捷预订",
    mobile_title: "从手机预订您的出租车",
    mobile_text: "无论您身在何处，随时随地，我们的移动友好网站让您快速轻松地预订出租车。",

    // Taxibus
    taxibus_title: "出租巴士：大型团体",
    taxibus_text: "为15名乘客和15件行李的服务请求报价。",
    taxibus_cta: "请求报价",

    // Vehicles
    vehicles_subtitle: "我们的车队",
    vehicles_title: "我们始终让客户满意",
    vehicles_text: "提供尽可能多的选择。",

    // Contact
    contact_subtitle: "联系方式",
    contact_title: "有问题吗？",
    contact_name: "姓名",
    contact_email: "电子邮件",
    contact_message: "留言",
    contact_required: "* 必填",
    contact_submit: "发送",
    contact_info_title: "联系信息",

    // What to Visit
    visit_subtitle: "推荐",
    visit_title: "我们在布宜诺斯艾利斯的美食推荐",

    // Footer
    footer_links: "链接",
    footer_contact: "联系方式",
    footer_share: "分享到",
    footer_ssl: "由 Josue Chura 用心开发 ❤️",
    footer_powered: "技术支持",

    // Language
    lang_es: "Español",
    lang_en: "English",
    lang_zh: "中文"
  }
};

// Language names for selector
const languageNames = {
  es: "Español",
  en: "English",
  zh: "中文"
};

// Current language
let currentLang = localStorage.getItem('soytutaxi-lang') || 'es';

// ============ i18n FUNCTIONS ============

function setLanguage(lang) {
  if (!translations[lang]) return;

  currentLang = lang;
  localStorage.setItem('soytutaxi-lang', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
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
