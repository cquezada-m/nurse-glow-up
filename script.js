// GTM Data Layer initialization
window.dataLayer = window.dataLayer || [];

// GTM Event tracking function
function gtmTrack(eventName, eventData = {}) {
  window.dataLayer.push({
    event: eventName,
    ...eventData,
  });
  console.log("GTM Event:", eventName, eventData);
}

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

  // Animate testimonials
  if (element.classList.contains("testimonials")) {
    const testimonials = element.querySelectorAll(".testimonial");
    testimonials.forEach((testimonial, index) => {
      setTimeout(() => {
        testimonial.style.opacity = "1";
        testimonial.style.transform = "translateY(0)";
        testimonial.style.transition = "all 0.6s ease-out";
      }, index * 200);
    });
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
        contactForm.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Pre-fill form with selected service
        setTimeout(() => {
          const serviceSelect = document.getElementById("servicio");
          if (serviceSelect) {
            serviceSelect.value = serviceType;
            // Add visual feedback
            serviceSelect.style.borderColor = "#D946EF";
            serviceSelect.style.boxShadow = "0 0 0 3px rgba(217, 70, 239, 0.1)";
            setTimeout(() => {
              serviceSelect.style.borderColor = "";
              serviceSelect.style.boxShadow = "";
            }, 2000);
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

  // Form handling
  const leadForm =
    document.getElementById("leadForm") ||
    document.querySelector("#contacto form");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Validate required fields
      const requiredFields = ["nombre", "servicio"];
      let isValid = true;
      let missingFields = [];

      requiredFields.forEach((field) => {
        const element = document.getElementById(field);
        if (!element) return;

        if (!element.value) {
          isValid = false;
          missingFields.push(field);
          element.style.borderColor = "#E53E3E";
        } else {
          element.style.borderColor = "#E2E8F0";
        }
      });

      if (!isValid) {
        gtmTrack("form_error", {
          error_type: "validation",
          missing_fields: missingFields,
          timestamp: new Date().toISOString(),
        });

        showFormMessage(
          "Por favor completa todos los campos obligatorios.",
          "error"
        );
        return;
      }

      // Track successful form submission
      gtmTrack("submit_form", {
        form_data: {
          nombre: formObject.nombre,
          servicio: formObject.servicio || "no_specified",
          horario: formObject.horario || "no_specified",
          has_message: !!formObject.mensaje,
        },
        timestamp: new Date().toISOString(),
      });

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        showFormMessage(
          "¡Gracias! Te contactaremos por WhatsApp en breve para coordinar tu evaluación.",
          "success"
        );
        leadForm.reset();

        // Track conversion
        gtmTrack("conversion_lead", {
          conversion_type: "form_submission",
          lead_source: "landing_page",
          timestamp: new Date().toISOString(),
        });

        // Optional: Redirect to WhatsApp with pre-filled message
        const whatsappMessage = encodeURIComponent(
          `Hola! Acabo de completar el formulario en su sitio web. Mi nombre es ${
            formObject.nombre
          } y estoy interesado/a en ${
            formObject.servicio || "sus tratamientos"
          }. ¿Podemos coordinar una evaluación gratuita?`
        );

        setTimeout(() => {
          window.open(
            `https://wa.me/56975730668?text=${whatsappMessage}`,
            "_blank"
          );
        }, 2000);
      }, 1000);
    });
  }

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
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
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
  const typewriterElement = document.querySelector('.typewriter-word');
  if (!typewriterElement) return;

  const words = typewriterElement.getAttribute('data-words').split(',');
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typeSpeed = 120;
  let deleteSpeed = 80;
  let pauseTime = 2500;

  function type() {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriterElement.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before typing next word
        return;
      }
      
      setTimeout(type, deleteSpeed);
    } else {
      // Typing characters
      typewriterElement.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      if (currentCharIndex === currentWord.length) {
        // Word complete, track the word display
        gtmTrack("typewriter_word_complete", {
          word: currentWord,
          word_index: currentWordIndex,
          timestamp: new Date().toISOString(),
        });
        
        // Pause then start deleting
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseTime);
        return;
      }
      
      setTimeout(type, typeSpeed);
    }
  }

  // Start the typewriter effect after a delay
  setTimeout(() => {
    typewriterElement.classList.add('typing');
    type();
  }, 2000);
}

// Initialize typewriter when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypewriter);
