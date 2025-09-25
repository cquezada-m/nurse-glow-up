// GTM Data Layer initialization
window.dataLayer = window.dataLayer || [];

// GTM Event tracking function
function gtmTrack(eventName, eventData = {}) {
  window.dataLayer.push({
    event: eventName,
    ...eventData,
  });
}

// Clear form-related localStorage on page load
function clearFormStorage() {
  try {
    // Clear WhatsApp form data
    sessionStorage.removeItem("whatsappFormData");
    localStorage.removeItem("whatsappFormData");

    // Clear any other form-related storage
    const keysToRemove = [];

    // Check sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (
        key &&
        (key.includes("form") ||
          key.includes("Form") ||
          key.includes("lead") ||
          key.includes("Lead"))
      ) {
        keysToRemove.push({ storage: "session", key: key });
      }
    }

    // Check localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.includes("form") ||
          key.includes("Form") ||
          key.includes("lead") ||
          key.includes("Lead"))
      ) {
        keysToRemove.push({ storage: "local", key: key });
      }
    }

    // Remove identified keys
    keysToRemove.forEach((item) => {
      if (item.storage === "session") {
        sessionStorage.removeItem(item.key);
      } else {
        localStorage.removeItem(item.key);
      }
    });
  } catch (e) {
    // Error silencioso
  }
}

// Execute on page load
clearFormStorage();

// Intersection Observer for view events and animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;

      // GTM Tracking
      const eventName = element.getAttribute("data-gtm-event");
      if (eventName) {
        gtmTrack(eventName, {
          section: element.tagName.toLowerCase(),
          timestamp: new Date().toISOString(),
        });
        observer.unobserve(element); // Only track once
      }

      // Animate elements
      animateOnScroll(element);
    }
  });
}, observerOptions);

// Animation on scroll function
function animateOnScroll(element) {
  // Animate benefit items
  if (element.classList.contains("benefits")) {
    const benefitItems = element.querySelectorAll(".benefit-item");
    benefitItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
        item.style.transition = "all 0.6s ease-out";
      }, index * 150);
    });
  }

  // Animate service cards
  if (element.classList.contains("services")) {
    const serviceCards = element.querySelectorAll(".service-card");
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.transition = "all 0.6s ease-out";
      }, index * 100);
    });
  }

  // Animate testimonials (skip if will become carousel)
  if (element.classList.contains("testimonials")) {
    const testimonials = element.querySelectorAll(".testimonial");
    if (testimonials.length <= 1) {
      // Only animate if not enough for carousel
      testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = "0";
        testimonial.style.transform = "translateY(30px)";

        setTimeout(() => {
          testimonial.style.opacity = "1";
          testimonial.style.transform = "translateY(0)";
          testimonial.style.transition = "all 0.6s ease-out";
        }, index * 150);
      });
    }
  }

  // Animate form
  if (element.classList.contains("lead-form")) {
    const form = element.querySelector("#leadForm");
    if (form) {
      form.style.opacity = "1";
      form.style.transform = "translateY(0)";
      form.style.transition = "all 0.8s ease-out";
    }
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize view tracking for sections
  const sectionsToTrack = document.querySelectorAll(
    '[data-gtm-event^="view_"]'
  );
  sectionsToTrack.forEach((section) => {
    observer.observe(section);
  });

  // CTA Click tracking
  const ctaButtons = document.querySelectorAll('[data-gtm-event^="click_"]');
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const eventName = this.getAttribute("data-gtm-event");
      const ctaType = this.getAttribute("data-gtm-cta") || "unknown";
      const location = this.getAttribute("data-gtm-location") || "page";

      gtmTrack(eventName, {
        cta_type: ctaType,
        cta_location: location,
        cta_text: this.textContent.trim(),
        timestamp: new Date().toISOString(),
      });
    });
  });

  // Service card clicks (detailed services)
  const serviceButtons = document.querySelectorAll(
    '[data-gtm-event^="click_service_"]'
  );
  serviceButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const eventName = this.getAttribute("data-gtm-event");
      const serviceType = eventName.replace("click_service_", "");

      // Get service name from the card
      const serviceCard = this.closest(".service-detailed-card");
      const serviceName = serviceCard
        ? serviceCard.querySelector("h3").textContent
        : "unknown";

      gtmTrack(eventName, {
        service_type: serviceType,
        service_name: serviceName,
        timestamp: new Date().toISOString(),
      });

      // Scroll to contact form
      const contactForm = document.getElementById("contacto");
      if (contactForm) {
        const headerOffset = 80;
        const elementPosition = contactForm.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Pre-fill form with selected service
        setTimeout(() => {
          const serviceSelect = document.getElementById("servicio");
          if (serviceSelect) {
            serviceSelect.value = serviceType;

            // Disparar eventos para actualizar estado
            serviceSelect.dispatchEvent(new Event("input", { bubbles: true }));
            serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));

            // Guardar inmediatamente en sessionStorage
            const currentData = getFormData();

            // Add visual feedback
            serviceSelect.style.borderColor = "#D946EF";
            serviceSelect.style.boxShadow = "0 0 0 3px rgba(217, 70, 239, 0.1)";
            setTimeout(() => {
              serviceSelect.style.borderColor = "";
              serviceSelect.style.boxShadow = "";
            }, 2000);

            // Actualizar estado del botón WhatsApp
            updateWhatsAppButtonState();

            // Mostrar tooltip de WhatsApp
            showWhatsAppTooltip(
              "¡Servicio seleccionado! Haz clic aquí para WhatsApp o completa más datos"
            );
          }
        }, 500);
      }
    });
  });

  // WhatsApp clicks
  const whatsappLinks = document.querySelectorAll(
    'a[href*="wa.me"], a[href*="whatsapp"]'
  );
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const location = this.getAttribute("data-gtm-location") || "unknown";
      gtmTrack("click_whatsapp", {
        whatsapp_location: location,
        timestamp: new Date().toISOString(),
      });
    });
  });

  // ===== NUEVO SISTEMA DE FORMULARIO MULTI-STEP =====
  initNewFormSystem();

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");

        gtmTrack("click_faq", {
          faq_question: this.textContent.trim(),
          timestamp: new Date().toISOString(),
        });
      }
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate offset for fixed header if exists
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        gtmTrack("click_anchor", {
          target_section: targetId,
          timestamp: new Date().toISOString(),
        });
      }
    });
  });

  // Offer banner clicks
  const offerElements = document.querySelectorAll(
    '[data-gtm-event="click_offer"]'
  );
  offerElements.forEach((element) => {
    element.addEventListener("click", function () {
      gtmTrack("click_offer", {
        offer_type: "september_promo",
        offer_text: this.textContent.trim(),
        timestamp: new Date().toISOString(),
      });
    });
  });

  // Scroll progress tracking
  let scrollTracked = {
    25: false,
    50: false,
    75: false,
    100: false,
  };

  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      Object.keys(scrollTracked).forEach((threshold) => {
        if (scrollPercent >= threshold && !scrollTracked[threshold]) {
          scrollTracked[threshold] = true;
          gtmTrack("scroll_progress", {
            scroll_percentage: threshold,
            timestamp: new Date().toISOString(),
          });
        }
      });
    }, 1000)
  );

  // Page visibility tracking
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      gtmTrack("page_hidden", {
        timestamp: new Date().toISOString(),
      });
    } else {
      gtmTrack("page_visible", {
        timestamp: new Date().toISOString(),
      });
    }
  });

  // Exit intent (desktop only)
  if (window.innerWidth > 768) {
    document.addEventListener("mouseleave", function (e) {
      if (e.clientY <= 0) {
        gtmTrack("exit_intent", {
          timestamp: new Date().toISOString(),
        });

        // Optional: Show exit intent popup
        // showExitIntentPopup();
      }
    });
  }

  // Performance tracking
  window.addEventListener("load", function () {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      if (perfData) {
        gtmTrack("page_performance", {
          load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          dom_content_loaded: Math.round(
            perfData.domContentLoadedEventEnd - perfData.fetchStart
          ),
          first_paint: Math.round(
            performance.getEntriesByType("paint")[0]?.startTime || 0
          ),
          timestamp: new Date().toISOString(),
        });
      }
    }, 1000);
  });
});

// Utility functions
function showFormMessage(message, type) {
  const successDiv = document.getElementById("form-success");
  const errorDiv = document.getElementById("form-error");

  // Hide both messages first
  successDiv.style.display = "none";
  errorDiv.style.display = "none";

  // Show appropriate message
  if (type === "success") {
    successDiv.textContent = message;
    successDiv.style.display = "block";
  } else {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }

  // Auto-hide after 5 seconds
  setTimeout(() => {
    successDiv.style.display = "none";
    errorDiv.style.display = "none";
  }, 5000);
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Initialize page view tracking
gtmTrack("page_view", {
  page_title: document.title,
  page_url: window.location.href,
  user_agent: navigator.userAgent,
  screen_resolution: `${screen.width}x${screen.height}`,
  viewport_size: `${window.innerWidth}x${window.innerHeight}`,
  timestamp: new Date().toISOString(),
});

// Track initial hero view
setTimeout(() => {
  gtmTrack("view_hero", {
    hero_variant: "A", // For A/B testing
    timestamp: new Date().toISOString(),
  });
}, 1000);

// Typewriter Effect
function initTypewriter() {
  const typewriterElement = document.querySelector(".typewriter-word");
  if (!typewriterElement) return;

  const words = typewriterElement.getAttribute("data-words").split(",");
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typeSpeed = 120;
  let deleteSpeed = 80;
  let pauseTime = 2500;

  // Fix height to prevent layout shift
  function fixTypewriterHeight() {
    // Find the longest word to calculate maximum height needed
    let longestWord = "";
    words.forEach((word) => {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    });

    // Temporarily set the longest word to measure height
    const originalContent = typewriterElement.textContent;
    typewriterElement.textContent = longestWord;

    // Get the computed height
    const height = typewriterElement.offsetHeight;

    // Set fixed height to prevent layout shifts
    typewriterElement.style.height = height + "px";
    typewriterElement.style.minHeight = height + "px";
    typewriterElement.style.display = "block";

    // Restore original content
    typewriterElement.textContent = originalContent;
  }

  function type() {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting characters
      const newText = currentWord.substring(0, currentCharIndex - 1);

      if (newText === "") {
        // Use a zero-width space to maintain height when empty
        typewriterElement.innerHTML = "&#8203;"; // Zero-width space
      } else {
        typewriterElement.textContent = newText;
      }

      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        setTimeout(type, 300); // Shorter pause when transitioning
        return;
      }

      setTimeout(type, deleteSpeed);
    } else {
      // Typing characters
      typewriterElement.textContent = currentWord.substring(
        0,
        currentCharIndex + 1
      );
      currentCharIndex++;

      if (currentCharIndex === currentWord.length) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseTime);
        return;
      }

      setTimeout(type, typeSpeed);
    }
  }

  // Initialize with first word and fix height
  typewriterElement.textContent = words[0];

  // Fix height after DOM is fully rendered
  setTimeout(() => {
    fixTypewriterHeight();

    // Reset and start the typewriter effect
    typewriterElement.textContent = "";
    typewriterElement.innerHTML = "&#8203;"; // Start with zero-width space
    currentCharIndex = 0;

    setTimeout(() => {
      typewriterElement.classList.add("typing");
      type();
    }, 500);
  }, 100);
}

// Initialize typewriter when DOM is loaded
document.addEventListener("DOMContentLoaded", initTypewriter);

// Spots Counter Animation
function initSpotsCounter() {
  const spotsNumber = document.querySelector(".spots-number");
  if (!spotsNumber) return;

  const targetNumber = parseInt(spotsNumber.textContent);
  let currentNumber = targetNumber + 3; // Start from a higher number

  const countDown = () => {
    if (currentNumber > targetNumber) {
      spotsNumber.textContent = currentNumber;
      currentNumber--;
      setTimeout(countDown, 2000); // Update every 2 seconds
    }
  };

  // Start countdown after 3 seconds
  setTimeout(countDown, 3000);
}

// Initialize spots counter when DOM is loaded
document.addEventListener("DOMContentLoaded", initSpotsCounter);

// 1. FADE-IN ANIMATIONS ON SCROLL
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in-up");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });
}

// 2. URGENCY TIMER
function initUrgencyTimer() {
  const timerElement = document.getElementById("timer");
  if (!timerElement) return;

  // Set timer to 24 hours from now
  const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft > 0) {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      timerElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      timerElement.textContent = "00:00:00";
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// 3. SPOTS COUNTER DYNAMIC - REALISTIC WEEKLY LOGIC
function initDynamicSpotsCounter() {
  const spotsCounter = document.getElementById("spots-counter");
  if (!spotsCounter) return;

  // LocalStorage keys para persistencia
  const SPOTS_STORAGE_KEY = "nurseGlowUp_weeklySpots";
  const WEEK_START_KEY = "nurseGlowUp_weekStart";

  // Configuración realista para centro nuevo
  const WEEKLY_CONFIG = {
    // Cupos disponibles por día (centro nuevo, horarios limitados)
    monday: { total: 12, peak: [14, 16, 18] }, // Lunes moderado
    tuesday: { total: 15, peak: [15, 17, 19] }, // Martes mejor
    wednesday: { total: 18, peak: [14, 16, 18] }, // Miércoles popular
    thursday: { total: 16, peak: [15, 17, 19] }, // Jueves bueno
    friday: { total: 20, peak: [16, 18, 20] }, // Viernes peak
    saturday: { total: 14, peak: [10, 12, 14] }, // Sábado mañana
    sunday: { total: 0, peak: [] }, // Cerrado domingos
  };

  function getCurrentWeekStart() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = domingo, 1 = lunes
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday.getTime();
  }

  function getDayName(date = new Date()) {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[date.getDay()];
  }

  function getStoredWeeklyData() {
    try {
      const stored = localStorage.getItem(SPOTS_STORAGE_KEY);
      const weekStart = localStorage.getItem(WEEK_START_KEY);
      const currentWeekStart = getCurrentWeekStart();

      // Si es una nueva semana, resetear datos
      if (!weekStart || parseInt(weekStart) !== currentWeekStart) {
        return null;
      }

      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function initializeWeeklySpots() {
    const weeklySpots = {};
    const currentWeekStart = getCurrentWeekStart();

    Object.keys(WEEKLY_CONFIG).forEach((day) => {
      const config = WEEKLY_CONFIG[day];
      // Simular reservas ya hechas (20-40% del total)
      const reservedSpots = Math.floor(
        config.total * (0.2 + Math.random() * 0.2)
      );
      weeklySpots[day] = Math.max(0, config.total - reservedSpots);
    });

    // Guardar en localStorage
    try {
      localStorage.setItem(SPOTS_STORAGE_KEY, JSON.stringify(weeklySpots));
      localStorage.setItem(WEEK_START_KEY, currentWeekStart.toString());
    } catch (e) {
      // Silently fail if localStorage is not available
    }

    return weeklySpots;
  }

  function getCurrentDaySpots() {
    const today = getDayName();
    let weeklySpots = getStoredWeeklyData();

    if (!weeklySpots) {
      weeklySpots = initializeWeeklySpots();
    }

    return weeklySpots[today] || 0;
  }

  function updateDaySpots(newCount) {
    const today = getDayName();
    let weeklySpots = getStoredWeeklyData() || initializeWeeklySpots();

    weeklySpots[today] = Math.max(0, newCount);

    try {
      localStorage.setItem(SPOTS_STORAGE_KEY, JSON.stringify(weeklySpots));
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  function getRealisticDecreaseInterval() {
    const now = new Date();
    const hour = now.getHours();
    const today = getDayName();
    const config = WEEKLY_CONFIG[today];

    if (!config || config.total === 0) {
      return 30 * 60 * 1000; // 30 minutos si está cerrado
    }

    // Horarios peak (más actividad)
    const isPeakHour = config.peak.some(
      (peakHour) => Math.abs(hour - peakHour) <= 1
    );

    if (isPeakHour) {
      // En horarios peak: 2-5 minutos
      return (Math.random() * 3 + 2) * 60 * 1000;
    } else if (hour >= 9 && hour <= 19) {
      // Horario normal: 5-12 minutos
      return (Math.random() * 7 + 5) * 60 * 1000;
    } else {
      // Fuera de horario: 15-30 minutos
      return (Math.random() * 15 + 15) * 60 * 1000;
    }
  }

  // Inicializar contador con datos reales
  let currentSpots = getCurrentDaySpots();
  spotsCounter.textContent = currentSpots;

  function decreaseSpots() {
    const today = getDayName();
    const config = WEEKLY_CONFIG[today];

    // No decrementar si está cerrado o ya no hay cupos
    if (!config || config.total === 0 || currentSpots <= 0) {
      setTimeout(decreaseSpots, getRealisticDecreaseInterval());
      return;
    }

    // Probabilidad de decremento basada en hora y día
    const now = new Date();
    const hour = now.getHours();
    const isPeakHour = config.peak.some(
      (peakHour) => Math.abs(hour - peakHour) <= 1
    );

    let decreaseProbability = 0.3; // Base 30%

    if (isPeakHour) {
      decreaseProbability = 0.7; // 70% en peak
    } else if (hour >= 9 && hour <= 19) {
      decreaseProbability = 0.4; // 40% en horario normal
    } else {
      decreaseProbability = 0.1; // 10% fuera de horario
    }

    // Aumentar probabilidad si quedan muchos cupos
    if (currentSpots > config.total * 0.7) {
      decreaseProbability += 0.2;
    }

    if (Math.random() < decreaseProbability && currentSpots > 1) {
      currentSpots--;
      spotsCounter.textContent = currentSpots;
      updateDaySpots(currentSpots);

      // Add animation
      spotsCounter.style.transform = "scale(1.2)";
      spotsCounter.style.color = "#ff6b6b";
      setTimeout(() => {
        spotsCounter.style.transform = "scale(1)";
        spotsCounter.style.color = "";
      }, 300);

      gtmTrack("spots_decreased", {
        remaining_spots: currentSpots,
        day_of_week: today,
        hour: hour,
        is_peak_hour: isPeakHour,
        total_day_capacity: config.total,
        timestamp: new Date().toISOString(),
      });
    }

    // Schedule next check
    const nextCheck = getRealisticDecreaseInterval();
    setTimeout(decreaseSpots, nextCheck);
  }

  // Start monitoring after 1 minute
  setTimeout(decreaseSpots, 60 * 1000);

  // Track initial state
  gtmTrack("spots_counter_init", {
    initial_spots: currentSpots,
    day_of_week: getDayName(),
    total_day_capacity: WEEKLY_CONFIG[getDayName()]?.total || 0,
    timestamp: new Date().toISOString(),
  });
}

// 4. SOCIAL PROOF POPUP
function initSocialProofPopup() {
  const popup = document.getElementById("socialProof");
  if (!popup) return;

  // LocalStorage keys
  const STORAGE_KEY = "nurseGlowUp_socialProof";
  const LAST_SHOWN_KEY = "nurseGlowUp_lastShown";
  const SHOWN_COMBINATIONS_KEY = "nurseGlowUp_shownCombinations";

  const names = [
    "María José",
    "Carolina",
    "Andrea",
    "Francisca",
    "Valentina",
    "Camila",
    "Javiera",
    "Constanza",
    "Fernanda",
    "Isidora",
    "Antonia",
    "Sofía",
    "Catalina",
    "Martina",
    "Emilia",
    "Amanda",
    "Florencia",
    "Ignacia",
    "Maite",
    "Rocío",
    "Paloma",
    "Esperanza",
    "Belén",
    "Daniela",
    "Paulina",
    "Alejandra",
    "Bárbara",
    "Carla",
    "Nicole",
    "Stephanie",
    "Pamela",
    "Claudia",
    "Verónica",
    "Patricia",
    "Lorena",
    "Mónica",
    "Soledad",
    "Pilar",
    "Macarena",
    "Josefa",
    "Magdalena",
    "Rosario",
    "Trinidad",
    "Agustina",
    "Renata",
    "Dominga",
    "Amparo",
    "Esperanza",
  ];

  const locations = [
    "Las Condes",
    "Providencia",
    "Ñuñoa",
    "Santiago Centro",
    "Vitacura",
    "La Reina",
    "Lo Barnechea",
    "Peñalolén",
    "Macul",
    "San Miguel",
    "La Florida",
    "Maipú",
    "Pudahuel",
    "Huechuraba",
  ];
  const times = [
    "1 min",
    "2 min",
    "3 min",
    "4 min",
    "5 min",
    "6 min",
    "7 min",
    "8 min",
    "9 min",
    "10 min",
    "12 min",
    "15 min",
    "18 min",
    "20 min",
    "22 min",
    "25 min",
    "28 min",
    "30 min",
    "35 min",
    "40 min",
    "45 min",
    "1 hora",
    "2 horas",
    "3 horas",
    "4 horas",
    "5 horas",
    "6 horas",
    "hace un momento",
    "recién",
    "ahora mismo",
  ];

  // Funciones de localStorage
  function getShownCombinations() {
    try {
      const stored = localStorage.getItem(SHOWN_COMBINATIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveShownCombination(name, location, time) {
    try {
      const combinations = getShownCombinations();
      const combination = `${name}|${location}|${time}`;

      // Mantener solo las últimas 50 combinaciones para evitar repeticiones cercanas
      combinations.push(combination);
      if (combinations.length > 50) {
        combinations.shift();
      }

      localStorage.setItem(
        SHOWN_COMBINATIONS_KEY,
        JSON.stringify(combinations)
      );
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  function isRecentCombination(name, location, time) {
    const combinations = getShownCombinations();
    const combination = `${name}|${location}|${time}`;
    return combinations.includes(combination);
  }

  function getLastShownTime() {
    try {
      const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
      return lastShown ? parseInt(lastShown) : 0;
    } catch (e) {
      return 0;
    }
  }

  function setLastShownTime() {
    try {
      localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  function generateUniqueCombination() {
    let attempts = 0;
    let randomName, randomLocation, randomTime;

    do {
      randomName = names[Math.floor(Math.random() * names.length)];
      randomLocation = locations[Math.floor(Math.random() * locations.length)];
      randomTime = times[Math.floor(Math.random() * times.length)];
      attempts++;

      // Si después de 10 intentos no encuentra combinación única, usar cualquiera
      if (attempts > 10) break;
    } while (isRecentCombination(randomName, randomLocation, randomTime));

    return { randomName, randomLocation, randomTime };
  }

  function showSocialProof() {
    // Generar combinación única
    const { randomName, randomLocation, randomTime } =
      generateUniqueCombination();

    // Guardar combinación y timestamp
    saveShownCombination(randomName, randomLocation, randomTime);
    setLastShownTime();

    document.getElementById("popup-name").textContent = randomName;
    document.getElementById("popup-location").textContent = randomLocation;
    document.getElementById("popup-time").textContent = randomTime;

    popup.classList.add("show");

    gtmTrack("social_proof_shown", {
      name: randomName,
      location: randomLocation,
      time: randomTime,
      is_unique: true,
      timestamp: new Date().toISOString(),
    });

    // Hide after 4 seconds
    setTimeout(() => {
      popup.classList.remove("show");
    }, 4000);

    // Schedule next popup with realistic intervals (2-8 minutes)
    // Weighted random: más probable 3-5 minutos, menos probable extremos
    const weights = [0.1, 0.2, 0.3, 0.25, 0.1, 0.05]; // 2min, 3min, 4min, 5min, 6min, 7-8min
    const intervals = [2, 3, 4, 5, 6, 7.5]; // minutos

    let randomValue = Math.random();
    let selectedInterval = 4; // default 4 minutos

    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue <= cumulativeWeight) {
        selectedInterval = intervals[i];
        break;
      }
    }

    // Agregar variación adicional ±30 segundos
    const variation = (Math.random() - 0.5) * 1; // ±0.5 minutos
    const finalInterval = (selectedInterval + variation) * 60 * 1000; // convertir a ms

    setTimeout(showSocialProof, finalInterval);

    // Track interval para analytics
    gtmTrack("social_proof_interval", {
      interval_minutes: Math.round((finalInterval / 1000 / 60) * 10) / 10,
      timestamp: new Date().toISOString(),
    });
  }

  // Calcular delay inicial considerando localStorage
  function calculateInitialDelay() {
    const lastShown = getLastShownTime();
    const now = Date.now();
    const timeSinceLastShown = now - lastShown;

    // Si nunca se ha mostrado o han pasado más de 10 minutos, empezar normal
    if (!lastShown || timeSinceLastShown > 10 * 60 * 1000) {
      return (Math.random() * 45 + 45) * 1000; // 45-90 segundos
    }

    // Si se mostró recientemente, calcular cuándo debería ser el próximo
    const minInterval = 2 * 60 * 1000; // mínimo 2 minutos
    const maxInterval = 8 * 60 * 1000; // máximo 8 minutos
    const averageInterval = 4 * 60 * 1000; // promedio 4 minutos

    const timeUntilNext = averageInterval - timeSinceLastShown;

    // Si ya es tiempo de mostrar, mostrar pronto
    if (timeUntilNext <= 0) {
      return Math.random() * 30 * 1000; // 0-30 segundos
    }

    // Si falta tiempo, esperar el tiempo restante
    return Math.min(timeUntilNext, maxInterval);
  }

  // Start with calculated delay
  const initialDelay = calculateInitialDelay();

  gtmTrack("social_proof_init", {
    initial_delay_seconds: Math.round(initialDelay / 1000),
    has_previous_session: !!getLastShownTime(),
    timestamp: new Date().toISOString(),
  });

  setTimeout(showSocialProof, initialDelay);
}

// 5. LIVE STATS COUNTER ANIMATION
function initLiveStatsAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-target"));
          animateCounter(entry.target, target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const duration = 2000; // 2 seconds
  const stepTime = duration / 100;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (target === 4.9) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ===== NUEVO SISTEMA DE FORMULARIO MULTI-STEP =====

// Variables globales del formulario
let formState = {
  currentStep: 1,
  totalSteps: 4,
  data: {
    nombre: "",
    servicio: "",
    horario: "",
    mensaje: "",
  },
  preselectedService: null,
};

// Configurar selección previa de servicios desde botones superiores
function setupServicePreselection() {
  const serviceButtons = document.querySelectorAll(".service-cta");

  serviceButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Obtener el servicio del data attribute GTM
      const gtmEvent = this.getAttribute("data-gtm-event");
      let serviceName = "";

      if (gtmEvent.includes("mesoterapia")) {
        serviceName = "mesoterapia";
      } else if (gtmEvent.includes("prp")) {
        serviceName = "prp";
      } else if (gtmEvent.includes("lipolaser")) {
        serviceName = "lipolaser";
      } else if (gtmEvent.includes("radiofrecuencia")) {
        serviceName = "radiofrecuencia";
      } else if (gtmEvent.includes("cavitacion")) {
        serviceName = "cavitacion";
      } else if (gtmEvent.includes("vacumterapia")) {
        serviceName = "vacumterapia";
      }

      // Guardar servicio preseleccionado
      formState.preselectedService = serviceName;
      formState.data.servicio = serviceName;

      // Scroll al formulario
      const formulario = document.getElementById("contacto");
      if (formulario) {
        formulario.scrollIntoView({ behavior: "smooth" });

        // Preseleccionar el servicio en el select después del scroll
        setTimeout(() => {
          const servicioSelect = document.getElementById("servicio");
          if (servicioSelect && serviceName) {
            servicioSelect.value = serviceName;
            servicioSelect.dispatchEvent(
              new Event("change", { bubbles: true })
            );

            // Actualizar estado del botón WhatsApp
            updateWhatsAppButtonState();
          }
        }, 800);
      }

      // Tracking GTM
      gtmTrack("click_service_preselect", {
        service_selected: serviceName,
        timestamp: new Date().toISOString(),
      });
    });
  });
}

// Validar paso actual
function validateCurrentStep() {
  const currentStepElement = document.querySelector(
    `.step[data-step="${formState.currentStep}"]`
  );
  if (!currentStepElement) return false;

  const requiredInputs = currentStepElement.querySelectorAll(
    "input[required], select[required]"
  );
  let isValid = true;
  let firstInvalidInput = null;

  requiredInputs.forEach((input) => {
    const value = input.value.trim();

    if (!value) {
      isValid = false;
      input.style.borderColor = "#E53E3E";
      input.style.boxShadow = "0 0 0 3px rgba(229, 62, 62, 0.1)";

      if (!firstInvalidInput) {
        firstInvalidInput = input;
      }

      // Mostrar mensaje de error
      showFieldError(input, "Este campo es obligatorio");
    } else {
      input.style.borderColor = "";
      input.style.boxShadow = "";
      hideFieldError(input);
    }
  });

  if (!isValid) {
    // Focus en el primer campo inválido (solo en desktop)
    if (firstInvalidInput && window.innerWidth > 768) {
      firstInvalidInput.focus();
    }

    // Tracking de error
    gtmTrack("form_step_error", {
      step: formState.currentStep,
      timestamp: new Date().toISOString(),
    });

    return false;
  }

  return true;
}

// Mostrar error en campo específico
function showFieldError(input, message) {
  hideFieldError(input); // Limpiar error anterior

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error-message";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #E53E3E;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    animation: fadeIn 0.3s ease;
    display: block;
  `;

  // Insertar el mensaje directamente después del input
  if (input.nextSibling) {
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  } else {
    input.parentNode.appendChild(errorDiv);
  }
}

// Ocultar error en campo específico
function hideFieldError(input) {
  const existingError = input.parentNode.querySelector(".field-error-message");
  if (existingError) {
    existingError.remove();
  }
}

// Guardar datos del paso actual
function saveCurrentStepData() {
  const currentStepElement = document.querySelector(
    `.step[data-step="${formState.currentStep}"]`
  );
  if (!currentStepElement) return;

  const inputs = currentStepElement.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    if (input.name && formState.data.hasOwnProperty(input.name)) {
      formState.data[input.name] = input.value.trim();
    }
  });

  // Guardar en sessionStorage para persistencia
  sessionStorage.setItem("formState", JSON.stringify(formState));
}

// Navegar a un paso específico
function navigateToStep(targetStep) {
  if (targetStep < 1 || targetStep > formState.totalSteps) return;

  // Ocultar paso actual
  const currentStepElement = document.querySelector(
    `.step[data-step="${formState.currentStep}"]`
  );
  if (currentStepElement) {
    currentStepElement.classList.remove("active");
  }

  // Mostrar paso objetivo
  formState.currentStep = targetStep;
  const targetStepElement = document.querySelector(
    `.step[data-step="${targetStep}"]`
  );
  if (targetStepElement) {
    targetStepElement.classList.add("active");
  }

  // Actualizar barra de progreso
  const progress = (formState.currentStep / formState.totalSteps) * 100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  // Focus en primer input (solo desktop)
  if (window.innerWidth > 768) {
    const firstInput = targetStepElement?.querySelector("input, select");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300);
    }
  }

  // Actualizar estado del botón WhatsApp
  updateWhatsAppButtonState();

  // Tracking
  gtmTrack("form_step_completed", {
    from_step: formState.currentStep - 1,
    to_step: formState.currentStep,
    progress_percentage: progress,
    timestamp: new Date().toISOString(),
  });
}

// Función global nextStep para compatibilidad con HTML
function nextStep(targetStep) {
  if (!validateCurrentStep()) {
    return false;
  }

  saveCurrentStepData();
  navigateToStep(targetStep);
  return true;
}

// Configurar envío del formulario
function setupFormSubmission() {
  const leadForm = document.getElementById("leadForm");
  if (!leadForm) return;

  // Función para manejar el envío
  const handleFormSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Validar que estamos en el último paso
    if (formState.currentStep !== formState.totalSteps) {
      return false;
    }

    // Validar paso actual
    if (!validateCurrentStep()) {
      return false;
    }

    // Guardar datos finales
    saveCurrentStepData();

    // Validar campos obligatorios
    const requiredFields = ["nombre", "servicio"];
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!formState.data[field] || formState.data[field].trim() === "") {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      gtmTrack("form_error", {
        error_type: "validation",
        missing_fields: missingFields,
        timestamp: new Date().toISOString(),
      });

      showFormMessage(
        "Por favor completa todos los campos obligatorios.",
        "error"
      );
      return false;
    }

    // Tracking de envío exitoso
    gtmTrack("submit_form", {
      form_data: {
        nombre: formState.data.nombre,
        servicio: formState.data.servicio,
        horario: formState.data.horario || "no_specified",
        has_message: !!formState.data.mensaje,
        preselected_service: !!formState.preselectedService,
      },
      timestamp: new Date().toISOString(),
    });

    // Procesar envío
    processFormSubmission();
  };

  // Event listeners para compatibilidad mobile/desktop
  leadForm.addEventListener("submit", handleFormSubmit);

  // Event listener adicional para el botón submit
  const submitButton = leadForm.querySelector('button[type="submit"]');
  if (submitButton) {
    // Click event
    submitButton.addEventListener("click", function (e) {
      if (formState.currentStep === formState.totalSteps) {
        // Permitir que el evento submit se dispare naturalmente
        return;
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // Touch event para mobile
    submitButton.addEventListener("touchend", function (e) {
      if (formState.currentStep === formState.totalSteps) {
        setTimeout(() => {
          if (leadForm.checkValidity()) {
            handleFormSubmit.call(leadForm, e);
          }
        }, 100);
      }
    });
  }
}

// Procesar envío del formulario
function processFormSubmission() {
  // Mostrar mensaje de éxito
  showFormMessage(
    "¡Gracias! Continuemos en WhatsApp para coordinar tu evaluación.",
    "success"
  );

  // Preparar datos para WhatsApp
  const whatsappData = {
    nombre: formState.data.nombre,
    servicio: formState.data.servicio,
    horario: formState.data.horario,
    mensaje: formState.data.mensaje,
    preselected: formState.preselectedService,
  };

  // Guardar en sessionStorage para WhatsApp
  sessionStorage.setItem("whatsappFormData", JSON.stringify(whatsappData));

  // Reset visual del formulario
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.reset();
  }

  // Tracking de conversión
  gtmTrack("conversion_lead", {
    conversion_type: "form_submission",
    lead_source: "landing_page",
    service_selected: formState.data.servicio,
    timestamp: new Date().toISOString(),
  });

  // Enviar a WhatsApp después de un delay
  setTimeout(() => {
    sendWhatsAppMessage();
  }, 500);
}

// Inicializar todo el sistema de formulario
function initNewFormSystem() {
  // Restaurar estado si existe
  restoreFormState();

  // Configurar componentes
  setupServicePreselection();
  setupFormSubmission();
  setupFormValidation();

  // Inicializar estado del botón WhatsApp
  updateWhatsAppButtonState();
}

// Restaurar estado del formulario desde sessionStorage
function restoreFormState() {
  try {
    const savedState = sessionStorage.getItem("formState");
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Solo restaurar datos, no el paso actual (siempre empezar desde el paso 1)
      formState.data = { ...formState.data, ...parsed.data };
      formState.preselectedService = parsed.preselectedService;
    }
  } catch (e) {
    // Error silencioso
  }
}

// Configurar validación en tiempo real
function setupFormValidation() {
  const leadForm = document.getElementById("leadForm");
  if (!leadForm) return;

  // Agregar event listeners a todos los inputs
  const inputs = leadForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    // Limpiar errores al escribir
    input.addEventListener("input", function () {
      if (this.value.trim()) {
        this.style.borderColor = "";
        this.style.boxShadow = "";
        hideFieldError(this);
      }

      // Guardar datos en tiempo real
      if (this.name && formState.data.hasOwnProperty(this.name)) {
        formState.data[this.name] = this.value.trim();
        sessionStorage.setItem("formState", JSON.stringify(formState));
      }

      // Actualizar estado del botón WhatsApp
      updateWhatsAppButtonState();
    });

    input.addEventListener("change", function () {
      if (this.name && formState.data.hasOwnProperty(this.name)) {
        formState.data[this.name] = this.value.trim();
        sessionStorage.setItem("formState", JSON.stringify(formState));
      }

      updateWhatsAppButtonState();
    });
  });
}

// 7. MOBILE STICKY CTA
function initMobileStickyCA() {
  const mobileCTA = document.getElementById("mobileCTA");
  if (!mobileCTA || window.innerWidth > 768) return;

  let lastScrollY = window.scrollY;
  let isVisible = false;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const shouldShow = currentScrollY > 500 && !scrollingDown;

    if (shouldShow && !isVisible) {
      mobileCTA.classList.add("visible");
      isVisible = true;
      gtmTrack("mobile_cta_shown", {
        scroll_position: currentScrollY,
        timestamp: new Date().toISOString(),
      });
    } else if (!shouldShow && isVisible) {
      mobileCTA.classList.remove("visible");
      isVisible = false;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", throttle(handleScroll, 100));
}

// 8. PERSONALIZATION BASED ON TIME
function initPersonalization() {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) greeting = "Buenos días";
  else if (hour < 18) greeting = "Buenas tardes";
  else greeting = "Buenas noches";

  // Update hero title if exists
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle && heroTitle.textContent.includes("Tu figura")) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = `<span style="font-size: 0.8em; opacity: 0.9;">${greeting},</span><br>${originalText}`;
  }

  // Update urgency bar text based on time
  const urgencyText = document.querySelector(".urgency-text");
  if (urgencyText && hour >= 18) {
    urgencyText.innerHTML =
      'Solo quedan <strong id="spots-counter">7</strong> cupos para mañana';
  }
}

// 9. TESTIMONIALS CAROUSEL
function initTestimonialsCarousel() {
  const testimonials = document.querySelectorAll(".testimonial");
  if (testimonials.length <= 1) return;

  let currentTestimonial = 0;
  let autoRotateInterval = null;
  let isFormActive = false;

  // Add carousel structure
  const testimonialsGrid = document.querySelector(".testimonials-grid");
  if (!testimonialsGrid) return;

  testimonialsGrid.classList.add("testimonials-carousel");

  // Fix container height to prevent layout shifts
  function fixContainerHeight() {
    let maxHeight = 0;
    testimonials.forEach((testimonial) => {
      testimonial.style.position = "absolute";
      testimonial.style.opacity = "1";
      testimonial.style.visibility = "visible";
      const height = testimonial.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // Set fixed height to container
    testimonialsGrid.style.position = "relative";
    testimonialsGrid.style.height = maxHeight + "px";
    testimonialsGrid.style.overflow = "hidden";
  }

  // Reset any previous inline styles and setup carousel
  testimonials.forEach((testimonial, index) => {
    testimonial.classList.add("testimonial-slide");
    testimonial.style.opacity = "";
    testimonial.style.transform = "";
    testimonial.style.transition = "";
    testimonial.style.position = "absolute";
    testimonial.style.top = "0";
    testimonial.style.left = "0";
    testimonial.style.width = "100%";

    if (index === 0) {
      testimonial.classList.add("active");
      testimonial.style.opacity = "1";
      testimonial.style.visibility = "visible";
    } else {
      testimonial.style.opacity = "0";
      testimonial.style.visibility = "hidden";
    }
  });

  // Fix height after setup
  setTimeout(fixContainerHeight, 100);

  // Create navigation dots
  const carouselNav = document.createElement("div");
  carouselNav.className = "carousel-nav";

  testimonials.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToTestimonial(index));
    carouselNav.appendChild(dot);
  });

  testimonialsGrid.parentNode.appendChild(carouselNav);

  function updateDots() {
    const dots = carouselNav.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentTestimonial);
    });
  }

  function goToTestimonial(index) {
    if (index === currentTestimonial) return;

    // Fade out current
    testimonials[currentTestimonial].style.opacity = "0";
    testimonials[currentTestimonial].style.visibility = "hidden";
    testimonials[currentTestimonial].classList.remove("active");

    currentTestimonial = index;

    // Fade in new
    setTimeout(() => {
      testimonials[currentTestimonial].style.opacity = "1";
      testimonials[currentTestimonial].style.visibility = "visible";
      testimonials[currentTestimonial].classList.add("active");
      updateDots();
    }, 300);

    gtmTrack("testimonial_clicked", {
      testimonial_index: currentTestimonial,
      timestamp: new Date().toISOString(),
    });
  }

  function nextTestimonial() {
    // Don't auto-rotate if form is active
    if (isFormActive) return;

    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(nextIndex);

    gtmTrack("testimonial_rotated", {
      testimonial_index: currentTestimonial,
      timestamp: new Date().toISOString(),
    });
  }

  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextTestimonial, 8000); // Increased to 8 seconds
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Detect form interaction
  function detectFormInteraction() {
    const formInputs = document.querySelectorAll(
      "#leadForm input, #leadForm select, #leadForm textarea"
    );

    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        isFormActive = true;
        stopAutoRotate();
      });

      input.addEventListener("blur", () => {
        // Delay before restarting to avoid immediate restart
        setTimeout(() => {
          const activeElement = document.activeElement;
          const isStillInForm =
            activeElement &&
            (activeElement.closest("#leadForm") ||
              activeElement.id === "whatsappSticky");

          if (!isStillInForm) {
            isFormActive = false;
            startAutoRotate();
          }
        }, 1000);
      });
    });

    // Also pause when hovering over form
    const form = document.getElementById("leadForm");
    if (form) {
      form.addEventListener("mouseenter", () => {
        isFormActive = true;
        stopAutoRotate();
      });

      form.addEventListener("mouseleave", () => {
        setTimeout(() => {
          const activeElement = document.activeElement;
          const isStillInForm =
            activeElement && activeElement.closest("#leadForm");

          if (!isStillInForm) {
            isFormActive = false;
            startAutoRotate();
          }
        }, 500);
      });
    }
  }

  // Initialize
  detectFormInteraction();
  startAutoRotate();
}

// 10. ENHANCED HOVER EFFECTS
function initEnhancedHoverEffects() {
  // Add ripple effect to buttons on click
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("cta-primary") ||
      e.target.classList.contains("service-cta")
    ) {
      const button = e.target;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,0.6)";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });
}

// Initialize all new features when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
  initUrgencyTimer();
  initDynamicSpotsCounter();
  initSocialProofPopup();
  initLiveStatsAnimation();
  initMobileStickyCA();
  initPersonalization();
  initTestimonialsCarousel();
  initEnhancedHoverEffects();

  // Set initial progress bar
  document.getElementById("progressBar").style.width = "25%";
});

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
`;

const style = document.createElement("style");
style.textContent = rippleCSS;
document.head.appendChild(style);
// ===== WHATSAPP ENHANCED FUNCTIONALITY =====

// Función para obtener datos del formulario inteligente
function getFormData() {
  // Primero intentar obtener datos guardados de sessionStorage
  let formData = {};
  try {
    const savedData = sessionStorage.getItem("whatsappFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData = { ...parsedData };
    }
  } catch (e) {
    // Error silencioso
  }

  // Buscar datos actuales en el formulario (todos los pasos)
  const form = document.getElementById("leadForm");
  if (form) {
    // Obtener TODOS los inputs, selects y textareas del formulario (incluso los no visibles)
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input, index) => {
      const value = input.value ? input.value.trim() : "";

      if (input.id && value !== "") {
        formData[input.id] = value;
      }
    });
  }

  // Limpiar datos vacíos
  Object.keys(formData).forEach((key) => {
    if (!formData[key] || formData[key].trim() === "") {
      delete formData[key];
    }
  });

  // Guardar en sessionStorage para persistencia
  if (Object.keys(formData).length > 0) {
    try {
      sessionStorage.setItem("whatsappFormData", JSON.stringify(formData));
    } catch (e) {
      // Error silencioso
    }
  }

  return formData;
}

// Función para generar mensaje personalizado de WhatsApp
function generateWhatsAppMessage() {
  const formData = getFormData();
  const hasFormData = Object.keys(formData).length > 0;

  let message =
    "¡Hola! Me interesa agendar una evaluación gratuita en Nurse Glow Up.";

  if (hasFormData) {
    message += "\n\n📋 *Mis datos:*";

    if (formData.nombre) {
      message += `\n👤 *Nombre:* ${formData.nombre}`;
    }

    if (formData.servicio) {
      const servicios = {
        mesoterapia: "Mesoterapia",
        prp: "Plasma Rico en Plaquetas (PRP)",
        lipolaser: "Lipoláser",
        radiofrecuencia: "Radiofrecuencia",
        cavitacion: "Cavitación",
        vacumterapia: "Vacumterapia",
      };
      const servicioNombre = servicios[formData.servicio] || formData.servicio;
      message += `\n💉 *Tratamiento de interés:* ${servicioNombre}`;
    }

    if (formData.horario) {
      const horarios = {
        manana: "Mañana (9:00 - 12:00)",
        tarde: "Tarde (14:00 - 18:00)",
        flexible: "Horario flexible",
      };
      const horarioNombre = horarios[formData.horario] || formData.horario;
      message += `\n⏰ *Horario preferido:* ${horarioNombre}`;
    }

    if (formData.mensaje) {
      message += `\n💬 *Mensaje adicional:* ${formData.mensaje}`;
    }

    message += "\n\n¿Podrían ayudarme a coordinar mi cita? ¡Gracias! 😊";
  } else {
    message +=
      "\n\n¿Podrían darme más información sobre sus tratamientos y disponibilidad? ¡Gracias! 😊";
  }

  return message;
}

// Función principal para enviar mensaje de WhatsApp
function sendWhatsAppMessage(event) {
  if (event) {
    event.preventDefault();
  }

  // Obtener datos del formulario
  const formData = getFormData();

  // Generar mensaje
  const message = generateWhatsAppMessage();

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/56975730668?text=${encodedMessage}`;

  // Tracking GTM mejorado
  gtmTrack("click_whatsapp_enhanced", {
    location: "sticky_button",
    has_form_data: Object.keys(formData).length > 0,
    form_completion_percentage: calculateFormCompletion(),
    included_fields: Object.keys(formData),
    message_length: message.length,
    timestamp: new Date().toISOString(),
  });

  // Abrir WhatsApp
  window.open(whatsappURL, "_blank");

  // Limpiar datos de sessionStorage después del envío
  setTimeout(() => {
    sessionStorage.removeItem("whatsappFormData");
  }, 1000);

  // Resetear formulario después de 3 segundos
  setTimeout(() => {
    clearFormData();

    // Tracking del reset automático
    gtmTrack("form_auto_reset", {
      trigger: "whatsapp_sent",
      delay_seconds: 3,
      timestamp: new Date().toISOString(),
    });
  }, 3000);

  // Animación de feedback
  const whatsappButton = document.getElementById("whatsappSticky");
  if (whatsappButton) {
    whatsappButton.classList.remove("pulse");
    whatsappButton.style.transform = "scale(0.9)";
    setTimeout(() => {
      whatsappButton.style.transform = "";
      setTimeout(() => {
        whatsappButton.classList.add("pulse");
      }, 1000);
    }, 150);
  }
}

// Función para calcular porcentaje de completitud del formulario
function calculateFormCompletion() {
  const totalFields = 4; // nombre, servicio, horario, mensaje
  const formData = getFormData();
  const completedFields = Object.keys(formData).length;
  return Math.round((completedFields / totalFields) * 100);
}

// Función para activar/desactivar pulse según progreso del formulario
function updateWhatsAppButtonState() {
  const whatsappButton = document.getElementById("whatsappSticky");
  if (!whatsappButton) return;

  const completion = calculateFormCompletion();

  if (completion >= 50) {
    // Si el formulario está 50%+ completo, hacer más prominente
    whatsappButton.classList.add("pulse");
    whatsappButton.style.transform = "scale(1.05)";
  } else if (completion >= 25) {
    // Si está 25%+ completo, pulse normal
    whatsappButton.classList.add("pulse");
    whatsappButton.style.transform = "";
  } else {
    // Si está menos completo, pulse sutil
    whatsappButton.classList.remove("pulse");
    whatsappButton.style.transform = "";
  }
}

// Función para mostrar tooltip contextual
function showWhatsAppTooltip(message) {
  const whatsappButton = document.getElementById("whatsappSticky");
  if (!whatsappButton) return;

  // Crear tooltip temporal
  const tooltip = document.createElement("div");
  tooltip.className = "whatsapp-dynamic-tooltip";
  tooltip.textContent = message;
  // Detectar si es mobile
  const isMobile = window.innerWidth <= 768;

  tooltip.style.cssText = `
    position: absolute;
    ${
      isMobile
        ? "right: 90px; max-width: calc(100vw - 170px); bottom: 15px;"
        : "right: 80px; top: 50%; transform: translateY(-50%);"
    }
    ${isMobile ? "" : "top: 50%; transform: translateY(-50%);"}
    background: #25d366;
    color: white;
    padding: ${isMobile ? "10px 14px" : "8px 12px"};
    border-radius: 12px;
    font-size: ${isMobile ? "0.8rem" : "0.85rem"};
    font-weight: 600;
    ${
      isMobile
        ? "white-space: normal; word-wrap: break-word; line-height: 1.4;"
        : "white-space: nowrap;"
    }
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
    animation: fadeInTooltip 0.3s ease;
    z-index: 1001;
  `;

  // Agregar flecha para mobile
  if (isMobile) {
    const arrow = document.createElement("div");
    arrow.style.cssText = `
      position: absolute;
      right: -8px;
      bottom: 20px;
      width: 0;
      height: 0;
      border-left: 8px solid #25d366;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    `;
    tooltip.appendChild(arrow);
  }

  whatsappButton.appendChild(tooltip);

  // Remover después de 5 segundos
  setTimeout(() => {
    if (tooltip.parentNode) {
      tooltip.remove();
    }
  }, 5000);
}

// CSS para animación de tooltip
const tooltipCSS = `
@keyframes fadeInTooltip {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}
`;

const tooltipStyle = document.createElement("style");
tooltipStyle.textContent = tooltipCSS;
document.head.appendChild(tooltipStyle);

// Event listeners para monitorear cambios en el formulario
document.addEventListener("DOMContentLoaded", function () {
  // Verificar que el formulario existe
  const form = document.getElementById("leadForm");

  // Monitorear cambios en inputs del formulario
  const formInputs = document.querySelectorAll(
    "#leadForm input, #leadForm select, #leadForm textarea"
  );

  formInputs.forEach((input) => {
    // Actualizar estado del botón WhatsApp
    input.addEventListener("input", () => {
      updateWhatsAppButtonState();
      // Guardar datos en tiempo real
      setTimeout(() => {
        getFormData();
      }, 100);
    });

    input.addEventListener("change", () => {
      updateWhatsAppButtonState();
      // Guardar datos en tiempo real
      setTimeout(() => {
        getFormData();
      }, 100);
    });
  });

  // Mostrar tooltip contextual después de cierto tiempo
  setTimeout(() => {
    const completion = calculateFormCompletion();
    if (completion === 0) {
      showWhatsAppTooltip(
        "¡Completa el formulario para un mensaje más personalizado!"
      );
    }
  }, 30000); // 30 segundos

  // Actualizar estado inicial
  updateWhatsAppButtonState();

  // Ejecutar prueba automática después de 2 segundos
  setTimeout(() => {
    testFormDataCapture();
  }, 2000);
});

// Función de prueba para verificar captura de datos
function testFormDataCapture() {
  // Mostrar todos los inputs del formulario
  const form = document.getElementById("leadForm");

  // Probar captura de datos
  const formData = getFormData();

  // Generar mensaje de prueba
  const message = generateWhatsAppMessage();

  return {
    formData,
    message,
    inputCount: form
      ? form.querySelectorAll("input, select, textarea").length
      : 0,
  };
}

// Función para llenar formulario con datos de prueba
function fillTestData() {
  const testData = {
    nombre: "María José González",
    servicio: "mesoterapia",
    horario: "tarde",
    mensaje: "Me interesa conocer más sobre los precios y disponibilidad",
  };

  Object.keys(testData).forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = testData[fieldId];

      // Disparar eventos para que se actualice el estado
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  // Actualizar estado del botón WhatsApp
  updateWhatsAppButtonState();

  // Verificar datos después de llenar
  setTimeout(() => {
    testFormDataCapture();
  }, 500);
}

// Función para limpiar formulario
function clearFormData() {
  const form = document.getElementById("leadForm");
  if (form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (input.type !== "button" && input.type !== "submit") {
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    // Limpiar todo el storage relacionado al formulario
    clearFormStorage();

    // Resetear formulario multi-step al paso 1
    currentStep = 1;
    const steps = form.querySelectorAll(".step");
    steps.forEach((step, index) => {
      if (index === 0) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    // Resetear barra de progreso
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      progressBar.style.width = "25%";
    }

    updateWhatsAppButtonState();
  }
}

// Función para debug: mostrar estado actual del formulario
function debugFormState() {
  const formData = getFormData();
  const completion = calculateFormCompletion();
  const message = generateWhatsAppMessage();

  return {
    currentStep,
    formData,
    completion,
    message,
  };
}

// ===== GALLERY FUNCTIONALITY =====

// Función para manejar clicks en los reels
function initReelsInteractions() {
  const reelContainers = document.querySelectorAll(".reel-container");

  reelContainers.forEach((reel) => {
    reel.addEventListener("click", function (e) {
      const treatment = this.getAttribute("data-treatment");
      const reelId = this.getAttribute("data-reel-id");
      const reelUrl = this.getAttribute("href");

      // Track reel click con datos completos
      gtmTrack("click_reel", {
        treatment: treatment,
        reel_id: reelId,
        reel_url: reelUrl,
        location: "gallery",
        action: "external_link",
        timestamp: new Date().toISOString(),
      });

      // Track también como evento de Instagram
      gtmTrack("click_instagram_reel", {
        treatment: treatment,
        reel_id: reelId,
        source: "gallery_section",
        timestamp: new Date().toISOString(),
      });

      // El enlace se abrirá automáticamente por el target="_blank"
      // No necesitamos preventDefault() ni navegación manual
    });

    // Hover effects con tracking mejorado
    reel.addEventListener("mouseenter", function () {
      const treatment = this.getAttribute("data-treatment");
      const reelId = this.getAttribute("data-reel-id");

      gtmTrack("hover_reel", {
        treatment: treatment,
        reel_id: reelId,
        timestamp: new Date().toISOString(),
      });
    });

    // Track cuando el reel entra en viewport
    const reelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const treatment = entry.target.getAttribute("data-treatment");
            const reelId = entry.target.getAttribute("data-reel-id");

            gtmTrack("view_reel", {
              treatment: treatment,
              reel_id: reelId,
              timestamp: new Date().toISOString(),
            });

            reelObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    reelObserver.observe(reel);
  });
}

// Función para animar reels
function initReelsAnimation() {
  const reelContainers = document.querySelectorAll(".reel-container");

  const reelsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
          }, index * 200);
          reelsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  reelContainers.forEach((reel) => {
    reel.style.opacity = "0";
    reel.style.transform = "translateY(30px) scale(0.95)";
    reel.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    reelsObserver.observe(reel);
  });
}

// Función para trackear clicks en Instagram
function initInstagramTracking() {
  // Track clicks en el botón de Instagram del CTA
  const instagramButton = document.querySelector(".instagram-button");
  if (instagramButton) {
    instagramButton.addEventListener("click", function () {
      gtmTrack("click_instagram_profile", {
        location: "gallery_cta",
        action: "external_link",
        url: this.getAttribute("href"),
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Track todos los enlaces de Instagram en la página
  const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
  instagramLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const location = this.getAttribute("data-gtm-location") || "unknown";
      const eventName =
        this.getAttribute("data-gtm-event") || "click_instagram_link";

      gtmTrack(eventName, {
        location: location,
        url: this.getAttribute("href"),
        timestamp: new Date().toISOString(),
      });
    });
  });
}

// MOBILE MENU AUTO-CLOSE WITH FADE EFFECT
function closeMobileMenuWithFade(mobileMenu) {
  // Agregar clase de cierre para activar animación
  mobileMenu.classList.add("closing");

  // Esperar a que termine la animación antes de cerrar
  setTimeout(() => {
    mobileMenu.close();
    mobileMenu.classList.remove("closing");
  }, 300); // 300ms coincide con la duración de la transición CSS
}

function initMobileMenuAutoClose() {
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.querySelector(
    '[commandfor="mobile-menu"][command="close"]'
  );

  // Auto-close cuando se hace clic en enlaces
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Efecto visual de click
      this.classList.add("clicked");

      // Vibración táctil en dispositivos móviles
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      // Remover el efecto después de la animación
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 200);

      // Cerrar el menú móvil con fade (con un pequeño delay para ver el efecto)
      if (mobileMenu) {
        setTimeout(() => {
          closeMobileMenuWithFade(mobileMenu);
        }, 150);
      }

      // Track del click en menú móvil
      gtmTrack("mobile_menu_click", {
        link_text: this.textContent.trim(),
        link_href: this.getAttribute("href"),
        timestamp: new Date().toISOString(),
      });
    });
  });

  // Aplicar fade también al botón de cerrar
  if (closeButton && mobileMenu) {
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      closeMobileMenuWithFade(mobileMenu);
    });
  }
}

// Inicializar funcionalidades de reels
document.addEventListener("DOMContentLoaded", function () {
  initReelsInteractions();
  initReelsAnimation();
  initInstagramTracking();
  initMobileMenuAutoClose();
  showWhatsAppTooltip("¡Hola! ¿En qué puedo ayudarte?");
});

// Función global para usar desde otros lugares
window.sendWhatsAppMessage = sendWhatsAppMessage;
window.testFormDataCapture = testFormDataCapture;
window.fillTestData = fillTestData;
window.clearFormData = clearFormData;
window.debugFormState = debugFormState;
window.getFormData = getFormData;
