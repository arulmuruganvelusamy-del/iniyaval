/**
 * Valentine — Main app: scenes, canvas, scroll, interactions, music.
 * Gate: "Will you be my Valentine?" loads first; after Yes + Enter, main site shows.
 */

(function () {
  const CONFIG = window.VALENTINE_CONFIG;

  // ─── Gate: show first, hide main world until Enter ─────────
  const gate = document.getElementById("valentineGate");
  const mainWorld = document.getElementById("mainWorld");
  const gateZone = document.getElementById("gateZone");
  const gateYesBtn = document.getElementById("gateYesBtn");
  const gateNoBtn = document.getElementById("gateNoBtn");
  const gateHint = document.getElementById("gateHint");
  const gateResult = document.getElementById("gateResult");
  const gateEnterBtn = document.getElementById("gateEnterBtn");
  const confettiCanvas = document.getElementById("confettiCanvas");

  if (gate && mainWorld) {
    mainWorld.classList.add("main-world-hidden");

    function resizeConfettiCanvas() {
      if (!confettiCanvas) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      confettiCanvas.width = Math.floor(window.innerWidth * dpr);
      confettiCanvas.height = Math.floor(window.innerHeight * dpr);
      confettiCanvas.style.width = "100vw";
      confettiCanvas.style.height = "100vh";
    }
    resizeConfettiCanvas();
    window.addEventListener("resize", resizeConfettiCanvas);

    let confettiInstance = null;
    if (typeof confetti !== "undefined") {
      confettiInstance = confetti.create(confettiCanvas, { resize: false, useWorker: true });
    }

    function fullScreenConfetti() {
      if (!confettiInstance) return;
      const end = Date.now() + 1600;
      (function frame() {
        confettiInstance({ particleCount: 12, spread: 90, startVelocity: 45, ticks: 180, origin: { x: Math.random(), y: Math.random() * 0.3 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
      setTimeout(() => {
        confettiInstance({ particleCount: 300, spread: 140, startVelocity: 60, ticks: 220, origin: { x: 0.5, y: 0.55 } });
      }, 300);
    }

    let yesScale = 1;
    function growYes() {
      yesScale = Math.min(2.2, yesScale + 0.1);
      gateYesBtn.style.transform = "translateY(-50%) scale(" + yesScale + ")";
    }

    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
    function moveNo(px, py) {
      const z = gateZone.getBoundingClientRect();
      const b = gateNoBtn.getBoundingClientRect();
      let dx = (b.left + b.width / 2) - px;
      let dy = (b.top + b.height / 2) - py;
      let mag = Math.hypot(dx, dy) || 1;
      dx /= mag; dy /= mag;
      let newLeft = (b.left - z.left) + dx * 150;
      let newTop = (b.top - z.top) + dy * 150;
      newLeft = clamp(newLeft, 0, z.width - b.width);
      newTop = clamp(newTop, 0, z.height - b.height);
      gateNoBtn.style.left = newLeft + "px";
      gateNoBtn.style.top = newTop + "px";
      gateNoBtn.style.transform = "none";
      growYes();
    }

    gateZone.addEventListener("pointermove", function (e) {
      const b = gateNoBtn.getBoundingClientRect();
      const d = Math.hypot((b.left + b.width / 2) - e.clientX, (b.top + b.height / 2) - e.clientY);
      if (d < 140) moveNo(e.clientX, e.clientY);
    });
    gateNoBtn.addEventListener("click", function (e) { e.preventDefault(); });

    gateYesBtn.addEventListener("click", function () {
      gateZone.style.display = "none";
      gateHint.style.display = "none";
      gateResult.classList.add("is-visible");
      resizeConfettiCanvas();
      fullScreenConfetti();
    });

    gateEnterBtn.addEventListener("click", function () {
      gate.classList.add("gate-hidden");
      mainWorld.classList.remove("main-world-hidden");
      mainWorld.classList.add("main-world-visible");
    });
  }

  if (!CONFIG) return;

  let audio = null;
  let trail = null;
  let openingTrees = [];
  let storyTrees = [];
  let galleryTrees = [];
  let notesTrees = [];
  let finalTrees = [];
  let heartTreeSingle = [];
  let clickHearts = [];
  let floatingHearts = [];
  let lastTime = 0;
  let mouseX = 0;
  let mouseY = 0;
  let rafId = null;

  // ─── DOM refs ─────────────────────────────────────────────
  const el = {
    musicToggle: document.getElementById("musicToggle"),
    sceneOpening: document.getElementById("sceneOpening"),
    canvasOpening: document.getElementById("canvasOpening"),
    openingTagline: document.getElementById("openingTagline"),
    openingMain: document.getElementById("openingMain"),
    openingName: document.getElementById("openingName"),
    scrollHint: document.getElementById("scrollHint"),
    sceneLetter: document.getElementById("sceneLetter"),
    envelopeWrap: document.getElementById("envelopeWrap"),
    letterInner: document.getElementById("letterInner"),
    letterClose: document.getElementById("letterClose"),
    sceneHeartTree: document.getElementById("sceneHeartTree"),
    canvasHeartTree: document.getElementById("canvasHeartTree"),
    sceneStory: document.getElementById("sceneStory"),
    canvasStory: document.getElementById("canvasStory"),
    storyCards: document.getElementById("storyCards"),
    sceneGallery: document.getElementById("sceneGallery"),
    canvasGallery: document.getElementById("canvasGallery"),
    galleryGrid: document.getElementById("galleryGrid"),
    sceneNotes: document.getElementById("sceneNotes"),
    canvasNotes: document.getElementById("canvasNotes"),
    loveNotesHearts: document.getElementById("loveNotesHearts"),
    loveNoteModal: document.getElementById("loveNoteModal"),
    loveNoteClose: document.getElementById("loveNoteClose"),
    loveNoteText: document.getElementById("loveNoteText"),
    sceneWhy: document.getElementById("sceneWhy"),
    whyList: document.getElementById("whyList"),
    sceneFinal: document.getElementById("sceneFinal"),
    canvasFinal: document.getElementById("canvasFinal"),
    finalMessage: document.getElementById("finalMessage"),
    btnForever: document.getElementById("btnForever"),
    trailCanvas: document.getElementById("trailCanvas"),
    scrollToTop: document.getElementById("scrollToTop"),
    scrollProgressWrap: document.getElementById("scrollProgressWrap"),
    scrollProgressBar: document.getElementById("scrollProgressBar"),
    heartTreeCount: document.getElementById("heartTreeCount"),
    mainConfettiCanvas: document.getElementById("mainConfettiCanvas"),
    sceneLateNight: document.getElementById("sceneLateNight"),
    lateNightThought: document.getElementById("lateNightThought"),
    lateNightContent: document.getElementById("lateNightContent"),
    humorOverthought: document.getElementById("humorOverthought"),
    sceneTogether: document.getElementById("sceneTogether"),
    togetherCards: document.getElementById("togetherCards"),
    sceneNeverSay: document.getElementById("sceneNeverSay"),
    neverSayBtn: document.getElementById("neverSayBtn"),
    neverSayLoading: document.getElementById("neverSayLoading"),
    neverSayMessage: document.getElementById("neverSayMessage"),
    sceneClosure: document.getElementById("sceneClosure"),
    closureLine: document.getElementById("closureLine"),
    closureSubline: document.getElementById("closureSubline"),
    runawayHeart: document.getElementById("runawayHeart"),
    fakeErrorWrap: document.getElementById("fakeErrorWrap"),
    fakeErrorTrigger: document.getElementById("fakeErrorTrigger"),
    fakeErrorReveal: document.getElementById("fakeErrorReveal"),
    holdHeartWrap: document.getElementById("holdHeartWrap"),
    holdHeartBtn: document.getElementById("holdHeartBtn"),
    holdHeartProgress: document.getElementById("holdHeartProgress"),
    holdHeartHint: document.getElementById("holdHeartHint"),
    slowScrollReveal: document.getElementById("slowScrollReveal"),
    hundredHeartsReveal: document.getElementById("hundredHeartsReveal"),
    nightModeMessage: document.getElementById("nightModeMessage"),
    hiddenBuilderNote: document.getElementById("hiddenBuilderNote"),
    warningBanner: document.getElementById("warningBanner"),
    fallingHeartWrap: document.getElementById("fallingHeartWrap"),
    fallingHeart: document.getElementById("fallingHeart"),
    caughtHeartReveal: document.getElementById("caughtHeartReveal"),
    caughtHeartRevealInner: document.getElementById("caughtHeartRevealInner"),
  };

  let heartsAddedCount = 0;

  // ─── Letter-by-letter name animation ─────────────────────
  function initOpeningText() {
    el.openingTagline.textContent = CONFIG.opening.tagline;
    el.openingMain.textContent = CONFIG.opening.mainLine;
    const name = CONFIG.opening.herName;
    el.openingName.innerHTML = "";
    name.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char;
      span.style.animationDelay = `${0.9 + i * 0.12}s`;
      el.openingName.appendChild(span);
    });
  }

  // ─── Letter in envelope (editable in config) ──────────────
  function initLetter() {
    if (!CONFIG.letter || !el.letterInner) return;
    el.letterInner.textContent = CONFIG.letter;
    el.envelopeWrap.addEventListener("click", () => {
      el.envelopeWrap.classList.add("open");
    });
    el.letterClose.addEventListener("click", () => {
      el.envelopeWrap.classList.remove("open");
    });
  }

  // ─── Our Story cards (editable in config) ──────────────────
  function initStoryCards() {
    el.storyCards.innerHTML = "";
    CONFIG.ourStory.forEach((text, i) => {
      const card = document.createElement("div");
      card.className = "story-card";
      card.style.animationDelay = `${i * 0.15}s`;
      card.innerHTML = `<p>${escapeHtml(text)}</p>`;
      el.storyCards.appendChild(card);
    });
  }

  // ─── Gallery (editable images in config) ──────────────────
  function initGallery() {
    el.galleryGrid.innerHTML = "";
    CONFIG.galleryImages.forEach((src, i) => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.style.animationDelay = `${i * 0.08}s`;
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Memory ${i + 1}`;
      img.loading = "lazy";
      img.onerror = () => {
        img.style.background = "linear-gradient(135deg, #f0c8d4, #c9a0c8)";
        img.alt = "Add your photo in config.js — images/memory" + (i + 1) + ".jpg";
      };
      item.appendChild(img);
      el.galleryGrid.appendChild(item);
    });
  }

  // ─── Special Notes: hearts + modal (editable in config) ──────
  function initLoveNotes() {
    el.loveNotesHearts.innerHTML = "";
    const heartSvg = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    CONFIG.loveNotes.forEach((msg, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "love-note-heart";
      btn.innerHTML = heartSvg;
      btn.setAttribute("aria-label", "Open note " + (i + 1));
      btn.addEventListener("click", () => openLoveNote(msg));
      el.loveNotesHearts.appendChild(btn);
    });
    el.loveNoteClose.addEventListener("click", closeLoveNote);
    el.loveNoteModal.addEventListener("click", (e) => {
      if (e.target === el.loveNoteModal) closeLoveNote();
    });
  }

  function openLoveNote(msg) {
    el.loveNoteText.textContent = msg;
    el.loveNoteModal.setAttribute("aria-hidden", "false");
    el.loveNoteModal.classList.add("open");
  }

  function closeLoveNote() {
    el.loveNoteModal.classList.remove("open");
    el.loveNoteModal.setAttribute("aria-hidden", "true");
  }

  // ─── Why I Like You list (editable in config) ───────────────
  function initWhyList() {
    el.whyList.innerHTML = "";
    const heartSvg = `<svg class="heart-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    CONFIG.whyILoveYou.forEach((reason, i) => {
      const li = document.createElement("li");
      li.style.animationDelay = `${i * 0.1}s`;
      li.innerHTML = heartSvg + `<span>${escapeHtml(reason)}</span>`;
      el.whyList.appendChild(li);
    });
  }

  // ─── Final scene text (editable in config) ─────────────────
  function initFinal() {
    el.finalMessage.textContent = CONFIG.final.message + " ❤️";
    el.btnForever.textContent = CONFIG.final.buttonText;
    el.btnForever.addEventListener("click", () => {
      el.sceneOpening.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ─── Scroll: visibility, section titles, progress bar ─────
  function setupScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.classList.contains("section-title")) {
              entry.target.classList.add("section-title-visible");
            }
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );
    document.querySelectorAll(".story-card, .gallery-item, .why-list li, .together-card").forEach((node) => observer.observe(node));
    document.querySelectorAll(".section-title").forEach((node) => observer.observe(node));
  }

  function setupScrollProgress() {
    const bar = el.scrollProgressBar;
    const wrap = el.scrollProgressWrap;
    if (!bar || !wrap) return;
    function update() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ─── Canvas: opening (starry sky + trees + floating hearts) ─
  function setupOpeningCanvas() {
    const c = el.canvasOpening;
    const ctx = c.getContext("2d");
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      if (!openingTrees.length) {
        openingTrees = [
          HeartTree.createTree({ x: 0.2, baseY: 1, width: c.width, height: c.height }),
          HeartTree.createTree({ x: 0.5, baseY: 1, width: c.width, height: c.height }),
          HeartTree.createTree({ x: 0.8, baseY: 1, width: c.width, height: c.height }),
        ];
        floatingHearts = Particles.createFloatingHearts(40, c.width, c.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    function drawStars(ctx, w, h, time) {
      const count = 80;
      for (let i = 0; i < count; i++) {
        const seed = i * 1.1;
        const x = ((seed * 37) % w);
        const y = ((seed * 53) % h);
        const twinkle = 0.4 + 0.6 * Math.sin(time * 0.5 + seed);
        ctx.beginPath();
        ctx.arc(x, y, 1 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 122, 138, ${twinkle * 0.5})`;
        ctx.fill();
      }
    }

    function loop(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const w = c.width;
      const h = c.height;
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#fff5f8");
      grad.addColorStop(0.35, "#ffe8f2");
      grad.addColorStop(0.65, "#fce8f5");
      grad.addColorStop(1, "#f8e8f8");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      drawStars(ctx, w, h, time / 1000);
      openingTrees.forEach((t) => {
        HeartTree.updateTree(t, dt, mouseX, mouseY);
        HeartTree.drawTree(ctx, t, time / 1000);
      });
      Particles.updateFloatingHearts(floatingHearts, dt, c.width, c.height);
      Particles.drawFloatingHearts(ctx, floatingHearts);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
  }

  // ─── Our Heart Tree: one big tree, tap to add rising hearts ─
  function setupHeartTreeCanvas() {
    const canvas = el.canvasHeartTree;
    const section = el.sceneHeartTree;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      const w = section ? section.clientWidth : canvas.offsetWidth;
      const h = section ? section.clientHeight : canvas.offsetHeight;
      if (w > 0 && h > 0) {
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          heartTreeSingle.length = 0;
          heartTreeSingle.push(HeartTree.createTree({ x: 0.5, baseY: 1, width: w, height: h }));
        } else if (heartTreeSingle.length === 0) {
          heartTreeSingle.push(HeartTree.createTree({ x: 0.5, baseY: 1, width: w, height: h }));
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) resize();
      },
      { rootMargin: "50px", threshold: 0 }
    );
    if (section) io.observe(section);

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 5; i++) {
        clickHearts.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y,
          vy: -2 - Math.random() * 3,
          vx: (Math.random() - 0.5) * 1.5,
          life: 1.2,
          size: 6 + Math.random() * 8,
          hue: 340 + Math.random() * 25,
        });
      }
      heartsAddedCount += 5;
      const countEl = el.heartTreeCount;
      if (countEl) {
        countEl.textContent = "You've added " + heartsAddedCount + " hearts ♡";
        countEl.classList.remove("heart-tree-count-visible");
        countEl.offsetHeight;
        countEl.classList.add("heart-tree-count-visible");
      }
      const content = section && section.querySelector(".heart-tree-content");
      if (content) {
        content.classList.add("tap-pulse");
        setTimeout(function () { content.classList.remove("tap-pulse"); }, 450);
      }
    });

    function loop(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      if (canvas.width === 0 || canvas.height === 0) resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (heartTreeSingle.length) {
        HeartTree.updateTree(heartTreeSingle[0], dt, mouseX, mouseY);
        HeartTree.drawTree(ctx, heartTreeSingle[0], time / 1000);
      }
      clickHearts.forEach((h) => {
        h.x += h.vx;
        h.y += h.vy;
        h.life -= dt * 0.8;
        h.vy *= 0.98;
      });
      clickHearts = clickHearts.filter((h) => h.life > 0);
      clickHearts.forEach((h) => {
        const alpha = h.life;
        HeartTree.drawHeart(ctx, h.x, h.y, h.size, `hsla(${h.hue}, 75%, 78%, ${alpha})`, true);
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ─── Canvas: story / gallery / final (heart trees only) ────
  function setupSceneCanvas(id, treeList) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (treeList.length === 0) {
        const w = canvas.width;
        const h = canvas.height;
        treeList.push(
          HeartTree.createTree({ x: 0.15, baseY: 1, width: w, height: h }),
          HeartTree.createTree({ x: 0.85, baseY: 1, width: w, height: h })
        );
      }
    };
    resize();
    window.addEventListener("resize", resize);

    function loop(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      treeList.forEach((t) => {
        HeartTree.updateTree(t, dt, mouseX, mouseY);
        HeartTree.drawTree(ctx, t, time / 1000);
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ─── Trail canvas (cursor / touch) ─────────────────────────
  function setupTrail() {
    trail = Particles.createTrail();
    const c = el.trailCanvas;
    const ctx = c.getContext("2d");
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastMove = 0;
    function onMove(x, y) {
      const now = Date.now();
      if (now - lastMove < 32) return;
      lastMove = now;
      Particles.addTrailPoint(trail, x, y);
    }

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      onMove(e.clientX, e.clientY);
    });
    document.addEventListener("touchmove", (e) => {
      if (e.touches.length) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        onMove(mouseX, mouseY);
      }
    }, { passive: true });

    function loop(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      Particles.updateTrail(trail, dt);
      ctx.clearRect(0, 0, c.width, c.height);
      Particles.drawTrail(ctx, trail);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ─── Scroll to top button ─────────────────────────────────
  function setupScrollToTop() {
    const btn = el.scrollToTop;
    const opening = el.sceneOpening;
    if (!btn || !opening) return;
    function updateVisibility() {
      const rect = opening.getBoundingClientRect();
      if (rect.bottom < -100) {
        btn.classList.add("scroll-to-top-visible");
      } else {
        btn.classList.remove("scroll-to-top-visible");
      }
    }
    window.addEventListener("scroll", updateVisibility, { passive: true });
    btn.addEventListener("click", () => {
      opening.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ─── Music (optional; set path in config) ──────────────────
  function setupMusic() {
    if (!CONFIG.music || !CONFIG.music.enabled || !CONFIG.music.src) {
      el.musicToggle.style.display = "none";
      return;
    }
    audio = new Audio(CONFIG.music.src);
    audio.loop = true;
    el.musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        el.musicToggle.classList.remove("muted");
      } else {
        audio.pause();
        el.musicToggle.classList.add("muted");
      }
    });
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  // ─── Late Night Thoughts: tap to reveal a thought ──────────
  function initLateNightThoughts() {
    const thoughts = CONFIG.lateNightThoughts || [];
    const scene = el.sceneLateNight;
    const content = el.lateNightContent || scene;
    const thoughtEl = el.lateNightThought;
    const overthoughtEl = el.humorOverthought;
    if (!thoughts.length || !content || !thoughtEl) return;
    if (overthoughtEl && CONFIG.humor && CONFIG.humor.overthought) {
      overthoughtEl.textContent = CONFIG.humor.overthought;
      overthoughtEl.setAttribute("aria-hidden", "false");
    }
    if (scene && !scene.querySelector(".late-night-stars")) {
      const starsWrap = document.createElement("div");
      starsWrap.className = "late-night-stars";
      starsWrap.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 40; i++) {
        const star = document.createElement("span");
        star.className = "late-night-star";
        star.style.left = (Math.random() * 100) + "%";
        star.style.top = (Math.random() * 100) + "%";
        star.style.animationDelay = (Math.random() * 2) + "s";
        starsWrap.appendChild(star);
      }
      scene.insertBefore(starsWrap, scene.firstChild);
    }
    content.addEventListener("click", () => {
      const idx = Math.floor(Math.random() * thoughts.length);
      thoughtEl.textContent = thoughts[idx];
      thoughtEl.classList.add("visible");
    });
  }

  // ─── If We Were Here Together: scenario cards ──────────────
  function initTogetherCards() {
    const list = CONFIG.ifWeWereHereTogether || [];
    const container = el.togetherCards;
    if (!list.length || !container) return;
    container.innerHTML = "";
    list.forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "together-card";
      card.innerHTML = "<span class=\"together-card-title\">" + escapeHtml(item.title) + "</span><p class=\"together-card-scene\">" + escapeHtml(item.scene) + "</p>";
      card.addEventListener("click", () => {
        card.classList.toggle("open");
      });
      container.appendChild(card);
    });
  }

  // ─── Things I Never Say Out Loud: randomized, one by one ────
  function initNeverSay() {
    const list = CONFIG.thingsINeverSay || [];
    const btn = el.neverSayBtn;
    const loadingEl = el.neverSayLoading;
    const msgEl = el.neverSayMessage;
    if (!list.length || !btn || !msgEl) return;
    let order = list.slice().sort(() => Math.random() - 0.5);
    let index = 0;
    let hasShownLoading = false;
    function showNext() {
      if (index >= order.length) {
        index = 0;
        order = list.slice().sort(() => Math.random() - 0.5);
      }
      if (CONFIG.humor && CONFIG.humor.loadingCourage && loadingEl && !hasShownLoading) {
        hasShownLoading = true;
        loadingEl.textContent = CONFIG.humor.loadingCourage;
        loadingEl.removeAttribute("aria-hidden");
        loadingEl.style.display = "block";
        msgEl.classList.remove("visible");
        setTimeout(() => {
          if (loadingEl) loadingEl.style.display = "none";
          btn.textContent = (CONFIG.humor && CONFIG.humor.buttonSigh) ? CONFIG.humor.buttonSigh : "Tap to reveal";
          btn.classList.add("sighing");
          setTimeout(() => {
            btn.classList.remove("sighing");
            btn.textContent = "Tap to reveal";
            msgEl.textContent = order[index];
            msgEl.classList.add("visible");
            index++;
          }, 600);
        }, 1200);
        return;
      }
      if (CONFIG.humor && CONFIG.humor.buttonSigh) {
        btn.textContent = CONFIG.humor.buttonSigh;
        btn.classList.add("sighing");
        setTimeout(() => {
          btn.classList.remove("sighing");
          btn.textContent = "Tap to reveal";
          msgEl.textContent = order[index];
          msgEl.classList.add("visible");
          index++;
        }, 500);
      } else {
        msgEl.textContent = order[index];
        msgEl.classList.add("visible");
        index++;
      }
    }
    btn.addEventListener("click", showNext);
  }

  // ─── Closure: "This doesn't end here" ───────────────────────
  function initClosure() {
    if (!CONFIG.closure) return;
    if (el.closureLine) el.closureLine.textContent = CONFIG.closure.line;
    if (el.closureSubline) el.closureSubline.textContent = CONFIG.closure.subline;
  }

  // ─── Micro: runaway heart ──────────────────────────────────
  function setupRunawayHeart() {
    const heart = el.runawayHeart;
    if (!heart) return;
    const pad = 80;
    document.addEventListener("pointermove", (e) => {
      const r = heart.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (d < 120) {
        heart.classList.add("ran-away");
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const mag = Math.hypot(dx, dy) || 1;
        const moveX = (dx / mag) * 180;
        const moveY = (dy / mag) * 180;
        heart.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
      }
    });
  }

  // ─── Micro: fake error → love note ─────────────────────────
  function setupFakeError() {
    const trigger = el.fakeErrorTrigger;
    const reveal = el.fakeErrorReveal;
    if (!trigger || !reveal || !CONFIG.humor) return;
    trigger.addEventListener("click", () => {
      const title = CONFIG.humor.fakeErrorTitle || "Something went wrong";
      const msg = CONFIG.humor.fakeErrorMessage || "";
      reveal.innerHTML = "<div class=\"reveal-inner\"><p class=\"reveal-title\">" + escapeHtml(title) + "</p><p class=\"reveal-text\">" + escapeHtml(msg) + "</p></div>";
      reveal.classList.add("is-visible");
      reveal.setAttribute("aria-hidden", "false");
      reveal.addEventListener("click", function close(ev) {
        if (ev.target === reveal) {
          reveal.classList.remove("is-visible");
          reveal.setAttribute("aria-hidden", "true");
          reveal.removeEventListener("click", close);
        }
      });
    });
  }

  // ─── Micro: hold heart 3 seconds ─────────────────────────────
  function setupHoldHeart() {
    const wrap = el.holdHeartWrap;
    const btn = el.holdHeartBtn;
    if (!wrap || !btn) return;
    let timer = null;
    function startHold() {
      wrap.classList.add("holding");
      btn.classList.add("held");
      timer = setTimeout(() => {
        wrap.classList.remove("holding");
        wrap.classList.add("unlocked");
        btn.classList.add("held");
        timer = null;
      }, 3000);
    }
    function cancelHold() {
      if (timer) clearTimeout(timer);
      timer = null;
      wrap.classList.remove("holding");
      btn.classList.remove("held");
    }
    btn.addEventListener("pointerdown", startHold);
    btn.addEventListener("pointerup", cancelHold);
    btn.addEventListener("pointerleave", cancelHold);
  }

  // ─── Easter egg: slow scroll reveal ─────────────────────────
  function setupSlowScrollReveal() {
    const elReveal = el.slowScrollReveal;
    if (!elReveal || !CONFIG.easterEggs || !CONFIG.easterEggs.slowScrollHint) return;
    elReveal.textContent = CONFIG.easterEggs.slowScrollHint;
    let lastScroll = window.scrollY;
    let lastTime = Date.now();
    window.addEventListener("scroll", () => {
      const now = Date.now();
      const dy = Math.abs(window.scrollY - lastScroll);
      const dt = (now - lastTime) / 1000;
      if (dt > 0.5 && dy > 0 && dy / dt < 30) {
        elReveal.classList.add("is-visible");
        elReveal.setAttribute("aria-hidden", "false");
        setTimeout(() => {
          elReveal.classList.remove("is-visible");
          elReveal.setAttribute("aria-hidden", "true");
        }, 4000);
      }
      lastScroll = window.scrollY;
      lastTime = now;
    }, { passive: true });
  }

  // ─── Easter egg: 100 hearts unlock ──────────────────────────
  function setupHundredHeartsReveal() {
    const overlay = el.hundredHeartsReveal;
    if (!overlay || !CONFIG.easterEggs || !CONFIG.easterEggs.hundredHearts) return;
    overlay.innerHTML = "<div class=\"reveal-inner\"><p>" + escapeHtml(CONFIG.easterEggs.hundredHearts) + "</p></div>";
    let hundredShown = false;
    function check() {
      if (hundredShown || heartsAddedCount < 100) return;
      hundredShown = true;
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      overlay.addEventListener("click", function close(ev) {
        if (ev.target === overlay) {
          overlay.classList.remove("is-visible");
          overlay.setAttribute("aria-hidden", "true");
          overlay.removeEventListener("click", close);
        }
      });
    }
    if (el.heartTreeCount) {
      const obs = new MutationObserver(check);
      obs.observe(el.heartTreeCount, { childList: true, characterData: true, subtree: true });
    }
  }

  // ─── Easter egg: night message ─────────────────────────────
  function setupNightMode() {
    const msgEl = el.nightModeMessage;
    if (!msgEl || !CONFIG.easterEggs || !CONFIG.easterEggs.nightMessage) return;
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      msgEl.textContent = CONFIG.easterEggs.nightMessage;
      msgEl.classList.add("is-visible");
      msgEl.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        msgEl.classList.remove("is-visible");
        msgEl.setAttribute("aria-hidden", "true");
      }, 6000);
    }
  }

  // ─── Easter egg: long-press name → secret message ─────────
  function setupLongPressName() {
    const nameEl = el.openingName;
    if (!nameEl || !CONFIG.easterEggs || !CONFIG.easterEggs.longPressName) return;
    let pressTimer = null;
    nameEl.addEventListener("pointerdown", () => {
      pressTimer = setTimeout(() => {
        nameEl.setAttribute("title", CONFIG.easterEggs.longPressName);
        const pop = document.createElement("div");
        pop.className = "night-mode-message is-visible";
        pop.style.position = "fixed";
        pop.style.top = "50%";
        pop.style.left = "50%";
        pop.style.transform = "translate(-50%, -50%)";
        pop.style.zIndex = "70";
        pop.textContent = CONFIG.easterEggs.longPressName;
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 3500);
        pressTimer = null;
      }, 800);
    });
    nameEl.addEventListener("pointerup", () => { if (pressTimer) clearTimeout(pressTimer); pressTimer = null; });
    nameEl.addEventListener("pointerleave", () => { if (pressTimer) clearTimeout(pressTimer); pressTimer = null; });
  }

  // ─── Easter egg: falling heart catch ───────────────────────
  function setupFallingHeart() {
    const wrap = el.fallingHeartWrap;
    const heart = el.fallingHeart;
    const reveal = el.caughtHeartReveal;
    const inner = el.caughtHeartRevealInner;
    if (!wrap || !heart || !reveal || !inner || !CONFIG.easterEggs || !CONFIG.easterEggs.caughtHeart) return;
    wrap.setAttribute("aria-hidden", "false");
    heart.style.left = (10 + Math.random() * 80) + "%";
    heart.style.animationDuration = (10 + Math.random() * 6) + "s";
    function resetHeart() {
      heart.classList.remove("caught");
      heart.style.left = (10 + Math.random() * 80) + "%";
      heart.style.animationDuration = (10 + Math.random() * 6) + "s";
    }
    heart.addEventListener("click", () => {
      heart.classList.add("caught");
      inner.textContent = CONFIG.easterEggs.caughtHeart;
      reveal.classList.add("is-visible");
      reveal.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        reveal.classList.remove("is-visible");
        reveal.setAttribute("aria-hidden", "true");
        resetHeart();
      }, 3200);
    });
    reveal.addEventListener("click", (ev) => {
      if (ev.target === reveal) {
        reveal.classList.remove("is-visible");
        reveal.setAttribute("aria-hidden", "true");
        resetHeart();
      }
    });
  }

  // ─── Humor: hidden builder note & warning banner ────────────
  function setupHumorBanners() {
    if (CONFIG.humor && CONFIG.humor.hiddenNote && el.hiddenBuilderNote) {
      el.hiddenBuilderNote.textContent = CONFIG.humor.hiddenNote;
      el.hiddenBuilderNote.setAttribute("aria-hidden", "false");
      el.hiddenBuilderNote.style.display = "block";
    }
    if (CONFIG.humor && CONFIG.humor.warning && el.warningBanner) {
      el.warningBanner.textContent = CONFIG.humor.warning;
      el.warningBanner.setAttribute("aria-hidden", "false");
      el.warningBanner.style.display = "block";
    }
  }

  // ─── Escape closes modals; double-tap name = confetti ───────
  function setupEscapeAndEasterEgg() {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (el.loveNoteModal && el.loveNoteModal.classList.contains("open")) {
        closeLoveNote();
      }
      if (el.envelopeWrap && el.envelopeWrap.classList.contains("open")) {
        el.envelopeWrap.classList.remove("open");
      }
      if (el.fakeErrorReveal && el.fakeErrorReveal.classList.contains("is-visible")) {
        el.fakeErrorReveal.classList.remove("is-visible");
      }
      if (el.hundredHeartsReveal && el.hundredHeartsReveal.classList.contains("is-visible")) {
        el.hundredHeartsReveal.classList.remove("is-visible");
      }
      if (el.caughtHeartReveal && el.caughtHeartReveal.classList.contains("is-visible")) {
        el.caughtHeartReveal.classList.remove("is-visible");
      }
    });
    let lastTap = 0;
    el.openingName.addEventListener("click", () => {
      const now = Date.now();
      if (now - lastTap < 400 && now - lastTap > 50) {
        lastTap = 0;
        if (typeof confetti !== "undefined" && el.mainConfettiCanvas) {
          const c = el.mainConfettiCanvas;
          c.width = c.offsetWidth;
          c.height = c.offsetHeight;
          const instance = confetti.create(c, { resize: false, useWorker: true });
          instance({ particleCount: 80, spread: 70, origin: { x: 0.5, y: 0.5 }, colors: ["#e87a8a", "#f4a5b0", "#ffdde8"] });
        }
      } else {
        lastTap = now;
      }
    });
  }

  // ─── Init ─────────────────────────────────────────────────
  function init() {
    initOpeningText();
    initLetter();
    initStoryCards();
    initGallery();
    initLoveNotes();
    initWhyList();
    initFinal();
    initLateNightThoughts();
    initTogetherCards();
    initNeverSay();
    initClosure();
    setupScroll();
    setupScrollProgress();
    setupEscapeAndEasterEgg();
    setupLongPressName();
    setupOpeningCanvas();
    setupHeartTreeCanvas();
    setupSceneCanvas("canvasStory", storyTrees);
    setupSceneCanvas("canvasGallery", galleryTrees);
    setupSceneCanvas("canvasNotes", notesTrees);
    setupSceneCanvas("canvasFinal", finalTrees);
    setupTrail();
    setupScrollToTop();
    setupMusic();
    setupRunawayHeart();
    setupFakeError();
    setupHoldHeart();
    setupSlowScrollReveal();
    setupHundredHeartsReveal();
    setupNightMode();
    setupFallingHeart();
    setupHumorBanners();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
