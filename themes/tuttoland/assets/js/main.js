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

// Applica glitch agli elementi target
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