# Documentación de Eventos GTM - Nurse Glow Up Landing Page

## Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Eventos de Vista (View Events)](#eventos-de-vista-view-events)
3. [Eventos de Interacción (Click Events)](#eventos-de-interacción-click-events)
4. [Eventos de Formulario](#eventos-de-formulario)
5. [Eventos de Comportamiento](#eventos-de-comportamiento)
6. [Eventos de Conversión](#eventos-de-conversión)
7. [Eventos de Performance](#eventos-de-performance)
8. [Configuración en GTM](#configuración-en-gtm)

---

## Configuración Inicial

### GTM Container ID

```
GTM-M3M4KFM3
```

### Data Layer Initialization

```javascript
window.dataLayer = window.dataLayer || [];
```

---

## Eventos de Vista (View Events)

### 1. page_view

**Descripción:** Evento inicial de carga de página

```javascript
gtmTrack("page_view", {
  page_title: document.title,
  page_url: window.location.href,
  user_agent: navigator.userAgent,
  screen_resolution: "1920x1080", // ejemplo
  viewport_size: "1200x800", // ejemplo
  timestamp: "2024-01-01T10:00:00.000Z",
});
```

### 2. view_hero

**Descripción:** Vista de la sección hero

```javascript
gtmTrack("view_hero", {
  hero_variant: "A", // Para A/B testing
  timestamp: "2024-01-01T10:00:01.000Z",
});
```

### 3. view_benefits

**Descripción:** Vista de la sección de beneficios

```javascript
gtmTrack("view_benefits", {
  section: "section",
  timestamp: "2024-01-01T10:00:05.000Z",
});
```

### 4. view_services

**Descripción:** Vista de la sección de servicios detallados

```javascript
gtmTrack("view_services", {
  section: "section",
  timestamp: "2024-01-01T10:00:10.000Z",
});
```

### 5. view_gallery

**Descripción:** Vista de la galería de reels de Instagram

```javascript
gtmTrack("view_gallery", {
  section: "section",
  timestamp: "2024-01-01T10:00:15.000Z",
});
```

### 6. view_testimonials

**Descripción:** Vista de la sección de testimonios

```javascript
gtmTrack("view_testimonials", {
  section: "section",
  timestamp: "2024-01-01T10:00:20.000Z",
});
```

### 7. view_faq

**Descripción:** Vista de la sección de FAQ

```javascript
gtmTrack("view_faq", {
  section: "section",
  timestamp: "2024-01-01T10:00:25.000Z",
});
```

### 8. view_reel

**Descripción:** Vista de un reel específico en la galería

```javascript
gtmTrack("view_reel", {
  treatment: "mesoterapia", // lipolaser, cavitacion
  reel_id: "DOWPjtcDi1W",
  timestamp: "2024-01-01T10:00:30.000Z",
});
```

---

## Eventos de Interacción (Click Events)

### 1. click_cta_hero

**Descripción:** Click en CTA principal del hero

```javascript
gtmTrack("click_cta_hero", {
  cta_type: "primary",
  cta_location: "hero",
  cta_text: "RESERVA TU EVALUACIÓN GRATUITA",
  timestamp: "2024-01-01T10:01:00.000Z",
});
```

### 2. click*service*[SERVICIO]

**Descripción:** Click en botones de servicios específicos

```javascript
// Servicios disponibles: mesoterapia, prp, lipolaser, radiofrecuencia, cavitacion, vacumterapia
gtmTrack("click_service_mesoterapia", {
  service_type: "mesoterapia",
  service_name: "Mesoterapia",
  timestamp: "2024-01-01T10:02:00.000Z",
});
```

### 3. click_cta_offer

**Descripción:** Click en CTAs de oferta

```javascript
gtmTrack("click_cta_offer", {
  cta_type: "secondary", // primary, secondary
  cta_location: "services", // offer_banner, services
  cta_text: "Quiero mi evaluación gratuita",
  timestamp: "2024-01-01T10:03:00.000Z",
});
```

### 4. click_whatsapp

**Descripción:** Click en enlaces de WhatsApp

```javascript
gtmTrack("click_whatsapp", {
  whatsapp_location: "sticky", // offer_banner, sticky
  timestamp: "2024-01-01T10:04:00.000Z",
});
```

### 5. click_whatsapp_enhanced

**Descripción:** Click en WhatsApp con datos del formulario

```javascript
gtmTrack("click_whatsapp_enhanced", {
  location: "sticky_button",
  has_form_data: true,
  form_completion_percentage: 75,
  included_fields: ["nombre", "servicio", "horario"],
  message_length: 245,
  timestamp: "2024-01-01T10:05:00.000Z",
});
```

### 6. click_reel

**Descripción:** Click en reels de Instagram

```javascript
gtmTrack("click_reel", {
  treatment: "lipolaser",
  reel_id: "DOWPjtcDi1W",
  reel_url: "https://www.instagram.com/reel/DOWPjtcDi1W/",
  location: "gallery",
  action: "external_link",
  timestamp: "2024-01-01T10:06:00.000Z",
});
```

### 7. click_instagram_profile

**Descripción:** Click en perfil de Instagram

```javascript
gtmTrack("click_instagram_profile", {
  location: "gallery_cta",
  action: "external_link",
  url: "https://www.instagram.com/nurse.glowup/",
  timestamp: "2024-01-01T10:07:00.000Z",
});
```

### 8. click_instagram_reel

**Descripción:** Click específico en reel de Instagram

```javascript
gtmTrack("click_instagram_reel", {
  treatment: "mesoterapia",
  reel_id: "DOgjmoLDnt4",
  source: "gallery_section",
  timestamp: "2024-01-01T10:08:00.000Z",
});
```

### 9. click_faq

**Descripción:** Click en preguntas de FAQ

```javascript
gtmTrack("click_faq", {
  faq_question: "¿Qué incluye la evaluación gratuita?",
  timestamp: "2024-01-01T10:09:00.000Z",
});
```

### 10. click_anchor

**Descripción:** Click en enlaces de navegación interna

```javascript
gtmTrack("click_anchor", {
  target_section: "tratamientos", // servicios, testimonios, contacto
  timestamp: "2024-01-01T10:10:00.000Z",
});
```

### 11. hover_reel

**Descripción:** Hover sobre reels

```javascript
gtmTrack("hover_reel", {
  treatment: "cavitacion",
  reel_id: "DObe5TSjqje",
  timestamp: "2024-01-01T10:11:00.000Z",
});
```

---

## Eventos de Formulario

### 1. submit_form

**Descripción:** Envío exitoso del formulario

```javascript
gtmTrack("submit_form", {
  form_data: {
    nombre: "María José",
    servicio: "mesoterapia",
    horario: "tarde",
    has_message: true,
  },
  timestamp: "2024-01-01T10:15:00.000Z",
});
```

### 2. form_error

**Descripción:** Error en validación del formulario

```javascript
gtmTrack("form_error", {
  error_type: "validation",
  missing_fields: ["nombre", "servicio"],
  timestamp: "2024-01-01T10:16:00.000Z",
});
```

### 3. form_step_completed

**Descripción:** Completar paso en formulario inteligente

```javascript
gtmTrack("form_step_completed", {
  step: 1,
  next_step: 2,
  progress_percentage: 50,
  timestamp: "2024-01-01T10:17:00.000Z",
});
```

### 4. form_step_error

**Descripción:** Error en paso del formulario

```javascript
gtmTrack("form_step_error", {
  step: 2,
  timestamp: "2024-01-01T10:18:00.000Z",
});
```

### 5. form_auto_reset

**Descripción:** Reset automático del formulario

```javascript
gtmTrack("form_auto_reset", {
  trigger: "whatsapp_sent",
  delay_seconds: 3,
  timestamp: "2024-01-01T10:19:00.000Z",
});
```

---

## Eventos de Comportamiento

### 1. scroll_progress

**Descripción:** Progreso de scroll en la página

```javascript
gtmTrack("scroll_progress", {
  scroll_percentage: "25", // 25, 50, 75, 100
  timestamp: "2024-01-01T10:20:00.000Z",
});
```

### 2. page_hidden / page_visible

**Descripción:** Cambios de visibilidad de la página

```javascript
gtmTrack("page_hidden", {
  timestamp: "2024-01-01T10:21:00.000Z",
});

gtmTrack("page_visible", {
  timestamp: "2024-01-01T10:21:30.000Z",
});
```

### 3. exit_intent

**Descripción:** Intención de salida (desktop)

```javascript
gtmTrack("exit_intent", {
  timestamp: "2024-01-01T10:22:00.000Z",
});
```

### 4. mobile_cta_shown

**Descripción:** Mostrar CTA móvil sticky

```javascript
gtmTrack("mobile_cta_shown", {
  scroll_position: 800,
  timestamp: "2024-01-01T10:23:00.000Z",
});
```

---

## Eventos de Conversión

### 1. conversion_lead

**Descripción:** Conversión de lead (formulario enviado)

```javascript
gtmTrack("conversion_lead", {
  conversion_type: "form_submission",
  lead_source: "landing_page",
  timestamp: "2024-01-01T10:25:00.000Z",
});
```

---

## Eventos de Performance

### 1. page_performance

**Descripción:** Métricas de rendimiento de la página

```javascript
gtmTrack("page_performance", {
  load_time: 2500, // ms
  dom_content_loaded: 1800, // ms
  first_paint: 1200, // ms
  timestamp: "2024-01-01T10:26:00.000Z",
});
```

---

## Eventos Avanzados CRO

### 1. spots_decreased

**Descripción:** Disminución del contador de cupos

```javascript
gtmTrack("spots_decreased", {
  remaining_spots: 6,
  day_of_week: "wednesday",
  hour: 14,
  is_peak_hour: true,
  total_day_capacity: 18,
  timestamp: "2024-01-01T10:27:00.000Z",
});
```

### 2. spots_counter_init

**Descripción:** Inicialización del contador de cupos

```javascript
gtmTrack("spots_counter_init", {
  initial_spots: 7,
  day_of_week: "wednesday",
  total_day_capacity: 18,
  timestamp: "2024-01-01T10:28:00.000Z",
});
```

### 3. social_proof_shown

**Descripción:** Mostrar popup de prueba social

```javascript
gtmTrack("social_proof_shown", {
  name: "María José",
  location: "Las Condes",
  time: "3 min",
  is_unique: true,
  timestamp: "2024-01-01T10:29:00.000Z",
});
```

### 4. social_proof_init

**Descripción:** Inicialización del sistema de prueba social

```javascript
gtmTrack("social_proof_init", {
  initial_delay_seconds: 60,
  has_previous_session: false,
  timestamp: "2024-01-01T10:30:00.000Z",
});
```

### 5. social_proof_interval

**Descripción:** Intervalo entre popups de prueba social

```javascript
gtmTrack("social_proof_interval", {
  interval_minutes: 4.2,
  timestamp: "2024-01-01T10:31:00.000Z",
});
```

### 6. testimonial_rotated

**Descripción:** Rotación automática de testimonios

```javascript
gtmTrack("testimonial_rotated", {
  testimonial_index: 1,
  timestamp: "2024-01-01T10:32:00.000Z",
});
```

---

## Configuración en GTM

### 1. Variables Recomendadas

#### Variables de Data Layer

- `event` - Nombre del evento
- `timestamp` - Timestamp del evento
- `cta_type` - Tipo de CTA
- `cta_location` - Ubicación del CTA
- `service_type` - Tipo de servicio
- `form_completion_percentage` - Porcentaje de completitud del formulario
- `scroll_percentage` - Porcentaje de scroll

#### Variables Personalizadas

- `Page Title` - {{Page Title}}
- `Page URL` - {{Page URL}}
- `Referrer` - {{Referrer}}
- `User Agent` - {{User Agent}}

### 2. Triggers Recomendados

#### Eventos Personalizados

```
Trigger Type: Custom Event
Event Name:
- page_view
- view_hero
- view_benefits
- view_services
- click_cta_hero
- click_service_mesoterapia
- click_service_prp
- click_service_lipolaser
- click_service_radiofrecuencia
- click_service_cavitacion
- click_service_vacumterapia
- click_whatsapp
- submit_form
- conversion_lead
```

#### Condiciones de Trigger

- `event equals [nombre_evento]`
- `Page URL contains nurse-glow-up`

### 3. Tags Recomendados

#### Google Analytics 4

```
Tag Type: Google Analytics: GA4 Event
Configuration Tag: [GA4_CONFIG]
Event Name: {{event}}
Event Parameters:
- cta_type: {{cta_type}}
- cta_location: {{cta_location}}
- service_type: {{service_type}}
- timestamp: {{timestamp}}
```

#### Facebook Pixel

```
Tag Type: Facebook Pixel
Pixel ID: [FB_PIXEL_ID]
Event Type: Custom
Event Name: {{event}}
Parameters:
- content_category: {{service_type}}
- content_name: {{cta_text}}
- value: 1
```

#### Conversiones Específicas

```
Tag Type: Google Analytics: GA4 Event
Event Name: generate_lead
Parameters:
- currency: CLP
- value: 50000
- lead_source: landing_page
```

### 4. Configuración de Enhanced Ecommerce

Para eventos de conversión, configurar como Enhanced Ecommerce:

```javascript
// Para conversion_lead
gtag("event", "generate_lead", {
  currency: "CLP",
  value: 50000,
  lead_source: "landing_page",
  service_category: "estetica",
});
```

### 5. Audiencias Recomendadas

#### En Google Analytics

- **Usuarios con intención alta**: Usuarios que completaron >50% del formulario
- **Interesados en servicios específicos**: Usuarios que hicieron click en servicios específicos
- **Usuarios comprometidos**: Usuarios con >75% de scroll
- **Usuarios que vieron WhatsApp**: Usuarios que hicieron click en WhatsApp

#### En Facebook

- **Custom Audience**: Usuarios que dispararon `conversion_lead`
- **Lookalike Audience**: Basada en conversiones de leads

---

## Implementación y Testing

### 1. Verificación de Eventos

Usar Google Tag Assistant o GTM Preview para verificar que todos los eventos se disparen correctamente.

### 2. Testing Checklist

- [ ] Eventos de vista se disparan al hacer scroll
- [ ] Eventos de click se disparan correctamente
- [ ] Formulario envía eventos de error y éxito
- [ ] WhatsApp tracking funciona
- [ ] Eventos de performance se capturan
- [ ] Datos se envían a GA4 y Facebook Pixel

### 3. Monitoreo Continuo

- Verificar eventos en GTM Preview mensualmente
- Revisar datos en GA4 semanalmente
- Monitorear conversiones diariamente

---

## Notas Importantes

1. **Privacidad**: Todos los eventos respetan GDPR y no capturan información personal identificable sin consentimiento.

2. **Performance**: Los eventos están optimizados para no afectar el rendimiento de la página.

3. **Debugging**: Todos los eventos incluyen `console.log` para debugging en desarrollo.

4. **Timestamp**: Todos los eventos incluyen timestamp ISO para análisis temporal preciso.

5. **Flexibilidad**: La estructura permite agregar nuevos eventos fácilmente sin modificar la configuración existente.

---

_Documentación generada para Nurse Glow Up Landing Page - Versión 1.0_
