/* ================================================================
   Desire Of Knowledge — main.js
   Navbar · Scroll Reveal · Particles · Hamburger
================================================================ */

// ── NAVBAR SCROLL ────────────────────────────────────────────────
// const navbar = document.getElementById('navbar');
// window.addEventListener('scroll', () => {
//   if (window.scrollY > 20) navbar.classList.add('scrolled');
//   else navbar.classList.remove('scrolled');
// });

// ── HAMBURGER MENU ───────────────────────────────────────────────
// const hamburger = document.getElementById('hamburger');
// const navLinks  = document.getElementById('navLinks');
// if (hamburger && navLinks) {
//   hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('open');
//     navLinks.classList.toggle('open');
//   });
//   // Close on link click
//   navLinks.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', () => {
//       hamburger.classList.remove('open');
//       navLinks.classList.remove('open');
//     });
//   });
//   // Close on outside click
//   document.addEventListener('click', e => {
//     if (!navbar.contains(e.target)) {
//       hamburger.classList.remove('open');
//       navLinks.classList.remove('open');
//     }
//   });
// }

// ── SCROLL REVEAL ────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── PARTICLE CANVAS ──────────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.size  = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#7C3AED' : '#EC4899';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Init particles
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }
  animate();
}

// ── FAQ TOGGLE (query page) ──────────────────────────────────────
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const arrow  = el.querySelector('.faq-arrow');
  const isOpen = answer.style.display === 'block';
  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.style.display = 'none');
  document.querySelectorAll('.faq-arrow').forEach(a => a.style.transform = '');
  // Open clicked if it was closed
  if (!isOpen) {
    answer.style.display = 'block';
    arrow.style.transform = 'rotate(90deg)';
  }
}

// ── RADIO CARD SELECTION HIGHLIGHT ──────────────────────────────
document.querySelectorAll('.radio-card').forEach(card => {
  const input = card.querySelector('input[type="radio"]');
  if (!input) return;
  input.addEventListener('change', () => {
    const name = input.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
      r.closest('.radio-card')?.classList.remove('selected');
    });
    card.classList.add('selected');
  });
});

document.querySelectorAll('.qtype-btn').forEach(btn => {
  const input = btn.querySelector('input[type="radio"]');
  if (!input) return;
  input.addEventListener('change', () => {
    document.querySelectorAll('.qtype-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// ── SMOOTH SCROLL for anchor links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
