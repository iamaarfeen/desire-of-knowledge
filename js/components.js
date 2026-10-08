/* ================================================================
   Desire of Knowledge — components.js
   Loads shared header and footer into every page,
   and auto-highlights the active nav link.
================================================================ */

async function loadComponent(selector, url) {
  try {
    const res  = await fetch(url);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (e) {
    console.error(`Failed to load component: ${url}`, e);
  }
}

async function initComponents() {
  // Load header and footer in parallel
  await Promise.all([
    loadComponent('#header-placeholder', '/header.html'),
    loadComponent('#footer-placeholder', '/footer.html'),
  ]);

  // ── Active nav link highlight ────────────────────────────────
  const page = location.pathname
    .split('/')
    .pop()
    .replace('.html', '') || 'index';

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });

  // ── Navbar scroll effect ────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Hamburger menu ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target)) {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    }
  });
}

initComponents();