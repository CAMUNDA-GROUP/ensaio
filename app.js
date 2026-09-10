import { products } from "./inventory-data.js";

const imageBase = `${import.meta.env.BASE_URL}image/`;
products.forEach((product) => {
  product.image = product.image.replace(/^\/image\//, imageBase);
});

const services = [
  ["✚", "Consulta farmacêutica", "Orientação profissional sobre produtos de saúde e apoio aos pedidos."],
  ["✓", "Apoio a receitas", "Apoio organizado para validação e acompanhamento de produtos sujeitos a receita."],
  ["♡", "Saúde e bem-estar", "Recomendações personalizadas para rotinas de saúde e escolha de produtos."],
  ["✦", "Cuidados pessoais", "Artigos essenciais para autocuidado, higiene e bem-estar."],
  ["▣", "Produtos médicos", "Acesso a produtos essenciais de saúde e artigos de monitorização."],
  ["⌁", "Entrega", "Apoio conveniente para levantamento e entrega de pedidos locais."],
];

const heroSlides = [
  [`${imageBase}backgroud1.png`, `${imageBase}background2.jpg`, `${imageBase}backgroud3.png`],
  [`${imageBase}background4.png`, `${imageBase}background5.png`, `${imageBase}background6.png`],
];

const translations = {
  pt: { home: "Início", products: "Produtos", services: "Serviços", about: "Sobre nós", contact: "Contacto", cart: "Carrinho", details: "Ver detalhes", add: "Adicionar ao carrinho", inStock: "Em stock", lowStock: "Pouco stock", price: "Preço", checkout: "Finalizar compra", clear: "Limpar carrinho", empty: "O seu carrinho está vazio", emptyText: "Veja os nossos produtos de saúde e adicione artigos." },
  en: { home: "Home", products: "Products", services: "Services", about: "About", contact: "Contact", cart: "Cart", details: "View details", add: "Add to cart", inStock: "In stock", lowStock: "Low stock", price: "Price", checkout: "Proceed to checkout", clear: "Clear cart", empty: "Your cart is empty", emptyText: "Browse our wellness essentials and add products." },
  fr: { home: "Accueil", products: "Produits", services: "Services", about: "À propos", contact: "Contact", cart: "Panier", details: "Voir les détails", add: "Ajouter au panier", inStock: "En stock", lowStock: "Stock faible", price: "Prix", checkout: "Passer la commande", clear: "Vider le panier", empty: "Votre panier est vide", emptyText: "Découvrez nos produits de santé et ajoutez des articles." },
};

const state = {
  view: "home",
  selected: products[0],
  cart: readCart(),
  language: readLanguage(),
  query: "",
  drawer: false,
  quantity: 1,
  payment: "Pagamento na entrega",
  order: null,
};

const app = document.querySelector("#app");
const t = (key) => translations[state.language][key] || translations.pt[key] || key;
const money = (value) => `${Number(value).toLocaleString("pt-AO")} Kz`;
function medicationDescription(name) {
  const value = name.toLowerCase();
  const descriptions = [
    [/amoxicilina|amoxy/, "Antibiótico à base de amoxicilina, utilizado no tratamento de infeções bacterianas conforme prescrição médica."],
    [/ampicilina|ampione/, "Antibiótico à base de ampicilina, indicado para infeções bacterianas conforme orientação profissional."],
    [/azitromicina/, "Antibiótico macrólido usado no tratamento de determinadas infeções bacterianas, mediante prescrição."],
    [/aciclovir/, "Antiviral utilizado no tratamento de infeções causadas por determinados vírus, conforme indicação médica."],
    [/ibuprofeno/, "Anti-inflamatório e analgésico usado para dor, inflamação e febre, respeitando a orientação profissional."],
    [/paracetamol|ben-u-ron|paxmol|anaflam/, "Analgésico e antipirético utilizado para alívio da dor e redução da febre, conforme indicação."],
    [/diclofenac|diclomex|doriz|voltanext|g agesil/, "Anti-inflamatório não esteroide usado no alívio de dor e inflamação, conforme orientação profissional."],
    [/metronidazol|maizole|metrim/, "Medicamento com ação contra determinados microrganismos, utilizado conforme diagnóstico e prescrição."],
    [/artemeter|artesunato|davimether|larnext|martem|sunat/, "Antimalárico utilizado no tratamento da malária, exclusivamente conforme prescrição e acompanhamento clínico."],
    [/amlodipina|captopril|enalapril|losartan|nifedipina|metildopa|hidroclorotiazida/, "Medicamento cardiovascular utilizado no controlo da pressão arterial, conforme prescrição médica."],
    [/omeprazol|esomeprazol|ranit|renn(i|ie)/, "Medicamento utilizado na redução da acidez gástrica e no tratamento de problemas digestivos, conforme orientação."],
    [/loratadina|cetirizina|nexae|nexagrip|av amys|decana/, "Produto utilizado no alívio de sintomas alérgicos ou de congestão, respeitando a indicação profissional."],
    [/dexametasona|dexafuso|dexanext|dexaron|predni|predonex|predson|hidrocortisona/, "Corticosteroide utilizado para reduzir inflamação em situações específicas, conforme prescrição médica."],
    [/vitamina|complexo b|alcivita|b12|c12|c4|c8|vitariz|pro-vital|ferro|ferto|elferon/, "Suplemento nutricional destinado a apoiar necessidades específicas de vitaminas e minerais."],
    [/clotrimazol|candisten|candizole|cetoconazol|ketoclar|mycozema|miconazol|fluconazol/, "Antifúngico utilizado no tratamento de infeções por fungos, conforme indicação do profissional de saúde."],
    [/gentamicina|af rigen|gentocil|neobaci/, "Antimicrobiano utilizado em situações específicas de infeção, conforme indicação médica."],
    [/salbutamol|br omexina|bronext|brozen|mucoril|expect|carbocisteina/, "Produto utilizado no apoio ao tratamento de sintomas respiratórios, conforme orientação profissional."],
    [/glicose|soro|infusão|cloreto de sodio/, "Solução para uso clínico, administração e finalidade dependentes de avaliação e orientação profissional."],
    [/seringa|canula|bistur|luvas|curita|sutura|especulo|sistema de infusão/, "Dispositivo ou consumível de uso clínico destinado a procedimentos de saúde."],
    [/creme|pomada|gel|sabonete|shampoo|dove|nivea|veet|byphasse|feno|vaseline|gillette/, "Produto de cuidado pessoal destinado à higiene, proteção ou cuidado da pele."],
    [/bebé|bebe|baby|chicco|johnsons|optimol|leite nan|fralda|toalhita|mamilo|teether/, "Produto de cuidado infantil para higiene, alimentação ou conforto, conforme a finalidade indicada na embalagem."],
    [/preservativo|tampax|vaginal|vaginext|microlax|dulcolax|loperamida|lo pext|loprade/, "Produto destinado a uma necessidade específica de saúde e bem-estar, devendo ser utilizado conforme as instruções."],
  ];
  const match = descriptions.find(([pattern]) => pattern.test(value));
  return match ? match[1] : "Produto de saúde para uma necessidade específica. Consulte a embalagem e um profissional de saúde antes da utilização.";
}
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
const productById = (id) => products.find((product) => product.id === id);
const cartProducts = () => state.cart.map((item) => ({ ...productById(item.id), quantity: item.quantity })).filter((item) => item.id);
const cartCount = () => state.cart.reduce((total, item) => total + item.quantity, 0);
const subtotal = () => cartProducts().reduce((total, item) => total + item.price * item.quantity, 0);

function readLanguage() {
  const saved = localStorage.getItem("kamunda-language");
  return ["pt", "en", "fr"].includes(saved) ? saved : "pt";
}
function readCart() {
  try { return JSON.parse(localStorage.getItem("camunda-central-cart") || "[]"); } catch { return []; }
}
function saveCart() { localStorage.setItem("camunda-central-cart", JSON.stringify(state.cart)); }
function imageFallback(image) { return `onerror="this.onerror=null;this.src='${imageBase}background6.png'"`; }
function navItems() { return [["home", "⌂", t("home")], ["products", "▦", t("products")], ["services", "♡", t("services")], ["about", "▥", t("about")], ["contact", "✉", t("contact")], ["cart", "🛒", t("cart")]]; }

function renderNav() {
  const items = navItems();
  return `<aside class="sidebar"><nav>${items.map(([id, icon, label]) => `<button class="nav-item ${state.view === id ? "active" : ""}" data-view="${id}" aria-label="${label}"><span>${icon}</span><span class="nav-label">${label}</span>${id === "cart" && cartCount() ? `<span class="cart-badge">${cartCount()}</span>` : ""}</button>`).join("")}</nav><div class="sidebar-bottom"><button class="icon-button" data-view="contact" aria-label="Contacto">☎</button></div></aside><nav class="mobile-nav">${items.slice(0, 5).map(([id, icon, label]) => `<button class="${state.view === id ? "active" : ""}" data-view="${id}"><span>${icon}</span><span>${label}</span>${id === "cart" && cartCount() ? `<span class="cart-badge">${cartCount()}</span>` : ""}</button>`).join("")}</nav>`;
}

function renderLanguage() { return `<div class="language-switcher" aria-label="Escolher idioma">${["pt", "en", "fr"].map((lang) => `<button data-language="${lang}" class="${state.language === lang ? "active" : ""}">${lang}</button>`).join("")}</div>`; }
function renderHeaderLogo() { return `<a class="site-logo" href="#" data-view="home" aria-label="Farmacia Camunda Central"><img src="${imageBase}logo2.png" alt="Farmacia Camunda Central"></a>`; }
function button(label, action, className = "button button-dark") { return `<button type="button" class="${className}" data-action="${action}">${label}</button>`; }

function productCard(product) {
  const image = getCachedProductImage(product) || product.image;
  return `<article class="card product-card" data-product-id="${product.id}"><div class="product-image"><img src="${image}" alt="${escapeHtml(product.name)}" data-product-image ${imageFallback(product.image)}><span class="category-pill">${escapeHtml(product.category)}</span></div><div class="product-body"><div class="product-meta"><div><h3>${escapeHtml(product.name)}</h3></div><span class="stock">${product.stock > 0 ? t("inStock") : t("lowStock")}</span></div><p class="product-description">${escapeHtml(medicationDescription(product.name))}</p><div class="product-bottom"><div><p class="price-label">${t("price")}</p><p class="price">${money(product.price)}</p></div>${button(t("details"), `details:${product.id}`, "button button-outline")}</div>${button(`🛒 ${t("add")}`, `add:${product.id}`, "button button-dark button-full")}</div></article>`;
}

function productListItem(product) {
  return `<article class="product-list-item" data-product-id="${product.id}"><div class="product-list-copy"><p class="product-reference">Ref. ${escapeHtml(product.reference)}</p><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(medicationDescription(product.name))}</p></div><div class="product-list-meta"><span class="stock">${product.stock > 0 ? t("inStock") : t("lowStock")}</span><strong>${money(product.price)}</strong>${button("Comprar", `add:${product.id}`, "button button-dark")}</div></article>`;
}

function getCachedProductImage(product) {
  try { return JSON.parse(localStorage.getItem("kamunda-product-images") || "{}")[product.id] || ""; } catch { return ""; }
}

function productTokens(value) {
  return new Set(value.toLowerCase().replace(/[^a-z0-9áéíóúãõç]+/gi, " ").split(/\s+/).filter((token) => token.length > 2));
}

async function findProductImage(product) {
  const cacheKey = "kamunda-product-images";
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(cacheKey) || "{}"); } catch { cache = {}; }
  if (cache[product.id]) return cache[product.id];

  const query = encodeURIComponent(product.name.replace(/\([^)]*\)/g, "").trim());
  try {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=1&fields=product_name,image_front_url,image_url`);
    if (!response.ok) return "";
    const data = await response.json();
    const result = data.products?.[0];
    const wanted = productTokens(product.name);
    const found = productTokens(result?.product_name || "");
    const overlap = [...wanted].filter((token) => found.has(token)).length / Math.max(wanted.size, 1);
    if (overlap < 0.6) return "";
    const image = result?.image_front_url || result?.image_url;
    if (!image) return "";
    cache[product.id] = image;
    localStorage.setItem(cacheKey, JSON.stringify(cache));
    return image;
  } catch {
    return "";
  }
}

async function hydrateProductImages() {
  const cards = [...document.querySelectorAll("[data-product-id]")].slice(0, 24);
  for (const card of cards) {
    const product = productById(card.dataset.productId);
    if (!product || getCachedProductImage(product)) continue;
    const image = await findProductImage(product);
    if (image) {
      const imageElement = card.querySelector("[data-product-image]");
      if (imageElement) imageElement.src = image;
    }
  }
}

function renderHome() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return `<main><section class="hero"><div class="hero-gallery" aria-hidden="true"><img src="/image/backgroud1.png" alt=""><img src="/image/background2.jpg" alt=""><img src="/image/backgroud3.png" alt=""></div><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">Cuidado farmacêutico de confiança</p><p class="eyebrow">Farmacia Camunda Central</p><h1>A sua saúde.<span>A nossa prioridade.</span></h1><p>Produtos de saúde, apoio ao bem-estar e soluções farmacêuticas modernas para toda a família.</p><div class="hero-actions">${button("Ver produtos →", "view:products", "button button-light")}${button("Fale connosco", "view:contact", "button button-ghost")}</div></div><div class="hero-summary"><div class="hero-summary-inner"><p class="eyebrow">Resumo do pedido</p><div class="stat-row"><span>Produtos</span><strong>${cartCount()}</strong></div><div class="stat-row"><span>Entrega</span><strong>Local</strong></div><div class="stat-row"><span>Apoio</span><strong>24/7</strong></div></div></div></div></section><section class="section"><div class="cards-3"><div class="card feature-card"><div class="feature-icon">✓</div><h3>Cuidado profissional</h3><p>Apoio de confiança para o bem-estar e as necessidades farmacêuticas diárias.</p></div><div class="card feature-card"><div class="feature-icon">♡</div><h3>Foco no bem-estar</h3><p>Seleção cuidada para pacientes, famílias e estilos de vida ativos.</p></div><div class="card feature-card"><div class="feature-icon">✦</div><h3>Experiência moderna</h3><p>Uma experiência simples, acessível e moderna para cuidar da sua saúde.</p></div></div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">Encontre o que precisa</p><h2>Explorar produtos</h2></div><div class="search-bar"><span class="search-icon">⌕</span><input data-search placeholder="Pesquisar produtos, marcas ou categorias"></div></div><div class="product-grid">${featured.map(productCard).join("")}</div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">O que oferecemos</p><h2>Serviços farmacêuticos</h2></div></div><div class="service-grid">${services.map(([icon, title, text]) => `<div class="card feature-card"><div class="service-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></section><section class="section"><div class="card about-band"><div><p class="eyebrow">Sobre nós</p><h2>Apoio farmacêutico profissional e próximo das pessoas.</h2><p>A Farmacia Camunda Central aposta na confiança, no atendimento próximo e em produtos de saúde de qualidade para Benguela e Luanda.</p><div class="check-list"><div class="check-item"><span class="check">✓</span>Atendimento próximo e orientação de confiança</div><div class="check-item"><span class="check">✓</span>Padrões profissionais de serviço</div><div class="check-item"><span class="check">✓</span>Experiência moderna de cuidados de saúde</div></div></div><div class="info-panel"><div class="info-grid"><div class="info-cell"><p class="eyebrow">Localização</p><strong>Benguela e Luanda, Angola</strong></div><div class="info-cell"><p class="eyebrow">Horário</p><strong>Segunda a sábado, 08:00-18:00</strong></div><div class="info-cell"><p class="eyebrow">Telefone</p><strong>Contacto a confirmar</strong></div><div class="info-cell"><p class="eyebrow">E-mail</p><strong>E-mail a confirmar</strong></div></div></div></div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">Visite-nos</p><h2>Localização e contacto</h2></div>${button("Contactar apoio", "view:contact", "button button-outline")}</div><div class="location-grid"><div class="card map-placeholder"><div><div class="map-pin">⌖</div><strong>Localização da farmácia</strong><p>Benguela e Luanda, Angola</p></div></div><div class="contact-stack"><div class="card contact-card"><div class="contact-title">⌖ Morada</div><p>Benguela e Luanda, Angola</p></div><div class="card contact-card"><div class="contact-title">◷ Horário de funcionamento</div><p>Segunda a sábado: 08:00-18:00</p><p>Domingo: mediante marcação</p></div><div class="card contact-card"><div class="contact-title">☎ Contacto</div><p>Telefone a confirmar</p><p>WhatsApp a confirmar</p><p>E-mail a confirmar</p></div></div></div></section></main>`;
}

function renderProducts() {
  const query = state.query.trim().toLowerCase();
  const filtered = products.filter((product) => `${product.name} ${product.brand} ${product.category} ${product.keywords}`.toLowerCase().includes(query));
  return `<main class="page"><div class="page-heading"><p class="eyebrow">Pesquisar catálogo</p><h1>Produtos da farmácia</h1></div><div class="search-bar" style="margin-bottom:30px"><span class="search-icon">⌕</span><input data-search value="${escapeHtml(state.query)}" placeholder="Pesquisar por nome, marca, categoria ou palavra-chave"></div>${filtered.length ? `<div class="product-list">${filtered.map(productListItem).join("")}</div>` : `<div class="empty-state"><div class="empty-icon">⌕</div><h3>Nenhum produto encontrado</h3><p>Tente pesquisar outro produto, categoria ou marca.</p></div>`}</main>`;
}

function renderDetails() {
  const product = state.selected;
  return `<main class="page detail"><div class="card detail-card"><div class="detail-layout"><div class="detail-image"><img src="${product.image}" alt="${escapeHtml(product.name)}" ${imageFallback(product.image)}></div><div><span class="detail-category">${escapeHtml(product.category)}</span><h1>${escapeHtml(product.name)}</h1><p class="detail-price">${money(product.price)}</p><p class="detail-description">${escapeHtml(medicationDescription(product.name))}</p><div class="detail-actions"><div class="quantity-control"><button class="circle-button" data-quantity="-">−</button><span>${state.quantity}</span><button class="circle-button" data-quantity="+">+</button></div>${button(`🛒 ${t("add")}`, `add-detail:${product.id}`, "button button-dark")}</div><div class="detail-facts"><div class="fact"><small>Referência</small><strong>${escapeHtml(product.reference)}</strong></div><div class="fact"><small>Stock</small><strong>${product.stock} unidades</strong></div><div class="fact"><small>Utilização</small><strong>Conforme orientação</strong></div></div></div></div></div><section style="padding-top:55px"><div class="section-heading"><h2>Produtos relacionados</h2></div><div class="product-grid">${products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3).map(productCard).join("")}</div></section></main>`;
}

function renderCart() {
  const items = cartProducts();
  if (!items.length) return `<main class="page"><div class="page-heading"><p class="eyebrow">Carrinho</p><h1>Os seus produtos selecionados</h1></div><div class="empty-state"><div class="empty-icon">🛒</div><h3>${t("empty")}</h3><p>Adicione produtos do catálogo para continuar.</p>${button("Explorar produtos", "view:products", "button button-dark")}</div></main>`;
  return `<main class="page"><div class="page-heading"><p class="eyebrow">Carrinho</p><h1>Os seus produtos selecionados</h1></div><div class="cart-layout"><div class="cart-list">${items.map((product) => `<div class="card cart-item"><div class="cart-thumb"><img src="${product.image}" alt="${escapeHtml(product.name)}" ${imageFallback(product.image)}></div><div class="cart-item-main"><div class="cart-item-head"><div><h3>${escapeHtml(product.name)}</h3></div><button class="remove-button" data-remove="${product.id}" aria-label="Remover produto">×</button></div><div class="cart-item-bottom"><div class="quantity-control"><button class="circle-button" data-update="${product.id}:−">−</button><span>${product.quantity}</span><button class="circle-button" data-update="${product.id}:+">+</button></div><div><p class="price-label">Preço</p><p class="price">${money(product.price * product.quantity)}</p></div></div></div></div>`).join("")}</div>${summary("Continuar a comprar", "view:products")}</div></main>`;
}

function summary(primary, action) { return `<aside class="card summary"><p class="eyebrow">Resumo do pedido</p><h2>Total</h2><div style="margin-top:20px"><div class="summary-row"><span>Artigos</span><span>${cartCount()}</span></div><div class="summary-row"><span>Subtotal</span><span>${money(subtotal())}</span></div><div class="summary-row"><span>Entrega</span><span>${money(0)}</span></div><div class="summary-row summary-total"><span>Total</span><span>${money(subtotal())}</span></div></div>${button(primary, action, "button button-dark button-full")}${button(t("clear"), "clear-cart", "button button-outline button-full")}</aside>`; }

function renderCheckout() {
  if (state.order) return `<main class="page"><div class="card confirmation"><div class="confirm-icon">✓</div><p class="eyebrow" style="margin-top:30px">Pedido confirmado</p><h1>Obrigado pelo seu pedido</h1><p>O número do seu pedido é <strong>${state.order}</strong></p><p>Entraremos em contacto para confirmar os detalhes da entrega.</p>${button("Continuar a comprar →", "view:products", "button button-dark")}</div></main>`;
  return `<main class="page"><div class="page-heading"><p class="eyebrow">Finalização</p><h1>Conclua o seu pedido</h1></div><div class="checkout-layout"><form class="card checkout-card" data-checkout><p class="form-title">Informações do cliente</p><div class="form-grid"><label class="form-group"><span>Nome completo</span><input name="fullName" required placeholder="O seu nome completo"></label><label class="form-group"><span>Número de telefone</span><input name="phone" required placeholder="O seu número de telefone"></label><label class="form-group full"><span>E-mail</span><input name="email" type="email" required placeholder="email@exemplo.com"></label><label class="form-group full"><span>Morada</span><input name="address" required placeholder="Morada"></label><label class="form-group full"><span>Cidade</span><input name="city" required placeholder="Cidade"></label></div><p class="form-title" style="margin-top:28px">Método de pagamento</p><div class="payment-grid">${["Pagamento na entrega", "Transferência bancária", "Pagamento móvel"].map((method) => `<button type="button" class="payment-option ${state.payment === method ? "selected" : ""}" data-payment="${method}">${method}</button>`).join("")}</div>${button("Concluir pedido →", "submit-checkout", "button button-dark button-full")}</form>${summary("Voltar ao carrinho", "view:cart")}</div></main>`;
}

function renderServices() { return `<main class="page"><div class="page-heading"><p class="eyebrow">Apoio</p><h1>Serviços farmacêuticos</h1></div><div class="service-grid">${services.map(([icon, title, text]) => `<div class="card feature-card"><div class="service-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></main>`; }
function renderAbout() { return `<main class="page"><div class="card detail-card"><p class="eyebrow">Sobre a Farmacia Camunda Central</p><h1>Cuidado profissional. Orientação de confiança. Uma experiência farmacêutica moderna.</h1><p class="detail-description">A Farmacia Camunda Central oferece uma experiência de saúde simples, fiável e de qualidade. Este site apresenta conteúdos provisórios enquanto as informações oficiais são preparadas.</p><div class="cards-3" style="margin-top:35px"><div class="card feature-card"><h3>Confiança</h3><p>Comunicação clara e apoio de saúde fiável.</p></div><div class="card feature-card"><h3>Qualidade</h3><p>Artigos selecionados para o bem-estar diário.</p></div><div class="card feature-card"><h3>Serviço</h3><p>Apoio centrado no cliente e uma experiência online simples.</p></div></div></div></main>`; }
function renderContact() { return `<main class="page"><div class="card detail-card"><p class="eyebrow">Contacto</p><h1>Ajude-nos a encontrar o que precisa</h1><div class="cards-3" style="margin-top:35px"><div class="card contact-card"><div class="contact-title">⌖ Localização</div><p>Benguela e Luanda, Angola</p></div><div class="card contact-card"><div class="contact-title">☎ Telefone</div><p>[TELEFONE A CONFIRMAR]</p></div><div class="card contact-card"><div class="contact-title">✉ E-mail</div><p>[E-MAIL A CONFIRMAR]</p></div></div></div></main>`; }

function renderDrawer() {
  const items = cartProducts();
  return `<div class="drawer-backdrop ${state.drawer ? "open" : ""}" data-action="close-drawer"></div><aside class="cart-drawer ${state.drawer ? "open" : ""}"><div class="drawer-header"><div><p class="eyebrow">O seu pedido</p><h2>Carrinho</h2></div><button class="icon-button" data-action="close-drawer">×</button></div><div class="drawer-items">${items.length ? items.map((product) => `<div class="drawer-item"><div class="cart-thumb"><img src="${product.image}" alt="${escapeHtml(product.name)}" ${imageFallback(product.image)}></div><div class="drawer-item-main"><h4>${escapeHtml(product.name)}</h4><div class="cart-item-bottom"><div class="quantity-control"><button class="circle-button" data-update="${product.id}:−">−</button><span>${product.quantity}</span><button class="circle-button" data-update="${product.id}:+">+</button></div><strong>${money(product.price * product.quantity)}</strong></div></div></div>`).join("") : `<div class="empty-state"><div class="empty-icon">🛒</div><p>${t("empty")}</p><p>${t("emptyText")}</p></div>`}</div><div class="drawer-footer"><div class="summary-row"><span>Subtotal</span><strong>${money(subtotal())}</strong></div><div class="summary-row"><span>Entrega</span><strong>${money(0)}</strong></div><div class="summary-row summary-total"><span>Total</span><strong>${money(subtotal())}</strong></div>${button(t("clear"), "clear-cart", "button button-outline button-full")}${button(t("checkout"), "view:checkout", "button button-dark button-full")}</div></aside>`;
}

function renderFooter() { return `<footer class="site-footer"><div class="footer-inner"><div class="footer-brand"><strong>Farmacia Camunda Central</strong><p>Cuidados de saúde de confiança em Benguela e Luanda.</p></div><div class="footer-columns"><div><h4>Ligações rápidas</h4><button data-view="products">Produtos</button><button data-view="services">Serviços</button><button data-view="contact">Contacto</button></div><div><h4>Localização</h4><span>Benguela e Luanda</span><span>Contacto a confirmar</span><span>E-mail a confirmar</span></div><div><h4>Redes sociais</h4><span>Instagram</span><span>Facebook</span><span>LinkedIn</span></div></div></div><div class="footer-bottom"><span>© 2026 Farmacia Camunda Central</span><span>Profissional. Próxima. De confiança.</span><button type="button" class="scroll-top-button" data-action="scroll-top">↑ Voltar ao topo</button></div></footer>`; }

function render() {
  document.documentElement.lang = state.language;
  document.body.classList.remove("view-home", "view-products", "view-details", "view-cart", "view-checkout", "view-services", "view-about", "view-contact");
  document.body.classList.add(`view-${state.view}`);
  const views = { home: renderHome, products: renderProducts, details: renderDetails, cart: renderCart, checkout: renderCheckout, services: renderServices, about: renderAbout, contact: renderContact };
  const page = views[state.view]().replaceAll("/image/", imageBase);
  app.innerHTML = `${renderHeaderLogo()}${renderLanguage()}${renderNav()}<div class="content-wrap">${page}${renderFooter()}</div>${renderDrawer()}<a class="floating-whatsapp" href="https://wa.me/?text=${encodeURIComponent("Olá Farmacia Camunda Central, gostaria de fazer um pedido.")}" target="_blank" rel="noreferrer" aria-label="Pedido por WhatsApp">◔</a>`;
  startHeroSlideshow();
  window.setTimeout(hydrateProductImages, 0);
}

let heroSlideTimer;
let activeHeroSlide = 0;
function startHeroSlideshow() {
  clearInterval(heroSlideTimer);
  heroSlideTimer = setInterval(() => {
    const gallery = document.querySelector(".hero-gallery");
    const images = gallery?.querySelectorAll("img");
    if (!gallery || !images || images.length !== 3) return;

    activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
    gallery.classList.add("slide-changing");
    window.setTimeout(() => {
      heroSlides[activeHeroSlide].forEach((source, index) => {
        images[index].src = source;
      });
      gallery.classList.remove("slide-changing");
    }, 350);
  }, 12000);
}

function navigate(view) {
  state.view = view;
  state.drawer = false;
  if (view !== "details") state.quantity = 1;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function addToCart(id, quantity = 1) {
  const existing = state.cart.find((item) => item.id === id);
  if (existing) existing.quantity += quantity; else state.cart.push({ id, quantity });
  saveCart(); state.drawer = true; render();
}
function updateQuantity(id, change) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  saveCart(); render();
}
function submitCheckout(form) {
  if (!form.reportValidity()) return;
  state.order = `KP-${Math.floor(Math.random() * 9000 + 1000)}`;
  state.cart = []; saveCart(); render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-action], [data-view], [data-language], [data-remove], [data-update], [data-quantity], [data-payment]");
  if (!target) return;
  if (target.dataset.view) return navigate(target.dataset.view);
  if (target.dataset.language) { state.language = target.dataset.language; localStorage.setItem("kamunda-language", state.language); render(); return; }
  if (target.dataset.action?.startsWith("view:")) return navigate(target.dataset.action.split(":")[1]);
  if (target.dataset.action === "close-drawer") { state.drawer = false; render(); return; }
  if (target.dataset.action === "scroll-top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (target.dataset.action === "clear-cart") { state.cart = []; saveCart(); render(); return; }
  if (target.dataset.action?.startsWith("details:")) { state.selected = productById(target.dataset.action.split(":")[1]); state.quantity = 1; navigate("details"); return; }
  if (target.dataset.action?.startsWith("add:")) return addToCart(target.dataset.action.split(":")[1]);
  if (target.dataset.action?.startsWith("add-detail:")) return addToCart(target.dataset.action.split(":")[1], state.quantity);
  if (target.dataset.quantity) { state.quantity = Math.max(1, state.quantity + (target.dataset.quantity === "+" ? 1 : -1)); render(); return; }
  if (target.dataset.remove) { state.cart = state.cart.filter((item) => item.id !== target.dataset.remove); saveCart(); render(); return; }
  if (target.dataset.update) { const [id, change] = target.dataset.update.split(":"); updateQuantity(id, change === "+" ? 1 : -1); return; }
  if (target.dataset.payment) { state.payment = target.dataset.payment; render(); return; }
  if (target.dataset.action === "submit-checkout") { submitCheckout(target.closest("form")); }
});

document.addEventListener("input", (event) => {
  if (!event.target.matches("[data-search]")) return;
  state.query = event.target.value;
  const view = event.target.closest("main")?.querySelector(".product-grid");
  if (state.view === "products") render();
  else if (view) { state.view = "products"; render(); document.querySelector("[data-search]").focus(); }
});

document.addEventListener("submit", (event) => { if (event.target.matches("[data-checkout]")) { event.preventDefault(); submitCheckout(event.target); } });
render();
window.addEventListener("scroll", () => {
  document.body.classList.toggle("site-logo-hidden", window.scrollY > 24);
}, { passive: true });

function revealSite() {
  document.body.classList.remove("site-idle");
}
function hideSite() {
  document.body.classList.add("site-idle");
}

document.body.addEventListener("mouseenter", revealSite);
document.body.addEventListener("mouseleave", hideSite);
document.body.addEventListener("click", revealSite);
document.addEventListener("mousemove", revealSite, { passive: true });
window.addEventListener("pointermove", revealSite, { passive: true });
document.body.classList.add("site-idle");
