// Theme toggle
const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('theme') || 'dark';

html.setAttribute('data-theme', stored);
updateToggleIcon(stored);

if (toggle) {
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(next);
  });
}

function updateToggleIcon(theme) {
  if (!toggle) return;
  toggle.innerHTML = theme === 'dark'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img')?.src;
    if (lightbox && lightboxImg && src) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ── GLITCH EFFECT ──
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%<>[]{}|\\/_=+';
const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const glitchChars = latin + katakana;

function randomGlitchChar() {
  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

function glitchFlash(el) {
  if (!el) return;
  const original = el.getAttribute('data-original') || el.textContent;
  if (!el.getAttribute('data-original')) el.setAttribute('data-original', original);

  const frames = Math.floor(Math.random() * 4) + 2;
  const numGlitch = Math.floor(Math.random() * 5) + 2;
  let f = 0;

  const iv = setInterval(() => {
    const positions = new Set();
    while (positions.size < Math.min(numGlitch, original.replace(/\s/g, '').length)) {
      positions.add(Math.floor(Math.random() * original.length));
    }

    let result = '';
    for (let i = 0; i < original.length; i++) {
      if (original[i] === ' ' || original[i] === '·' || original[i] === '©') {
        result += original[i];
      } else if (positions.has(i)) {
        result += randomGlitchChar();
      } else {
        result += original[i];
      }
    }
    el.textContent = result;
    f++;

    if (f >= frames) {
      clearInterval(iv);
      el.textContent = original;
    }
  }, 45);
}

function scheduleGlitch(el, minDelay, maxDelay) {
  if (!el) return;
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  setTimeout(() => {
    glitchFlash(el);
    scheduleGlitch(el, minDelay, maxDelay);
  }, delay);
}

const glitchTargets = [
  { selector: '.site-logo', min: 3000, max: 8000 },
  { selector: '.hero-name', min: 2000, max: 5000 },
  { selector: '.hero-info', min: 2500, max: 6000 },
  { selector: '.footer-copy', min: 4000, max: 9000 },
];

glitchTargets.forEach(({ selector, min, max }) => {
  const el = document.querySelector(selector);
  if (el) scheduleGlitch(el, min, max);
});

// ── MOLECULAR CANVAS ──
const molCanvas = document.getElementById('mol-canvas');
if (molCanvas) {
  const ctx = molCanvas.getContext('2d');
  let W = molCanvas.width = molCanvas.offsetWidth;
  let H = molCanvas.height = molCanvas.offsetHeight;

  const mouse = { x: W / 2, y: H / 2 };
  const INFLUENCE = 130;
  const NODE_SPACING = 65;
  const CONNECT_DIST = 95;
  let nodes = [];
  let molT = 0;

  function buildNodes() {
    nodes = [];
    const cols = Math.ceil(W / NODE_SPACING) + 2;
    const rows = Math.ceil(H / NODE_SPACING) + 2;
    for (let r = -1; r <= rows; r++) {
      for (let c = -1; c <= cols; c++) {
        const offset = r % 2 === 0 ? 0 : NODE_SPACING * 0.5;
        nodes.push({
          bx: c * NODE_SPACING + offset,
          by: r * NODE_SPACING * 0.866,
          x: 0, y: 0,
          glow: 0,
          size: Math.random() * 1.5 + 0.8,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.003 + 0.001,
        });
      }
    }
  }

  function molDist(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      nodeBase: isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,',
      lineBase: isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,',
      nodeBaseAlpha: isDark ? 0.06 : 0.08,
      lineBaseAlpha: isDark ? 0.07 : 0.08,
    };
  }

  function molAnimate() {
    ctx.clearRect(0, 0, W, H);
    molT += 0.5;
    const colors = getThemeColors();

    nodes.forEach(n => {
      n.x = n.bx + Math.sin(molT * n.speed + n.phase) * 4;
      n.y = n.by + Math.cos(molT * n.speed * 0.7 + n.phase) * 4;
      const d = Math.sqrt((mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2);
      const target = d < INFLUENCE ? (1 - d / INFLUENCE) : 0;
      n.glow += (target - n.glow) * 0.12;
      n.glow = Math.max(0, Math.min(1, n.glow));
    });

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = molDist(a, b);
        if (d > CONNECT_DIST) continue;
        const proximity = 1 - d / CONNECT_DIST;
        const glowAvg = (a.glow + b.glow) / 2;
        const glowAlpha = glowAvg * proximity * 0.7;
        const baseAlpha = proximity * 0.07;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        if (glowAlpha > 0.01) {
          ctx.strokeStyle = `rgba(249,115,22,${glowAlpha})`;
          ctx.lineWidth = 0.7 + glowAvg;
        } else {
          ctx.strokeStyle = `${colors.lineBase}${colors.lineBaseAlpha * proximity})`;
          ctx.lineWidth = 0.3;
        }
        ctx.stroke();
      }
    }

    // Nodes
    nodes.forEach(n => {
      if (n.glow > 0.05) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 5);
        grad.addColorStop(0, `rgba(249,115,22,${n.glow * 0.35})`);
        grad.addColorStop(1, 'rgba(249,115,22,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size + n.glow * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${0.2 + n.glow * 0.8})`;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.nodeBase}${colors.nodeBaseAlpha + n.glow * 0.2})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(molAnimate);
  }

  window.addEventListener('mousemove', e => {
    const r = molCanvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });

  window.addEventListener('resize', () => {
    W = molCanvas.width = molCanvas.offsetWidth;
    H = molCanvas.height = molCanvas.offsetHeight;
    buildNodes();
  });

  buildNodes();
  molAnimate();
}