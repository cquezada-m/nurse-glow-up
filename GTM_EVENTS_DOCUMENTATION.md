# Documentación de Eventos GTM - Centro de Estética Premium

## Resumen Ejecutivo

Esta documentación detalla todos los eventos de Google Tag Manager (GTM) implementados en la landing page del centro de estética. Los eventos están diseñados para trackear el customer journey completo desde la llegada hasta la conversión.

## Eventos Implementados

### 1. Eventos de Vista (View Events)

#### `page_view`

- **Descripción**: Evento inicial que se dispara al cargar la página
- **Trigger**: Al cargar la página
- **Parámetros**:
  - `page_title`: Título de la página
  - `page_url`: URL completa
  - `user_agent`: Información del navegador
  - `screen_resolution`: Resolución de pantalla
  - `viewport_size`: Tamaño del viewport
  - `timestamp`: Marca de tiempo ISO

#### `view_hero`

- **Descripción**: Usuario ve la sección hero
- **Trigger**: 1 segundo después de cargar la página
- **Parámetros**:
  - `hero_variant`: Variante A/B del hero (para testing)
  - `section`: Tipo de elemento HTML
  - `timestamp`: Marca de tiempo ISO

#### `view_services`

- **Descripción**: Usuario ve la sección de servicios
- **Trigger**: Intersection Observer (50% visible)
- **Parámetros**:
  - `section`: Tipo de elemento HTML
  - `timestamp`: Marca de tiempo ISO

#### `view_testimonials`

- **Descripción**: Usuario ve la sección de testimonios
- **Trigger**: Intersection Observer (50% visible)
- **Parámetros**:
  - `section`: Tipo de elemento HTML
  - `timestamp`: Marca de tiempo ISO

#### `view_faq`

- **Descripción**: Usuario ve la sección de FAQ
- **Trigger**: Intersection Observer (50% visible)
- **Parámetros**:
  - `section`: Tipo de elemento HTML
  - `timestamp`: Marca de tiempo ISO

#### `view_offer_bar`

- **Descripción**: Usuario ve la barra de oferta superior
- **Trigger**: Intersection Observer (50% visible)
- **Parámetros**:
  - `section`: Tipo de elemento HTML
  - `timestamp`: Marca de tiempo ISO

### 2. Eventos de Interacción (Click Events)

#### `click_cta_hero`

- **Descripción**: Click en CTAs principales del hero
- **Trigger**: Click en botones del hero
- **Parámetros**:
  - `cta_type`: Tipo de CTA (primary/whatsapp)
  - `cta_location`: Ubicación del CTA (hero)
  - `cta_text`: Texto del botón
  - `timestamp`: Marca de tiempo ISO

#### `click_cta_offer`

- **Descripción**: Click en CTA de la oferta especial
- **Trigger**: Click en botón de oferta
- **Parámetros**:
  - `cta_type`: Tipo de CTA
  - `cta_location`: Ubicación del CTA
  - `cta_text`: Texto del botón
  - `timestamp`: Marca de tiempo ISO

#### `click_whatsapp`

- **Descripción**: Click en enlaces de WhatsApp
- **Trigger**: Click en cualquier enlace de WhatsApp
- **Parámetros**:
  - `whatsapp_location`: Ubicación del enlace (sticky/hero/footer)
  - `timestamp`: Marca de tiempo ISO

#### `click_offer`

- **Descripción**: Click en elementos de la oferta
- **Trigger**: Click en banner de oferta
- **Parámetros**:
  - `offer_type`: Tipo de oferta (september_promo)
  - `offer_text`: Texto de la oferta
  - `timestamp`: Marca de tiempo ISO

#### `click_faq`

- **Descripción**: Click en preguntas del FAQ
- **Trigger**: Click en pregunta FAQ
- **Parámetros**:
  - `faq_question`: Texto de la pregunta
  - `timestamp`: Marca de tiempo ISO

#### `click_anchor`

- **Descripción**: Click en enlaces internos de la página
- **Trigger**: Click en enlaces con ancla (#)
- **Parámetros**:
  - `target_section`: ID de la sección destino
  - `timestamp`: Marca de tiempo ISO

### 3. Eventos de Servicios

#### `click_service_mesoterapia`

- **Descripción**: Click en botón de mesoterapia
- **Trigger**: Click en CTA del servicio
- **Parámetros**:
  - `service_type`: mesoterapia
  - `service_name`: Nombre completo del servicio
  - `timestamp`: Marca de tiempo ISO

#### `click_service_prp`

- **Descripción**: Click en botón de PRP
- **Trigger**: Click en CTA del servicio
- **Parámetros**:
  - `service_type`: prp
  - `service_name`: Nombre completo del servicio
  - `timestamp`: Marca de tiempo ISO

#### `click_service_lipolaser`

- **Descripción**: Click en botón de lipoláser
- **Trigger**: Click en CTA del servicio
- **Parámetros**:
  - `service_type`: lipolaser
  - `service_name`: Nombre completo del servicio
  - `timestamp`: Marca de tiempo ISO

#### `click_service_radiofrecuencia`

- **Descripción**: Click en botón de radiofrecuencia
- **Trigger**: Click en CTA del servicio
- **Parámetros**:
  - `service_type`: radiofrecuencia
  - `service_name`: Nombre completo del servicio
  - `timestamp`: Marca de tiempo ISO

#### `click_service_cavitacion`

- **Descripción**: Click en botón de cavitación
- **Trigger**: Click en CTA del servicio
- **Parámetros**:
  - `service_type`: cavitacion
  - `service_name`: Nombre completo del servicio
  - `timestamp`: Marca de tiempo ISO

#### `click_service_vacumterapia`

- **Descripción**: Click en botón de vacumterapia
- **Trigger**: Click en CTA del servicio
- **Parámetros**:
  - `service_type`: vacumterapia
  - `service_name`: Nombre completo del servicio
  - `timestamp`: Marca de tiempo ISO

### 4. Eventos de Formulario

#### `submit_form`

- **Descripción**: Envío exitoso del formulario de contacto
- **Trigger**: Submit del formulario con validación exitosa
- **Parámetros**:
  - `form_data`: Objeto con datos del formulario
    - `nombre`: Nombre del usuario
    - `comuna`: Comuna seleccionada
    - `tratamiento`: Tratamiento de interés
    - `horario`: Horario preferido
    - `has_message`: Boolean si incluyó mensaje
  - `timestamp`: Marca de tiempo ISO

#### `form_error`

- **Descripción**: Error en el formulario
- **Trigger**: Error de validación
- **Parámetros**:
  - `error_type`: Tipo de error (validation/whatsapp_format)
  - `missing_fields`: Array de campos faltantes (si aplica)
  - `whatsapp_value`: Valor del WhatsApp (si error de formato)
  - `timestamp`: Marca de tiempo ISO

#### `conversion_lead`

- **Descripción**: Conversión exitosa de lead
- **Trigger**: Después del envío exitoso del formulario
- **Parámetros**:
  - `conversion_type`: form_submission
  - `lead_source`: landing_page
  - `timestamp`: Marca de tiempo ISO

### 5. Eventos de Comportamiento

#### `scroll_progress`

- **Descripción**: Progreso de scroll en la página
- **Trigger**: Al alcanzar 25%, 50%, 75%, 100% de scroll
- **Parámetros**:
  - `scroll_percentage`: Porcentaje alcanzado (25/50/75/100)
  - `timestamp`: Marca de tiempo ISO

#### `exit_intent`

- **Descripción**: Intención de salida (solo desktop)
- **Trigger**: Mouse sale del viewport por arriba
- **Parámetros**:
  - `timestamp`: Marca de tiempo ISO

#### `page_hidden`

- **Descripción**: Usuario cambia de pestaña/minimiza
- **Trigger**: Evento visibilitychange (hidden)
- **Parámetros**:
  - `timestamp`: Marca de tiempo ISO

#### `page_visible`

- **Descripción**: Usuario regresa a la pestaña
- **Trigger**: Evento visibilitychange (visible)
- **Parámetros**:
  - `timestamp`: Marca de tiempo ISO

### 6. Eventos de Performance

#### `page_performance`

- **Descripción**: Métricas de rendimiento de la página
- **Trigger**: 1 segundo después del evento load
- **Parámetros**:
  - `load_time`: Tiempo total de carga (ms)
  - `dom_content_loaded`: Tiempo DOM ready (ms)
  - `first_paint`: Tiempo first paint (ms)
  - `timestamp`: Marca de tiempo ISO

## Configuración en GTM

### Variables Recomendadas

1. **Data Layer Variables**:

   - `DLV - Event Name`
   - `DLV - CTA Type`
   - `DLV - Service Type`
   - `DLV - Form Data`
   - `DLV - Error Type`
   - `DLV - Timestamp`

2. **Built-in Variables**:
   - Page URL
   - Page Title
   - Click Text
   - Click Element

### Triggers Recomendados

1. **Custom Event Triggers** para cada evento específico
2. **Page View Trigger** para eventos iniciales
3. **Element Visibility Triggers** para eventos de vista
4. **Click Triggers** para interacciones específicas

### Tags Recomendados

1. **Google Analytics 4 Event Tags**
2. **Meta Pixel Event Tags**
3. **Conversion Tracking Tags**

## KPIs y Métricas Clave

### Métricas de Engagement

- Tiempo en página
- Scroll depth promedio
- Interacciones por sesión
- Tasa de rebote

### Métricas de Conversión

- CVR del formulario (objetivo ≥ 6%)
- Clicks en WhatsApp
- Clicks en servicios específicos
- Tasa de abandono del formulario (objetivo < 25%)

### Métricas de Performance

- LCP (objetivo < 2.5s en móvil)
- Tiempo de carga total
- First Paint time

## Implementación Técnica

### Atributos HTML Utilizados

```html
data-gtm-event="nombre_evento" data-gtm-cta="tipo_cta"
data-gtm-location="ubicacion"
```

### Estructura del Data Layer

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "nombre_evento",
  parametro1: "valor1",
  parametro2: "valor2",
  timestamp: new Date().toISOString(),
});
```

## Testing y QA

### Checklist de Verificación

- [ ] Todos los eventos se disparan correctamente
- [ ] Los parámetros contienen datos válidos
- [ ] No hay eventos duplicados
- [ ] Los timestamps son correctos
- [ ] La validación del formulario funciona
- [ ] Los eventos de scroll se disparan una sola vez
- [ ] Los eventos de vista se disparan al 50% de visibilidad

### Herramientas de Testing

- Google Tag Assistant
- GTM Preview Mode
- Google Analytics DebugView
- Meta Pixel Helper

## Mantenimiento

### Actualizaciones Recomendadas

- Revisar eventos mensualmente
- Actualizar ofertas y fechas
- Monitorear performance de conversión
- A/B testing de variantes de hero

### Alertas Sugeridas

- Caída en eventos de conversión
- Aumento en errores de formulario
- Degradación de performance
- Cambios significativos en patrones de comportamiento
