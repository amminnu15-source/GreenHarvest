const html        = document.documentElement;
const navbar      = document.getElementById('navbar');
const menuToggle  = document.getElementById('menuToggle');
const navMenu     = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const dirToggle   = document.getElementById('dirToggle');
const dropdowns   = document.querySelectorAll('.dropdown');

/* 1 — scroll shadow */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
});

/* 2 — mobile menu */
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  navMenu.classList.remove('open');
  menuToggle.classList.remove('open');
  document.body.style.overflow = '';
}

/* 3 — dropdown (click on mobile, hover via CSS on desktop) */
dropdowns.forEach(drop => {
  drop.querySelector('a').addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {        /* FIXED: was 768, now matches CSS breakpoint */
      e.preventDefault();
      const wasOpen = drop.classList.contains('open');
      dropdowns.forEach(d => d.classList.remove('open'));
      drop.classList.toggle('open', !wasOpen);
    }
  });
});

/* 4 — dark mode */
applyTheme(localStorage.getItem('gh-theme') || 'light');
themeToggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('gh-theme', next);
});
function applyTheme(t) {
  html.dataset.theme = t;
  themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
}

/* 5 — RTL / LTR */
applyDir(localStorage.getItem('gh-dir') || 'ltr');
dirToggle.addEventListener('click', () => {
  const next = html.dir === 'rtl' ? 'ltr' : 'rtl';
  applyDir(next);
  localStorage.setItem('gh-dir', next);
});
function applyDir(d) {
  html.dir  = d;
  html.lang = d === 'rtl' ? 'ar' : 'en';
  dirToggle.textContent = d.toUpperCase();
}

/* 6 — active link */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.closest('li').classList.add('active');
});

/* 7 — close drawer on resize to desktop */
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) closeMobileMenu();  /* FIXED: was 768, now matches CSS breakpoint */
});