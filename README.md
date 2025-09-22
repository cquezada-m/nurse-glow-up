# Centro de Estética Premium - Landing Page

## 🎯 Descripción del Proyecto

Landing page optimizada para conversión de un centro de estética en Santiago de Chile, diseñada para generar leads calificados y agendamiento de evaluaciones gratuitas.

## 📊 KPIs Objetivo

- **CVR**: ≥ 6%
- **Tasa de abandono de formulario**: < 25%
- **LCP móvil**: < 2.5s
- **CPL**: Optimizado para el mercado chileno

## 🚀 Características Principales

### ✅ Marketing & CRO

- Copywriting orientado a resultados en español chileno
- 6 servicios con microcopy específico
- Oferta limitada con urgencia (20% OFF + evaluación gratuita)
- Prueba social y testimonios reales
- CTAs estratégicamente ubicados
- WhatsApp sticky button

### ✅ SEO & Performance

- HTML semántico optimizado
- Meta tags completos (OG, Twitter Cards)
- JSON-LD schema markup (MedicalBusiness, FAQPage, LocalBusiness)
- Imágenes optimizadas con lazy loading
- LCP < 2.5s objetivo
- Mobile-first responsive design

### ✅ Analytics & Tracking

- 25+ eventos GTM implementados
- Tracking completo del customer journey
- Validación de formulario con tracking de errores
- Métricas de performance automáticas
- Scroll tracking y exit intent

### ✅ UX/UI

- Diseño moderno con paleta profesional
- Componentes accesibles (WCAG AA)
- Navegación intuitiva
- Formulario optimizado para conversión
- FAQ interactivo

## 📁 Estructura de Archivos

```
nurse-glow-up/
├── index.html                    # HTML principal con estructura semántica
├── styles.css                    # CSS con Tailwind + estilos personalizados
├── script.js                     # JavaScript para interacciones y GTM
├── schema.json                   # JSON-LD completo para referencia
├── GTM_EVENTS_DOCUMENTATION.md   # Documentación completa de eventos
└── README.md                     # Este archivo
```

## 🛠️ Instalación y Configuración

### 1. Configuración Básica

```bash
# Clonar o descargar los archivos
# Subir a servidor web o abrir index.html localmente
```

### 2. Personalización Requerida

#### Datos del Centro (Reemplazar en todos los archivos):

- `[Nombre del Centro]` → Nombre real del centro
- `[Comuna]` → Comuna específica
- `+56 9 XXXXX XXXX` → WhatsApp real
- `@[usuario]` → Instagram real
- `info@centroestetica.cl` → Email real
- `Av. Providencia 1234` → Dirección real

#### Imágenes a Reemplazar:

- Hero image (600x400px)
- Antes/después (300x400px cada una)
- Logo (300x100px)
- OG image (1200x630px)
- Favicon

### 3. Configuración GTM

#### Variables Necesarias:

```
- DLV - Event Name
- DLV - CTA Type
- DLV - Service Type
- DLV - Form Data
- DLV - Timestamp
```

#### Triggers Principales:

```
- Custom Event: submit_form
- Custom Event: click_cta_hero
- Custom Event: click_whatsapp
- Custom Event: conversion_lead
```

#### Tags Recomendados:

```
- GA4 Event Tag
- Meta Pixel Event Tag
- Conversion Tracking
```

### 4. Configuración de Analytics

#### Google Analytics 4:

- Configurar eventos de conversión
- Establecer objetivos de formulario
- Configurar audiencias por servicio de interés

#### Meta Pixel:

- Evento ViewContent en hero
- Evento Lead en formulario
- Custom Conversions por servicio

## 📱 Testing y QA

### Checklist Pre-Launch:

- [ ] Todos los datos personalizados actualizados
- [ ] WhatsApp funciona correctamente
- [ ] Formulario envía y valida
- [ ] Eventos GTM se disparan
- [ ] Responsive en móvil/tablet/desktop
- [ ] LCP < 2.5s en móvil
- [ ] Accesibilidad básica (contraste, navegación por teclado)

### Herramientas de Testing:

- Google PageSpeed Insights
- GTM Preview Mode
- Google Tag Assistant
- Meta Pixel Helper
- WAVE Accessibility Checker

## 🎨 Personalización de Diseño

### Colores Principales:

```css
--primary-color: #6a1b9a; /* Lila profesional */
--primary-light: #8e24aa; /* Lila claro */
--accent-color: #ff6b6b; /* Rojo para ofertas */
--text-dark: #2d3748; /* Texto principal */
--bg-light: #f7fafc; /* Fondo claro */
```

### Tipografía:

- Font principal: Inter
- Fallbacks: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

## 📈 Optimización Continua

### A/B Testing Sugerido:

1. **Hero Headlines**:

   - A: "Transforma tu cuerpo y rejuvenece tu piel con tecnología no invasiva"
   - B: "Tu figura, más definida. Tu piel, más firme. Protocolos expertos en Santiago"

2. **CTAs Principales**:

   - A: "Reserva tu evaluación gratuita"
   - B: "Agendar por WhatsApp"

3. **Hero Media**:
   - A: Imagen estática
   - B: Video corto (6-10s)

### Métricas a Monitorear:

- Tasa de conversión por fuente de tráfico
- Abandono por sección del formulario
- Clicks por servicio específico
- Tiempo en página por dispositivo
- Tasa de rebote por landing

## 🔧 Mantenimiento

### Actualizaciones Mensuales:

- [ ] Actualizar fecha de oferta
- [ ] Revisar testimonios y agregar nuevos
- [ ] Actualizar contador de pacientes atendidos
- [ ] Verificar enlaces y formularios
- [ ] Revisar métricas de conversión

### Actualizaciones Trimestrales:

- [ ] Nuevas imágenes antes/después
- [ ] Actualizar precios si aplica
- [ ] Revisar y actualizar FAQ
- [ ] Optimizar según datos de comportamiento

## 📞 Soporte Técnico

### Problemas Comunes:

**Formulario no envía:**

- Verificar validación JavaScript
- Comprobar campos requeridos
- Revisar formato WhatsApp

**GTM no trackea:**

- Verificar GTM container ID
- Comprobar triggers en Preview Mode
- Validar data layer events

**Performance lenta:**

- Optimizar imágenes (WebP/AVIF)
- Verificar CDN de Tailwind
- Revisar scripts de terceros

## 📄 Cumplimiento Legal (Chile)

### Incluido:

- ✅ Disclaimer médico
- ✅ Consentimiento de datos
- ✅ Enlaces a términos y privacidad
- ✅ Información de contacto completa
- ✅ Sin promesas absolutas de resultados

### Pendiente de Implementar:

- [ ] Política de privacidad específica
- [ ] Términos y condiciones
- [ ] Registro en SEREMI si aplica

## 🎯 Próximos Pasos

1. **Personalizar todos los datos** del centro
2. **Configurar GTM** con container propio
3. **Subir imágenes reales** optimizadas
4. **Configurar formulario** con endpoint real
5. **Testing completo** en dispositivos reales
6. **Launch** con monitoreo activo

---

**Desarrollado por:** Especialista en CRO y Marketing Digital  
**Fecha:** Septiembre 2024  
**Versión:** 1.0  
**Compatibilidad:** Todos los navegadores modernos, IE11+
