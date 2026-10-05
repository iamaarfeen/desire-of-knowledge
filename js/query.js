/* ================================================================
   EduStart Academy — query.js
   Parent Query Form · Validation · EmailJS send
================================================================ */

// ── CHARACTER COUNT ──────────────────────────────────────────────
const qMsg  = document.getElementById('qMessage');
const count = document.getElementById('charCount');
if (qMsg && count) {
  qMsg.addEventListener('input', () => {
    const len = qMsg.value.length;
    count.textContent = len;
    count.style.color = len > 450 ? '#ff7070' : '';
    if (len > 500) qMsg.value = qMsg.value.substring(0, 500);
  });
}

// ── VALIDATION ────────────────────────────────────────────────────
function clearErr(id) {
  const el  = document.getElementById(id);
  if (el)  el.classList.remove('is-error');
  const err = document.getElementById('err-' + id);
  if (err) err.textContent = '';
}

function setErr(id, msg) {
  const el  = document.getElementById(id);
  if (el)  el.classList.add('is-error');
  const err = document.getElementById('err-' + id);
  if (err) err.textContent = msg;
}

function validateQuery() {
  let valid = true;

  clearErr('qParentName');
  const name = document.getElementById('qParentName').value.trim();
  if (!name || name.length < 2) {
    setErr('qParentName', 'Your name is required');
    valid = false;
  }

  clearErr('qPhone');
  const phone = document.getElementById('qPhone').value.trim();
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    setErr('qPhone', 'Enter a valid 10-digit mobile number');
    valid = false;
  }

  clearErr('qEmail');
  const email = document.getElementById('qEmail').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setErr('qEmail', 'Enter a valid email address');
    valid = false;
  }

  clearErr('queryType');
  const qType = document.querySelector('input[name="queryType"]:checked');
  if (!qType) {
    document.getElementById('err-queryType').textContent = 'Please select a query type';
    valid = false;
  }

  clearErr('qSubject');
  const subject = document.getElementById('qSubject').value.trim();
  if (!subject || subject.length < 5) {
    setErr('qSubject', 'Please enter a subject / topic');
    valid = false;
  }

  clearErr('qMessage');
  const msg = document.getElementById('qMessage').value.trim();
  if (!msg || msg.length < 10) {
    setErr('qMessage', 'Message must be at least 10 characters');
    valid = false;
  }

  return valid;
}

// ── SUBMIT ────────────────────────────────────────────────────────
function setQueryLoading(loading) {
  const btn    = document.getElementById('querySubmitBtn');
  const text   = document.getElementById('queryBtnText');
  const loader = document.getElementById('queryBtnLoader');
  btn.disabled = loading;
  text.classList.toggle('hide', loading);
  loader.classList.toggle('hide', !loading);
}

document.getElementById('queryForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validateQuery()) return;

  setQueryLoading(true);
  document.getElementById('query-error-banner').classList.add('hide');

  if (typeof emailjs === 'undefined') {
    showQueryError('EmailJS failed to load. Please call us directly.');
    setQueryLoading(false); return;
  }
  emailjs.init({ publicKey: window.EMAILJS_CONFIG.publicKey });

  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const queryType = document.querySelector('input[name="queryType"]:checked')?.value || '';

  const templateParams = {
    // Admin email fields
    parent_name:   document.getElementById('qParentName').value.trim(),
    email:         document.getElementById('qEmail').value.trim(),
    phone:         document.getElementById('qPhone').value.trim(),
    student_name:  document.getElementById('qStudentName').value.trim() || 'Not provided',
    student_class: document.getElementById('qStudentClass').value || 'Not provided',
    query_type:    queryType,
    subject:       document.getElementById('qSubject').value.trim(),
    message:       document.getElementById('qMessage').value.trim(),
    submitted_at:  now,

    // Confirmation email to parent
    to_name:       document.getElementById('qParentName').value.trim(),
    to_email:      document.getElementById('qEmail').value.trim(),
    reply_to:      document.getElementById('qEmail').value.trim(),
  };

  try {
    await emailjs.send(
      window.EMAILJS_CONFIG.serviceId,
      window.EMAILJS_CONFIG.queryTemplateId,
      templateParams
    );
    showQuerySuccess(templateParams);
  } catch (err) {
    console.error('EmailJS error:', err);
    showQueryError('Failed to send. Please WhatsApp or call us directly.');
    setQueryLoading(false);
  }
});

function showQuerySuccess(params) {
  document.getElementById('queryForm').classList.add('hide');
  const success = document.getElementById('querySuccess');
  success.classList.remove('hide');
  document.getElementById('q-success-name').textContent = params.parent_name;
  document.getElementById('q-success-type').textContent = params.query_type;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showQueryError(msg) {
  const banner = document.getElementById('query-error-banner');
  document.getElementById('query-error-text').textContent = msg;
  banner.classList.remove('hide');
  banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
