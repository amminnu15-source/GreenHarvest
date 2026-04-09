/* ═══════════════════════════════════════
   footer.js — GreenHarvest
   - Auto year
   - Newsletter with validation
   - Syncs with nav.js dark mode toggle
═══════════════════════════════════════ */
(function () {

  /* ── 1. Auto year ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 2. Newsletter ── */
  const emailInput = document.getElementById('newsletterEmail');
  const subBtn     = document.getElementById('newsletterBtn');
  const msgEl      = document.getElementById('newsletterMsg');

  if (subBtn && emailInput && msgEl) {

    subBtn.addEventListener('click', handleSubscribe);
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubscribe();
    });

    function handleSubscribe() {
      const val   = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

      if (!val)   { showMsg('Please enter your email.', 'error'); return; }
      if (!valid) { showMsg('Enter a valid email address.', 'error'); return; }

      subBtn.textContent = '...';
      subBtn.disabled    = true;

      /* Simulated API call — replace with your real endpoint */
      setTimeout(() => {
        showMsg("🌿 You're subscribed! Check your inbox.", 'success');
        emailInput.value   = '';
        subBtn.textContent = 'Subscribe';
        subBtn.disabled    = false;
      }, 1200);
    }

    function showMsg(text, type) {
      msgEl.textContent = text;
      msgEl.className   = 'newsletter-msg ' + type;
      clearTimeout(msgEl._t);
      if (type === 'success') {
        msgEl._t = setTimeout(() => {
          msgEl.textContent = '';
          msgEl.className   = 'newsletter-msg';
        }, 5000);
      }
    }
  }

  /* ── 3. Keep footer in sync if dark mode toggled via nav.js ── */
  /* nav.js already sets data-theme on <html> — CSS vars handle the rest.
     This observer re-runs any JS-side tweaks if you need them later. */
  const observer = new MutationObserver(() => {
    const theme = document.documentElement.dataset.theme;
    /* You can add JS-driven tweaks here if needed, e.g.: */
    /* console.log('Theme changed to:', theme); */
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

})();