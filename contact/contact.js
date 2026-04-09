(function () {
  'use strict';

  /* ── WhatsApp checkbox ── */
  const waCheck = document.getElementById('waCheck');

  window.toggleWA = function () {
    const checked = waCheck.classList.toggle('checked');
    waCheck.setAttribute('aria-checked', String(checked));
  };
  waCheck.addEventListener('click', toggleWA);
  waCheck.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleWA(); }
  });

  /* ── Helpers ── */
  function validate(inputId, errId, checkFn) {
    const el  = document.getElementById(inputId);
    const err = document.getElementById(errId);
    const ok  = checkFn(el ? el.value : '');
    if (el)  el.classList.toggle('error', !ok);
    if (err) err.classList.toggle('show',  !ok);
    return ok;
  }

  /* clear error on typing */
  ['cf-fname','cf-lname','cf-email','cf-role','cf-subject','cf-message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { el.classList.remove('error'); });
  });

  /* ── Form submit ── */
  const form       = document.getElementById('contactForm');
  const sendBtn    = document.getElementById('sendBtn');
  const formBody   = document.getElementById('formBody');
  const formSuccess = document.getElementById('formSuccess');
  const toast      = document.getElementById('ctToast');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var ok = true;
    ok = validate('cf-fname',   'cf-fname-err',   function(v){ return v.trim().length > 0; }) && ok;
    ok = validate('cf-lname',   'cf-lname-err',   function(v){ return v.trim().length > 0; }) && ok;
    ok = validate('cf-email',   'cf-email-err',   function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }) && ok;
    ok = validate('cf-role',    'cf-role-err',    function(v){ return v !== ''; }) && ok;
    ok = validate('cf-subject', 'cf-subject-err', function(v){ return v.trim().length > 0; }) && ok;
    ok = validate('cf-message', 'cf-message-err', function(v){ return v.trim().length > 5; }) && ok;

    if (!ok) return;

    /* loading */
    sendBtn.classList.add('loading');
    sendBtn.disabled = true;

    setTimeout(function () {
      sendBtn.classList.remove('loading');
      sendBtn.disabled = false;

      /* hide form, show success */
      formBody.style.display = 'none';
      formSuccess.classList.add('show');

      /* toast */
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 3500);
    }, 1800);
  });

  /* ── Reset ── */
  window.resetForm = function () {
    form.reset();
    formBody.style.display = '';
    formSuccess.classList.remove('show');
    waCheck.classList.remove('checked');
    waCheck.setAttribute('aria-checked', 'false');
    ['cf-fname','cf-lname','cf-email','cf-role','cf-subject','cf-message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('error');
    });
    document.querySelectorAll('.field-err').forEach(function (e) { e.classList.remove('show'); });
  };

})();



