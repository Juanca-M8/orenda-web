import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

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
  { id: 15, name: 'Funda de Celular Sublimada', cat: 'sublimacion', catLbl: 'Funda', price: 159, color: 'var(--sky)', mock: 'merch', mockIcon: '📱', mockText: 'Funda', desc: 'Funda rígida para celular con tu foto o diseño sublimado. Disponible para los modelos más vendidos de iPhone y Samsung.', feats: ['Compatible iPhone & Samsung', 'Impresión edge-to-edge', 'Resistente a rayones'], colors: ['#9DBDE4', '#E91E63', '#C7D634'] },
  { id: 16, name: 'Llavero Acrílico Sublimado', cat: 'sublimacion', catLbl: 'Llavero', price: 45, color: 'var(--yellow)', mock: 'merch', mockIcon: '🔑', mockText: 'Llavero', desc: 'Llavero de acrílico transparente con sublimación a dos caras. Perfecto para regalos personalizados de eventos.', feats: ['Acrílico 3 mm', 'Sublimación doble cara', 'Argolla y cadena metálica'], colors: ['#F2E32A', '#F08387', '#4D6BB1'] },
  { id: 17, name: 'Lanyard Sublimado', cat: 'sublimacion', catLbl: 'Lanyard', price: 59, color: 'var(--indigo)', mock: 'merch', mockIcon: '🎫', mockText: 'Lanyard', desc: 'Lanyard de tela continua con diseño sublimado a lo largo. Ideal para eventos, conferencias y porta-gafetes.', feats: ['Tela 2 cm de ancho', 'Clip metálico', 'Estampado a todo color'], colors: ['#4D6BB1', '#F36A1F', '#FFF8E1'] },
  { id: 18, name: 'Taza Cerámica Sublimada', cat: 'sublimacion', catLbl: 'Taza', price: 119, color: 'var(--orange)', mock: 'merch', mockIcon: '☕', mockText: 'Taza', badge: 'bestseller', desc: 'Taza blanca de cerámica 11 oz sublimada con tu diseño. Apta para microondas y lavavajillas.', feats: ['Cerámica 11 oz', 'Apta microondas', 'Caja regalo incluida'], colors: ['#F36A1F', '#FFFFFF', '#1B1B1B'] },
  { id: 19, name: 'Gorra Sublimada', cat: 'sublimacion', catLbl: 'Gorra', price: 199, color: 'var(--lime)', mock: 'merch', mockIcon: '🧢', mockText: 'Gorra', desc: 'Gorra trucker con frente blanco sublimable y malla en la parte trasera. Ajuste regulable.', feats: ['Frente sublimable', 'Malla transpirable', 'Ajuste snapback'], colors: ['#C7D634', '#1B1B1B', '#F2E32A'] },
  { id: 20, name: 'Mousepad Sublimado', cat: 'sublimacion', catLbl: 'Mousepad', price: 129, color: 'var(--pink)', mock: 'merch', mockIcon: '🖱️', mockText: 'Mousepad', desc: 'Mousepad rectangular con base antideslizante y superficie sublimada a todo color.', feats: ['22 × 18 cm', 'Base de goma', 'Bordes cosidos'], colors: ['#E91E63', '#9DBDE4', '#F2E32A'] },
  { id: 21, name: 'Tote Bag Sublimada', cat: 'sublimacion', catLbl: 'Tote bag', price: 149, color: 'var(--coral)', mock: 'merch', mockIcon: '👜', mockText: 'Tote', desc: 'Bolsa tote de tela mixta sublimable, reforzada en las asas. Perfecta para uso diario o como regalo de evento.', feats: ['38 × 42 cm', 'Asas reforzadas', 'Estampado a todo color'], colors: ['#F08387', '#FFF8E1', '#4D6BB1'] },
  { id: 22, name: 'Funda de Cojín Sublimada', cat: 'sublimacion', catLbl: 'Funda cojín', price: 229, color: 'var(--yellow)', mock: 'merch', mockIcon: '🛋️', mockText: 'Cojín', desc: 'Funda de cojín 40×40 cm sublimada por ambos lados. Ideal para regalo personalizado o decoración del hogar.', feats: ['40 × 40 cm', 'Cierre invisible', 'Funda sin relleno'], colors: ['#F2E32A', '#F08387', '#9DBDE4'] },
  { id: 23, name: 'Botella de Aluminio Sublimada', cat: 'sublimacion', catLbl: 'Botella', price: 179, color: 'var(--sky)', mock: 'merch', mockIcon: '🥤', mockText: 'Botella', desc: 'Botella de aluminio de 600 ml con tapón de rosca, sublimada con tu diseño. Lavar a mano.', feats: ['Aluminio 600 ml', 'Tapón hermético', 'Lavar a mano'], colors: ['#9DBDE4', '#1B1B1B', '#F36A1F'] },
];

const TESTIMONIALS = [
  { name: 'Lucía M.', role: 'Cliente desde 2023', text: 'La agenda Constelación me ha cambiado la forma de organizarme. Las pegatinas mensuales son adictivas, ya quiero la del año que viene.', color: 'var(--pink)', initials: 'LM' },
  { name: 'Diego R.', role: 'Profe de primaria', text: 'Compré el kit de lettering para mi clase y los niños alucinan. La calidad es increíble y los detalles cuidadísimos.', color: 'var(--indigo)', initials: 'DR' },
  { name: 'Carla S.', role: 'Bullet journal addict', text: 'Llevo tres bullets de Orenda y son los mejores que he probado. El papel aguanta de todo y las estrellas son un puntazo.', color: 'var(--orange)', initials: 'CS' },
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
    case 'menu': return <svg {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
    case 'ig': return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
    case 'tt': return <svg {...props}><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" /></svg>;
    case 'pin': return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M8 12s1.5 5 4 5 4-3 4-5" /><circle cx="12" cy="9" r="1" /></svg>;
    default: return null;
  }
};

/* ============== ORENDA LOGO ============== */
const OrendaLogo = ({ className }) => (
  <img
    src="/assets/orenda-logo.png"
    alt="Orenda Diseño Social"
    className={'orenda-logo-img ' + (className || '')}
    draggable="false"
  />
);

/* ============== PRODUCT MOCK (visual placeholder) ============== */
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

/* ============== NAV ============== */
const Nav = ({ cartCount, onCartOpen, onNav, currentUser, onAccountClick }) => (
  <nav className="nav">
    <div className="nav-inner">
      <div className="nav-logo" onClick={() => onNav('top')} role="button" tabIndex={0} aria-label="Orenda — ir al inicio">
        <OrendaLogo className="nav-logo-mark" />
      </div>
      <div className="nav-links">
        <a onClick={() => onNav('shop')}>Tienda</a>
        <a onClick={() => onNav('sublimacion')}>Sublimación</a>
        <a onClick={() => onNav('collections')}>Colecciones</a>
        <a onClick={() => onNav('about')}>Sobre Orenda</a>
        <a onClick={() => onNav('newsletter')}>Newsletter</a>
      </div>
      <div className="nav-actions">
        <button
          className={'icon-btn ' + (currentUser ? 'icon-btn-active' : '')}
          aria-label={currentUser ? `Cuenta de ${currentUser.name}` : 'Cuenta'}
          onClick={onAccountClick}
          title={currentUser ? currentUser.name : 'Crear cuenta o iniciar sesión'}
        >
          {currentUser
            ? <span className="user-initial">{currentUser.name.slice(0, 1).toUpperCase()}</span>
            : <Icon name="user" />}
        </button>
        <button className="icon-btn" aria-label="Carrito" onClick={onCartOpen}>
          <Icon name="cart" />
          <span className={'cart-badge ' + (cartCount > 0 ? 'show' : '')}>{cartCount}</span>
        </button>
      </div>
    </div>
  </nav>
);

/* ============== HERO ============== */
const Hero = ({ onNav }) => (
  <section className="hero" id="top">
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
        <button className="btn btn-primary" onClick={() => onNav('shop')}>
          Ver tienda <Icon name="arrow" size={16} />
        </button>
        <button className="btn btn-ghost" onClick={() => onNav('about')}>Conoce a Orenda</button>
      </div>
      <div className="hero-stats">
        <div className="stat"><div className="num">12k+</div><div className="lbl">clientes felices</div></div>
        <div className="stat"><div className="num">38</div><div className="lbl">productos en catálogo</div></div>
        <div className="stat"><div className="num">100%</div><div className="lbl">diseño propio</div></div>
      </div>
    </div>
    <div className="hero-art">
      <div className="floating-shape fs-1">✦</div>
      <div className="floating-shape fs-2">♥</div>
      <div className="ha-card ha-1"><ProductMock type="agenda" text={'Cons-\ntelación'} year="2026" /></div>
      <div className="ha-card ha-2"><ProductMock type="sticker" /></div>
      <div className="ha-card ha-3"><ProductMock type="planner" /></div>
      <div className="ha-card ha-4 ha-yellow"><ProductMock type="card" text="Te quiero" /></div>
    </div>
  </section>
);

/* ============== SHOP ============== */
const ProductCard = ({ p, onAdd, onLike, liked, onQuickView }) => (
  <div className="card" onClick={() => onQuickView(p)}>
    <div className="card-img" style={{ background: p.color }}>
      {p.badge && <div className={'badge ' + p.badge}>{p.badge === 'new' ? 'Nuevo' : p.badge === 'bestseller' ? 'Más vendido' : 'Edición limitada'}</div>}
      <button
        className={'like-btn ' + (liked ? 'liked' : '')}
        onClick={(e) => { e.stopPropagation(); onLike(p.id); }}
        aria-label={liked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <Icon name="heart" size={16} />
      </button>
      {p.image
        ? <img src={p.image} alt={p.name} className="card-photo" loading="lazy" />
        : <ProductMock type={p.mock} text={p.mockText} year={p.mockYr} icon={p.mockIcon} />}
    </div>
    <div className="card-body">
      <div className="card-cat">{p.catLbl}</div>
      <div className="card-name">{p.name}</div>
      <div className="card-desc">{p.desc.length > 70 ? p.desc.slice(0, 70) + '…' : p.desc}</div>
      <div className="color-dots">
        {p.colors.map((c, i) => <div key={i} className="dot-color" style={{ background: c }} />)}
      </div>
      <div className="card-foot">
        <div className="price">
          {p.oldPrice && <del>${p.oldPrice}</del>}
          <small>desde</small>${p.price}
        </div>
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAdd(p); }} aria-label="Añadir al carrito">
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  </div>
);

const Shop = ({ onAdd, liked, onLike, onQuickView }) => {
  const [cat, setCat] = useState('todos');
  const filtered = useMemo(() => cat === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat), [cat]);
  return (
    <section id="shop">
      <div className="section-head">
        <div>
          <h2>La <em>tienda</em><br />de Orenda</h2>
        </div>
        <p>Piezas pensadas para acompañar tus días: organiza, decora y regala con un toque de color.</p>
      </div>
      <div className="cat-tabs">
        {CATEGORIES.map(c => {
          const count = c.id === 'todos' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === c.id).length;
          return (
            <button key={c.id} className={'cat-tab ' + (cat === c.id ? 'active' : '')} onClick={() => setCat(c.id)}>
              {c.label}<span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} p={p} onAdd={onAdd} onLike={onLike} liked={liked.includes(p.id)} onQuickView={onQuickView} />
        ))}
      </div>
    </section>
  );
};

/* ============== ABOUT ============== */
const About = () => (
  <section id="about" style={{ padding: 0 }}>
    <div className="about-band">
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
      <div className="sublim-band">
        <div className="sublim-head">
          <div className="eyebrow" style={{ background: 'var(--cream)', boxShadow: '3px 3px 0 var(--pink)' }}>
            <span className="dot"></span>Nuevo servicio
          </div>
          <h2>Sublimación a <em>todo color</em>,<br />en cualquier superficie.</h2>
          <p>Trasladamos tus diseños a textiles y accesorios con tintas que se funden con el material. Color vivo, tacto suave y un acabado que aguanta lavadas, sol y el uso diario. Ideal para eventos, regalos personalizados o tu propia marca.</p>
          <div className="sublim-cta">
            <button className="btn btn-primary" onClick={() => onNav('shop')}>
              Ver productos sublimables <Icon name="arrow" size={16} />
            </button>
            <a className="btn btn-ghost" href="https://wa.me/?text=Hola%20Orenda%2C%20quiero%20cotizar%20una%20sublimaci%C3%B3n" target="_blank" rel="noopener noreferrer">Cotizar mi diseño</a>
          </div>
        </div>
        <div className="sublim-grid">
          {items.map((it, i) => (
            <div key={i} className="sublim-item">
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
    <div className="section-head">
      <div><h2>Por <em>colecciones</em></h2></div>
      <p>Encuentra el universo Orenda que mejor encaja contigo. De lo más cálido a lo más vibrante.</p>
    </div>
    <div className="collections">
      <div className="col col-1" onClick={() => onNav('shop')}>
        <div>
          <h3>Constelación<br />2026</h3>
          <p>Agendas, libretas y stickers de la nueva colección estrella. Tonos coral y azul cielo.</p>
        </div>
        <div className="arrow"><Icon name="arrow" size={18} /></div>
      </div>
      <div className="col col-2" onClick={() => onNav('shop')}><div><h3>Confetti</h3><p>Vibrante y festivo.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
      <div className="col col-3" onClick={() => onNav('shop')}><div><h3>Cielo</h3><p>Azules y calma.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
      <div className="col col-4" onClick={() => onNav('shop')}><div><h3>Hojaverde</h3><p>Botánico y suave.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
      <div className="col col-5" onClick={() => onNav('shop')}><div><h3>Sol</h3><p>Cálido y energético.</p></div><div className="arrow"><Icon name="arrow" size={16} /></div></div>
    </div>
  </section>
);

/* ============== TESTIMONIALS ============== */
const Testimonials = () => (
  <section>
    <div className="testimonials">
      <div className="section-head" style={{ marginBottom: 32 }}>
        <div><h2>Lo que dicen<br />de <em>nosotros</em></h2></div>
        <p>Más de 12.000 personas ya han metido un trocito de Orenda en su día a día.</p>
      </div>
      <div className="testi-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testi">
            <div className="quote-mark">"</div>
            <div className="stars-r">★★★★★</div>
            <p>{t.text}</p>
            <div className="who">
              <div className="ava" style={{ background: t.color }}>{t.initials}</div>
              <div>
                <div className="nm">{t.name}</div>
                <div className="rl">{t.role}</div>
              </div>
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
    if (email && email.includes('@')) {
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 3000);
    }
  };
  return (
    <section id="newsletter">
      <div className="newsletter">
        <h2>Únete al <em>club</em> Orenda</h2>
        <p>Una vez al mes te mandamos novedades, descargables gratis y descuentos solo-para-suscriptores. Cero spam, mucho cariño.</p>
        <form className="nl-form" onSubmit={submit}>
          <input
            type="email"
            placeholder={sent ? '¡Bienvenida al club! ✦' : 'tu@email.com'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sent}
            aria-label="Email"
          />
          <button className="btn" type="submit">{sent ? '¡Hecho!' : 'Suscribirme'}</button>
        </form>
        <div className="nl-perks">
          <span>10% en tu primera compra</span>
          <span>Imprimibles gratis</span>
          <span>Acceso anticipado a nuevas colecciones</span>
        </div>
      </div>
    </section>
  );
};

/* ============== FOOTER ============== */
const Footer = () => (
  <footer>
    <div className="foot-grid">
      <div className="foot-brand">
        <OrendaLogo className="foot-logo-mark" />
        <p>Estudio de diseño social y papelería con alma. Hecho con calma desde Cruz de Piedra, Sonora.</p>
        <div className="socials">
          <a href="https://instagram.com/orenda.social" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="ig" size={16} /></a>
          <a href="https://www.tiktok.com/@orenda.social?lang=es-419" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Icon name="tt" size={16} /></a>
          <a href="#" aria-label="Pinterest"><Icon name="pin" size={16} /></a>
        </div>
      </div>
      <div>
        <h5>Tienda</h5>
        <a>Agendas & Planners</a><a>Libretas</a><a>Stickers</a><a>Tarjetas</a><a>Kits creativos</a>
      </div>
      <div>
        <h5>Orenda</h5>
        <a>Sobre nosotras</a><a>Sostenibilidad</a><a>Imprimibles gratis</a><a>Talleres</a><a>Prensa</a>
      </div>
      <div>
        <h5>Ayuda</h5>
        <a>Envíos y devoluciones</a><a>Contacto</a><a>FAQs</a><a>Mi cuenta</a><a>Tarjetas regalo</a>
      </div>
    </div>
    <div className="foot-bottom">
      <span>© {new Date().getFullYear()} Orenda Diseño Social · Valencia, España</span>
      <span>Política de privacidad · Términos · Cookies</span>
    </div>
  </footer>
);

/* ============== CART DRAWER ============== */
const CartDrawer = ({ open, onClose, cart, setCart }) => {
  const remove = (id) => setCart(cart.filter(c => c.id !== id));
  const updateQty = (id, delta) => setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const FREE_SHIPPING_THRESHOLD = 700;
  const SHIPPING_COST = 80;
  const shipping = subtotal > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST) : 0;
  const fmt = (n) => n.toLocaleString('es-MX');

  const checkout = () => {
    const lines = cart.map(i => `• ${i.qty}× ${i.name} — $${fmt(i.price * i.qty)} MXN`).join('%0A');
    const total = fmt(subtotal + shipping);
    const msg = `¡Hola Orenda! Quiero hacer un pedido:%0A%0A${lines}%0A%0ATotal: $${total} MXN`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
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
              <div className="cart-item-img" style={{ background: item.color }}>{item.name.split(' ')[0].slice(0, 3)}</div>
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
            <div className="totals">
              <div className="row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
              <div className="row"><span>Envío {subtotal >= FREE_SHIPPING_THRESHOLD && <em style={{ color: 'var(--pink)', fontStyle: 'normal' }}>· gratis</em>}</span><span>{shipping === 0 ? '$0' : '$' + fmt(shipping)}</span></div>
              <div className="row tot"><span>Total</span><span>${fmt(subtotal + shipping)} <small style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '.05em' }}>MXN</small></span></div>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={checkout}>
              Ir al checkout <Icon name="arrow" size={16} />
            </button>
            {subtotal < FREE_SHIPPING_THRESHOLD && <p style={{ fontSize: 12, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 10 }}>Te faltan <strong>${fmt(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> para envío gratis ✦</p>}
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
    <div className={'modal-ov open'} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close modal-close-top" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={16} /></button>
        <div className="modal-img" style={{ background: product.color }}>
          {product.image
            ? <img src={product.image} alt={product.name} className="modal-photo" />
            : <ProductMock type={product.mock} text={product.mockText} year={product.mockYr} icon={product.mockIcon} />}
        </div>
        <div className="modal-info">
          <div className="cat-tag">{product.catLbl}</div>
          <h2>{product.name}</h2>
          <div className="price-big">
            {product.oldPrice && <del style={{ fontSize: 18, color: 'var(--ink-soft)', marginRight: 10, fontWeight: 600 }}>${product.oldPrice}</del>}
            ${product.price} <span style={{ fontSize: 14, color: 'var(--ink-soft)', fontWeight: 600, letterSpacing: '.05em' }}>MXN</span>
          </div>
          <p className="desc">{product.desc}</p>
          <div className="modal-feat">
            {product.feats.map((f, i) => <div key={i} className="ft">{f}</div>)}
          </div>
          <div className="color-dots" style={{ marginBottom: 18 }}>
            {product.colors.map((c, i) => <div key={i} className="dot-color" style={{ background: c, width: 22, height: 22 }} />)}
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={() => { onAdd(product); onClose(); }}>
              Añadir al carrito <Icon name="cart" size={16} />
            </button>
            <button className="btn btn-ghost" onClick={onClose}>Seguir mirando</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============== AUTH MODAL ============== */
const AuthModal = ({ open, onClose, currentUser, onLogin, onSignup, onLogout }) => {
  const [mode, setMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setError('');
      setLoading(false);
      if (currentUser) setMode('account');
      else setMode('signup');
    }
  }, [open, currentUser]);

  if (!open) return null;

  const reset = () => { setName(''); setEmail(''); setPassword(''); setError(''); };

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Escribe un correo válido.');
      return;
    }
    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (mode === 'signup') {
      const cleanName = name.trim();
      if (cleanName.length < 2) {
        setError('Dinos cómo te llamas (mínimo 2 letras).');
        return;
      }
      setLoading(true);
      const result = onSignup({ name: cleanName, email: cleanEmail, password });
      setLoading(false);
      if (!result.ok) { setError(result.error); return; }
      reset();
    } else if (mode === 'login') {
      setLoading(true);
      const result = onLogin({ email: cleanEmail, password });
      setLoading(false);
      if (!result.ok) { setError(result.error); return; }
      reset();
    }
  };

  return (
    <div className="modal-ov open" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={16} /></button>

        {mode === 'account' && currentUser ? (
          <div className="auth-body">
            <div className="auth-avatar">{currentUser.name.slice(0, 1).toUpperCase()}</div>
            <h2>Hola, <em>{currentUser.name.split(' ')[0]}</em></h2>
            <p className="auth-sub">{currentUser.email}</p>
            <div className="auth-meta">
              <div><strong>Miembro desde</strong><span>{new Date(currentUser.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            </div>
            <button className="btn btn-primary" onClick={onClose}>Seguir comprando</button>
            <button className="btn btn-ghost" onClick={() => { onLogout(); reset(); }}>Cerrar sesión</button>
          </div>
        ) : (
          <div className="auth-body">
            <div className="auth-tabs">
              <button
                type="button"
                className={'auth-tab ' + (mode === 'signup' ? 'active' : '')}
                onClick={() => { setMode('signup'); setError(''); }}
              >Crear cuenta</button>
              <button
                type="button"
                className={'auth-tab ' + (mode === 'login' ? 'active' : '')}
                onClick={() => { setMode('login'); setError(''); }}
              >Iniciar sesión</button>
            </div>
            <h2>{mode === 'signup' ? <>Únete al <em>club</em> Orenda</> : <>Bienvenida de <em>vuelta</em></>}</h2>
            <p className="auth-sub">{mode === 'signup' ? 'Crea tu cuenta para guardar favoritos y agilizar tus pedidos.' : 'Inicia sesión para ver tu cuenta.'}</p>
            <form className="auth-form" onSubmit={submit}>
              {mode === 'signup' && (
                <label>
                  <span>Nombre</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Cómo te llamamos"
                    autoComplete="name"
                    required
                  />
                </label>
              )}
              <label>
                <span>Correo</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                <span>Contraseña</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                />
              </label>
              {error && <div className="auth-error">{error}</div>}
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Un momento…' : (mode === 'signup' ? 'Crear cuenta' : 'Entrar')}
                <Icon name="arrow" size={16} />
              </button>
            </form>
            <p className="auth-foot">
              {mode === 'signup' ? '¿Ya tienes cuenta?' : '¿Nueva por aquí?'}{' '}
              <a onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}>
                {mode === 'signup' ? 'Inicia sesión' : 'Crea una cuenta'}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============== TOAST ============== */
const Toast = ({ msg, show }) => (
  <div className={'toast ' + (show ? 'show' : '')}>
    <span className="ic">✓</span> {msg}
  </div>
);

/* ============== APP ============== */
const loadPersisted = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [cart, setCart] = useState(() => loadPersisted('orenda:cart', []));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [liked, setLiked] = useState(() => loadPersisted('orenda:liked', []));
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [currentUser, setCurrentUser] = useState(() => loadPersisted('orenda:currentUser', null));
  const [authOpen, setAuthOpen] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => { localStorage.setItem('orenda:cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('orenda:liked', JSON.stringify(liked)); }, [liked]);
  useEffect(() => {
    if (currentUser) localStorage.setItem('orenda:currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('orenda:currentUser');
  }, [currentUser]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (quickView) setQuickView(null);
        else if (authOpen) setAuthOpen(false);
        else if (drawerOpen) setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [quickView, drawerOpen, authOpen]);

  useEffect(() => {
    const lock = drawerOpen || !!quickView || authOpen;
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, quickView, authOpen]);

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

  const handleSignup = useCallback(({ name, email, password }) => {
    const users = loadPersisted('orenda:users', []);
    if (users.some(u => u.email === email)) {
      return { ok: false, error: 'Ya existe una cuenta con ese correo. Inicia sesión.' };
    }
    const user = { name, email, password, createdAt: new Date().toISOString() };
    const next = [...users, user];
    localStorage.setItem('orenda:users', JSON.stringify(next));
    const { password: _pw, ...publicUser } = user;
    setCurrentUser(publicUser);
    setAuthOpen(false);
    showToast(`¡Bienvenida, ${name.split(' ')[0]}!`);
    return { ok: true };
  }, [showToast]);

  const handleLogin = useCallback(({ email, password }) => {
    const users = loadPersisted('orenda:users', []);
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      const exists = users.some(u => u.email === email);
      return { ok: false, error: exists ? 'Contraseña incorrecta.' : 'No encontramos esa cuenta. Crea una.' };
    }
    const { password: _pw, ...publicUser } = found;
    setCurrentUser(publicUser);
    setAuthOpen(false);
    showToast(`Hola otra vez, ${publicUser.name.split(' ')[0]}`);
    return { ok: true };
  }, [showToast]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setAuthOpen(false);
    showToast('Sesión cerrada');
  }, [showToast]);

  const handleNav = useCallback((id) => {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <>
      <Nav
        cartCount={cartCount}
        onCartOpen={() => setDrawerOpen(true)}
        onNav={handleNav}
        currentUser={currentUser}
        onAccountClick={() => setAuthOpen(true)}
      />
      <Hero onNav={handleNav} />
      <Shop onAdd={handleAdd} liked={liked} onLike={handleLike} onQuickView={setQuickView} />
      <About />
      <Sublimation onNav={handleNav} />
      <Collections onNav={handleNav} />
      <Testimonials />
      <Newsletter />
      <Footer />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} cart={cart} setCart={setCart} />
      <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={handleAdd} />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
      />
      <Toast msg={toast.msg} show={toast.show} />
    </>
  );
}
