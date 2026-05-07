const html        = document.documentElement;
const navbar      = document.getElementById('navbar');
const menuToggle  = document.getElementById('menuToggle');
const navMenu     = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const dirToggle   = document.getElementById('dirToggle');
const dropdowns   = document.querySelectorAll('.dropdown');


window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
});


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


dropdowns.forEach(drop => {
  drop.querySelector('a').addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      // existing mobile behaviour
      e.preventDefault();
      const wasOpen = drop.classList.contains('open');
      dropdowns.forEach(d => d.classList.remove('open'));
      drop.classList.toggle('open', !wasOpen);

    } else if (window.innerWidth <= 1040) {
      // 993px–1040px: prevent redirect, toggle dropdown
      e.preventDefault();
      e.stopPropagation();
      const wasOpen = drop.classList.contains('open');
      dropdowns.forEach(d => d.classList.remove('open'));
      drop.classList.toggle('open', !wasOpen);
    }
  });
});


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


function setActiveLink() {
  const currentPath = location.pathname;

  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;

    // resolve the href to an absolute path
    const resolved = new URL(href, location.href).pathname;

    // normalize: remove trailing slash, lowercase
    const normalize = p => p.replace(/\/+$/, '').toLowerCase();

    const isCurrent =
      normalize(resolved) === normalize(currentPath) ||
      // treat /index.html and / as the same
      (normalize(resolved).endsWith('/index.html') &&
       normalize(currentPath) === normalize(resolved).replace('/index.html', ''));

    if (isCurrent) {
      // highlight the parent <li>
      const li = a.closest('li');
      li.classList.add('active');

      // if inside a dropdown-menu, also highlight the parent dropdown <li>
      const dropdownParent = a.closest('.dropdown-menu');
      if (dropdownParent) {
        dropdownParent.closest('.dropdown').classList.add('active');
      }
    }
  });
}

setActiveLink();


window.addEventListener('resize', () => {
  if (window.innerWidth > 992) closeMobileMenu();  
});













