const GOOGLE_FORM_URL = "PASTE_YOUR_GOOGLE_FORM_LINK_HERE";

const SOCIALS = {
  instagram: "https://www.instagram.com/arvr_hub_bmsit/",
  whatsapp: "https://chat.whatsapp.com/BbkKG1gAy633SMkNLWjBGX",
  linkedin: "https://www.linkedin.com/in/arvr-hub-bmsit/",
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const toastEl = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 4200);
}

const SLIDES = [
  { era: "past", date: "JUNE 12–16, 2023", title: "Before we had a name", text: "A 6-day metaverse course with industry and academic experts. Reality: tweaked.", stat: "30 students", icon: "🎬", photo: "photos/23-early-arvr.jpg" },
  { era: "past", date: "AUG 4, 2023", title: "Industry slides into DMs", text: "MoU signed with Rayvector Technologies — AR/VR, AI, synthetic data. The lab dream gets a budget.", stat: "1 industry MoU", icon: "🤝" },
  { era: "past", date: "JAN 2024", title: "Meta calls", text: "Creators of Metaverse — AICTE × Meta × 1M1B. Two batches, projects submitted, Phase 2 unlocked.", stat: "55 students in", icon: "🥽", photo: "photos/18-metaspark.jpg" },
  { era: "rise", date: "MAY 17, 2024", title: "WE LAUNCH", text: "ARVR HUB officially exists. Objectives: skill development. Side effects: fun.", stat: "day one", icon: "🚀", photo: "photos/21-arvr-launch.jpg" },
  { era: "rise", date: "MAY 17–18, 2024", title: "We built a factory", text: "A VR Factory designed in Unity and deployed on a MetaQuest device. Industry VR, hands on.", stat: "42 students", icon: "🏭", photo: "photos/02-vr-factory-action.jpg" },
  { era: "rise", date: "MAY 24–26, 2024", title: "First trophy unlocked", text: "Srishti Exhibition: WONDERLENS — an AR project — takes 3rd prize. The trophy department opens.", stat: "3rd prize · AR", icon: "🏆", photo: "photos/16-srishti-action.jpg" },
  { era: "rise", date: "JUNE 1–12, 2024", title: "We go viral (offline)", text: "10-day metaverse training program for Nagarjuna College students, hosted on our campus.", stat: "10 days · outreach", icon: "🌍", photo: "photos/17-outreach.jpg" },
  { era: "rise", date: "JULY 19, 2024", title: "Students teaching students", text: "Blender Basics Workshop — run by a 4th-sem. The best way to learn is to teach.", stat: "13 students", icon: "🧊", photo: "photos/19-blender-workshop.jpg" },
  { era: "rise", date: "OCT 22, 2024", title: "Half a thousand show up", text: "LLM hackathon orientation with 1M1B & Flaunch — and an MoU signed the same day.", stat: "500+ students", icon: "📢" },
  { era: "peak", date: "DEC 26 & 31, 2024", title: "We build Mars", text: "mARtian AESSence: Martian worlds designed and developed in Unity. One small step for BMSIT.", stat: "20 builders", icon: "🔴", photo: "photos/03-martian.jpg" },
  { era: "peak", date: "MAR 28, 2025", title: "Best UX in the house", text: "Anveshana 2025 at BICEP: Best User Experience Award — with cash prize. Judges: impressed.", stat: "1 award · cash prize", icon: "👑", photo: "photos/05-anveshana-award.jpg" },
  { era: "peak", date: "MAY 24, 2025", title: "Road to the UN", text: "Changemakers World Cup orientation with 1M1B — top 500 changemakers head to the UN Headquarters.", stat: "102 students", icon: "🌐", photo: "photos/04-changemakers.jpg" },
  { era: "peak", date: "OCT 15, 2025", title: "Hiring pipelines, unlocked", text: "MCP Servers workshop with 0xDay & Kodeus — advanced server infrastructure, hands on.", stat: "110 students", icon: "🛠️", photo: "photos/06-mcp-workshop.jpg" },
  { era: "peak", date: "NOV 21–22, 2025", title: "Double feature", text: "Minecraft Build-A-Thon + SPRINTX 2K25 Hackathon with Xthlete & Oraiyan Innovations.", stat: "140 students", icon: "⛏️", photo: "photos/07-minecraft-stage.jpg" },
  { era: "peak", date: "MAR 25, 2026", title: "AI Skills Passport", text: "AI tools, global certifications, career pathways — stamped at the BSN Auditorium.", stat: "250 students", icon: "🛂", photo: "photos/12-ai-skills-passport.jpg" },
  { era: "peak", date: "APR 29, 2026", title: "225 and counting", text: "Triverse Hackathon: 9 hours offline, industry problem statements, internships on the line.", stat: "225 students", icon: "⚡", photo: "photos/13-triverse-crowd.jpg" },
  { era: "future", date: "THE FUTURE", title: "UNWRITTEN", text: "The next chapter doesn't exist yet. It could have your name in it.", apply: true, icon: "✨" },
];

const ERAS = {
  past:   { bg: [26, 20, 13],  accent: [201, 143, 61],  text: [240, 228, 205], muted: [166, 148, 118] },
  rise:   { bg: [20, 16, 43],  accent: [139, 92, 246],  text: [240, 237, 255], muted: [155, 147, 196] },
  peak:   { bg: [13, 20, 32],  accent: [77, 163, 255],  text: [235, 244, 255], muted: [140, 165, 190] },
  future: { bg: [18, 8, 26],   accent: [255, 46, 196],  text: [255, 235, 250], muted: [190, 140, 175] },
};

const slideEra = SLIDES.map((s) => s.era);

function lerp(a, b, t) {
  return a + (b - a) * t;
}

let currentAccent = [201, 143, 61];

function blendPalette(v) {
  const max = SLIDES.length - 1;
  const clamped = Math.max(0, Math.min(max, v));
  const i = Math.min(Math.floor(clamped), max - 1);
  const f = clamped - i;
  const a = ERAS[slideEra[i]];
  const b = ERAS[slideEra[Math.min(i + 1, max)]];
  const mixArr = (key) => [
    Math.round(lerp(a[key][0], b[key][0], f)),
    Math.round(lerp(a[key][1], b[key][1], f)),
    Math.round(lerp(a[key][2], b[key][2], f)),
  ];
  const rgb = (c) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  const root = document.documentElement.style;
  root.setProperty("--bg", rgb(mixArr("bg")));
  currentAccent = mixArr("accent");
  root.setProperty("--accent", rgb(currentAccent));
  root.setProperty("--text", rgb(mixArr("text")));
  root.setProperty("--muted", rgb(mixArr("muted")));
}

const slideCard = document.getElementById("slide-card");
const slideDate = document.getElementById("slide-date");
const slideTitle = document.getElementById("slide-title");
const slideText = document.getElementById("slide-text");
const slideStat = document.getElementById("slide-stat");
const slideCta = document.getElementById("slide-cta");
const slideMedia = document.getElementById("slide-media");
const mediaEmoji = document.getElementById("media-emoji");
const mediaLabel = document.querySelector(".media-label");
const readout = document.getElementById("readout");
const lever = document.getElementById("lever");
const dotsWrap = document.getElementById("lever-dots");
const stage = document.getElementById("stage");

let current = 0;
let transitioning = false;
let pendingTarget = null;

const eraNames = { past: "PAST", rise: "RISE", peak: "PEAK", future: "FUTURE" };

function runPending() {
  if (pendingTarget !== null) {
    const p = pendingTarget;
    pendingTarget = null;
    if (p !== current) goToSlide(p);
  }
}

function goToSlide(idx) {
  const target = Math.max(0, Math.min(SLIDES.length - 1, idx));
  if (transitioning) {
    if (target !== current) pendingTarget = target;
    return;
  }
  if (target === current) return;
  transitioning = true;
  const dir = target > current ? 1 : -1;
  current = target;
  if (typeof gsap === "undefined" || reducedMotion) {
    applySlide(current);
    transitioning = false;
    runPending();
  } else {
    gsap.killTweensOf(slideCard);
    gsap.to(slideCard, {
      opacity: 0,
      x: -44 * dir,
      rotationY: -16 * dir,
      scale: 0.95,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => {
        applySlide(current);
        gsap.fromTo(
          slideCard,
          { opacity: 0, x: 55 * dir, rotationY: 18 * dir, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
            onComplete: () => {
              transitioning = false;
              runPending();
            },
          }
        );
      },
    });
  }
  if (window.mascotSpin) window.mascotSpin();
}

function applySlide(idx) {
  const s = SLIDES[idx];
  slideDate.textContent = s.date;
  slideTitle.textContent = s.title;
  slideText.textContent = s.text;
  slideMedia.querySelectorAll("img").forEach((img) => img.remove());
  if (s.photo) {
    const img = document.createElement("img");
    img.src = s.photo;
    img.alt = s.title;
    slideMedia.appendChild(img);
    mediaEmoji.style.display = "none";
    mediaLabel.style.display = "none";
  } else {
    mediaEmoji.textContent = s.icon;
    mediaEmoji.style.display = "";
    mediaLabel.style.display = "";
  }
  if (s.apply) {
    slideStat.style.display = "none";
    slideCta.hidden = false;
  } else {
    slideStat.style.display = "";
    slideCta.hidden = true;
    slideStat.textContent = s.stat;
  }
  document.body.classList.toggle("future-era", s.era === "future");
  readout.textContent = `TIME ${String(idx + 1).padStart(2, "0")}/${SLIDES.length} · ${eraNames[s.era]}`;
  dotsWrap.querySelectorAll("button").forEach((d, i) => d.classList.toggle("on", i === idx));
}

lever.addEventListener("input", () => {
  const v = parseFloat(lever.value);
  blendPalette(v);
  const idx = Math.round(v);
  if (idx !== current) goToSlide(idx);
});

function setSlide(idx) {
  const target = Math.max(0, Math.min(SLIDES.length - 1, idx));
  lever.value = String(target);
  blendPalette(target);
  goToSlide(target);
}

document.getElementById("prev").addEventListener("click", () => setSlide(current - 1));
document.getElementById("next").addEventListener("click", () => setSlide(current + 1));

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") setSlide(current + 1);
  if (e.key === "ArrowLeft") setSlide(current - 1);
});

let touchX = 0;
let touchY = 0;
stage.addEventListener("touchstart", (e) => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
}, { passive: true });
stage.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
    setSlide(dx < 0 ? current + 1 : current - 1);
  }
}, { passive: true });

SLIDES.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `go to moment ${i + 1}`);
  dot.addEventListener("click", () => setSlide(i));
  dotsWrap.appendChild(dot);
});

const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (!reducedMotion && typeof gsap !== "undefined") {
  gsap.set(slideCard, { transformPerspective: 900 });
}

if (!reducedMotion && isFinePointer && typeof gsap !== "undefined") {
  const stageInner = document.getElementById("stage-inner");
  gsap.set(stageInner, { transformPerspective: 1100 });
  const tiltX = gsap.quickTo(stageInner, "rotationX", { duration: 0.7, ease: "power2.out" });
  const tiltY = gsap.quickTo(stageInner, "rotationY", { duration: 0.7, ease: "power2.out" });
  stage.addEventListener("mousemove", (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    tiltY(nx * 2.2);
    tiltX(-ny * 1.8);
  });
  stage.addEventListener("mouseleave", () => {
    tiltY(0);
    tiltX(0);
  });
}

document.querySelectorAll("[data-apply]").forEach((btn) => {
  const isPlaceholder = GOOGLE_FORM_URL.startsWith("PASTE_");
  btn.href = isPlaceholder ? "#" : GOOGLE_FORM_URL;
  btn.target = isPlaceholder ? "_self" : "_blank";
  btn.rel = "noopener";
  btn.addEventListener("click", (e) => {
    if (isPlaceholder) {
      e.preventDefault();
      showToast("quest point missing! club leads: set GOOGLE_FORM_URL in script.js");
    }
  });
});

document.querySelectorAll("[data-social]").forEach((link) => {
  const name = link.dataset.social;
  if (SOCIALS[name] && SOCIALS[name] !== "#") {
    link.href = SOCIALS[name];
    link.target = "_blank";
    link.rel = "noopener";
  }
});

const logoEl = document.getElementById("logo");
let logoClicks = 0;
logoEl.addEventListener("click", (e) => {
  e.preventDefault();
  logoClicks += 1;
  if (logoClicks === 5) {
    logoClicks = 0;
    showToast("time travel insurance: void. you belong here now.");
  }
});

const konamiSequence = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];
let konamiIndex = 0;
window.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === konamiSequence[konamiIndex]) {
    konamiIndex += 1;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      document.body.classList.add("glitched");
      showToast("TIME PARADOX — cheat code accepted. the timeline forgives you.");
      setTimeout(() => document.body.classList.remove("glitched"), 2500);
    }
  } else {
    konamiIndex = key === konamiSequence[0] ? 1 : 0;
  }
});

if (typeof THREE !== "undefined") {
  const bgCanvas = document.getElementById("bg-canvas");
  const pScene = new THREE.Scene();
  const pCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  pCamera.position.z = 9;

  const pRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });
  pRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function pResize() {
    const { clientWidth, clientHeight } = bgCanvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    pRenderer.setSize(clientWidth, clientHeight, false);
    pCamera.aspect = clientWidth / clientHeight;
    pCamera.updateProjectionMatrix();
  }
  pResize();
  window.addEventListener("resize", pResize);
  new ResizeObserver(pResize).observe(bgCanvas);

  const dustGeo = new THREE.BufferGeometry();
  const dustCount = 140;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 20;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: new THREE.Color(201, 143, 61),
    size: 0.07,
    transparent: true,
    opacity: 0.55,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  pScene.add(dust);

  const dust2 = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: new THREE.Color(139, 92, 246),
      size: 0.05,
      transparent: true,
      opacity: 0.35,
    })
  );
  dust2.position.z = -2;
  pScene.add(dust2);

  let parX = 0;
  let parY = 0;
  if (isFinePointer) {
    window.addEventListener("mousemove", (e) => {
      parX = ((e.clientX / window.innerWidth) * 2 - 1) * 0.7;
      parY = -((e.clientY / window.innerHeight) * 2 - 1) * 0.45;
    });
  }

  (function animateDust() {
    requestAnimationFrame(animateDust);
    const t = performance.now() / 1000;
    dust.rotation.y = t * 0.02;
    dust2.rotation.y = -t * 0.015;
    pCamera.position.x += (parX - pCamera.position.x) * 0.04;
    pCamera.position.y += (parY - pCamera.position.y) * 0.04;
    pCamera.lookAt(0, 0, 0);
    dustMat.color.setRGB(currentAccent[0] / 255, currentAccent[1] / 255, currentAccent[2] / 255);
    pRenderer.render(pScene, pCamera);
  })();
}

if (typeof THREE !== "undefined" && typeof MASCOT_GLB_BASE64 !== "undefined") {
  const mascotCanvas = document.getElementById("mascot-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0.3, 5.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: mascotCanvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const { clientWidth, clientHeight } = mascotCanvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);
  new ResizeObserver(resize).observe(mascotCanvas);

  scene.add(new THREE.HemisphereLight(0xbfb3ff, 0x2a2150, 1.2));
  const sun = new THREE.DirectionalLight(0xfff2d9, 1.3);
  sun.position.set(3, 5, 4);
  scene.add(sun);

  const group = new THREE.Group();
  scene.add(group);

  let spinBoost = 0;
  window.mascotSpin = () => {
    spinBoost = 0.18;
    if (typeof gsap !== "undefined" && !reducedMotion) {
      gsap.fromTo(mascotCanvas, { scale: 0.92 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" });
    }
  };

  const loader = new THREE.GLTFLoader();
  const binary = atob(MASCOT_GLB_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  loader.parse(
    bytes.buffer,
    "",
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const scale = 1.8 / size.y;
      model.scale.setScalar(scale);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center.multiplyScalar(scale));
      group.add(model);
    },
    () => {}
  );

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    group.rotation.y += 0.006 + spinBoost;
    spinBoost *= 0.94;
    group.position.y = Math.sin(t * 1.1) * 0.08;
    renderer.render(scene, camera);
  })();
} else {
  const mascotCanvas = document.getElementById("mascot-canvas");
  if (mascotCanvas) mascotCanvas.style.display = "none";
}

blendPalette(0);
applySlide(0);
