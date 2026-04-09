
(function () {


  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


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


  const observer = new MutationObserver(() => {
    const theme = document.documentElement.dataset.theme;

  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

})();