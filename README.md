# Orenda · Diseño Social — Web

Tienda online y landing page para **Orenda Diseño Social**, estudio de papelería ilustrada y sublimación desde Cruz de Piedra, Sonora.

🌐 **Producción:** [orenda-web.netlify.app](https://orenda-web.netlify.app)

Stack: **Vite + React 18**, sin dependencias UI extra. Tipografías de Google Fonts (Fraunces, Quicksand, Caveat).

## Desarrollo

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

## Build de producción

```bash
npm run build    # genera dist/
npm run preview  # prueba el build localmente
```

## Deploy (Netlify)

El sitio está conectado a Netlify (proyecto `orenda-web`, team *orenda fam.*). Para redesplegar:

```bash
npm run build
netlify deploy --prod --dir=dist
```

## Estructura

```
orenda-web/
├── index.html              # Entry HTML
├── public/assets/          # logo-indigo, logo-cream, pattern, products/*
├── src/
│   ├── main.jsx            # Entry React
│   ├── App.jsx             # Toda la app (Nav, Hero, Shop, About, Sublimación, Collections, Testimonials, Newsletter, Footer, CartDrawer, QuickView, Toast)
│   └── index.css           # Tokens de diseño + estilos globales (light + dark)
└── vite.config.js
```

## Funcionalidad

- **Catálogo de 23 productos** con filtrado por categoría (incluye papelería + sublimación).
- **Modo claro / oscuro** con switch en la nav, persistido en `localStorage` y respeta `prefers-color-scheme`.
- **Marquesina de anuncios** y barra de progreso de scroll.
- **Quick View modal** con detalle, features y CTAs.
- **Carrito** con drawer lateral, medidor de envío gratis (≥ $700 MXN) y persistencia en `localStorage`.
- **Favoritos** persistidos en `localStorage`.
- Checkout y CTA de cotización abren **WhatsApp de Orenda** (`526221513198`) con el pedido pre-rellenado en MXN.
- Newsletter con validación de email (UI demo).
- Scroll reveal con `IntersectionObserver` + respeto a `prefers-reduced-motion`.
- `Esc` cierra drawer / modal. Scroll del body bloqueado mientras están abiertos.

## Tokens de diseño

Definidos como CSS variables en `src/index.css`:

- **Acentos de marca (fijos):** `--pink`, `--coral`, `--orange`, `--yellow`, `--lime`, `--sky`, `--indigo`.
- **Neutros temables:** `--bg`, `--bg-2`, `--surface`, `--surface-2`, `--text`, `--text-soft`, `--border`, `--solid`, `--dark-block`. Cambian con `[data-theme="dark"]`.
- **Tipografías:** Fraunces (titulares/precios), Quicksand (UI/body), Caveat (microcopy ornamental).

## Novedades v3 (junio 2026)

- **Hero con fotografía real** (Higgsfield/Nano Banana) con efecto Ken Burns y parallax al mover el mouse sobre el collage.
- **Nueva banda "Showcase"** entre Sobre Orenda y Sublimación: foto de evento a pantalla completa con parallax de scroll.
- **Fotos de producto reales** en Taza, Funda de Celular y Tote Bag sublimadas (CDN Higgsfield).
- **Menú móvil** con hamburguesa (antes los enlaces desaparecían en pantallas ≤1024px sin alternativa).
- **Botones flotantes**: cotizar por WhatsApp + volver arriba, aparecen al hacer scroll.
- **Footer funcional**: los enlaces de Tienda filtran la categoría y navegan; Ayuda abre WhatsApp pre-llenado; se quitó el enlace muerto de Pinterest.
- **SEO**: Open Graph, theme-color y JSON-LD de negocio local en `index.html`.
- **Stats honestos**: el contador de productos ahora se calcula del catálogo real (decía 38, hay 23) y se quitó el "12k+ clientes".
- Accesibilidad: navegación por teclado en logo y enlaces de nav, `aria-expanded` en el menú móvil.

## Pendiente

- Conectar el formulario de newsletter a un servicio real (Mailchimp / Buttondown).
- Si se quiere procesar pagos en la web (no solo cotizar por WhatsApp), añadir Stripe / Mercado Pago.
- Configurar un dominio personalizado en Netlify cuando se compre.
- Generar un hero video real con Higgsfield (requiere créditos) y descargar las imágenes del CDN a `/public/assets` para no depender de cloudfront.
