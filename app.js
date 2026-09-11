const imageBase = new URL("image/", document.baseURI).href;
const illustrativeMedicationImages = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=85",
];
products.forEach((product) => {
  product.image = product.image.replace(/^\/image\//, imageBase);
  if (product.featured) product.image = illustrativeMedicationImages[products.filter((item) => item.featured).indexOf(product) % illustrativeMedicationImages.length];
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
  { images: [`${imageBase}backgroud1.png`, `${imageBase}background2.jpg`, `${imageBase}backgroud3.png`], eyebrow: "Cuidado farmacêutico de confiança", brand: "Farmacia Camunda Central", title: "A sua saúde.", accent: "A nossa prioridade.", description: "Produtos de saúde e apoio profissional, disponíveis todos os dias para cuidar de toda a família." },
  { images: [`${imageBase}background4.png`, `${imageBase}background5.png`, `${imageBase}background6.png`], eyebrow: "Entregas em Angola", brand: "Saúde à sua porta", title: "Cuidamos de si.", accent: "Onde estiver.", description: "Entregas de porta em porta em Benguela, Lobito e Luanda, com atendimento próximo e seguro 24/7." },
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
  deliveryCity: "",
  messageOpen: false,
};

const app = document.querySelector("#app");
const t = (key) => translations[state.language][key] || translations.pt[key] || key;
const uiTranslations = {
  en: {
    "Cuidado farmacêutico de confiança": "Trusted pharmacy care", "A sua saúde.": "Your health.", "A nossa prioridade.": "Our priority.", "Comprar produtos →": "Shop products →", "Ver produtos →": "View products →", "Fale connosco": "Contact us", "Resumo do pedido": "Order summary", "Produtos": "Products", "Entrega": "Delivery", "Apoio": "Support", "Cuidado profissional": "Professional care", "Foco no bem-estar": "Wellness focus", "Experiência moderna": "Modern experience", "Encontre o que precisa": "Find what you need", "Explorar produtos": "Explore products", "O que oferecemos": "What we offer", "Serviços farmacêuticos": "Pharmacy services", "Sobre nós": "About us", "Localização e contacto": "Location and contact", "Produtos da farmácia": "Pharmacy products", "Pesquisar catálogo": "Search catalogue", "Comprar": "Buy", "Preço": "Price", "Stock": "Stock", "Carrinho": "Cart", "Total": "Total", "Artigos": "Items", "Subtotal": "Subtotal", "Continuar a comprar": "Continue shopping", "Limpar carrinho": "Clear cart", "Concluir pedido": "Complete order", "Voltar ao topo": "Back to top"
  },
  fr: {
    "Cuidado farmacêutico de confiança": "Soins pharmaceutiques de confiance", "A sua saúde.": "Votre santé.", "A nossa prioridade.": "Notre priorité.", "Comprar produtos →": "Acheter des produits →", "Ver produtos →": "Voir les produits →", "Fale connosco": "Nous contacter", "Resumo do pedido": "Résumé de la commande", "Produtos": "Produits", "Entrega": "Livraison", "Apoio": "Assistance", "Cuidado profissional": "Soins professionnels", "Foco no bem-estar": "Bien-être", "Experiência moderna": "Expérience moderne", "Encontre o que precisa": "Trouvez ce dont vous avez besoin", "Explorar produtos": "Explorer les produits", "O que oferecemos": "Ce que nous proposons", "Serviços farmacêuticos": "Services pharmaceutiques", "Sobre nós": "À propos", "Localização e contacto": "Localisation et contact", "Produtos da farmácia": "Produits de la pharmacie", "Pesquisar catálogo": "Rechercher dans le catalogue", "Comprar": "Acheter", "Preço": "Prix", "Stock": "Stock", "Carrinho": "Panier", "Total": "Total", "Artigos": "Articles", "Subtotal": "Sous-total", "Continuar a comprar": "Continuer les achats", "Limpar carrinho": "Vider le panier", "Concluir pedido": "Valider la commande", "Voltar ao topo": "Retour en haut"
  }
};
function translateUi() {
  if (state.language === "pt") return;
  const dictionary = uiTranslations[state.language];
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const key = node.nodeValue.trim();
    if (dictionary[key]) node.nodeValue = node.nodeValue.replace(key, dictionary[key]);
  });
}
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
function deliveryFee(city) {
  const normalizedCity = String(city || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (!normalizedCity) return 0;
  return ["luanda", "benguela", "lobito"].some((name) => normalizedCity.includes(name)) ? 3000 : 5000;
}

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
  const image = product.image;
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
  return `<main><section class="hero"><div class="hero-gallery" aria-hidden="true"><img src="/image/backgroud1.png" alt=""><img src="/image/background2.jpg" alt=""><img src="/image/backgroud3.png" alt=""></div><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">Cuidado farmacêutico de confiança</p><p class="eyebrow">Farmacia Camunda Central</p><h1>A sua saúde.<span>A nossa prioridade.</span></h1><p>Produtos de saúde, apoio ao bem-estar e soluções farmacêuticas modernas para toda a família.</p><div class="hero-actions">${button("Ver produtos →", "view:products", "button button-light")}${button("Fale connosco", "view:contact", "button button-ghost")}</div></div><div class="hero-summary"><div class="hero-summary-inner"><p class="eyebrow">Resumo do pedido</p><div class="stat-row"><span>Produtos</span><strong>${cartCount()}</strong></div><div class="stat-row"><span>Entrega</span><strong>Local</strong></div><div class="stat-row"><span>Apoio</span><strong>24/7</strong></div></div></div></div></section><section class="section"><div class="cards-3"><div class="card feature-card"><div class="feature-icon">✓</div><h3>Cuidado profissional</h3><p>Apoio de confiança para o bem-estar e as necessidades farmacêuticas diárias.</p></div><div class="card feature-card"><div class="feature-icon">♡</div><h3>Foco no bem-estar</h3><p>Seleção cuidada para pacientes, famílias e estilos de vida ativos.</p></div><div class="card feature-card"><div class="feature-icon">✦</div><h3>Experiência moderna</h3><p>Uma experiência simples, acessível e moderna para cuidar da sua saúde.</p></div></div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">Encontre o que precisa</p><h2>Explorar produtos</h2></div><div class="search-bar"><span class="search-icon">⌕</span><input data-search placeholder="Pesquisar produtos, marcas ou categorias"></div></div><div class="product-grid">${featured.map(productCard).join("")}</div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">O que oferecemos</p><h2>Serviços farmacêuticos</h2></div></div><div class="service-grid">${services.map(([icon, title, text]) => `<div class="card feature-card"><div class="service-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></section><section class="section"><div class="card about-band"><div><p class="eyebrow">Sobre nós</p><h2>Apoio farmacêutico profissional e próximo das pessoas.</h2><p>A Farmacia Camunda Central aposta na confiança, no atendimento próximo e em produtos de saúde de qualidade para Benguela e Luanda.</p><div class="check-list"><div class="check-item"><span class="check">✓</span>Atendimento próximo e orientação de confiança</div><div class="check-item"><span class="check">✓</span>Padrões profissionais de serviço</div><div class="check-item"><span class="check">✓</span>Experiência moderna de cuidados de saúde</div></div></div><div class="info-panel"><div class="info-grid"><div class="info-cell"><p class="eyebrow">Localização</p><strong>Benguela e Luanda, Angola</strong></div><div class="info-cell"><p class="eyebrow">Horário</p><strong>Segunda a sábado, 08:00-18:00</strong></div><div class="info-cell"><p class="eyebrow">Telefone</p><strong>Contacto a confirmar</strong></div><div class="info-cell"><p class="eyebrow">E-mail</p><strong>E-mail a confirmar</strong></div></div></div></div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">Visite-nos</p><h2>Localização e contacto</h2></div>${button("Contactar apoio", "view:contact", "button button-outline")}</div><div class="location-grid"><div class="card map-placeholder"><div><div class="map-pin">⌖</div><strong>Localização da farmácia</strong><p>Benguela e Luanda, Angola</p></div></div><div class="contact-stack"><div class="card contact-card"><div class="contact-title">⌖ Morada</div><p>Benguela e Luanda, Angola</p></div><div class="card contact-card"><div class="contact-title">◷ Horário de funcionamento</div><p>Segunda a sábado: 08:00-18:00</p><p>Domingo e Feriados</p></div><div class="card contact-card"><div class="contact-title">☎ Contacto</div><p>Telefone a confirmar</p><p>WhatsApp a confirmar</p><p>E-mail a confirmar</p></div></div></div></section></main>`;
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

function summary(primary, action, delivery = 0) { return `<aside class="card summary"><p class="eyebrow">Resumo do pedido</p><h2>Total</h2><div style="margin-top:20px"><div class="summary-row"><span>Artigos</span><span>${cartCount()}</span></div><div class="summary-row"><span>Subtotal</span><span>${money(subtotal())}</span></div><div class="summary-row"><span>Entrega</span><span data-delivery-fee>${money(delivery)}</span></div><div class="summary-row summary-total"><span>Total</span><span data-order-total>${money(subtotal() + delivery)}</span></div></div>${button(primary, action, "button button-dark button-full")}${button(t("clear"), "clear-cart", "button button-outline button-full")}</aside>`; }

function renderCheckout() {
  if (state.order) return `<main class="page"><div class="card confirmation"><div class="confirm-icon">✓</div><p class="eyebrow" style="margin-top:30px">Pedido confirmado</p><h1>Obrigado pelo seu pedido</h1><p>O número do seu pedido é <strong>${state.order}</strong></p><p>Entraremos em contacto para confirmar os detalhes da entrega.</p>${button("Continuar a comprar →", "view:products", "button button-dark")}</div></main>`;
  return `<main class="page"><div class="page-heading"><p class="eyebrow">Finalização</p><h1>Conclua o seu pedido</h1></div><div class="checkout-layout"><form class="card checkout-card" data-checkout><p class="form-title">Informações do cliente</p><div class="form-grid"><label class="form-group"><span>Nome completo</span><input name="fullName" required placeholder="O seu nome completo"></label><label class="form-group"><span>Número de telefone</span><input name="phone" required placeholder="O seu número de telefone"></label><label class="form-group full"><span>E-mail</span><input name="email" type="email" required placeholder="email@exemplo.com"></label><label class="form-group full"><span>Morada</span><input name="address" required placeholder="Morada"></label><label class="form-group full"><span>Cidade</span><input name="city" required placeholder="Luanda, Benguela ou Lobito" value="${escapeHtml(state.deliveryCity)}"><small class="delivery-note">Entrega na cidade: 3.000 Kz · Fora da cidade: 5.000 Kz</small></label></div><p class="form-title" style="margin-top:28px">Método de pagamento</p><div class="payment-grid">${["Pagamento na entrega", "Transferência bancária", "Pagamento móvel"].map((method) => `<button type="button" class="payment-option ${state.payment === method ? "selected" : ""}" data-payment="${method}">${method}</button>`).join("")}</div>${button("Concluir pedido →", "submit-checkout", "button button-dark button-full")}</form>${summary("Voltar ao carrinho", "view:cart", deliveryFee(state.deliveryCity))}</div></main>`;
}

function renderServices() { return `<main class="page"><div class="page-heading"><p class="eyebrow">Apoio</p><h1>Serviços farmacêuticos</h1></div><div class="service-grid">${services.map(([icon, title, text]) => `<div class="card feature-card"><div class="service-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></main>`; }
function renderAbout() { return `<main class="page"><div class="card detail-card"><p class="eyebrow">Sobre a Farmacia Camunda Central</p><h1>Cuidado profissional. Orientação de confiança. Uma experiência farmacêutica moderna.</h1><p class="detail-description">A Farmacia Camunda Central oferece uma experiência de saúde simples, fiável e de qualidade. Este site apresenta conteúdos provisórios enquanto as informações oficiais são preparadas.</p><div class="cards-3" style="margin-top:35px"><div class="card feature-card"><h3>Confiança</h3><p>Comunicação clara e apoio de saúde fiável.</p></div><div class="card feature-card"><h3>Qualidade</h3><p>Artigos selecionados para o bem-estar diário.</p></div><div class="card feature-card"><h3>Serviço</h3><p>Apoio centrado no cliente e uma experiência online simples.</p></div></div></div></main>`; }
function renderContact() { return `<main class="page"><div class="card detail-card"><p class="eyebrow">Contacto</p><h1>Ajude-nos a encontrar o que precisa</h1><p class="detail-description">Estamos abertos 24/7 e entregamos saúde de porta em porta em Benguela, Lobito e Luanda.</p><div class="cards-3" style="margin-top:35px"><div class="card contact-card"><div class="contact-title">⌖ Localizações</div><p>Benguela: Rua 28 de Maio<br>Luanda: Vila de Viana, Angomart</p></div><div class="card contact-card"><div class="contact-title">☎ Telefones</div><p><a href="tel:+244931898121">931 898 121</a><br><a href="tel:+244934309944">934 309 944</a></p></div><div class="card contact-card"><div class="contact-title">✉ E-mail</div><p><a href="mailto:farmaciacamundagroup@gmail.com">farmaciacamundagroup@gmail.com</a></p></div></div></div></main>`; }

function renderDrawer() {
  const items = cartProducts();
  return `<div class="drawer-backdrop ${state.drawer ? "open" : ""}" data-action="close-drawer"></div><aside class="cart-drawer ${state.drawer ? "open" : ""}"><div class="drawer-header"><div><p class="eyebrow">O seu pedido</p><h2>Carrinho</h2></div><button class="icon-button" data-action="close-drawer">×</button></div><div class="drawer-items">${items.length ? items.map((product) => `<div class="drawer-item"><div class="cart-thumb"><img src="${product.image}" alt="${escapeHtml(product.name)}" ${imageFallback(product.image)}></div><div class="drawer-item-main"><h4>${escapeHtml(product.name)}</h4><div class="cart-item-bottom"><div class="quantity-control"><button class="circle-button" data-update="${product.id}:−">−</button><span>${product.quantity}</span><button class="circle-button" data-update="${product.id}:+">+</button></div><strong>${money(product.price * product.quantity)}</strong></div></div></div>`).join("") : `<div class="empty-state"><div class="empty-icon">🛒</div><p>${t("empty")}</p><p>${t("emptyText")}</p></div>`}</div><div class="drawer-footer"><div class="summary-row"><span>Subtotal</span><strong>${money(subtotal())}</strong></div><div class="summary-row"><span>Entrega</span><strong>${money(0)}</strong></div><div class="summary-row summary-total"><span>Total</span><strong>${money(subtotal())}</strong></div>${button(t("clear"), "clear-cart", "button button-outline button-full")}${button(t("checkout"), "view:checkout", "button button-dark button-full")}</div></aside>`;
}

function renderMessagePanel() {
  return `<div class="whatsapp-panel ${state.messageOpen ? "open" : ""}" role="dialog" aria-label="Enviar mensagem para a Farmacia Camunda Entregas"><div class="whatsapp-panel-head"><div><span class="whatsapp-status"></span><strong>Farmacia Camunda Entregas</strong><small>Resposta rápida · aberto 24/7</small></div><button type="button" class="whatsapp-close" data-action="close-message" aria-label="Fechar mensagem">×</button></div><form data-whatsapp-form><label for="whatsapp-message">Mensagem</label><textarea id="whatsapp-message" name="message" required placeholder="Olá, gostaria de fazer um pedido...">Olá, gostaria de fazer um pedido.</textarea><button type="submit" class="whatsapp-send">Escrever para o Gestor <span>↗</span></button><small class="whatsapp-contact">931 898 121 · Benguela · Lobito · Luanda</small></form></div><button type="button" class="floating-whatsapp ${state.messageOpen ? "active" : ""}" data-action="toggle-message" aria-label="Enviar mensagem pelo WhatsApp"><span class="whatsapp-symbol">◔</span><span>Mensagem</span></button>`;
}

function renderFooter() { return `<footer class="site-footer"><div class="footer-inner"><div class="footer-brand"><strong>Farmacia Camunda Central</strong><p>Cuidados de saúde de confiança em Benguela e Luanda.</p></div><div class="footer-columns"><div><h4>Ligações rápidas</h4><button data-view="products">Produtos</button><button data-view="services">Serviços</button><button data-view="contact">Contacto</button></div><div><h4>Localização</h4><span>Benguela · Lobito · Luanda</span></div><div><h4>Redes sociais</h4><span>Instagram</span><span>Facebook</span><span>LinkedIn</span></div></div></div><div class="footer-bottom"><span>© 2026 Farmacia Camunda Central</span><span>Profissional. Próxima. De confiança.</span><button type="button" class="scroll-top-button" data-action="scroll-top">↑ Voltar ao topo</button></div></footer>`; }

function render() {
  document.documentElement.lang = state.language;
  document.body.classList.remove("view-home", "view-products", "view-details", "view-cart", "view-checkout", "view-services", "view-about", "view-contact");
  document.body.classList.add(`view-${state.view}`);
  const views = { home: renderHome, products: renderProducts, details: renderDetails, cart: renderCart, checkout: renderCheckout, services: renderServices, about: renderAbout, contact: renderContact };
  const page = views[state.view]().replaceAll('src="/image/', `src="${imageBase}`).replaceAll("Contacto a confirmar", "931 898 121 / 934 309 944").replaceAll("Telefone a confirmar", "931 898 121 / 934 309 944").replaceAll("WhatsApp a confirmar", "").replaceAll("E-mail a confirmar", "farmaciacamundagroup@gmail.com").replaceAll("<p></p>", "");
  const footer = renderFooter().replace(/<button type="button" class="scroll-top-button"[^>]*>.*?<\/button>/, "").replace("<span>Instagram</span><span>Facebook</span><span>LinkedIn</span>", "<a class=\"social-icon social-facebook\" href=\"#\" aria-label=\"Facebook\">f</a><a class=\"social-icon social-instagram\" href=\"#\" aria-label=\"Instagram\">◎</a><a class=\"social-icon social-x\" href=\"#\" aria-label=\"X\">X</a>").replaceAll("Cuidados de saúde de confiança em Benguela e Luanda.", "A número um em Angola a entregar saúde à porta dos Angolanos.").replaceAll("Benguela e Luanda", "Benguela · Lobito · Luanda").replaceAll("Contacto a confirmar", "931 898 121 / 934 309 944").replaceAll("Telefone a confirmar", "931 898 121 / 934 309 944").replaceAll("WhatsApp a confirmar", "").replaceAll("E-mail a confirmar", "farmaciacamundagroup@gmail.com").replaceAll("<p></p>", "");
  app.innerHTML = `${renderHeaderLogo()}${renderLanguage()}${renderNav()}<div class="content-wrap">${page}${footer}</div>${renderDrawer()}${renderMessagePanel()}`;
  translateUi();
  startHeroSlideshow();
}

let heroSlideTimer;
let activeHeroSlide = 0;
let activeMobileHeroSlide = 0;
function startHeroSlideshow() {
  clearInterval(heroSlideTimer);
  const isMobile = window.matchMedia("(max-width: 620px)").matches;
  const mobileSlides = heroSlides.flatMap((slide) => slide.images);
  if (isMobile) {
    const mobileGallery = document.querySelector(".hero-gallery");
    const mobileImage = mobileGallery?.querySelector("img");
    if (mobileImage) mobileImage.src = mobileSlides[activeMobileHeroSlide];
  }
  heroSlideTimer = setInterval(() => {
    const gallery = document.querySelector(".hero-gallery");
    const images = gallery?.querySelectorAll("img");
    if (!gallery || !images || images.length !== 3) return;

    if (window.matchMedia("(max-width: 620px)").matches) {
      activeMobileHeroSlide = (activeMobileHeroSlide + 1) % mobileSlides.length;
      gallery.classList.add("slide-changing");
      window.setTimeout(() => {
        images[0].src = mobileSlides[activeMobileHeroSlide];
        updateHeroCopy(heroSlides[activeMobileHeroSlide < 3 ? 0 : 1]);
        gallery.classList.remove("slide-changing");
      }, 350);
      return;
    }

    activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
    gallery.classList.add("slide-changing");
    window.setTimeout(() => {
      heroSlides[activeHeroSlide].images.forEach((source, index) => {
        images[index].src = source;
      });
      updateHeroCopy(heroSlides[activeHeroSlide]);
      gallery.classList.remove("slide-changing");
    }, 350);
  }, isMobile ? 8000 : 12000);
}

function updateHeroCopy(slide) {
  const copy = document.querySelector(".hero-copy");
  if (!copy) return;
  const eyebrow = copy.querySelectorAll(".eyebrow");
  const title = copy.querySelector("h1");
  const description = copy.querySelector("h1 + p");
  if (eyebrow[0]) eyebrow[0].textContent = slide.eyebrow;
  if (eyebrow[1]) eyebrow[1].textContent = slide.brand;
  if (title) {
    title.childNodes[0].nodeValue = slide.title;
    const accent = title.querySelector("span");
    if (accent) accent.textContent = slide.accent;
  }
  if (description) description.textContent = slide.description;
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
  state.deliveryCity = form.elements.city.value.trim();
  state.order = `KP-${Math.floor(Math.random() * 9000 + 1000)}`;
  state.cart = []; saveCart(); render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-action], [data-view], [data-language], [data-remove], [data-update], [data-quantity], [data-payment]");
  if (!target) return;
  if (target.dataset.view) return navigate(target.dataset.view);
  if (target.dataset.language) { state.language = target.dataset.language; localStorage.setItem("kamunda-language", state.language); render(); return; }
  if (target.dataset.action?.startsWith("view:")) return navigate(target.dataset.action.split(":")[1]);
  if (target.dataset.action === "toggle-message") { state.messageOpen = !state.messageOpen; render(); return; }
  if (target.dataset.action === "close-message") { state.messageOpen = false; render(); return; }
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
  if (event.target.matches("[name=city]")) {
    state.deliveryCity = event.target.value;
    const fee = deliveryFee(state.deliveryCity);
    const feeElement = document.querySelector("[data-delivery-fee]");
    const totalElement = document.querySelector("[data-order-total]");
    if (feeElement) feeElement.textContent = money(fee);
    if (totalElement) totalElement.textContent = money(subtotal() + fee);
    return;
  }
  if (!event.target.matches("[data-search]")) return;
  state.query = event.target.value;
  const cursorPosition = event.target.selectionStart ?? state.query.length;
  const view = event.target.closest("main")?.querySelector(".product-grid");
  if (state.view === "products") {
    render();
    const searchInput = document.querySelector("[data-search]");
    searchInput?.focus();
    searchInput?.setSelectionRange(cursorPosition, cursorPosition);
  } else if (view) {
    state.view = "products";
    render();
    const searchInput = document.querySelector("[data-search]");
    searchInput?.focus();
    searchInput?.setSelectionRange(cursorPosition, cursorPosition);
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-checkout]")) { event.preventDefault(); submitCheckout(event.target); return; }
  if (event.target.matches("[data-whatsapp-form]")) {
    event.preventDefault();
    const message = event.target.elements.message.value.trim();
    if (!message) return;
    window.open(`https://wa.me/244931898121?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
});
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
