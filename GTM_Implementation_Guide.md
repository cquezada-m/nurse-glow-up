# Guía de Implementación GTM - Nurse Glow Up

## Configuración Paso a Paso en Google Tag Manager

---

## 📋 Checklist de Implementación

### Fase 1: Configuración Básica

- [ ] Crear cuenta GTM
- [ ] Instalar código GTM en el sitio
- [ ] Configurar Google Analytics 4
- [ ] Configurar Facebook Pixel
- [ ] Verificar instalación

### Fase 2: Variables

- [ ] Crear variables de Data Layer
- [ ] Configurar variables personalizadas
- [ ] Crear variables de utilidad

### Fase 3: Triggers

- [ ] Configurar triggers de eventos básicos
- [ ] Crear triggers de conversión
- [ ] Configurar triggers avanzados CRO

### Fase 4: Tags

- [ ] Configurar tags de GA4
- [ ] Configurar tags de Facebook
- [ ] Crear tags de conversión
- [ ] Configurar tags de remarketing

### Fase 5: Testing

- [ ] Probar en Preview Mode
- [ ] Verificar eventos en GA4
- [ ] Verificar eventos en Facebook
- [ ] Publicar configuración

---

## 🚀 Fase 1: Configuración Básica

### 1.1 Crear Cuenta GTM

1. Ir a [Google Tag Manager](https://tagmanager.google.com)
2. Crear nueva cuenta: "Nurse Glow Up"
3. Crear contenedor: "nurse-glow-up.com" (Web)
4. Copiar el Container ID: `GTM-M3M4KFM3`

### 1.2 Verificar Instalación

El código ya está instalado en el sitio:

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-M3M4KFM3");
</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-M3M4KFM3"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

---

## 🔧 Fase 2: Variables

### 2.1 Variables de Data Layer

#### Variable: Event Name

```
Tipo: Variable de capa de datos
Nombre de variable de capa de datos: event
Nombre de variable: DL - Event Name
```

#### Variable: CTA Type

```
Tipo: Variable de capa de datos
Nombre de variable de capa de datos: cta_type
Nombre de variable: DL - CTA Type
```

#### Variable: CTA Location

```
Tipo: Variable de capa de datos
Nombre de variable de capa de datos: cta_location
Nombre de variable: DL - CTA Location
```

#### Variable: Service Type

```
Tipo: Variable de capa de datos
Nombre de variable de capa de datos: service_type
Nombre de variable: DL - Service Type
```

#### Variable: Form Completion

```
Tipo: Variable de capa de datos
Nombre de variable de capa de datos: form_completion_percentage
Nombre de variable: DL - Form Completion
```

#### Variable: Timestamp

```
Tipo: Variable de capa de datos
Nombre de variable de capa de datos: timestamp
Nombre de variable: DL - Timestamp
```

### 2.2 Variables Personalizadas

#### Variable: Page Category

```
Tipo: JavaScript personalizado
Nombre de variable: Custom - Page Category
Código:
function() {
  var url = {{Page URL}};
  if (url.indexOf('nurse-glow-up') > -1) {
    return 'landing_page';
  }
  return 'other';
}
```

#### Variable: User Type

```
Tipo: JavaScript personalizado
Nombre de variable: Custom - User Type
Código:
function() {
  // Detectar si es primera visita
  var isFirstVisit = !document.cookie.includes('_ga');
  return isFirstVisit ? 'new_visitor' : 'returning_visitor';
}
```

#### Variable: Device Type

```
Tipo: JavaScript personalizado
Nombre de variable: Custom - Device Type
Código:
function() {
  var width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}
```

---

## 🎯 Fase 3: Triggers

### 3.1 Triggers de Eventos Básicos

#### Trigger: Page View

```
Tipo: Evento personalizado
Nombre del evento: page_view
Nombre del activador: Event - Page View
```

#### Trigger: Hero View

```
Tipo: Evento personalizado
Nombre del evento: view_hero
Nombre del activador: Event - Hero View
```

#### Trigger: Benefits View

```
Tipo: Evento personalizado
Nombre del evento: view_benefits
Nombre del activador: Event - Benefits View
```

#### Trigger: Services View

```
Tipo: Evento personalizado
Nombre del evento: view_services
Nombre del activador: Event - Services View
```

### 3.2 Triggers de Interacción

#### Trigger: CTA Hero Click

```
Tipo: Evento personalizado
Nombre del evento: click_cta_hero
Nombre del activador: Event - CTA Hero Click
```

#### Trigger: Service Clicks (Crear uno por cada servicio)

```
Tipo: Evento personalizado
Nombre del evento: click_service_mesoterapia
Nombre del activador: Event - Service Mesoterapia Click

Repetir para:
- click_service_prp
- click_service_lipolaser
- click_service_radiofrecuencia
- click_service_cavitacion
- click_service_vacumterapia
```

#### Trigger: WhatsApp Click

```
Tipo: Evento personalizado
Nombre del evento: click_whatsapp
Nombre del activador: Event - WhatsApp Click
```

### 3.3 Triggers de Formulario

#### Trigger: Form Submit

```
Tipo: Evento personalizado
Nombre del evento: submit_form
Nombre del activador: Event - Form Submit
```

#### Trigger: Form Error

```
Tipo: Evento personalizado
Nombre del evento: form_error
Nombre del activador: Event - Form Error
```

#### Trigger: Lead Conversion

```
Tipo: Evento personalizado
Nombre del evento: conversion_lead
Nombre del activador: Event - Lead Conversion
```

### 3.4 Triggers Avanzados CRO

#### Trigger: Social Proof Shown

```
Tipo: Evento personalizado
Nombre del evento: social_proof_shown
Nombre del activador: Event - Social Proof Shown
```

#### Trigger: Spots Decreased

```
Tipo: Evento personalizado
Nombre del evento: spots_decreased
Nombre del activador: Event - Spots Decreased
```

#### Trigger: Scroll Progress

```
Tipo: Evento personalizado
Nombre del evento: scroll_progress
Nombre del activador: Event - Scroll Progress
```

---

## 🏷️ Fase 4: Tags

### 4.1 Configuración de Google Analytics 4

#### Tag: GA4 Configuration

```
Tipo: Configuración de Google Analytics: GA4
Nombre de la etiqueta: GA4 - Configuration
ID de medición: G-XXXXXXXXXX (reemplazar con tu ID)
Activador: All Pages

Parámetros de configuración:
- custom_map.user_type: {{Custom - User Type}}
- custom_map.device_type: {{Custom - Device Type}}
- custom_map.page_category: {{Custom - Page Category}}
```

#### Tag: GA4 - Page View

```
Tipo: Evento de Google Analytics: GA4
Nombre de la etiqueta: GA4 - Page View
Etiqueta de configuración: {{GA4 - Configuration}}
Nombre del evento: page_view
Activador: Event - Page View

Parámetros del evento:
- page_title: {{Page Title}}
- page_location: {{Page URL}}
- user_type: {{Custom - User Type}}
- device_type: {{Custom - Device Type}}
```

#### Tag: GA4 - Hero View

```
Tipo: Evento de Google Analytics: GA4
Nombre de la etiqueta: GA4 - Hero View
Etiqueta de configuración: {{GA4 - Configuration}}
Nombre del evento: view_hero
Activador: Event - Hero View

Parámetros del evento:
- section_name: hero
- timestamp: {{DL - Timestamp}}
```

#### Tag: GA4 - CTA Click

```
Tipo: Evento de Google Analytics: GA4
Nombre de la etiqueta: GA4 - CTA Click
Etiqueta de configuración: {{GA4 - Configuration}}
Nombre del evento: click_cta
Activador: Event - CTA Hero Click

Parámetros del evento:
- cta_type: {{DL - CTA Type}}
- cta_location: {{DL - CTA Location}}
- timestamp: {{DL - Timestamp}}
```

#### Tag: GA4 - Service Click

```
Tipo: Evento de Google Analytics: GA4
Nombre de la etiqueta: GA4 - Service Click
Etiqueta de configuración: {{GA4 - Configuration}}
Nombre del evento: select_content
Activador: Crear grupo de activadores con todos los service clicks

Parámetros del evento:
- content_type: service
- content_id: {{DL - Service Type}}
- timestamp: {{DL - Timestamp}}
```

#### Tag: GA4 - Lead Conversion

```
Tipo: Evento de Google Analytics: GA4
Nombre de la etiqueta: GA4 - Lead Conversion
Etiqueta de configuración: {{GA4 - Configuration}}
Nombre del evento: generate_lead
Activador: Event - Lead Conversion

Parámetros del evento:
- currency: CLP
- value: 50000
- lead_source: landing_page
- form_completion: {{DL - Form Completion}}
```

### 4.2 Configuración de Facebook Pixel

#### Tag: Facebook Pixel - Base Code

```
Tipo: Facebook Pixel
Nombre de la etiqueta: FB - Base Pixel
ID del píxel: XXXXXXXXXXXXXXX (reemplazar con tu Pixel ID)
Activador: All Pages
```

#### Tag: Facebook - Page View

```
Tipo: Facebook Pixel
Nombre de la etiqueta: FB - Page View
ID del píxel: {{Facebook Pixel ID}}
Tipo de evento: PageView
Activador: Event - Page View
```

#### Tag: Facebook - View Content

```
Tipo: Facebook Pixel
Nombre de la etiqueta: FB - View Content
ID del píxel: {{Facebook Pixel ID}}
Tipo de evento: ViewContent
Activador: Crear grupo con view_benefits, view_services

Parámetros del objeto:
- content_type: service_page
- content_category: estetica
```

#### Tag: Facebook - Lead

```
Tipo: Facebook Pixel
Nombre de la etiqueta: FB - Lead
ID del píxel: {{Facebook Pixel ID}}
Tipo de evento: Lead
Activador: Event - Lead Conversion

Parámetros del objeto:
- value: 50
- currency: CLP
- content_category: estetica
```

### 4.3 Tags de Remarketing

#### Tag: Google Ads - Remarketing

```
Tipo: Google Ads Remarketing
Nombre de la etiqueta: Google Ads - Remarketing
ID de conversión: XXX-XXXXXXX (reemplazar)
Activador: All Pages

Parámetros personalizados:
- user_type: {{Custom - User Type}}
- page_category: {{Custom - Page Category}}
```

---

## 🧪 Fase 5: Testing y Verificación

### 5.1 Preview Mode Testing

1. **Activar Preview Mode**

   - En GTM, hacer click en "Vista previa"
   - Abrir el sitio web en nueva pestaña
   - Verificar que aparezca el panel de GTM

2. **Verificar Eventos Básicos**

   - [ ] `page_view` se dispara al cargar
   - [ ] `view_hero` se dispara después de 1 segundo
   - [ ] `view_benefits` se dispara al hacer scroll
   - [ ] `view_services` se dispara al llegar a servicios

3. **Verificar Eventos de Interacción**

   - [ ] `click_cta_hero` al hacer click en CTA principal
   - [ ] `click_service_*` al hacer click en servicios
   - [ ] `click_whatsapp` al hacer click en WhatsApp
   - [ ] `submit_form` al enviar formulario

4. **Verificar Variables**
   - [ ] `DL - CTA Type` se llena correctamente
   - [ ] `DL - Service Type` captura el servicio correcto
   - [ ] `Custom - Device Type` detecta dispositivo
   - [ ] `DL - Timestamp` tiene formato correcto

### 5.2 Google Analytics 4 Verification

1. **Tiempo Real**

   - Ir a GA4 > Informes > Tiempo real
   - Verificar que aparezcan eventos en vivo
   - Confirmar parámetros personalizados

2. **DebugView**
   - Activar modo debug en GA4
   - Verificar estructura de eventos
   - Confirmar parámetros se envían correctamente

### 5.3 Facebook Pixel Verification

1. **Facebook Pixel Helper**

   - Instalar extensión Facebook Pixel Helper
   - Verificar que pixel se carga correctamente
   - Confirmar eventos se disparan

2. **Events Manager**
   - Ir a Facebook Events Manager
   - Verificar eventos en "Test Events"
   - Confirmar parámetros se reciben

### 5.4 Checklist Final

#### Eventos Críticos

- [ ] Page View tracking funciona
- [ ] CTA clicks se registran
- [ ] Service clicks se capturan
- [ ] Form submissions se trackean
- [ ] WhatsApp clicks se registran
- [ ] Conversions se marcan correctamente

#### Plataformas

- [ ] Google Analytics 4 recibe todos los eventos
- [ ] Facebook Pixel funciona correctamente
- [ ] Google Ads remarketing está activo

#### Performance

- [ ] GTM no afecta velocidad de carga
- [ ] Eventos no causan errores JavaScript
- [ ] Data Layer se inicializa correctamente

---

## 📊 Configuración de Informes

### Google Analytics 4 - Eventos Personalizados

#### Conversiones

Marcar como conversiones en GA4:

- `generate_lead`
- `submit_form`
- `click_whatsapp` (opcional)

#### Audiencias Personalizadas

1. **Usuarios Interesados en Servicios**

   - Condición: `event_name = click_service_mesoterapia OR click_service_prp OR click_service_lipolaser`
   - Duración: 30 días

2. **Usuarios con Alta Intención**

   - Condición: `form_completion_percentage >= 50`
   - Duración: 90 días

3. **Usuarios que Vieron WhatsApp**
   - Condición: `event_name = click_whatsapp`
   - Duración: 7 días

### Facebook - Custom Conversions

#### Lead Conversion

```
Regla: URL contiene "nurse-glow-up" AND Evento = Lead
Valor de conversión: 50 CLP
Categoría: Lead
```

#### Service Interest

```
Regla: Evento personalizado = "click_service"
Valor de conversión: 10 CLP
Categoría: ViewContent
```

---

## 🔧 Mantenimiento y Optimización

### Revisión Mensual

- [ ] Verificar que todos los eventos funcionen
- [ ] Revisar tasas de conversión
- [ ] Analizar embudo de conversión
- [ ] Optimizar audiencias de remarketing

### Actualizaciones Trimestrales

- [ ] Revisar nuevos eventos necesarios
- [ ] Actualizar valores de conversión
- [ ] Optimizar configuración de tags
- [ ] Revisar performance de GTM

### Análisis de Datos

- [ ] Crear dashboard en GA4
- [ ] Configurar alertas de conversión
- [ ] Analizar patrones de comportamiento
- [ ] Optimizar campañas basado en datos

---

## 🚨 Troubleshooting

### Problemas Comunes

#### Eventos no se disparan

1. Verificar que GTM esté instalado correctamente
2. Revisar que el Data Layer se inicialice
3. Confirmar que los triggers estén configurados
4. Verificar JavaScript en consola

#### Variables vacías

1. Verificar nombres de variables en Data Layer
2. Confirmar timing de eventos
3. Revisar configuración de variables personalizadas

#### Conversiones no se registran

1. Verificar que eventos lleguen a GA4
2. Confirmar configuración de conversiones
3. Revisar filtros y audiencias

### Herramientas de Debug

- **GTM Preview Mode**: Para verificar tags y triggers
- **Google Tag Assistant**: Para verificar instalación
- **GA4 DebugView**: Para verificar eventos en GA4
- **Facebook Pixel Helper**: Para verificar Facebook Pixel

---

## 📞 Contacto y Soporte

Para dudas sobre la implementación:

- Documentación técnica: Ver `GTM_Events_Documentation.md`
- Testing: Usar funciones `testFormDataCapture()` y `fillTestData()` en consola
- Debug: Revisar `console.log` en modo desarrollo

---

_Guía de implementación para Nurse Glow Up - Versión 1.0_
_Última actualización: Enero 2024_
