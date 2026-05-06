# Orenda · Diseño Social — Web

Tienda online y landing page para **Orenda Diseño Social**, estudio de papelería ilustrada (agendas, libretas, stickers, tarjetas y kits creativos).

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

## Estructura

```
orenda-web/
├── index.html              # Entry HTML
├── public/assets/          # pattern.jpg, orenda-logo.png
├── src/
│   ├── main.jsx            # Entry React
│   ├── App.jsx             # Toda la app: Nav, Hero, Shop, About, Collections, Testimonials, Newsletter, Footer, CartDrawer, QuickView, Toast
│   └── index.css           # Tokens de diseño + estilos globales
└── vite.config.js
```

## Funcionalidad

- Catálogo de 12 productos con filtrado por categoría.
- **Quick View modal** con detalle, features y CTAs.
- **Carrito** con drawer lateral, persistido en `localStorage`.
- **Favoritos** persistidos en `localStorage`.
- Checkout abre **WhatsApp** con el pedido pre-rellenado.
- Newsletter con validación de email.
- `Esc` cierra drawer / modal. Scroll del body bloqueado mientras están abiertos.

## Tokens de diseño

Definidos como CSS variables en `src/index.css`:

- Paleta: `--pink`, `--coral`, `--orange`, `--yellow`, `--lime`, `--sky`, `--indigo`, `--cream`, `--cream-2`, `--ink`, `--ink-soft`.
- Tipografías: Fraunces (titulares), Quicksand (UI/body), Caveat (microcopy ornamental).

## Pendiente

- Sustituir los mocks ilustrados (CSS) por **fotos reales** de cada producto. Dejarlas en `public/assets/products/` y referenciarlas desde el array `PRODUCTS` en `src/App.jsx`.
- Conectar el formulario de newsletter a Mailchimp / Buttondown si se quiere captura real.
- Configurar dominio y deploy (Vercel / Netlify / Cloudflare Pages — `npm run build` y subir `dist/`).
