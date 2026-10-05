/* ================================================================
   EduStart Academy — EmailJS Configuration
   ──────────────────────────────────────────
   STEP 1: Go to https://www.emailjs.com and create a free account
   STEP 2: Follow the setup guide in HOW_TO_DEPLOY.md
   STEP 3: Replace the placeholder values below with your real keys
================================================================ */

(function () {
  // ── YOUR EMAILJS KEYS — REPLACE THESE ──────────────────────────
  const EMAILJS_PUBLIC_KEY    = '-mUf4hE2IYjvvKQgP';       // From EmailJS → Account → API Keys
  const EMAILJS_SERVICE_ID    = 'service_opn0r3h';       // From EmailJS → Email Services
  const EMAILJS_REG_TEMPLATE  = 'template_dnd8zeh';  // Registration form template
  const EMAILJS_QUERY_TEMPLATE = 'template_00r5zcq'; // Parent query template

  // Make available globally
  window.EMAILJS_CONFIG = {
    publicKey:       EMAILJS_PUBLIC_KEY,
    serviceId:       EMAILJS_SERVICE_ID,
    regTemplateId:   EMAILJS_REG_TEMPLATE,
    queryTemplateId: EMAILJS_QUERY_TEMPLATE,
  };

  // Initialise EmailJS SDK
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    console.log('[EduStart] EmailJS initialised ✓');
  } else {
    console.warn('[EduStart] EmailJS SDK not loaded yet — will init on use');
  }
})();
