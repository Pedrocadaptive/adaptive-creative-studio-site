(function () {
  /* email da Adaptive, trocar aqui quando existir o definitivo */
  var MAIL = "geral@adaptive.com.pt";

  var SERVICES = [
    { pt: "Presença Digital",     en: "Digital Presence",
      npt: "Estratégia editorial, conteúdo, publicação e análise.",
      nen: "Editorial strategy, content, publishing and analysis.",
      lpt: "Construímos e mantemos a presença digital de uma marca, com estratégia editorial, conteúdo, design, publicação e análise contínua.",
      len: "We build and maintain a brand's digital presence, with editorial strategy, content, design, publishing and continuous analysis.",
      x: "2%",  y: "5%",  dx: "14px",  dy: "-18px", rot: "-2.5deg", dur: "14s", delay: "0s" },
    { pt: "Identidade de Marca",  en: "Brand Identity",
      npt: "Conceito, sistema visual, aplicações e guia de marca.",
      nen: "Concept, visual system, applications and brand guide.",
      lpt: "Construímos ou fazemos evoluir a identidade visual e verbal, do conceito ao sistema completo de tipografia, cor, aplicações e guia de utilização.",
      len: "We build or evolve visual and verbal identity, from concept to a complete system of typography, colour, applications and usage guidelines.",
      x: "64%", y: "0%",  dx: "-16px", dy: "16px",  rot: "2deg",   dur: "17s", delay: "-3s" },
    { pt: "Experiência Web",      en: "Web Experience",
      npt: "Arquitetura, design, desenvolvimento e publicação.",
      nen: "Architecture, design, development and launch.",
      lpt: "Websites e experiências digitais pensadas para apresentar, converter e suportar o negócio, da arquitetura de informação à publicação.",
      len: "Websites and digital experiences designed to present, convert and support the business, from information architecture through to launch.",
      x: "0%",  y: "50%", dx: "18px",  dy: "14px",  rot: "1.6deg", dur: "15s", delay: "-6s" },
    { pt: "Sistemas de Campanha", en: "Campaign Systems",
      npt: "Conceito, criativos, media e otimização contínua.",
      nen: "Concept, assets, media and continuous optimisation.",
      lpt: "Campanhas pagas e orgânicas desenhadas para objetivos concretos, do conceito criativo aos criativos, às landing pages e à otimização.",
      len: "Paid and organic campaigns built around concrete objectives, from creative concept to assets, landing pages and optimisation.",
      x: "68%", y: "56%", dx: "-13px", dy: "-17px", rot: "-2deg",  dur: "16s", delay: "-9s" },
    { pt: "Conteúdo & Motion",    en: "Content & Motion",
      npt: "Direção criativa, captação, edição e pós-produção.",
      nen: "Creative direction, shooting, editing and post.",
      lpt: "Produção audiovisual e conteúdo visual para marcas que precisam de presença e impacto, da direção criativa à pós-produção.",
      len: "Audiovisual production and visual content for brands that need presence and impact, from creative direction to post production.",
      x: "22%", y: "84%", dx: "12px",  dy: "-15px", rot: "2.4deg", dur: "18s", delay: "-2s" },
    { pt: "Direção Estratégica",  en: "Strategic Direction",
      npt: "Auditoria, posicionamento e plano de ação.",
      nen: "Audit, positioning and an action plan.",
      lpt: "Diagnóstico e orientação para marcas que precisam de clareza antes de executar, com auditoria, posicionamento e plano de ação.",
      len: "Diagnosis and direction for brands that need clarity before they execute, with audit, positioning and an action plan.",
      x: "50%", y: "88%", dx: "-15px", dy: "13px",  rot: "-1.8deg", dur: "13s", delay: "-5s" }
  ];

  var lang = "pt";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- texto a descodificar ---------- */
  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>+×░▒▓";
  function scramble(el, text, ms) {
    if (REDUCED) { el.textContent = text; return; }
    if (el.dataset.running === "1") { return; }
    el.dataset.running = "1";
    var chars = text.split("");
    var start = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - start) / ms);
      var locked = Math.floor(p * chars.length * 1.12);
      var out = "";
      for (var i = 0; i < chars.length; i++) {
        if (i < locked || chars[i] === " ") { out += chars[i]; }
        else { out += GLYPHS.charAt((Math.random() * GLYPHS.length) | 0); }
      }
      el.textContent = out;
      if (p < 1) { requestAnimationFrame(frame); }
      else { el.textContent = text; el.dataset.running = "0"; }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- cards ---------- */
  function makeChip(s, index, positioned) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.svc = s.pt;
    if (positioned) { b.dataset.orbiting = "1"; }
    var ix = document.createElement("span");
    ix.className = "chip-index";
    ix.textContent = "0" + (index + 1);
    var t = document.createElement("span"); t.className = "chip-title";
    var n = document.createElement("span"); n.className = "chip-note";
    b.appendChild(ix); b.appendChild(t); b.appendChild(n);
    b.addEventListener("click", function () { b.classList.toggle("is-open"); });
    b.addEventListener("mouseenter", function () {
      if (b.dataset.title) { scramble(t, b.dataset.title, 340); }
    });
    return b;
  }

  var field = document.querySelector(".chip-field");

  /* peças visuais nossas, abstratas, nas cores da marca */
  /* as peças ficam mais perto, os cards de texto afastam-se para libertar o título */
  /* peças visuais nossas, nas cores da marca e em fotografia */
  /* cada uma tem a sua elipse, o seu ritmo e o seu ponto de partida: é
     daí que vem a desordem natural da órbita */
  var TILES = [
    { v: 1, w: 176, h: 132, rot: -4,   rx: .56, ry: .72, per: 104, ph: 0.6 },
    { v: 2, w: 138, h: 176, rot:  5,   rx: .78, ry: .50, per: 128, ph: 2.4 },
    { v: 3, w: 100, h: 100, rot: -7,   rx: .82, ry: .66, per:  92, ph: 4.1 },
    { v: 4, w: 124, h: 124, rot:  6,   rx: .50, ry: .80, per: 116, ph: 5.3 },
    { v: 5, w: 160, h: 118, rot: -3,   rx: .70, ry: .76, per:  98, ph: 3.2 },
    { v: 6, w: 170, h:  96, rot:  4,   rx: .64, ry: .84, per: 112, ph: 1.5 },
    { v: 7, w: 112, h: 112, rot: -6,   rx: .86, ry: .58, per:  88, ph: 2.9 },
    { v: 8, w: 180, h: 101, rot: -2,   rx: .74, ry: .70, per: 122, ph: 4.8 },
    { v: 9, w: 120, h: 120, rot:  7,   rx: .58, ry: .88, per:  96, ph: 5.9 }
  ];

  var ORBITS = [
    { rx: .90, ry: .80, per:  88, ph: 0.0 },
    { rx: .97, ry: .70, per: 102, ph: 1.1 },
    { rx: .85, ry: .90, per:  94, ph: 2.2 },
    { rx: 1.00, ry: .74, per: 110, ph: 3.3 },
    { rx: .83, ry: .94, per:  84, ph: 4.4 },
    { rx: .94, ry: .84, per: 118, ph: 5.5 }
  ];

  var orbiters = [];

  TILES.forEach(function (t) {
    var d = document.createElement("div");
    d.className = "tile v" + t.v;
    d.style.width  = t.w + "px";
    d.style.height = t.h + "px";
    d.style.setProperty("--trot", t.rot + "deg");
    d.style.setProperty("--tdur", (9 + t.v) + "s");
    d.style.setProperty("--tdelay", (-t.v * 1.7) + "s");
    field.appendChild(d);
    orbiters.push({ el: d, rx: t.rx, ry: t.ry, per: t.per, ph: t.ph, rot: t.rot,
                    bobA: 5 + t.v, bobP: 8 + t.v, t: 0, paused: false });
  });

  SERVICES.forEach(function (s, i) {
    var c = makeChip(s, i, true);
    field.appendChild(c);
    var o = ORBITS[i];
    var item = { el: c, rx: o.rx, ry: o.ry, per: o.per, ph: o.ph, rot: 0,
                 bobA: 6, bobP: 9 + i, t: 0, paused: false };
    c.addEventListener("mouseenter", function () { item.paused = true; });
    c.addEventListener("mouseleave", function () { item.paused = false; });
    c.addEventListener("focus",  function () { item.paused = true; });
    c.addEventListener("blur",   function () { item.paused = false; });
    orbiters.push(item);
  });

  /* no telemóvel não há órbita: os cards de serviços e as fotografias
     passam numa fita, intercalados, com a mesma andadura */
  var ALTURA_FITA = 92;
  function pecaDaFita(t) {
    var d = document.createElement("div");
    d.className = "tile v" + t.v + " shown";
    d.style.height = ALTURA_FITA + "px";
    d.style.width = Math.round(t.w / t.h * ALTURA_FITA) + "px";
    d.setAttribute("aria-hidden", "true");
    return d;
  }

  document.querySelectorAll("[data-clone]").forEach(function (row, r) {
    var order = SERVICES.map(function (s, i) { return { s: s, i: i }; });
    var pecas = TILES.slice();
    if (r === 1) { order.reverse(); pecas.reverse(); }
    var p = 0;
    order.concat(order).forEach(function (o, k) {
      row.appendChild(makeChip(o.s, o.i, false));
      /* uma fotografia a cada dois cards, para a fita respirar */
      if (k % 2 === 1) { row.appendChild(pecaDaFita(pecas[(p++) % pecas.length])); }
    });
  });

  /* ---------- lista de servicos, pagina estudio ---------- */
  var svcList = document.getElementById("svc-list");
  SERVICES.forEach(function (s, i) {
    var li = document.createElement("li");
    li.className = "svc-item";
    li.innerHTML =
      '<span class="svc-num">0' + (i + 1) + '</span>' +
      '<span class="svc-name"></span>' +
      '<p class="svc-desc"></p>';
    li.dataset.svc = s.pt;
    svcList.appendChild(li);
  });

  /* ---------- select do formulario ---------- */
  var sel = document.getElementById("f-area");

  function paintServices() {
    document.querySelectorAll(".chip").forEach(function (b) {
      var s = SERVICES.filter(function (x) { return x.pt === b.dataset.svc; })[0];
      if (!s) { return; }
      var titulo = lang === "en" ? s.en : s.pt;
      b.dataset.title = titulo;
      b.querySelector(".chip-title").textContent = titulo;
      b.querySelector(".chip-note").textContent  = lang === "en" ? s.nen : s.npt;
    });
    document.querySelectorAll(".svc-item").forEach(function (li) {
      var s = SERVICES.filter(function (x) { return x.pt === li.dataset.svc; })[0];
      if (!s) { return; }
      li.querySelector(".svc-name").textContent = lang === "en" ? s.en : s.pt;
      li.querySelector(".svc-desc").textContent = lang === "en" ? s.len : s.lpt;
    });
    var keep = sel.value;
    sel.innerHTML = "";
    var first = document.createElement("option");
    first.value = "";
    first.textContent = lang === "en" ? "Not sure yet" : "Ainda não sei";
    sel.appendChild(first);
    SERVICES.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.pt;
      o.textContent = lang === "en" ? s.en : s.pt;
      sel.appendChild(o);
    });
    sel.value = keep;
  }

  /* ---------- email ---------- */
  document.querySelectorAll("[data-mail-link]").forEach(function (a) {
    a.href = "mailto:" + MAIL;
    if (a.hasAttribute("data-mail-text")) { a.textContent = MAIL; }
  });

  /* ---------- idioma ---------- */
  var EN = {
    nav1: "Work", nav2: "Studio", cta: "Contact",
    nav1b: "Work", nav2b: "Studio", ctab: "Contact",
    covereye: "Adaptive Creative Studio",
    coverhead: 'We help brands change with the market <span class="accent">without losing</span> what makes them recognisable.',
    coversub: "Strategy, identity, presence, digital experiences, campaigns and content, working as one system.",
    scroll: "(Scroll)",
    mintro: "A studio that connects strategy, creativity and delivery. We work a brand's digital presence, identity, web, campaigns and content as one coherent system, sometimes leading a project from start to finish, sometimes coming in as the creative partner inside a larger structure.",
    aboutlink: "About the studio", stagesub: "Six areas of work",
    woh: "Selected work", wostub: "Projects to be revealed",
    w1t: "Brand Identity", w2t: "Content & Motion", w3t: "Campaign Systems", w4t: "Web Experience",
    creye: "New project", crword: "Let's create",
    creye2: "New project", crword2: "Let's create",
    esteye: "Adaptive Creative Studio", esth: "A creative and strategic partner for brands with ambition.",
    est1lab: "The studio",
    est1p1: "Adaptive Creative Studio is a creative and strategic studio that helps brands and companies evolve in the digital environment through strategy, identity, presence, digital experiences, campaigns and content.",
    est1p2: "What we offer is the connection between strategy, creativity and delivery, so that a brand's communication stops being a set of isolated tasks and starts working as one coherent system. Markets change, technology changes and behaviour changes. We exist to make that adaptation clearer, more creative and genuinely executable.",
    est1p3: "We work with a limited number of brands at a time, because every project starts with a diagnosis rather than a template. Sometimes we lead a project from start to finish, sometimes we come in as the creative partner inside a larger structure.",
    est2lab: "Services", est2sub: "Six areas of work", est3lab: "The team", est4lab: "The ecosystem",
    photostub: "Pedro's photograph",
    e1s: "Active", e1d: "Creative, strategic, digital, content and campaign services. This is where we work today.",
    e2s: "Coming soon", e2d: "Research, artificial intelligence, automation and our own products. Currently being built.",
    coeye: "Contact", coh: "Tell us what your brand needs to solve.",
    fnome: "Name", fempresa: "Company", femail: "Email", farea: "Area of interest",
    fmsg: "What you need to solve", fsend: "Send",
    dmail: "Email",
    hoh: "How we work",
    h1n: "Conversation", h1d: "A meeting to understand the brand's context, objectives and priorities.",
    h2n: "Diagnosis",    h2d: "We tell you what we recommend, in what order, and what is better left for later.",
    h3n: "Proposal",     h3d: "Solution, scope, timeline and investment, presented together and without surprises.",
    h4n: "Delivery",     h4d: "Production with approvals defined at every stage, through to handover and launch.",
    lk1n: "To be revealed", lk1r: "Coming soon",
    lk2n: "To be revealed", lk2r: "Coming soon",
    mfc1: "[ Contact ]", mfc2: "[ Studio ]", mfc3: "[ Ecosystem ]", mfc4: "[ Follow ]",
    mfl1: "Home", mfl2: "Work", mfl3: "About", mfl4: "Contact",
    mfsoon: "coming soon",
    e2more: "Discover",
    ntext: "We use our own cookies to run the site and, if you allow it, marketing cookies that let us show you Adaptive ads on Facebook and Instagram. You can change your mind at any time.",
    nok: "Accept", nno: "Reject", nsave: "Save choices", nchoose: "Choose",
    cat1: "Necessary",
    cat1d: "They keep the language you choose and this choice, on your device. Without them the site does not work properly.",
    cat2: "Marketing",
    cat2d: "Meta Pixel, to measure interest in the site and show you Adaptive ads on Facebook and Instagram.",
    cat2s: "Turn on marketing cookies",
    catalways: "Always on",
    nlink: "Privacy policy",
    flegal: "By sending, your data is handled according to our",
    flegal2: "privacy and cookies policy",
    pvh: "How we handle your data.",
    pvdate: "Last updated: 27 September 2026",
    pvback: "Back", pvreset: "Review my cookie choice",
    rdcat: "Brand Identity",
    rdm1: "Client", rdm2: "Work", rdm2v: "Brand identity and guidelines", rdm3: "Year",
    rdl1: "The starting point",
    rdp1: "The client needed a logo that would let him present himself in another way, a more professional one. Today nobody chooses a physiotherapist on their CV alone. They also choose by what they see, and what they see has to build trust before the first session.",
    rdp2: "The question was not how to invent a symbol from scratch. It was how to give him one that had always been his.",
    rdl2: "The idea",
    rdp3: "We went to the official symbol of physiotherapy: an open hand protecting a human figure. The hand is the care of the person treating. The figure is the person being treated.",
    rdp4: "Instead of starting from nothing, the brand is born from the symbol that already stands for the profession, and now keeps the client's initials inside it. Nobody has to explain what he does: the symbol says it.",
    rdl3: "From the figure to the RD", rdl3s: "Four steps",
    rds1: "The symbol", rds1d: "The hand protects a human figure.",
    rds2: "The inner figure", rds2d: "Head, open arms and body.",
    rds3: "The initials", rds3d: "The left arm draws the R. The right one closes the D.",
    rds4: "The RD symbol", rds4d: "The head becomes the dot. The body separates the letters.",
    rdp1b: "The market changed and demands it. Having a brand stopped being a luxury for big companies and became the minimum condition to be taken seriously. Adapting to that demand was the starting point of the project.",
    rdl9: "The brand in pictures", rdl9s: "Side light, two tones, the symbol over the body",
    rdl4: "Three readings of the same gesture",
    rdle1: "Evolution", rdle1d: "The arrow points up and forward. It is the path of recovery, session after session.",
    rdle2: "Movement", rdle2d: "With the dot, the R is a person stretching: one leg in front of the other, arms back.",
    rdle3: "Care", rdle3d: "From another angle, it is someone lying on the table, arms half open, given over to the treatment.",
    rdl8: "Applications", rdl8s: "Uniforms and merchandising",
    rdback: "See all work", rdcta: "Want an identity like this?",
    okeye: "Message sent",
    okp: "We have received your request. We will read it carefully and reply to the email you gave us.",
    okagain: "Send another message",
    lbstate: "Coming soon",
    lbh: "The side of Adaptive that researches what comes next.",
    lbl1: "What it is",
    lbp1: "Adaptive Labs is Adaptive's research and technology arm. This is where we will explore artificial intelligence, automation and our own products, with the same care we bring to brands.",
    lbp2: "It is still being built. It will open when there is the structure and the product to sustain it, and until then what we learn goes into Creative Studio projects first.",
    lbl2: "What we will offer", lbl2s: "Four areas in development",
    la1n: "Applied artificial intelligence",
    la1d: "AI tools and workflows designed for a brand's day to day, from content production to analysis.",
    la2n: "Process automation",
    la2d: "Systems that take repetitive work off teams and leave time for what needs judgement.",
    la3n: "Our own products",
    la3d: "Tools built by Adaptive, born from the problems we meet in our projects.",
    la4n: "Research and new solutions",
    la4d: "Testing technology before it reaches the market, to know what is worth it and what is not.",
    ladev1: "In development", ladev2: "In development", ladev3: "In development", ladev4: "In development",
    lbl3: "What comes next", lbl3s: "In this order",
    ls1n: "Research",
    ls1d: "Studying tools and real cases, inside the projects we already run at the Creative Studio.",
    ls2n: "First applications",
    ls2d: "Bringing the most solid solutions into concrete projects, with close follow up.",
    ls3n: "Opening",
    ls3d: "Presenting Adaptive Labs as its own area, with defined services and products.",
    lbcta: "Want to know when it opens?",
    lbbtn: "Talk to us",
    lbback: "Back to the Studio",
    mfrights: "© 2026 Adaptive Creative Studio. All rights reserved."
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var PT = {};
  nodes.forEach(function (n) { PT[n.dataset.i18n] = n.innerHTML; });

  var langBtns = document.querySelectorAll("[data-lang-btn]");
  function setLang(l) {
    lang = l === "en" ? "en" : "pt";
    var dict = lang === "en" ? EN : PT;
    nodes.forEach(function (n) {
      var v = dict[n.dataset.i18n];
      if (v !== undefined) { n.innerHTML = v; }
    });
    document.documentElement.lang = lang === "en" ? "en" : "pt-PT";
    document.getElementById("legal-en").hidden = lang !== "en";
    langBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)); });
    paintServices();
    if (stage) { measureStage(); }
    try { localStorage.setItem("adaptive-lang", lang); } catch (e) {}
  }
  langBtns.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.langBtn); });
  });

  /* ---------- formulario, enviado pelo Web3Forms ---------- */
  /* a chave do Web3Forms é pública por natureza: só serve para entregar
     mensagens no email associado a ela, não dá acesso a mais nada */
  var WEB3FORMS_KEY = "0a654669-9b07-4588-8831-23c411cc2b0a";
  var form       = document.getElementById("form");
  var formDone   = document.getElementById("form-done");
  var formStatus = document.getElementById("form-status");
  var sendBtn    = form.querySelector(".submit");
  var sendLabel  = form.querySelector(".submit-label");

  function setSending(on) {
    sendBtn.disabled = on;
    sendBtn.setAttribute("aria-busy", on ? "true" : "false");
    sendLabel.textContent = on ? (lang === "en" ? "Sending" : "A enviar")
                               : (lang === "en" ? "Send" : "Enviar");
  }

  function showError() {
    formStatus.innerHTML = (lang === "en"
      ? "The message could not be sent right now. Please try again, or write to "
      : "Não foi possível enviar agora. Tente de novo, ou escreva para ") +
      '<a href="mailto:' + MAIL + '">' + MAIL + "</a>.";
    formStatus.hidden = false;
  }

  function showDone(nome) {
    var primeiro = nome.split(/\s+/)[0];
    document.getElementById("done-title").textContent =
      (lang === "en" ? "Thank you, " : "Obrigado, ") + primeiro + ".";
    if (window.__pixelLead) { window.__pixelLead(); }
    form.hidden = true;
    formDone.hidden = false;
    formDone.focus({ preventScroll: true });
    formDone.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    formStatus.hidden = true;
    if (form.elements.botcheck.checked) { return; }
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var get = function (n) { return (form.elements[n].value || "").trim(); };
    var nome = get("nome");
    var payload = {
      access_key: WEB3FORMS_KEY,
      subject: "Novo contacto pelo site, " + nome,
      from_name: "Site Adaptive Creative Studio",
      replyto: get("email"),
      nome: nome,
      empresa: get("empresa") || "não indicada",
      email: get("email"),
      area: get("area") || "ainda não sei",
      mensagem: get("mensagem"),
      idioma: lang === "en" ? "Inglês" : "Português"
    };

    setSending(true);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && res.j && res.j.success) { showDone(nome); }
        else { throw new Error((res.j && res.j.message) || "falhou"); }
      })
      .catch(function () { showError(); })
      .then(function () { setSending(false); });
  });

  document.getElementById("form-again").addEventListener("click", function () {
    form.reset();
    formDone.hidden = true;
    form.hidden = false;
    form.elements.nome.focus();
  });

  /* ---------- tres vistas ---------- */
  var nav   = document.getElementById("nav");
  var cover = document.getElementById("inicio");
  var views = {
    inicio:   document.getElementById("view-inicio"),
    estudio:  document.getElementById("view-estudio"),
    contacto: document.getElementById("view-contacto"),
    labs:     document.getElementById("view-labs"),
    privacidade: document.getElementById("view-privacidade"),
    rd:          document.getElementById("view-rd")
  };
  var current = "inicio";
  var vistaInicial = true;

  function onScroll() {
    nav.classList.toggle("on-dark", current === "labs");
    if (current === "labs") { nav.classList.remove("is-solid"); return; }
    if (current !== "inicio") { nav.classList.add("is-solid"); return; }
    nav.classList.toggle("is-solid", window.scrollY > (cover.offsetHeight - 88));
  }

  function show(view, anchor) {
    current = views[view] ? view : "inicio";
    Object.keys(views).forEach(function (k) { views[k].hidden = (k !== current); });
    /* o separador do browser diz em que casa estamos */
    document.title =
      current === "labs"        ? "Adaptive Labs | Earn The Future" :
      current === "rd"          ? "RD Fisioterapia | Adaptive Creative Studio" :
      current === "privacidade" ? "Política de Privacidade | Adaptive Creative Studio" :
                                  "Adaptive Creative Studio | Earn The Future";
    /* página nova vista, contada só depois da primeira */
    if (!vistaInicial && window.__pixelPagina) { window.__pixelPagina(); }
    vistaInicial = false;
    document.querySelectorAll("[data-nav]").forEach(function (b) {
      if (b.dataset.nav === current) { b.setAttribute("aria-current", "page"); }
      else { b.removeAttribute("aria-current"); }
    });
    /* o Labs aparece na barra, com a bola, só enquanto se está lá */
    document.querySelector(".nav-labs").hidden = current !== "labs";
    onScroll();
    /* o palco só tem dimensões quando a vista dele está visível */
    if (stage) { measureStage(); }
    if (well) { sizeWell(); }
    if (window.__ligarVideosDaVista && views[current]) { window.__ligarVideosDaVista(views[current]); }
    if (anchor) {
      var el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /* ---------- ecrã de carregamento entre páginas ---------- */
  var loader   = document.getElementById("loader");
  var loaderRing = loader.querySelector(".prog");
  var LOAD_MS  = 2000;

  function withLoader(target, anchor) {
    /* dentro da mesma página não vale a pena tapar o ecrã, é só um scroll */
    if (target === current || REDUCED) { show(target, anchor); return; }
    loader.classList.toggle("dark", target === "labs");
    loader.classList.add("is-on");
    loaderRing.style.animation = "none";
    void loaderRing.offsetWidth;          /* reinicia o anel */
    loaderRing.style.animation = "";
    setTimeout(function () {
      show(target, anchor);
      setTimeout(function () { loader.classList.remove("is-on"); }, 110);
    }, LOAD_MS);
  }

  document.querySelectorAll("[data-go]").forEach(function (el) {
    el.addEventListener("click", function (ev) {
      ev.preventDefault();
      var target = el.dataset.go;
      history.pushState(null, "", target === "inicio" ? "#inicio" : "#" + target);
      withLoader(target, el.dataset.anchor);
    });
  });

  /* o Labs chamou-se Adaptive Guild durante uns dias: quem tiver esse
     endereço continua a chegar à mesma página */
  var apelidos = { guild: "labs" };
  function lerHash() {
    var h = (location.hash || "").replace("#", "");
    if (apelidos[h]) { h = apelidos[h]; }
    return views[h] ? h : "inicio";
  }

  function route() { show(lerHash()); }
  window.addEventListener("hashchange", function () { withLoader(lerHash()); });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- menu de tres barras, telemovel ---------- */
  var burger = document.getElementById("burger");
  var panel  = document.getElementById("panel");

  function setPanel(open) {
    panel.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { nav.classList.add("is-solid"); } else { onScroll(); }
  }
  burger.addEventListener("click", function () {
    setPanel(!panel.classList.contains("is-open"));
  });
  document.querySelectorAll("[data-go]").forEach(function (el) {
    el.addEventListener("click", function () { setPanel(false); });
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setPanel(false); }
  });

  /* ---------- os cards montam-se quando o palco entra no ecra ---------- */
  var stage = document.querySelector(".stage");
  var stageDone = false;

  function revealStage() {
    if (stageDone) { return; }
    stageDone = true;
    stage.querySelectorAll(".tile").forEach(function (d, i) {
      setTimeout(function () { d.classList.add("shown"); }, 90 + i * 110);
    });
    stage.querySelectorAll(".chip").forEach(function (c, i) {
      setTimeout(function () {
        c.classList.add("shown");
        if (!REDUCED) {
          c.classList.add("sweep");
          setTimeout(function () { c.classList.remove("sweep"); }, 950);
        }
        if (c.dataset.title) { scramble(c.querySelector(".chip-title"), c.dataset.title, 480); }
      }, (i % 6) * 140);
    });
  }

  /* ---------- a luz da marca fica centrada na frase ----------
     O palco tem mais coisas por baixo do título, por isso o meio do
     palco não é o meio da frase. Sem isto a luz ficava por baixo dela,
     e no telemóvel a frase em vidro branco deixava de se ler. */
  var luz = stage.querySelector(".stage-luz");
  function centrarLuz() {
    if (!luz) { return; }
    var sb = stage.getBoundingClientRect();
    var wb = stage.querySelector(".stage-word").getBoundingClientRect();
    if (!wb.height) { return; }
    luz.style.top = Math.round(wb.top - sb.top + wb.height / 2) + "px";
  }
  centrarLuz();
  window.addEventListener("resize", centrarLuz);
  window.addEventListener("load", centrarLuz);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(centrarLuz); }

  /* ---------- órbita lenta à volta do EARN THE FUTURE ---------- */
  var orbitRunning = false, orbitRaf = 0, orbitLast = 0;
  var halfW = 0, halfH = 0, orbitOX = 0, orbitOY = 0, orbitScaleX = 1;

  function measureStage() {
    halfW = stage.clientWidth  / 2;
    halfH = stage.clientHeight / 2;
    /* a órbita gira à volta da frase, não do meio do palco */
    var sb = stage.getBoundingClientRect();
    var wb = stage.querySelector(".stage-word").getBoundingClientRect();
    orbitOX = (wb.left + wb.width  / 2) - (sb.left + sb.width  / 2);
    orbitOY = (wb.top  + wb.height / 2) - (sb.top  + sb.height / 2);

    /* a órbita mais larga não pode levar nenhum card para fora do ecrã.
       Aperta-se tudo na mesma proporção, para as órbitas manterem as diferenças entre si */
    var maxRx = 0, maxHalfChip = 0;
    for (var i = 0; i < orbiters.length; i++) {
      if (orbiters[i].el.classList.contains("chip")) {
        maxRx = Math.max(maxRx, orbiters[i].rx);
        maxHalfChip = Math.max(maxHalfChip, orbiters[i].el.offsetWidth / 2);
      }
    }
    var room = window.innerWidth / 2 - Math.abs(orbitOX) - maxHalfChip - 18;
    orbitScaleX = (maxRx && halfW) ? Math.max(.4, Math.min(1, room / (maxRx * halfW))) : 1;

    /* tamanhos guardados uma vez, para a separação não ter de os ir
       buscar ao desenho em cada frame */
    for (var k = 0; k < orbiters.length; k++) {
      orbiters[k].w = orbiters[k].el.offsetWidth;
      orbiters[k].h = orbiters[k].el.offsetHeight;
      orbiters[k].peca = orbiters[k].el.classList.contains("tile");
    }
  }

  function orbitFrame(now) {
    var dt = Math.min(0.05, (now - orbitLast) / 1000);
    orbitLast = now;
    for (var i = 0; i < orbiters.length; i++) {
      var o = orbiters[i];
      if (!o.paused) { o.t += dt; }
      var a = o.ph + (o.t / o.per) * Math.PI * 2;
      var x = orbitOX + Math.cos(a) * o.rx * halfW * orbitScaleX;
      var y = orbitOY + Math.sin(a) * o.ry * halfH
            + Math.sin(o.ph + (o.t / o.bobP) * Math.PI * 2) * o.bobA;
      o.el.style.transform =
        "translate3d(" + (x - o.w / 2).toFixed(1) + "px," +
                         (y - o.h / 2).toFixed(1) + "px,0)" +
        (o.rot ? " rotate(" + o.rot + "deg)" : "");
    }
    orbitRaf = requestAnimationFrame(orbitFrame);
  }

  function startOrbit() {
    if (orbitRunning || REDUCED) { return; }
    if (!window.matchMedia("(min-width: 900px)").matches) { return; }
    orbitRunning = true;
    measureStage();
    orbitLast = performance.now();
    orbitRaf = requestAnimationFrame(orbitFrame);
  }
  function stopOrbit() {
    if (!orbitRunning) { return; }
    orbitRunning = false;
    cancelAnimationFrame(orbitRaf);
  }
  window.addEventListener("resize", function () {
    measureStage();
    if (window.matchMedia("(min-width: 900px)").matches) { startOrbit(); }
    else { stopOrbit(); }
  });

  /* ---------- poço gravitacional: a página a ser sugada para o futuro ---------- */
  var well = stage.querySelector(".well");
  var wctx = well.getContext("2d");
  var wW = 0, wH = 0, wcx = 0, wcy = 0, wR = 0, wMaxR = 0;
  var wRunning = false, wRaf = 0, wLast = 0, wT = 0;
  var parts = [];
  var GROUND = "250,250,252";
  var PALETTE = [[119, 0, 202], [49, 56, 196], [160, 139, 255]];

  function spawn(anywhere) {
    var r = anywhere ? wR * 0.55 + Math.random() * (wMaxR - wR * 0.55)
                     : wMaxR * (0.78 + Math.random() * 0.22);
    return { a: Math.random() * Math.PI * 2, r: r, c: PALETTE[(Math.random() * 3) | 0] };
  }

  function sizeWell() {
    var box = well.getBoundingClientRect();
    if (!box.width || !box.height) { return; }
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var widthChanged = Math.abs(box.width - wW) > 1;
    wW = box.width; wH = box.height;
    well.width  = Math.round(wW * dpr);
    well.height = Math.round(wH * dpr);
    wctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* o centro do poço é o centro da frase, em qualquer largura de ecrã,
       e o tamanho acompanha a frase para a emoldurar sempre da mesma forma */
    var word = stage.querySelector(".stage-word").getBoundingClientRect();
    wcx = word.left + word.width  / 2 - box.left;
    wcy = word.top  + word.height / 2 - box.top;
    wR  = Math.max(word.width * 0.46, word.height * 1.3);
    wR  = Math.min(wR, wW * 0.42, wH * 0.66);
    wMaxR = Math.max(
      Math.hypot(wcx, wcy),      Math.hypot(wW - wcx, wcy),
      Math.hypot(wcx, wH - wcy), Math.hypot(wW - wcx, wH - wcy)
    );

    if (widthChanged || !parts.length) {
      parts = [];
      var n = wW < 900 ? 70 : 160;
      for (var i = 0; i < n; i++) { parts.push(spawn(true)); }
    }
  }

  /* a grelha é puxada para o centro e torcida, mais forte quanto mais perto */
  function warp(x, y, pull, twist) {
    var dx = x - wcx, dy = y - wcy;
    var g = Math.exp(-(dx * dx + dy * dy * 2.2) / (wR * wR));
    var k = 1 - pull * g, ang = twist * g;
    var ca = Math.cos(ang), sa = Math.sin(ang);
    return [wcx + (dx * ca - dy * sa) * k, wcy + (dx * sa + dy * ca) * k];
  }

  function drawWell(dt) {
    wctx.clearRect(0, 0, wW, wH);
    var pull  = 0.8  + Math.sin(wT * 0.33) * 0.06;
    var twist = 0.95 + Math.sin(wT * 0.21) * 0.4;
    var step  = wW < 900 ? 40 : 48;
    var seg   = 12;
    var i, s, p;

    /* 1. a grelha da página, dobrada para dentro */
    wctx.beginPath();
    for (i = -1; i <= Math.ceil(wW / step) + 1; i++) {
      var gx = wcx + (i - Math.round(wcx / step)) * step;
      for (s = 0; s <= wH; s += seg) {
        p = warp(gx, s, pull, twist);
        if (s === 0) { wctx.moveTo(p[0], p[1]); } else { wctx.lineTo(p[0], p[1]); }
      }
    }
    for (i = -1; i <= Math.ceil(wH / step) + 1; i++) {
      var gy = wcy + (i - Math.round(wcy / step)) * step;
      for (s = 0; s <= wW; s += seg) {
        p = warp(s, gy, pull, twist);
        if (s === 0) { wctx.moveTo(p[0], p[1]); } else { wctx.lineTo(p[0], p[1]); }
      }
    }
    wctx.strokeStyle = "rgba(49,56,196,.13)";
    wctx.lineWidth = 1;
    wctx.stroke();

    /* 2. partículas em espiral, cada vez mais rápidas a caminho do centro */
    var core = wR * 0.46;
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      var omega = 0.12 + 0.95 * wR / (p.r + wR * 0.3);
      var vr = 16 + 5600 / (p.r + 36);
      p.a += omega * dt;
      p.r -= vr * dt;
      if (p.r < core) { parts[i] = spawn(false); continue; }
      var x  = wcx + Math.cos(p.a) * p.r,
          y  = wcy + Math.sin(p.a) * p.r * 0.58;
      var ta = p.a - omega * 0.16, tr = p.r + vr * 0.16;
      var tx = wcx + Math.cos(ta) * tr,
          ty = wcy + Math.sin(ta) * tr * 0.58;
      var near = 1 - Math.min(1, (p.r - core) / (wMaxR - core));
      var fade = Math.min(1, (p.r - core) / (core * 0.9));
      wctx.strokeStyle = "rgba(" + p.c[0] + "," + p.c[1] + "," + p.c[2] + "," +
                         (Math.min(1, near * 1.5) * fade * 0.7).toFixed(3) + ")";
      wctx.lineWidth = 0.7 + near * 1.3;
      wctx.beginPath();
      wctx.moveTo(tx, ty);
      wctx.lineTo(x, y);
      wctx.stroke();
    }

    /* 3. o horizonte: não é preto, é a própria página a desaparecer para dentro */
    wctx.save();
    wctx.translate(wcx, wcy);
    wctx.scale(1, 0.58);
    var hole = wctx.createRadialGradient(0, 0, 0, 0, 0, wR * 0.84);
    hole.addColorStop(0,    "rgba(" + GROUND + ",1)");
    hole.addColorStop(0.52, "rgba(" + GROUND + ",.94)");
    hole.addColorStop(1,    "rgba(" + GROUND + ",0)");
    wctx.fillStyle = hole;
    wctx.beginPath();
    wctx.arc(0, 0, wR * 0.84, 0, Math.PI * 2);
    wctx.fill();

    /* anel de luz à volta, a rodar devagar */
    var ring;
    if (wctx.createConicGradient) {
      ring = wctx.createConicGradient(wT * 0.4, 0, 0);
      ring.addColorStop(0,    "rgba(119,0,202,.55)");
      ring.addColorStop(0.35, "rgba(160,139,255,.1)");
      ring.addColorStop(0.6,  "rgba(49,56,196,.55)");
      ring.addColorStop(0.85, "rgba(160,139,255,.08)");
      ring.addColorStop(1,    "rgba(119,0,202,.55)");
    } else {
      ring = "rgba(49,56,196,.3)";
    }
    wctx.strokeStyle = ring;
    wctx.lineWidth = 1.6;
    wctx.beginPath();
    wctx.arc(0, 0, wR * 0.7, 0, Math.PI * 2);
    wctx.stroke();
    wctx.restore();
  }

  function wellFrame(now) {
    var dt = Math.min(0.05, (now - wLast) / 1000);
    wLast = now;
    wT += dt;
    drawWell(dt);
    wRaf = requestAnimationFrame(wellFrame);
  }
  function startWell() {
    if (!wW) { sizeWell(); }
    if (REDUCED) { drawWell(0); return; }   /* um só fotograma, parado */
    if (wRunning) { return; }
    wRunning = true;
    wLast = performance.now();
    wRaf = requestAnimationFrame(wellFrame);
  }
  function stopWell() {
    if (!wRunning) { return; }
    wRunning = false;
    cancelAnimationFrame(wRaf);
  }
  window.addEventListener("resize", function () { sizeWell(); if (REDUCED) { drawWell(0); } });

  /* a frase muda de tamanho quando a fonte acaba de carregar e com a largura,
     e o centro do poço e da órbita tem de a acompanhar */
  function recentre() {
    measureStage();
    sizeWell();
    if (REDUCED) { drawWell(0); }
  }
  if ("ResizeObserver" in window) {
    new ResizeObserver(recentre).observe(stage.querySelector(".stage-word"));
  }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(recentre); }

  stage.classList.add("is-armed");
  if (REDUCED || !("IntersectionObserver" in window)) {
    revealStage();
    measureStage();
    sizeWell();
    startWell();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        /* órbita e poço só correm com o palco no ecrã, para não gastar bateria à toa */
        if (e.isIntersecting) { revealStage(); startOrbit(); startWell(); }
        else { stopOrbit(); stopWell(); }
      });
    }, { threshold: 0.05 });
    io.observe(stage);
    setTimeout(function () { revealStage(); startOrbit(); }, 3200);
  }

  /* ---------- a bola acende no Trabalhos só enquanto essa secção está no ecrã ---------- */
  var navWork = document.querySelector('.nav-links [data-anchor="trabalhos"]');
  if (navWork && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { navWork.classList.toggle("is-here", e.isIntersecting); });
    }, { rootMargin: "-38% 0px -48% 0px" }).observe(document.getElementById("trabalhos"));
  }

  /* ---------- vídeos: só começam quando se chega à secção ----------
     O ficheiro só é pedido na primeira vez que o vídeo entra no ecrã, e
     a vigia só liga depois da animação de entrada, senão os vídeos
     arrancavam por trás dela, antes de se chegar aos trabalhos.
     No telemóvel o primeiro play() é muitas vezes recusado, porque o
     ficheiro ainda não tem imagem ou porque o browser quer poupar
     bateria. Por isso insistimos algumas vezes e, em último caso, ao
     primeiro toque na página. */
  var videos = document.querySelectorAll("[data-video]");
  var porRodar = [];
  var naFila = [];
  var videosArmados = false;

  function tentarRodar(v, tentativa) {
    if (v.dataset.quer !== "1") { return; }
    var p = v.play();
    if (!p || !p.catch) { return; }
    p.catch(function () {
      if (v.dataset.quer !== "1") { return; }
      /* três insistências, cada vez mais espaçadas, dão tempo ao ficheiro
         de chegar e ao browser de mudar de ideias */
      var n = tentativa || 0;
      if (n < 3) {
        setTimeout(function () { tentarRodar(v, n + 1); }, 350 + n * 600);
      } else if (porRodar.indexOf(v) < 0) {
        porRodar.push(v);
      }
    });
  }

  function ligarVideo(v) {
    /* durante a animação de entrada ninguém carrega nada: os vídeos ficam
       à espera, para começarem mesmo quando se chega à secção */
    if (!videosArmados) {
      if (naFila.indexOf(v) < 0) { naFila.push(v); }
      return;
    }
    /* sem som e dentro da página: é a única forma de o telemóvel deixar
       rodar sozinho, e tem de estar posto antes de o ficheiro chegar */
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    if (!v.getAttribute("src")) {
      v.preload = "auto";
      v.autoplay = true;
      v.setAttribute("autoplay", "");
      v.addEventListener("loadeddata", function () {
        if (v.paused) { tentarRodar(v); }
      });
      v.setAttribute("src", v.dataset.src);
      v.load();
    }
    v.dataset.quer = "1";
    tentarRodar(v);
  }

  function pararVideo(v) {
    v.dataset.quer = "";
    var f = naFila.indexOf(v);
    if (f >= 0) { naFila.splice(f, 1); }
    var i = porRodar.indexOf(v);
    if (i >= 0) { porRodar.splice(i, 1); }
    if (!v.paused) { v.pause(); }
  }

  /* última rede de segurança: ao primeiro toque ou tecla, os vídeos que
     estão à vista e ficaram parados arrancam */
  function destravar() {
    porRodar.splice(0).forEach(tentarRodar);
  }
  ["pointerdown", "touchstart", "keydown"].forEach(function (ev) {
    window.addEventListener(ev, destravar, { passive: true });
  });
  /* ao voltar ao separador, insistir nos que ficaram parados */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) { destravar(); }
  });

  /* ao mudar de página a vigia pode não voltar a disparar para o que já
     está à vista, por isso a rota avisa aqui. Antes da animação de
     entrada acabar não se liga nada */
  window.__ligarVideosDaVista = function (raiz) {
    if (!videosArmados) { return; }
    (raiz || document).querySelectorAll("[data-video]").forEach(function (v) {
      if (v.getBoundingClientRect().top < window.innerHeight) { ligarVideo(v); }
    });
  };

  /* a vigia fica logo a postos, senão há ecrãs em que nunca chega a
     disparar para o que já está à vista */
  if (videos.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { ligarVideo(e.target); }
        else { pararVideo(e.target); }
      });
    }, { threshold: 0.2 });
    videos.forEach(function (v) { vio.observe(v); });
  }

  /* chamada quando a animação de entrada sai do ecrã */
  function vigiarVideos() {
    videosArmados = true;
    if (!videos.length) { return; }
    if (!("IntersectionObserver" in window)) { videos.forEach(ligarVideo); return; }
    naFila.splice(0).forEach(ligarVideo);
  }

  /* ---------- selo do rodapé: o texto é montado letra a letra à volta do círculo ---------- */
  var ringEl = document.querySelector(".badge-ring");
  var ringChars = Array.from(ringEl.dataset.ring);
  ringChars.forEach(function (ch, i) {
    var s = document.createElement("span");
    s.textContent = ch;
    s.style.transform = "rotate(" + (i * 360 / ringChars.length).toFixed(3) + "deg)";
    ringEl.appendChild(s);
  });

  /* ---------- o rodapé ----------
     É um bloco normal no fim da página, com a altura do ecrã. Sobe junto
     com o resto do conteúdo, como no telemóvel. Já foi preso ao fundo do
     visor, mas isso obrigava o browser a repintar enquanto se rolava e
     deixava os cantos por pintar durante uns instantes. */
  var megafoot = document.getElementById("megafoot");

  /* ---------- a barra de topo sai quando o rodapé toma o ecrã ---------- */
  var navEscondida = false;
  function navFootCheck() {
    /* quanto do rodapé já está à vista, de 0 a 1 */
    var revelado = window.__revelado
      ? window.__revelado()
      : 1 - megafoot.getBoundingClientRect().top / window.innerHeight;
    /* dois limites diferentes para esconder e para mostrar, senão a barra
       tremia de cada vez que o scroll passasse em cima do mesmo ponto */
    var hide = navEscondida ? revelado > 0.42 : revelado > 0.58;
    if (hide !== navEscondida) {
      navEscondida = hide;
      nav.classList.toggle("is-hidden", hide);
    }
    if (hide && panel.classList.contains("is-open")) { setPanel(false); }
  }
  window.addEventListener("scroll", navFootCheck, { passive: true });
  window.addEventListener("resize", navFootCheck);

  /* ---------- consentimento de cookies ----------
     Nada de marketing é carregado antes de a pessoa dizer que sim.
     A escolha fica guardada no dispositivo e pode ser mudada a qualquer momento. */
  var CONSENT_KEY = "adaptive-consentimento";
  var META_PIXEL_ID = "1641716630816449";

  var notice     = document.getElementById("notice");
  var cats       = document.getElementById("notice-cats");
  var catMkt     = document.getElementById("cat-marketing");
  var btnSave    = document.getElementById("notice-save");
  var pixelPosto = false;

  function lerConsentimento() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); }
    catch (e) { return null; }
  }

  function guardarConsentimento(marketing) {
    var escolha = { v: 1, marketing: !!marketing, data: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(escolha)); } catch (e) {}
    return escolha;
  }

  /* o pixel da Meta, carregado à mão só quando há consentimento */
  function carregarPixel() {
    if (pixelPosto || window.fbq) { return; }
    pixelPosto = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  }

  /* páginas vistas a seguir, já sem recarregar o site */
  function pixelPagina() {
    if (window.fbq && pixelPosto) { window.fbq("track", "PageView"); }
  }
  /* pedido de contacto enviado */
  function pixelLead() {
    if (window.fbq && pixelPosto) { window.fbq("track", "Lead"); }
  }
  window.__pixelPagina = pixelPagina;
  window.__pixelLead = pixelLead;

  function mostrarAviso() {
    var atual = lerConsentimento();
    catMkt.checked = !!(atual && atual.marketing);
    notice.classList.remove("is-out");
    notice.hidden = false;
    document.documentElement.classList.add("notice-open");
  }

  function fecharAviso() {
    notice.classList.add("is-out");
    document.documentElement.classList.remove("notice-open");
    setTimeout(function () { notice.hidden = true; }, REDUCED ? 0 : 420);
  }

  function aplicar(marketing, jaTinhaPixel) {
    guardarConsentimento(marketing);
    if (marketing) { carregarPixel(); fecharAviso(); return; }
    /* retirou o consentimento com o pixel já a correr: recarrega para o limpar de vez */
    if (jaTinhaPixel) {
      if (window.fbq) { try { window.fbq("consent", "revoke"); } catch (e) {} }
      location.reload();
      return;
    }
    fecharAviso();
  }

  document.getElementById("notice-ok").addEventListener("click", function () {
    aplicar(true, pixelPosto);
  });
  document.getElementById("notice-no").addEventListener("click", function () {
    aplicar(false, pixelPosto);
  });
  btnSave.addEventListener("click", function () {
    aplicar(catMkt.checked, pixelPosto);
  });
  document.getElementById("notice-choose").addEventListener("click", function () {
    var abrir = cats.hidden;
    cats.hidden = !abrir;
    btnSave.hidden = !abrir;
    this.textContent = abrir
      ? (lang === "en" ? "Close options" : "Fechar opções")
      : (lang === "en" ? "Choose" : "Escolher");
  });

  /* na política pode-se rever a escolha a qualquer momento */
  document.getElementById("priv-reset").addEventListener("click", mostrarAviso);

  var escolhaGuardada = lerConsentimento();
  if (!escolhaGuardada) {
    /* espera o ecrã de entrada acabar, para não aparecer por cima dele */
    setTimeout(mostrarAviso, REDUCED ? 200 : 2600);
  } else if (escolhaGuardada.marketing) {
    carregarPixel();
  }

  document.getElementById("priv-back").addEventListener("click", function () {
    if (history.length > 1) { history.back(); }
    else { location.hash = "inicio"; }
  });

  var savedLang = "pt";
  try { savedLang = localStorage.getItem("adaptive-lang") || "pt"; } catch (e) {}
  setLang(savedLang === "en" ? "en" : "pt");
  route();

  /* a classe boot sai depois da primeira entrada, para o ecrã ficar livre
     de a reutilizar nas mudanças de página. Só então é que os vídeos
     passam a vigiar o ecrã: assim começam mesmo quando se chega aos
     trabalhos, e não por trás da animação de entrada */
  setTimeout(function () {
    loader.classList.remove("boot");
    vigiarVideos();
  }, 2700);
})();

/* ===============================================================
   EXPERIÊNCIA: rodapé sempre lá, o site sobe por cima
   Vive à parte do resto, para se poder ligar e desligar num sítio só.
   =============================================================== */
(function () {
  var raiz = document.documentElement;
  var pe   = document.getElementById("megafoot");
  var casa = document.getElementById("shell");
  var alturaPe = 0;

  function medir() {
    alturaPe = pe.offsetHeight;
    casa.style.marginBottom = raiz.classList.contains("rodape-fixo") ? alturaPe + "px" : "";
  }

  window.__rodapeFixo = function (ligar) {
    raiz.classList.toggle("rodape-fixo", !!ligar);
    if (!ligar) { casa.style.marginBottom = ""; return; }
    medir();
  };

  window.addEventListener("resize", medir);
  if ("ResizeObserver" in window) { new ResizeObserver(medir).observe(pe); }

  /* quanto do rodapé já está à vista, de 0 a 1 */
  window.__revelado = function () {
    if (!raiz.classList.contains("rodape-fixo")) {
      return 1 - pe.getBoundingClientRect().top / window.innerHeight;
    }
    var fim = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(1, (window.scrollY - (fim - alturaPe)) / alturaPe));
  };
})();

/* ===============================================================
   EXPERIÊNCIA: os pontos do nome por revelar.
   Andam em onda, bem separados uns dos outros, juntam-se no símbolo da
   Adaptive e voltam à onda. No símbolo assentam no EIXO do traço, não
   no contorno: o contorno fazia duas linhas coladas e borrava o desenho.
   =============================================================== */
(function () {
  var L = 64, A = 26;          /* tela, em pixéis de página */
  var ALTO = 20;               /* altura do símbolo: dez por cento acima
                                  da linha do ano, que mede 18px */
  var FOLGA = 1.2;             /* distância mínima entre pontos do símbolo.
                                  Tem de ser MENOR do que o espaço entre os
                                  três anéis, senão um deles desaparece */
  var GRANDES = 7;             /* quantos pontos na onda */
  var R_GRANDE = 1.5;          /* o ponto da onda, como os do site */
  var R_PEQUENO = 0.55;        /* o caco em que ele se parte */
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var alvo = null, telas = [], pedido = null;
  /* as duas cores dos pontos, com a transparência do card por revelar */
  var CORES = [
    { marca: false, rgb: "rgb(11,11,20)",  alfa: 0.3 },
    { marca: true,  rgb: "rgb(49,56,196)", alfa: 0.42 }
  ];
  /* folha de rascunho onde cada cor é achatada antes de entrar na tela */
  var folha = null, bctx = null;
  function abrirFolha() {
    if (folha) { return; }
    folha = document.createElement("canvas");
    folha.width = Math.round(L * DPR);
    folha.height = Math.round(A * DPR);
    bctx = folha.getContext("2d");
    bctx.scale(DPR, DPR);
  }

  /* ---- ler o símbolo e tirar pontos ao longo do meio de cada traço ---- */
  function lerSimbolo(pronto) {
    var img = new Image();
    img.onload = function () {
      var H = 400;   /* lê em grande: é a única forma de os intervalos
                        entre os três anéis não se perderem */
      var W = Math.max(1, Math.round(img.width * (H / img.height)));
      var c = document.createElement("canvas");
      c.width = W; c.height = H;
      var x = c.getContext("2d");
      x.drawImage(img, 0, 0, W, H);
      var d = x.getImageData(0, 0, W, H).data;
      function tintaEm(i, j) { return tinta(i, j); }
      function tinta(i, j) {
        if (i < 0 || j < 0 || i >= W || j >= H) { return false; }
        var q = (j * W + i) * 4;
        return d[q + 3] > 110 && d[q] < 140;
      }
      /* ---- o meio do traço, por distância ao bordo ----
         Para cada pixel com tinta calcula-se a que distância está do
         branco mais próximo. O valor é maior no meio do traço e vai a
         zero nas margens. Ficamos com a crista, que é o eixo do traço,
         e sai igual em qualquer direção: sem deformações nas partes
         horizontais, que era o que a varredura por linhas provocava. */
      var INF = 1e9;
      var D = new Int32Array(W * H);
      for (var k = 0; k < W * H; k++) {
        D[k] = tintaEm(k % W, (k - k % W) / W) ? INF : 0;
      }
      function dv(i, j) { return (i < 0 || j < 0 || i >= W || j >= H) ? 0 : D[j * W + i]; }
      /* duas passagens, com os pesos 3 na horizontal e 4 na diagonal */
      for (var j = 0; j < H; j++) {
        for (var i = 0; i < W; i++) {
          var q = j * W + i;
          if (!D[q]) { continue; }
          D[q] = Math.min(D[q], dv(i - 1, j - 1) + 4, dv(i, j - 1) + 3,
                                dv(i + 1, j - 1) + 4, dv(i - 1, j) + 3);
        }
      }
      for (var j2 = H - 1; j2 >= 0; j2--) {
        for (var i2 = W - 1; i2 >= 0; i2--) {
          var q2 = j2 * W + i2;
          if (!D[q2]) { continue; }
          D[q2] = Math.min(D[q2], dv(i2 + 1, j2 + 1) + 4, dv(i2, j2 + 1) + 3,
                                  dv(i2 - 1, j2 + 1) + 4, dv(i2 + 1, j2) + 3);
        }
      }
      /* a crista: um pixel está no eixo se, nalguma direção, os dois
         vizinhos opostos não estiverem mais fundo do que ele. Encontra o
         meio do traço seja ele horizontal, vertical ou na diagonal, e
         funciona na mesma onde os anéis se tocam e o traço engrossa. */
      var DIRS = [[1, 0], [0, 1], [1, 1], [1, -1]];
      var meios = [];
      for (var j3 = 1; j3 < H - 1; j3++) {
        for (var i3 = 1; i3 < W - 1; i3++) {
          var v = D[j3 * W + i3];
          if (!v || v === INF) { continue; }
          for (var t = 0; t < 4; t++) {
            var a1 = dv(i3 + DIRS[t][0], j3 + DIRS[t][1]);
            var a2 = dv(i3 - DIRS[t][0], j3 - DIRS[t][1]);
            if (v >= a1 && v >= a2 && (v > a1 || v > a2)) { meios.push([i3, j3]); break; }
          }
        }
      }
      if (!meios.length) { return; }

      /* espalhar: só fica um ponto por cada vizinhança, para ficarem soltos */
      var folga = FOLGA * (H / ALTO);
      var ff = folga * folga;
      var escolhidos = [];
      meios.forEach(function (m) {
        for (var k = 0; k < escolhidos.length; k++) {
          var dx = escolhidos[k][0] - m[0], dy = escolhidos[k][1] - m[1];
          if (dx * dx + dy * dy < ff) { return; }
        }
        escolhidos.push(m);
      });

      /* ordenar a andar sempre para o vizinho mais perto: a passagem de
         um estado ao outro fica arrumada em vez de cruzada */
      var ordem = [], sobra = escolhidos.slice();
      var atual = sobra.splice(0, 1)[0];
      ordem.push(atual);
      while (sobra.length) {
        var melhor = 0, dist = Infinity;
        for (var k = 0; k < sobra.length; k++) {
          var dx = sobra[k][0] - atual[0], dy = sobra[k][1] - atual[1];
          var dd = dx * dx + dy * dy;
          if (dd < dist) { dist = dd; melhor = k; }
        }
        atual = sobra.splice(melhor, 1)[0];
        ordem.push(atual);
      }

      var k2 = ALTO / H;
      var larg = W * k2;
      var dy0 = (A - ALTO) / 2;
      alvo = ordem.map(function (m) {
        return { x: 2 + m[0] * k2, y: dy0 + m[1] * k2 };
      });
      pronto();
    };
    img.src = "assets/img/sym-black.png";
  }

  function montar(el) {
    var c = document.createElement("canvas");
    c.width = Math.round(L * DPR);
    c.height = Math.round(A * DPR);
    el.appendChild(c);
    var ctx = c.getContext("2d");
    ctx.scale(DPR, DPR);
    var pts = [];
    for (var i = 0; i < alvo.length; i++) { pts.push({ x: L / 2, y: A / 2 }); }
    telas.push({ ctx: ctx, pts: pts, el: el });
  }

  /* a onda: poucos pontos, grandes e bem separados */
  function onda(i, n, t) {
    var x = 5 + (i / (n - 1)) * (L - 12);
    var y = A / 2 + Math.sin(x * 0.11 + t * 0.0022) * 4.6
                  + Math.sin(x * 0.045 - t * 0.0014) * 1.8;
    return { x: x, y: y };
  }

  var CICLO = [
    { nome: "onda",   dur: 3200 },
    { nome: "juntar", dur: 1200 },
    { nome: "logo",   dur: 2100 },
    { nome: "soltar", dur: 1900 }
  ];
  var TOTAL = CICLO.reduce(function (s, f) { return s + f.dur; }, 0);
  function suave(t) { return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }
  /* o regresso à onda larga devagar no início e assenta sem solavanco */
  function recuo(t) { return 1 - Math.pow(1 - t, 2.2); }

  function desenhar(agora) {
    var m = agora % TOTAL, acc = 0, fase = CICLO[0], dentro = 0;
    for (var f = 0; f < CICLO.length; f++) {
      if (m < acc + CICLO[f].dur) { fase = CICLO[f]; dentro = (m - acc) / CICLO[f].dur; break; }
      acc += CICLO[f].dur;
    }
    var mistura = fase.nome === "onda"   ? 0
                : fase.nome === "logo"   ? 1
                : fase.nome === "juntar" ? suave(dentro)
                                         : 1 - recuo(dentro);
    var n = alvo.length;
    /* cada ponto pequeno do símbolo é um caco de um ponto grande da onda.
       Na onda está encostado ao pai e tem o tamanho dele: vê-se um ponto
       só. Ao formar o símbolo, separa-se, encolhe e aparece. */
    var raio = R_GRANDE + (R_PEQUENO - R_GRANDE) * mistura;

    telas.forEach(function (tela) {
      var ctx = tela.ctx;
      ctx.clearRect(0, 0, L, A);

      /* 1. onde está cada ponto nesta frame */
      var agora2 = [];
      for (var i = 0; i < n; i++) {
        var pai = Math.floor(i * GRANDES / n);
        var primeiro = (Math.floor((i - 1) * GRANDES / n) !== pai) || i === 0;
        var o = onda(pai, GRANDES, agora);
        var g = alvo[i];
        var destino = mistura > 0
          ? { x: o.x + (g.x - o.x) * mistura, y: o.y + (g.y - o.y) * mistura }
          : o;
        var pt = tela.pts[i];
        pt.x += (destino.x - pt.x) * 0.22;
        pt.y += (destino.y - pt.y) * 0.22;
        /* os cacos só aparecem à medida que o ponto grande se parte */
        var vis = primeiro ? 1 : Math.min(1, mistura * 1.6);
        if (vis > 0.02) { agora2.push({ x: pt.x, y: pt.y, vis: vis, pai: pai }); }
      }

      /* 2. pintar cada cor numa folha à parte, e só depois passá-la com a
         transparência final. Assim dois pontos sobrepostos dão a mesma
         tinta que um só, em vez de somarem até ficarem opacos. Era isso
         que acendia a cor a meio do regresso à onda. */
      for (var c = 0; c < CORES.length; c++) {
        var cor = CORES[c];
        bctx.clearRect(0, 0, L, A);
        bctx.fillStyle = cor.rgb;
        for (var k = 0; k < agora2.length; k++) {
          var d = agora2[k];
          if ((d.pai % 3 === 0) !== cor.marca) { continue; }
          bctx.globalAlpha = d.vis;
          bctx.beginPath();
          bctx.arc(d.x, d.y, raio, 0, 6.2832);
          bctx.fill();
        }
        bctx.globalAlpha = 1;
        ctx.globalAlpha = cor.alfa;
        ctx.drawImage(folha, 0, 0, L, A);
        ctx.globalAlpha = 1;
      }
    });
    pedido = requestAnimationFrame(desenhar);
  }

  window.__pontosSimbolo = function (ligar) {
    document.documentElement.classList.toggle("pontos-simbolo", !!ligar);
    if (!ligar) {
      if (pedido) { cancelAnimationFrame(pedido); pedido = null; }
      telas.forEach(function (t) { t.el.removeChild(t.ctx.canvas); });
      telas = [];
      return;
    }
    if (telas.length) { return; }
    function arranca() {
      abrirFolha();
      document.querySelectorAll(".work-title.redacted, .eco-fechado .redacted").forEach(montar);
      if (telas.length && !pedido) { pedido = requestAnimationFrame(desenhar); }
    }
    if (alvo) { arranca(); } else { lerSimbolo(arranca); }
  };
})();

/* o rodapé fixo e a animação dos pontos ligam-se depois da página montar */
(function () {
  function ligar() {
    if (window.__rodapeFixo)    { window.__rodapeFixo(true); }
    if (window.__pontosSimbolo) { window.__pontosSimbolo(true); }
  }
  if (document.readyState === "complete") { setTimeout(ligar, 60); }
  else { window.addEventListener("load", function () { setTimeout(ligar, 60); }); }
})();
