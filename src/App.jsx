import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

/* ============== ORENDA — WHATSAPP ============== */
const ORENDA_WA = '526221513198';
const waLink = (text) => `https://wa.me/${ORENDA_WA}?text=${text}`;

/* ============== DATA ============== */
const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'agendas', label: 'Agendas & Planners' },
  { id: 'libretas', label: 'Libretas' },
  { id: 'stickers', label: 'Stickers' },
  { id: 'tarjetas', label: 'Tarjetas' },
  { id: 'kits', label: 'Kits Creativos' },
  { id: 'vasos', label: 'Vasos' },
  { id: 'sublimacion', label: 'Sublimación' },
];

const PRODUCTS = [
  { id: 1, name: 'Agenda Constelación 2026', cat: 'agendas', catLbl: 'Agenda', price: 450, oldPrice: 580, color: 'var(--coral)', mock: 'agenda', mockText: 'Cons-\ntelación', mockYr: '2026', badge: 'bestseller', desc: 'Agenda semanal en tapa dura con estampado de estrellas, cinta marcadora y pegatinas mensuales.', feats: ['Tapa dura tela', '160 páginas crema', 'Cinta de tela rosa', '+ stickers de regalo'], colors: ['#F08387', '#9DBDE4', '#C7D634'] },
  { id: 2, name: 'Libreta Confetti A5', cat: 'libretas', catLbl: 'Libreta', price: 180, color: 'var(--yellow)', mock: 'agenda', mockText: 'Confetti\nA5', mockYr: 'punteado', badge: 'new', desc: 'Libreta A5 con interior punteado, ideal para bullet journal. Tapa con patrón Orenda.', feats: ['Formato A5', 'Hojas punteadas 90gsm', 'Encuadernación cosida'], colors: ['#F2E32A', '#E91E63', '#4D6BB1'] },
  { id: 3, name: 'Pack Stickers Buenos Días', cat: 'stickers', catLbl: 'Stickers', price: 89, color: 'var(--pink)', image: '/assets/products/stickers.jpg', mock: 'sticker', mockText: '24 stickers', desc: 'Lámina con 24 stickers troquelados de frases positivas y dibujos para alegrar tu día.', feats: ['24 piezas troqueladas', 'Vinilo resistente al agua', 'Diseño exclusivo Orenda'], colors: ['#E91E63', '#F36A1F', '#9DBDE4'] },
  { id: 4, name: 'Tarjeta "Te quiero un montón"', cat: 'tarjetas', catLbl: 'Tarjeta', price: 45, color: 'var(--lime)', mock: 'card', mockText: 'Te quiero un montón', desc: 'Tarjeta doblada con sobre artesanal. Frase ilustrada a mano. Perfecta para regalar.', feats: ['Tarjeta doblada 12×17 cm', 'Papel reciclado 350gsm', 'Sobre crema incluido'], colors: ['#C7D634', '#F08387', '#F2E32A'] },
  { id: 5, name: 'Planner Semanal Crema', cat: 'agendas', catLbl: 'Planner', price: 220, color: 'var(--sky)', mock: 'planner', mockText: 'Semana', desc: 'Bloc planner sin fechas con 52 hojas tear-off. Organiza tu semana con espacio para hábitos y prioridades.', feats: ['Bloc 52 hojas', 'Sin fechar (úsalo cuando quieras)', 'Tamaño A4'], colors: ['#9DBDE4', '#FFF8E1', '#F08387'] },
  { id: 6, name: 'Kit Lettering Principiante', cat: 'kits', catLbl: 'Kit creativo', price: 520, oldPrice: 620, color: 'var(--orange)', mock: 'agenda', mockText: 'Kit\nLettering', mockYr: 'workshop', badge: 'limited', desc: 'Todo lo que necesitas para empezar en el lettering: cuaderno guía, 4 rotuladores y plantillas.', feats: ['Cuaderno guía 64 pp.', '4 rotuladores Tombow', 'Plantillas de práctica'], colors: ['#F36A1F', '#E91E63', '#C7D634'] },
  { id: 7, name: 'Libreta Mini Bolsillo', cat: 'libretas', catLbl: 'Libreta', price: 110, color: 'var(--indigo)', mock: 'agenda', mockText: 'Mini\npocket', mockYr: '40 hojas', desc: 'Libretita de bolsillo para apuntar ideas al vuelo. Pack de 3 colores surtidos.', feats: ['Pack de 3 unidades', 'Tamaño 9×14 cm', 'Hojas lisas color crema'], colors: ['#4D6BB1', '#F36A1F', '#C7D634'] },
  { id: 8, name: 'Postales Ilustradas (set 8)', cat: 'tarjetas', catLbl: 'Postales', price: 140, color: 'var(--coral)', mock: 'card', mockText: 'Hola, hola', desc: 'Set de 8 postales ilustradas con frases en español. Cada una en un color diferente.', feats: ['8 postales 10×15 cm', 'Papel mate 300gsm', 'Para enviar o decorar'], colors: ['#F08387', '#F2E32A', '#9DBDE4'] },
  { id: 9, name: 'Pack de Pines Orenda', cat: 'stickers', catLbl: 'Pines', price: 79, color: 'var(--lime)', image: '/assets/products/pines.jpg', mock: 'sticker', mockText: 'pines', badge: 'new', desc: 'Pines metálicos con ilustraciones Orenda. Para personalizar mochilas, chaquetas o tableros.', feats: ['Pack surtido', 'Cierre de mariposa', 'Diseño exclusivo Orenda'], colors: ['#C7D634', '#F2E32A', '#E91E63'] },
  { id: 10, name: 'Bullet Journal Estrellas', cat: 'libretas', catLbl: 'Bullet Journal', price: 350, color: 'var(--pink)', mock: 'agenda', mockText: 'Bullet\nJournal', mockYr: 'estrellas', badge: 'bestseller', desc: 'Bullet journal premium con páginas punteadas, índice numerado y dos cintas marcadoras.', feats: ['208 páginas punteadas', 'Cubierta con estrellas', '2 cintas + bolsillo'], colors: ['#E91E63', '#4D6BB1', '#F36A1F'] },
  { id: 11, name: 'Kit "Empieza el Año"', cat: 'kits', catLbl: 'Kit', price: 720, color: 'var(--yellow)', mock: 'planner', mockText: 'Año Nuevo', desc: 'Agenda + libreta + pack de stickers + tarjeta de propósitos. Todo en una caja de regalo.', feats: ['Caja-regalo Orenda', '4 productos seleccionados', 'Ahorras $180 vs por separado'], colors: ['#F2E32A', '#E91E63', '#9DBDE4'] },
  { id: 12, name: 'Tarjetas Cumpleaños (3)', cat: 'tarjetas', catLbl: 'Tarjetas', price: 120, color: 'var(--orange)', mock: 'card', mockText: 'Feliz cumple', desc: 'Pack de 3 tarjetas de cumpleaños diferentes con sobres a juego. Frases divertidas.', feats: ['3 diseños distintos', 'Sobres incluidos', 'Hechas en Sonora'], colors: ['#F36A1F', '#F08387', '#C7D634'] },
  { id: 13, name: 'Vaso de Cristal con Tapa de Bambú', cat: 'vasos', catLbl: 'Vaso', price: 260, color: 'var(--sky)', image: '/assets/products/vaso.jpg', mock: 'planner', mockText: 'Vaso', badge: 'bestseller', desc: 'Vaso de cristal con tapa de bambú natural. Incluye tarjeta de cuidados Orenda. Lavar la tapa a mano y evitar choques de temperatura.', feats: ['Cristal + bambú natural', 'Tarjeta de cuidados incluida', 'Lavar tapa a mano'], colors: ['#9DBDE4', '#F5F2EC', '#1B1B1B'] },
  { id: 14, name: 'Camiseta Sublimada', cat: 'sublimacion', catLbl: 'Camiseta', price: 189, color: 'var(--coral)', mock: 'merch', mockIcon: '👕', mockText: 'Camiseta', badge: 'new', desc: 'Camiseta de poliéster con diseño sublimado a todo color. Súbenos tu arte o pídenos un diseño exclusivo Orenda.', feats: ['Tela 100% poliéster', 'Estampado a todo color', 'Tallas S a XL'], colors: ['#F08387', '#9DBDE4', '#F2E32A'] },
  { id: 15, name: 'Funda de Celular Sublimada', cat: 'sublimacion', catLbl: 'Funda', price: 159, color: 'var(--sky)', image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3EpCkQNnbt0hSkcH02Hgqeeay3o/hf_20260607_213944_1582fff2-fa1d-4965-8c2e-2be4d11d1cff.png', mock: 'merch', mockIcon: '📱', mockText: 'Funda', desc: 'Funda rígida para celular con tu foto o diseño sublimado. Disponible para los modelos más vendidos de iPhone y Samsung.', feats: ['Compatible iPhone & Samsung', 'Impresión edge-to-edge', 'Resistente a rayones'], colors: ['#9DBDE4', '#E91E63', '#C7D634'] },
  { id: 16, name: 'Llavero Acrílico Sublimado', cat: 'sublimacion', catLbl: 'Llavero', price: 45, color: 'var(--yellow)', mock: 'merch', mockIcon: '🔑', mockText: 'Llavero', desc: 'Llavero de acrílico transparente con sublimación a dos caras. Perfecto para regalos personalizados de eventos.', feats: ['Acrílico 3 mm', 'Sublimación doble cara', 'Argolla y cadena metálica'], colors: ['#F2E32A', '#F08387', '#4D6BB1'] },
  { id: 17, name: 'Lanyard Sublimado', cat: 'sublimacion', catLbl: 'Lanyard', price: 59, color: 'var(--indigo)', mock: 'merch', mockIcon: '🎫', mockText: 'Lanyard', desc: 'Lanyard de tela continua con diseño sublimado a lo largo. Ideal para eventos, conferencias y porta-gafetes.', feats: ['Tela 2 cm de ancho', 'Clip metálico', 'Estampado a todo color'], colors: ['#4D6BB1', '#F36A1F', '#FFF8E1'] },
  { id: 18, name: 'Taza Cerámica Sublimada', cat: 'sublimacion', catLbl: 'Taza', price: 119, color: 'var(--orange)', image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3EpCkQNnbt0hSkcH02Hgqeeay3o/hf_20260607_213534_9e477529-7308-472b-b772-9c5169dbb547.png', mock: 'merch', mockIcon: '☕', mockText: 'Taza', badge: 'bestseller', desc: 'Taza blanca de cerámica 11 oz sublimada con tu diseño. Apta para microondas y lavavajillas.', feats: ['Cerámica 11 oz', 'Apta microondas', 'Caja regalo incluida'], colors: ['#F36A1F', '#FFFFFF', '#1B1B1B'] },
  { id: 19, name: 'Gorra Sublimada', cat: 'sublimacion', catLbl: 'Gorra', price: 199, color: 'var(--lime)', mock: 'merch', mockIcon: '🧢', mockText: 'Gorra', desc: 'Gorra trucker con frente blanco sublimable y malla en la parte trasera. Ajuste regulable.', feats: ['Frente sublimable', 'Malla transpirable', 'Ajuste snapback'], colors: ['#C7D634', '#1B1B1B', '#F2E32A'] },
  { id: 20, name: 'Mousepad Sublimado', cat: 'sublimacion', catLbl: 'Mousepad', price: 129, color: 'var(--pink)', mock: 'merch', mockIcon: '🖱️', mockText: 'Mousepad', desc: 'Mousepad rectangular con base antideslizante y superficie sublimada a todo color.', feats: ['22 × 18 cm', 'Base de goma', 'Bordes cosidos'], colors: ['#E91E63', '#9DBDE4', '#F2E32A'] },
  { id: 21, name: 'Tote Bag Sublimada', cat: 'sublimacion', catLbl: 'Tote bag', price: 149, color: 'var(--coral)', image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3EpCkQNnbt0hSkcH02Hgqeeay3o/hf_20260607_213540_06c456f3-7c0c-4381-97b2-e104ef96ba15.png', mock: 'merch', mockIcon: '👜', mockText: 'Tote', desc: 'Bolsa tote de tela mixta sublimable, reforzada en las asas. Perfecta para uso diario o como regalo de evento.', feats: ['38 × 42 cm', 'Asas reforzadas', 'Estampado a todo color'], colors: ['#F08387', '#FFF8E1', '#4D6BB1'] },
  { id: 22, name: 'Funda de Cojín Sublimada', cat: 'sublimacion', catLbl: 'Funda cojín', price: 229, color: 'var(--yellow)', mock: 'merch', mockIcon: '🛋️', mockText: 'Cojín', desc: 'Funda de cojín 40×40 cm sublimada por ambos lados. Ideal para regalo personalizado o decoración del hogar.', feats: ['40 × 40 cm', 'Cierre invisible', 'Funda sin relleno'], colors: ['#F2E32A', '#F08387', '#9DBDE4'] },
  { id: 23, name: 'Botella de Aluminio Sublimada', cat: 'sublimacion', catLbl: 'Botella', price: 179, color: 'var(--sky)', mock: 'merch', mockIcon: '🥤', mockText: 'Botella', desc: 'Botella de aluminio de 600 ml con tapón de rosca, sublimada con tu diseño. Lavar a mano.', feats: ['Aluminio 600 ml', 'Tapón hermético', 'Lavar a mano'], colors: ['#9DBDE4', '#1B1B1B', '#F36A1F'] },
];

const TESTIMONIALS = [
  { name: 'Lucía M.', role: 'Cliente desde 2023', text: 'La agenda Constelación me ha cambiado la forma de organizarme. Las pegatinas mensuales son adictivas, ya quiero la del año que viene.', color: 'var(--pink)', initials: 'LM' },
  { name: 'Diego R.', role: 'Profe de primaria', text: 'Compré el kit de lettering para mi clase y los niños alucinan. La calidad es increíble y los detalles cuidadísimos.', color: 'var(--indigo)', initials: 'DR' },
  { name: 'Carla S.', role: 'Bullet journal addict', text: 'Llevo tres bullets de Orenda y son los mejores que he probado. El papel aguanta de todo y las estrellas son un puntazo.', color: 'var(--orange)', initials: 'CS' },
];

const STATS = [
  { to: PRODUCTS.length, suffix: '', lbl: 'productos en catálogo' },
  { to: 10, suffix: '', lbl: 'superficies sublimables' },
  { to: 100, suffix: '%', lbl: 'diseño propio' },
];

/* ============== ICONS ============== */
const Icon = ({ name, size = 20 }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'cart': return <svg {...props}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>;
    case 'heart': return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>;
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    case 'user': return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case 'plus': return <svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
    case 'minus': return <svg {...props}><line x1="5" y1="12" x2="19" y2="12" /></svg>;
    case 'arrow': return <svg {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
    case 'close': return <svg {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
    case 'ig': return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
    case 'tt': return <svg {...props}><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" /></svg>;
    case 'pin': return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M8 12s1.5 5 4 5 4-3 4-5" /><circle cx="12" cy="9" r="1" /></svg>;
    case 'menu': return <svg {...props}><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></svg>;
    case 'wa': return <svg {...props}><path d="M21 11.5a8.5 8.5 0 01-12.6 7.4L4 20l1.1-4.4A8.5 8.5 0 1121 11.5z" /><path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5-2-1-1 .5c-.8-.5-1.5-1.2-2-2l.5-1-1-2L9 9.5z" /></svg>;
    case 'up': return <svg {...props}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>;
    case 'moon': return <svg {...props}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>;
    case 'sun': return <svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>;
    default: return null;
  }
};

/* ============== ORENDA LOGO (real wordmark, theme-aware) ============== */
const OrendaLogo = ({ variant }) => (
  <span className={'orenda-logo' + (variant ? ' ' + variant : '')}>
    <img className="logo-light" src="/assets/logo-indigo.png" alt="Orenda Diseño Social" draggable="false" />
    <img className="logo-dark" src="/assets/logo-cream.png" alt="Orenda Diseño Social" draggable="false" />
  </span>
);

/* ============== PRODUCT MOCK ============== */
const ProductMock = ({ type, text, year, icon }) => {
  if (type === 'merch') {
    return (
      <div className="product-mock">
        <div className="mock-merch">
          <div className="merch-ic">{icon || '✦'}</div>
          <div className="merch-lbl">{text || 'Sublimable'}</div>
          <div className="merch-deco">sublimación · orenda</div>
        </div>
      </div>
    );
  }
  if (type === 'agenda') {
    const lines = (text || '').split('\n');
    return (
      <div className="product-mock">
        <div className="mock-agenda">
          <div className="spine"></div>
          <div className="ttl">{lines[0]}{lines[1] && <em><br />{lines[1]}</em>}</div>
          {year && <div className="yr">{year}</div>}
          <div className="stars">✦ ✦</div>
        </div>
      </div>
    );
  }
  if (type === 'sticker') {
    return (
      <div className="product-mock">
        <div className="mock-sticker">
          <div className="s s1">hola!</div>
          <div className="s s2">✦ tú puedes ✦</div>
          <div className="s s3">buenos<br />días</div>
          <div className="s s4">♥</div>
        </div>
      </div>
    );
  }
  if (type === 'card') {
    return (
      <div className="product-mock">
        <div className="mock-card">
          <div className="deco">✦</div>
          <div className="quote">"{text || 'Hola'}"</div>
          <div className="sig">— con cariño</div>
        </div>
      </div>
    );
  }
  if (type === 'planner') {
    return (
      <div className="product-mock">
        <div className="mock-planner">
          <div className="hd">Lunes</div>
          <div className="row"><div className="chk done"></div><div className="ln done"></div></div>
          <div className="row"><div className="chk done"></div><div className="ln done short"></div></div>
          <div className="row"><div className="chk"></div><div className="ln"></div></div>
          <div className="row"><div className="chk"></div><div className="ln short"></div></div>
          <div className="row"><div className="chk"></div><div className="ln"></div></div>
          <div className="row"><div className="chk"></div><div className="ln short"></div></div>
        </div>
      </div>
    );
  }
  return null;
};

/* ============== PRODUCT VISUAL (photo with mock fallback) ============== */
const ProductVisual = ({ p, cls }) => {
  const [err, setErr] = useState(false);
  if (p.image && !err) return <img src={p.image} alt={p.name} className={cls} loading="lazy" onError={() => setErr(true)} />;
  return <ProductMock type={p.mock} text={p.mockText} year={p.mockYr} icon={p.mockIcon} />;
};

const ItemThumb = ({ item }) => {
  const [err, setErr] = useState(false);
  if (item.image && !err) return <img src={item.image} alt="" onError={() => setErr(true)} />;
  return <span>{item.name.split(' ')[0].slice(0, 3)}</span>;
};

/* ============== COUNT-UP ============== */
const CountUp = ({ to, suffix = '', dur = 1400 }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !fired.current) {
          fired.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

/* ============== ANNOUNCEMENT BAR ============== */
const Announce = () => {
  const items = ['Envío gratis a partir de $700', 'Nueva colección Constelación 2026', 'Nuevo: sublimación a todo color', 'Hecho a mano en Sonora'];
  const loop = [...items, ...items];
  return (
    <div className="announce">
      <div className="announce-track">
        {loop.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
};

/* ============== SCROLL PROGRESS ============== */
const ScrollProgress = () => {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (ref.current) ref.current.style.width = pct + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" ref={ref}></div>;
};

/* ============== NAV ============== */
const NAV_LINKS = [
  { id: 'shop', lbl: 'Tienda' },
  { id: 'sublimacion', lbl: 'Sublimación' },
  { id: 'collections', lbl: 'Colecciones' },
  { id: 'about', lbl: 'Sobre Orenda' },
  { id: 'newsletter', lbl: 'Newsletter' },
];

const Nav = ({ cartCount, onCartOpen, onNav, theme, onToggleTheme }) => {
  const badgeRef = useRef(null);
  const prev = useRef(cartCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id) => { setMenuOpen(false); onNav(id); };
  useEffect(() => {
    if (cartCount > prev.current && badgeRef.current) {
      badgeRef.current.classList.remove('bump');
      void badgeRef.current.offsetWidth;
      badgeRef.current.classList.add('bump');
    }
    prev.current = cartCount;
  }, [cartCount]);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => go('top')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go('top'); } }} role="button" tabIndex={0} aria-label="Orenda — ir al inicio">
          <OrendaLogo variant="nav-logo-mark" />
        </div>
        <div className="nav-links">
          {NAV_LINKS.map(l => <a key={l.id} role="button" tabIndex={0} onClick={() => go(l.id)} onKeyDown={(e) => { if (e.key === 'Enter') go(l.id); }}>{l.lbl}</a>)}
        </div>
        <div className="nav-actions">
          <button className="icon-btn theme-toggle" aria-label="Cambiar tema" onClick={onToggleTheme}>
            <span className="tt-icon"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></span>
          </button>
          <button className="icon-btn" aria-label="Carrito" onClick={onCartOpen}>
            <Icon name="cart" />
            <span ref={badgeRef} className={'cart-badge ' + (cartCount > 0 ? 'show' : '')}>{cartCount}</span>
          </button>
          <button className="icon-btn nav-burger" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <div className={'nav-mobile ' + (menuOpen ? 'open' : '')}>
        {NAV_LINKS.map(l => <a key={l.id} role="button" tabIndex={menuOpen ? 0 : -1} onClick={() => go(l.id)}>{l.lbl}</a>)}
        <a className="nav-mobile-wa" href={waLink('Hola%20Orenda%2C%20quiero%20cotizar%20un%20pedido')} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp</a>
      </div>
    </nav>
  );
};

/* ============== HERO ============== */
const HERO_PHOTO = 'https://d8j0ntlcm91z4.cloudfront.net/user_3EpCkQNnbt0hSkcH02Hgqeeay3o/hf_20260607_213529_5e95a41c-7860-4e0e-871e-6e869d6ee271.png';
const SHOWCASE_PHOTO = 'https://d8j0ntlcm91z4.cloudfront.net/user_3EpCkQNnbt0hSkcH02Hgqeeay3o/hf_20260607_213939_4ca01a65-dbd8-4ca0-8599-1acc0c0c4f9a.png';

const Hero = ({ onNav }) => {
  const artRef = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onMove = (e) => {
    if (reduce || !artRef.current) return;
    const r = artRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    artRef.current.style.setProperty('--mx', px.toFixed(3));
    artRef.current.style.setProperty('--my', py.toFixed(3));
  };
  const onLeave = () => {
    if (!artRef.current) return;
    artRef.current.style.setProperty('--mx', 0);
    artRef.current.style.setProperty('--my', 0);
  };
  return (
  <section className="hero" id="top" data-reveal>
    <div className="hero-pattern"></div>
    <div className="hero-content">
      <div className="eyebrow"><span className="dot"></span>Nueva colección 2026 ya disponible</div>
      <h1>
        Papelería con <span className="swirl">alma</span><br />
        para días que <span className="indigo">brillan</span>.
      </h1>
      <p className="lead">
        Diseñamos agendas, libretas y stickers que te acompañan a hacer las cosas a tu manera.
        Hechos a mano en pequeño formato, con papel bonito y muchísimo cariño.
      </p>
      <div className="hero-cta">
        <button className="btn btn-primary" onClick={() => onNav('shop')}>Ver tienda <Icon name="arrow" size={16} /></button>
        <button className="btn btn-ghost" onClick={() => onNav('about')}>Conoce a Orenda</button>
      </div>
      <div className="hero-stats">
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <div className="num"><CountUp to={s.to} suffix={s.suffix} /></div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="hero-art" ref={artRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="floating-shape fs-1">✦</div>
      <div className="floating-shape fs-2">♥</div>
      <div className="ha-card ha-1 ha-photo">
        <img src={HERO_PHOTO} alt="Pedido real Orenda: piezas personalizadas y sublimadas" loading="eager" fetchpriority="high" />
        <span className="ha-caption">pedido real ✦ orenda</span>
      </div>
      <div className="ha-card ha-2"><ProductMock type="sticker" /></div>
      <div className="ha-card ha-3"><ProductMock type="planner" /></div>
      <div className="ha-card ha-4 ha-yellow"><ProductMock type="card" text="Te quiero" /></div>
    </div>
  </section>
  );
};

/* ============== PRODUCT CARD (with tilt) ============== */
const ProductCard = ({ p, onAdd, onLike, liked, onQuickView, index }) => {
  const ref = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-6px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div className="card" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      onClick={() => onQuickView(p)} data-reveal style={{ transitionDelay: (index % 4) * 70 + 'ms' }}>
      <div className="card-img" style={{ background: p.color }}>
        {p.badge && <div className={'badge ' + p.badge}>{p.badge === 'new' ? 'Nuevo' : p.badge === 'bestseller' ? 'Más vendido' : 'Edición limitada'}</div>}
        <button className={'like-btn ' + (liked ? 'liked' : '')} onClick={(e) => { e.stopPropagation(); e.currentTarget.classList.remove('pop'); void e.currentTarget.offsetWidth; e.currentTarget.classList.add('pop'); onLike(p.id); }} aria-label={liked ? 'Quitar de favoritos' : 'Añadir a favoritos'}>
          <Icon name="heart" size={16} />
        </button>
        <ProductVisual p={p} cls="card-photo" />
      </div>
      <div className="card-body">
        <div className="card-cat">{p.catLbl}</div>
        <div className="card-name">{p.name}</div>
        <div className="card-desc">{p.desc.length > 70 ? p.desc.slice(0, 70) + '…' : p.desc}</div>
        <div className="card-foot">
          <div className="price">{p.oldPrice && <del>${p.oldPrice}</del>}<small>desde</small>${p.price}</div>
          <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAdd(p); }} aria-label="Añadir al carrito"><Icon name="plus" size={16} /></button>
        </div>
      </div>
    </div>
  );
};

/* ============== SHOP ============== */
const Shop = ({ onAdd, liked, onLike, onQuickView }) => {
  const [cat, setCat] = useState('todos');
  useEffect(() => {
    const onCat = (e) => { if (CATEGORIES.some(c => c.id === e.detail)) setCat(e.detail); };
    window.addEventListener('orenda:cat', onCat);
    return () => window.removeEventListener('orenda:cat', onCat);
  }, []);
  const filtered = useMemo(() => cat === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat), [cat]);
  return (
    <section id="shop">
      <div className="section-head" data-reveal>
        <div><h2>La <em>tienda</em><br />de Orenda</h2></div>
        <p>Piezas pensadas para acompañar tus días: organiza, decora y regala con un toque de color.</p>
      </div>
      <div className="cat-tabs" data-reveal>
        {CATEGORIES.map(c => {
          const count = c.id === 'todos' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === c.id).length;
          return <button key={c.id} className={'cat-tab ' + (cat === c.id ? 'active' : '')} onClick={() => setCat(c.id)}>{c.label}<span className="cat-count">{count}</span></button>;
        })}
      </div>
      <div className="grid">
        {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} onAdd={onAdd} onLike={onLike} liked={liked.includes(p.id)} onQuickView={onQuickView} />)}
      </div>
    </section>
  );
};

/* ============== ABOUT ============== */
const About = () => (
  <section id="about" style={{ padding: 0 }}>
    <div className="about-band" data-reveal>
      <div>
        <h2>Detrás de Orenda hay<br />una idea: <em>diseñar bonito<br />también es cuidar</em>.</h2>
        <p>Nacimos en Cruz de Piedra, Sonora, con dos cuadernos, una impresora cansada y muchas ganas. Hoy somos un estudio pequeño que diseña, imprime y envía cada pedido a mano.</p>
        <p>"Orenda" es una palabra de origen iroqués que se refiere a esa fuerza creativa que tenemos dentro. Eso es justo lo que queremos despertar con cada producto.</p>
      </div>
      <div className="about-pillars">
        <div className="pillar"><div className="ic">✦</div><h4>Diseño propio</h4><p>Cada ilustración nace en nuestro estudio. Nada es plantilla.</p></div>
        <div className="pillar"><div className="ic">♥</div><h4>Imprenta local</h4><p>Imprimimos en pequeño formato con socios cerquita de casa.</p></div>
        <div className="pillar"><div className="ic">⌘</div><h4>Papel responsable</h4><p>FSC, reciclado y siempre libre de plásticos innecesarios.</p></div>
        <div className="pillar"><div className="ic">⚘</div><h4>Hecho con calma</h4><p>Sin colecciones masivas. Producimos lo justo, con cariño.</p></div>
      </div>
    </div>
  </section>
);

/* ============== SHOWCASE (pedido real, parallax) ============== */
const Showcase = () => {
  const imgRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = imgRef.current;
        if (el) {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) {
            const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
            el.style.transform = `translateY(${(p * -10).toFixed(2)}%)`;
          }
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className="showcase" aria-label="Pedido real de Orenda">
      <img ref={imgRef} src={SHOWCASE_PHOTO} alt="Mesa de evento con piezas personalizadas Orenda" loading="lazy" />
      <div className="showcase-scrim"></div>
      <div className="showcase-txt" data-reveal>
        <h2>Tu fiesta, <em>en cada detalle</em>.</h2>
        <p>De la etiqueta al recuerdo: armamos la mesa completa de tu evento.</p>
      </div>
    </section>
  );
};

/* ============== SUBLIMACIÓN ============== */
const Sublimation = ({ onNav }) => {
  const items = [
    { ic: '👕', lbl: 'Camisetas' },
    { ic: '📱', lbl: 'Fundas de celular' },
    { ic: '🔑', lbl: 'Llaveros' },
    { ic: '🎫', lbl: 'Lanyards' },
    { ic: '☕', lbl: 'Tazas' },
    { ic: '🧢', lbl: 'Gorras' },
    { ic: '🖱️', lbl: 'Mousepads' },
    { ic: '👜', lbl: 'Tote bags' },
    { ic: '🛋️', lbl: 'Fundas de cojín' },
    { ic: '🥤', lbl: 'Botellas' },
  ];
  return (
    <section id="sublimacion">
      <div className="sublim-band" data-reveal>
        <div className="sublim-head">
          <div className="eyebrow" style={{ background: 'var(--surface)', boxShadow: '3px 3px 0 var(--pink)' }}>
            <span className="dot"></span>Nuevo servicio
          </div>
          <h2>Sublimación a <em>todo color</em>,<br />en cualquier superficie.</h2>
          <p>Trasladamos tus diseños a textiles y accesorios con tintas que se funden con el material. Color vivo, tacto suave y un acabado que aguanta lavadas, sol y el uso diario. Ideal para eventos, regalos personalizados o tu propia marca.</p>
          <div className="sublim-cta">
            <button className="btn btn-primary" onClick={() => onNav('shop')}>
              Ver productos sublimables <Icon name="arrow" size={16} />
            </button>
            <a className="btn btn-ghost" href={waLink('Hola%20Orenda%2C%20quiero%20cotizar%20una%20sublimaci%C3%B3n')} target="_blank" rel="noopener noreferrer">Cotizar mi diseño</a>
          </div>
        </div>
        <div className="sublim-grid">
          {items.map((it, i) => (
            <div key={i} className="sublim-item" data-reveal style={{ transitionDelay: (i % 5) * 60 + 'ms' }}>
              <div className="sublim-ic">{it.ic}</div>
              <div className="sublim-lbl">{it.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============== COLLECTIONS ============== */
const Collections = ({ onNav }) => (
  <section id="collections">
    <div className="section-head" data-reveal>
      <div><h2>Por <em>colecciones</em></h2></div>
      <p>Encuentra el universo Orenda que mejor encaja contigo. De lo más cálido a lo más vibrante.</p>
    </div>
    <div className="collections">
      <div className="col col-1" data-reveal onClick={() => onNav('shop')}>
        <div><h3>Constelación<br />2026</h3><p>Agendas, libretas y stickers de la nueva colección estrella. Tonos coral y azul cielo.</p></div>
        <div className="arrow"><Icon name="arrow" size={18} /></div>
      </div>
      <div className="col col-2" data-reveal style={{ transitionDelay: '60ms' }} onClick={() => onNav('shop')}><div><h3>Confetti</h3><p>Vibrante y festivo.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
      <div className="col col-3" data-reveal style={{ transitionDelay: '120ms' }} onClick={() => onNav('shop')}><div><h3>Cielo</h3><p>Azules y calma.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
      <div className="col col-4" data-reveal style={{ transitionDelay: '180ms' }} onClick={() => onNav('shop')}><div><h3>Hojaverde</h3><p>Botánico y suave.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
      <div className="col col-5" data-reveal style={{ transitionDelay: '240ms' }} onClick={() => onNav('shop')}><div><h3>Sol</h3><p>Cálido y energético.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
    </div>
  </section>
);

/* ============== TESTIMONIALS ============== */
const Testimonials = () => (
  <section>
    <div className="testimonials" data-reveal>
      <div className="section-head" style={{ marginBottom: 32 }}>
        <div><h2>Lo que dicen<br />de <em>nosotros</em></h2></div>
        <p>Personas que ya traen un trocito de Orenda en su día a día.</p>
      </div>
      <div className="testi-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testi" data-reveal style={{ transitionDelay: i * 90 + 'ms' }}>
            <div className="quote-mark">"</div>
            <div className="stars-r">★★★★★</div>
            <p>{t.text}</p>
            <div className="who">
              <div className="ava" style={{ background: t.color }}>{t.initials}</div>
              <div><div className="nm">{t.name}</div><div className="rl">{t.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============== NEWSLETTER ============== */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) { setSent(true); setEmail(''); setTimeout(() => setSent(false), 3000); }
  };
  return (
    <section id="newsletter">
      <div className="newsletter" data-reveal>
        <h2>Únete al <em>club</em> Orenda</h2>
        <p>Una vez al mes te mandamos novedades, descargables gratis y descuentos solo-para-suscriptores. Cero spam, mucho cariño.</p>
        <form className="nl-form" onSubmit={submit}>
          <input type="email" placeholder={sent ? '¡Bienvenida al club! ✦' : 'tu@email.com'} value={email} onChange={(e) => setEmail(e.target.value)} disabled={sent} aria-label="Email" />
          <button className="btn" type="submit">{sent ? '¡Hecho!' : 'Suscribirme'}</button>
        </form>
        <div className="nl-perks">
          <span>10% en tu primera compra</span><span>Imprimibles gratis</span><span>Acceso anticipado a nuevas colecciones</span>
        </div>
      </div>
    </section>
  );
};

/* ============== FOOTER ============== */
const Footer = ({ onNav }) => (
  <footer data-reveal>
    <div className="foot-grid">
      <div className="foot-brand">
        <OrendaLogo variant="foot-logo-mark" />
        <p>Estudio de diseño social y papelería con alma. Hecho con calma desde Cruz de Piedra, Sonora.</p>
        <div className="socials">
          <a href="https://instagram.com/orenda.social" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="ig" size={16} /></a>
          <a href="https://www.tiktok.com/@orenda.social?lang=es-419" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Icon name="tt" size={16} /></a>
          <a href={waLink('Hola%20Orenda%21')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="wa" size={16} /></a>
        </div>
      </div>
      <div><h5>Tienda</h5>
        {[['agendas','Agendas & Planners'],['libretas','Libretas'],['stickers','Stickers'],['tarjetas','Tarjetas'],['sublimacion','Sublimación']].map(([id,lbl]) => (
          <a key={id} role="button" tabIndex={0} onClick={() => { window.dispatchEvent(new CustomEvent('orenda:cat', { detail: id })); onNav('shop'); }}>{lbl}</a>
        ))}
      </div>
      <div><h5>Orenda</h5>
        <a role="button" tabIndex={0} onClick={() => onNav('about')}>Sobre nosotras</a>
        <a role="button" tabIndex={0} onClick={() => onNav('collections')}>Colecciones</a>
        <a role="button" tabIndex={0} onClick={() => onNav('newsletter')}>Newsletter</a>
        <a href="https://instagram.com/orenda.social" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <div><h5>Ayuda</h5>
        <a href={waLink('Hola%20Orenda%2C%20tengo%20una%20duda%20sobre%20env%C3%ADos')} target="_blank" rel="noopener noreferrer">Envíos y entregas</a>
        <a href={waLink('Hola%20Orenda%21')} target="_blank" rel="noopener noreferrer">Contacto</a>
        <a href={waLink('Hola%20Orenda%2C%20quiero%20cotizar%20un%20pedido%20personalizado')} target="_blank" rel="noopener noreferrer">Cotizaciones</a>
      </div>
    </div>
    <div className="foot-bottom">
      <span>© {new Date().getFullYear()} Orenda Diseño Social · Cruz de Piedra, Sonora · México</span>
      <span>Política de privacidad · Términos · Cookies</span>
    </div>
  </footer>
);

/* ============== CART DRAWER ============== */
const FREE_SHIPPING = 700;
const SHIPPING_COST = 80;
const fmt = (n) => n.toLocaleString('es-MX');

const CartDrawer = ({ open, onClose, cart, setCart }) => {
  const remove = (id) => setCart(cart.filter(c => c.id !== id));
  const updateQty = (id, delta) => setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = subtotal > 0 ? (subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST) : 0;
  const freePct = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const checkout = () => {
    const lines = cart.map(i => `• ${i.qty}× ${i.name} — $${fmt(i.price * i.qty)} MXN`).join('%0A');
    const total = fmt(subtotal + shipping);
    const msg = `¡Hola Orenda! Quiero hacer un pedido:%0A%0A${lines}%0A%0ATotal: $${total} MXN`;
    window.open(waLink(msg), '_blank');
  };
  return (
    <>
      <div className={'drawer-overlay ' + (open ? 'open' : '')} onClick={onClose}></div>
      <aside className={'drawer ' + (open ? 'open' : '')} aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Tu carrito {cart.length > 0 && <span style={{ color: 'var(--pink)' }}>({cart.reduce((s, c) => s + c.qty, 0)})</span>}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar carrito"><Icon name="close" /></button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <div className="em">✦ vacío ✦</div>
              <p>Aún no has añadido nada.<br />Date una vuelta por la tienda.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img" style={{ background: item.color }}>
                <ItemThumb item={item} />
              </div>
              <div>
                <h4>{item.name}</h4>
                <div className="meta">{item.catLbl}</div>
                <div className="qty">
                  <button onClick={() => updateQty(item.id, -1)} aria-label="Restar"><Icon name="minus" size={12} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} aria-label="Sumar"><Icon name="plus" size={12} /></button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="ip">${fmt(item.price * item.qty)}</div>
                <button className="rm" onClick={() => remove(item.id)}>Quitar</button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className={'ship-meter ' + (shipping === 0 ? 'done' : '')}>
              <div className="lbl">{shipping === 0 ? '🎉 ¡Tienes envío gratis!' : <>Te faltan <b>${fmt(FREE_SHIPPING - subtotal)}</b> para el envío gratis</>}</div>
              <div className="ship-bar"><i style={{ width: freePct + '%' }}></i></div>
            </div>
            <div className="totals">
              <div className="row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
              <div className="row"><span>Envío {shipping === 0 && <em style={{ color: 'var(--pink)', fontStyle: 'normal' }}>· gratis</em>}</span><span>{shipping === 0 ? '$0' : '$' + fmt(shipping)}</span></div>
              <div className="row tot"><span>Total</span><span>${fmt(subtotal + shipping)} <small style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-soft)', letterSpacing: '.05em' }}>MXN</small></span></div>
            </div>
            <p className="wa-hint">
              Te abriremos WhatsApp con tu pedido pre-llenado. Si es tu primera vez,
              <b> guarda nuestro número (622 151 3198)</b> como <b>“Orenda”</b> para que el chat aparezca directo.
            </p>
            <button className="btn btn-primary checkout-btn" onClick={checkout}>Enviar pedido por WhatsApp <Icon name="arrow" size={16} /></button>
          </div>
        )}
      </aside>
    </>
  );
};

/* ============== QUICK VIEW ============== */
const QuickView = ({ product, onClose, onAdd }) => {
  if (!product) return null;
  return (
    <div className="modal-ov open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-img" style={{ background: product.color }}>
          <ProductVisual key={product.id} p={product} cls="modal-photo" />
        </div>
        <div className="modal-info">
          <button className="modal-close" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={16} /></button>
          <div className="cat-tag">{product.catLbl}</div>
          <h2>{product.name}</h2>
          <div className="price-big">{product.oldPrice && <del style={{ fontSize: 18, color: 'var(--text-soft)', marginRight: 10, fontWeight: 600 }}>${product.oldPrice}</del>}${product.price} <span style={{ fontSize: 14, color: 'var(--text-soft)', fontWeight: 600, letterSpacing: '.05em' }}>MXN</span></div>
          <p className="desc">{product.desc}</p>
          <div className="modal-feat">{product.feats.map((f, i) => <div key={i} className="ft">{f}</div>)}</div>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={() => { onAdd(product); onClose(); }}>Añadir al carrito <Icon name="cart" size={16} /></button>
            <button className="btn btn-ghost" onClick={onClose}>Seguir mirando</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============== FLOATING ACTIONS ============== */
const FloatingActions = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={'float-actions ' + (show ? 'show' : '')}>
      <button className="float-btn float-top" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="up" size={18} /></button>
      <a className="float-btn float-wa" href={waLink('Hola%20Orenda%2C%20quiero%20cotizar%20un%20pedido')} target="_blank" rel="noopener noreferrer" aria-label="Cotizar por WhatsApp"><Icon name="wa" size={20} /><span>Cotiza</span></a>
    </div>
  );
};

/* ============== TOAST ============== */
const Toast = ({ msg, show }) => (
  <div className={'toast ' + (show ? 'show' : '')}><span className="ic">✓</span> {msg}</div>
);

/* ============== APP ============== */
const loadPersisted = (key, fallback) => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};

export default function App() {
  const [cart, setCart] = useState(() => loadPersisted('orenda:cart', []));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [liked, setLiked] = useState(() => loadPersisted('orenda:liked', []));
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('orenda:theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const toastTimer = useRef(null);

  useEffect(() => { localStorage.setItem('orenda:cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('orenda:liked', JSON.stringify(liked)); }, [liked]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('orenda:theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.removeItem('orenda:currentUser');
      localStorage.removeItem('orenda:users');
    } catch {}
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const scan = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach(e => io.observe(e));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (quickView) setQuickView(null);
        else if (drawerOpen) setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quickView, drawerOpen]);

  useEffect(() => {
    const lock = drawerOpen || !!quickView;
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, quickView]);

  const showToast = useCallback((msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, show: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 2200);
  }, []);

  const handleAdd = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Añadido: ${product.name}`);
  }, [showToast]);

  const handleLike = useCallback((id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const handleNav = useCallback((id) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top: y, behavior: 'smooth' }); }
  }, []);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <>
      <ScrollProgress />
      <Announce />
      <Nav cartCount={cartCount} onCartOpen={() => setDrawerOpen(true)} onNav={handleNav} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <Hero onNav={handleNav} />
      <Shop onAdd={handleAdd} liked={liked} onLike={handleLike} onQuickView={setQuickView} />
      <About />
      <Showcase />
      <Sublimation onNav={handleNav} />
      <Collections onNav={handleNav} />
      <Testimonials />
      <Newsletter />
      <Footer onNav={handleNav} />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} cart={cart} setCart={setCart} />
      <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={handleAdd} />
      <Toast msg={toast.msg} show={toast.show} />
      <FloatingActions />
    </>
  );
}
