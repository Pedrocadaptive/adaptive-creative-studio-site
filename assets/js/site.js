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
  var TILES = [
    { v: 1, w: 176, h: 132, rot: -4,   rx: .56, ry: .72, per: 104, ph: 0.6 },
    { v: 2, w: 138, h: 176, rot:  5,   rx: .78, ry: .50, per: 128, ph: 2.4 },
    { v: 3, w: 100, h: 100, rot: -7,   rx: .82, ry: .66, per:  92, ph: 4.1 },
    { v: 4, w: 124, h: 124, rot:  6,   rx: .50, ry: .80, per: 116, ph: 5.3 },
    { v: 5, w: 160, h: 118, rot: -3,   rx: .70, ry: .76, per:  98, ph: 3.2 }
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

  document.querySelectorAll("[data-clone]").forEach(function (row, r) {
    var order = SERVICES.map(function (s, i) { return { s: s, i: i }; });
    if (r === 1) { order.reverse(); }
    order.concat(order).forEach(function (o) { row.appendChild(makeChip(o.s, o.i, false)); });
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
    mfrights: "© 2026 Adaptive Creative Studio. All rights reserved.",
    labs: "Adaptive Labs, coming soon"
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
    langBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)); });
    paintServices();
    if (stage) { measureStage(); }
    try { localStorage.setItem("adaptive-lang", lang); } catch (e) {}
  }
  langBtns.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.langBtn); });
  });

  /* ---------- formulario ---------- */
  document.getElementById("form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = ev.target;
    var get = function (n) { return (f.elements[n].value || "").trim(); };
    var nome = get("nome"), email = get("email");
    if (!nome || !email || !get("mensagem")) {
      f.reportValidity();
      return;
    }
    var L = lang === "en";
    var corpo = [
      (L ? "Name: " : "Nome: ") + nome,
      (L ? "Company: " : "Empresa: ") + (get("empresa") || (L ? "not given" : "não indicada")),
      (L ? "Email: " : "Email: ") + email,
      (L ? "Area: " : "Área: ") + (get("area") || (L ? "not sure yet" : "ainda não sei")),
      "",
      get("mensagem")
    ].join("\n");
    window.location.href = "mailto:" + MAIL +
      "?subject=" + encodeURIComponent((L ? "New project, " : "Novo projeto, ") + nome) +
      "&body=" + encodeURIComponent(corpo);
  });

  /* ---------- tres vistas ---------- */
  var nav   = document.getElementById("nav");
  var cover = document.getElementById("inicio");
  var views = {
    inicio:   document.getElementById("view-inicio"),
    estudio:  document.getElementById("view-estudio"),
    contacto: document.getElementById("view-contacto"),
    labs:     document.getElementById("view-labs")
  };
  var current = "inicio";

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
    document.title = current === "labs"
      ? "Adaptive Labs | Earn The Future"
      : "Adaptive Creative Studio | Earn The Future";
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

  function route() {
    var h = (location.hash || "").replace("#", "");
    show(views[h] ? h : "inicio");
  }
  window.addEventListener("hashchange", function () {
    var h = (location.hash || "").replace("#", "");
    withLoader(views[h] ? h : "inicio");
  });
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
        "translate3d(" + (x - o.el.offsetWidth / 2).toFixed(1) + "px," +
                         (y - o.el.offsetHeight / 2).toFixed(1) + "px,0)" +
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

  /* ---------- selo do rodapé: o texto é montado letra a letra à volta do círculo ---------- */
  var ringEl = document.querySelector(".badge-ring");
  var ringChars = Array.from(ringEl.dataset.ring);
  ringChars.forEach(function (ch, i) {
    var s = document.createElement("span");
    s.textContent = ch;
    s.style.transform = "rotate(" + (i * 360 / ringChars.length).toFixed(3) + "deg)";
    ringEl.appendChild(s);
  });

  /* ---------- o rodapé vai sendo descoberto por baixo do conteúdo ---------- */
  var megafoot = document.getElementById("megafoot");
  var shell    = document.getElementById("shell");
  var mfIn     = megafoot.querySelector(".megafoot-in");
  var footH    = 0;

  function sizeFooter() {
    footH = megafoot.offsetHeight;
    /* só se revela por baixo quando cabe no ecrã. Se for mais alto que o visor,
       o topo, onde está o selo, ficava cortado acima do ecrã e nunca se via */
    var fits = footH <= window.innerHeight + 1;
    document.documentElement.classList.toggle("reveal-foot", fits);
    /* reserva-se a altura do rodapé no fim do shell, para haver o que rolar */
    shell.style.marginBottom = fits ? footH + "px" : "0px";
    if (!fits) { mfIn.style.transform = ""; mfIn.style.opacity = ""; }
  }

  function footParallax() {
    if (!footH || !document.documentElement.classList.contains("reveal-foot")) { return; }
    var fromBottom = document.documentElement.scrollHeight
                   - (window.scrollY + window.innerHeight);
    var out = Math.max(0, Math.min(1, 1 - fromBottom / footH));
    /* o conteúdo assenta à medida que o rodapé se descobre */
    mfIn.style.transform = "translateY(" + ((1 - out) * 38).toFixed(1) + "px)";
    mfIn.style.opacity = (0.2 + out * 0.8).toFixed(3);
  }

  if (!REDUCED) {
    sizeFooter();
    footParallax();
    window.addEventListener("scroll", footParallax, { passive: true });
    window.addEventListener("resize", function () { sizeFooter(); footParallax(); });
    window.addEventListener("load", function () { sizeFooter(); footParallax(); });
    /* a altura muda com as fontes, com o idioma e com a largura */
    if ("ResizeObserver" in window) {
      new ResizeObserver(function () { sizeFooter(); footParallax(); }).observe(megafoot);
    }
  }

  /* ---------- no telemóvel a barra de topo sai quando o rodapé toma o ecrã ---------- */
  var MOBILE = window.matchMedia("(max-width: 819px)");
  function navFootCheck() {
    var hide = false;
    if (MOBILE.matches) {
      if (document.documentElement.classList.contains("reveal-foot")) {
        var fromBottom = document.documentElement.scrollHeight
                       - (window.scrollY + window.innerHeight);
        hide = fromBottom < footH * 0.45;
      } else {
        hide = megafoot.getBoundingClientRect().top < window.innerHeight * 0.4;
      }
    }
    nav.classList.toggle("is-hidden", hide);
    if (hide && panel.classList.contains("is-open")) { setPanel(false); }
  }
  window.addEventListener("scroll", navFootCheck, { passive: true });
  window.addEventListener("resize", navFootCheck);

  var savedLang = "pt";
  try { savedLang = localStorage.getItem("adaptive-lang") || "pt"; } catch (e) {}
  setLang(savedLang === "en" ? "en" : "pt");
  route();

  /* a classe boot sai depois da primeira entrada, para o ecrã ficar livre
     de a reutilizar nas mudanças de página */
  setTimeout(function () { loader.classList.remove("boot"); }, 2700);
})();
