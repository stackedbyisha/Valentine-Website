const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

document.getElementById("openEnvelope").addEventListener("click", () => {
  goTo("name");
});

function goTo(id) {
  pages.forEach((p) => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Music */
musicToggle.onclick = () => {
  if (music.paused) {
    music.play();
    musicToggle.innerText = "⏸ Pause Music";
  } else {
    music.pause();
    musicToggle.innerText = "🎵 Play Music";
  }
};

/* Save Name */
function saveName() {
  const name = document.getElementById("userName").value || "My Love";
  document.getElementById("greet").innerText =
    `Happy Valentine's Day, ${name} 💕`;
  goTo("message");
}

/* Yes / No */
function yes() {
  document.getElementById("result").innerText = "Yay! Deal Done 💍💖";

  // Glow effect on card
  const card = document.querySelector("#final.glass");
  card.classList.add("celebrate-glow");
  setTimeout(() => card.classList.remove("celebrate-glow"), 2000);

  // Confetti + hearts burst
  const container = document.getElementById("celebrate");

  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.className = Math.random() > 0.5 ? "confetti" : "heart-pop";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-10px";
    el.style.animationDuration = 1 + Math.random() * 1.5 + "s";
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(el);

    setTimeout(() => el.remove(), 2000);
  }

  // 🎆 Fireworks trigger (ADD THIS HERE)
  for (let i = 0; i < 3; i++) {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight * 0.4 + Math.random() * 120;
    launchFirework(x, y);
  }
}

const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* Floating Hearts */
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.getElementById("hearts-container").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 400);
const themeToggle = document.getElementById("themeToggle");
const darkToggle = document.getElementById("darkToggle");

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const darkToggle = document.getElementById("darkToggle");

  if (!themeToggle || !darkToggle) {
    console.error("Theme/Dark buttons not found in DOM");
    return;
  }

  let isAltTheme = localStorage.getItem("theme") === "alt";
  let isDark = localStorage.getItem("mode") === "dark";

  applyTheme();
  applyMode();

  themeToggle.addEventListener("click", () => {
    isAltTheme = !isAltTheme;
    localStorage.setItem("theme", isAltTheme ? "alt" : "default");
    applyTheme();
  });

  darkToggle.addEventListener("click", () => {
    isDark = !isDark;
    localStorage.setItem("mode", isDark ? "dark" : "light");
    applyMode();
  });

  function applyTheme() {
    const root = document.documentElement;
    if (isAltTheme) {
      root.style.setProperty("--primary", "#7c3aed"); // purple
      root.style.setProperty("--secondary", "#22c55e"); // green
      root.style.setProperty("--accent", "#f472b6"); // pink accent
      themeToggle.innerText = "🎨 Theme: Alt";
    } else {
      root.style.setProperty("--primary", "#ff7eb3"); // pink
      root.style.setProperty("--secondary", "#a855f7"); // violet
      root.style.setProperty("--accent", "#22c55e"); // green
      themeToggle.innerText = "🎨 Theme: Default";
    }
  }

  function applyMode() {
    document.body.classList.toggle("dark", isDark);
    darkToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }
});
const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
  shareBtn.addEventListener("click", shareWhatsApp);
}

function shareWhatsApp() {
  const nameInput = document.getElementById("userName");
  const name =
    nameInput && nameInput.value ? nameInput.value : "someone special";
  const siteUrl = window.location.href;

  const message = `Hey ${name} 💖, I made this cute Valentine’s surprise for you!
Open it here 👉 ${siteUrl}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}
// ===== Fireworks Engine =====
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
let fwParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchFirework(x, y) {
  const count = 40 + Math.floor(Math.random() * 30);
  for (let i = 0; i < count; i++) {
    fwParticles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 60 + Math.random() * 40,
      size: 2 + Math.random() * 2,
      hue: Math.random() * 360,
    });
  }
}

function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fwParticles = fwParticles.filter((p) => p.life > 0);
  fwParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // gravity
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.hue}, 80%, 60%)`;
    ctx.fill();
  });
  requestAnimationFrame(updateFireworks);
}
updateFireworks();
