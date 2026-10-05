/* ================================================================
   EduStart Academy — register.js
   Multi-step form · Validation · Ability Level · EmailJS send
================================================================ */

let currentStep = 1;

// ── STEP NAVIGATION ─────────────────────────────────────────────
function showStep(step) {
  document.querySelectorAll('.form-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.form-step').forEach(s => {
    s.classList.remove('active', 'done');
  });
  document.getElementById('form-page-' + step).classList.add('active');
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById('step-dot-' + i);
    if (i < step)  dot.classList.add('done');
    if (i === step) dot.classList.add('active');
  }
  currentStep = step;
  window.scrollTo({ top: document.querySelector('.form-card').offsetTop - 90, behavior: 'smooth' });
}

function nextStep(fromStep) {
  if (!validateStep(fromStep)) return;
  if (fromStep === 2) computeAbilityLevel();
  showStep(fromStep + 1);
}

function prevStep(fromStep) {
  showStep(fromStep - 1);
}

// ── VALIDATION ────────────────────────────────────────────────────
function clearError(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) { el.classList.remove('is-error'); }
  const err = document.getElementById('err-' + fieldId);
  if (err) err.textContent = '';
}

function setError(fieldId, msg) {
  const el = document.getElementById(fieldId);
  if (el) el.classList.add('is-error');
  const err = document.getElementById('err-' + fieldId);
  if (err) err.textContent = msg;
}

function validateStep(step) {
  let valid = true;

  if (step === 1) {
    const fields = [
      { id: 'studentName', label: 'Student name', minLen: 2 },
      { id: 'parentName',  label: 'Parent name',  minLen: 2 },
      { id: 'city',        label: 'City',          minLen: 2 },
    ];
    fields.forEach(f => {
      clearError(f.id);
      const val = document.getElementById(f.id).value.trim();
      if (!val || val.length < f.minLen) {
        setError(f.id, f.label + ' is required');
        valid = false;
      }
    });

    // Email
    clearError('email');
    const email = document.getElementById('email').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Please enter a valid email address');
      valid = false;
    }

    // Phone
    clearError('phone');
    const phone = document.getElementById('phone').value.trim();
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      setError('phone', 'Enter a valid 10-digit Indian mobile number');
      valid = false;
    }
  }

  if (step === 2) {
    clearError('class');
    if (!document.getElementById('class').value) {
      setError('class', 'Please select the class');
      valid = false;
    }
    clearError('school');
    const school = document.getElementById('school').value.trim();
    if (!school) {
      setError('school', 'School name is required');
      valid = false;
    }
  }

  if (step === 3) {
    clearError('subjects');
    const subjectChosen = document.querySelector('input[name="subjects"]:checked');
    if (!subjectChosen) {
      document.getElementById('err-subjects').textContent = 'Please select at least one subject';
      valid = false;
    }
  }

  return valid;
}

// ── ABILITY LEVEL CALCULATOR ─────────────────────────────────────
function computeAbilityLevel() {
  const maths   = parseFloat(document.getElementById('mathsScore').value);
  const physics = parseFloat(document.getElementById('physicsScore').value);

  const scores = [];
  if (!isNaN(maths))   scores.push(maths);
  if (!isNaN(physics)) scores.push(physics);

  const preview = document.getElementById('abilityPreview');

  if (scores.length === 0) {
    preview.style.display = 'none';
    return;
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  let level, icon, desc, color;

  if (avg >= 80) {
    level = 'Advanced'; icon = '🚀'; color = '#FF8C00';
    desc  = 'High performer — placed in Advanced batch for JEE/NEET prep';
  } else if (avg >= 50) {
    level = 'Regular';  icon = '⚡'; color = '#FFD700';
    desc  = 'Average performer — placed in Regular batch for board excellence';
  } else {
    level = 'Foundation'; icon = '🌱'; color = '#63E6BE';
    desc  = 'Needs support — placed in Foundation batch for concept rebuilding';
  }

  document.getElementById('apIcon').textContent  = icon;
  document.getElementById('apLevel').textContent = level;
  document.getElementById('apLevel').style.color = color;
  document.getElementById('apDesc').textContent  = desc;
  preview.style.display = 'flex';
}

// Auto-update preview when scores change
['mathsScore','physicsScore'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', computeAbilityLevel);
});

// ── EMAILJS SEND ─────────────────────────────────────────────────
function getAbilityFromScores() {
  const m = parseFloat(document.getElementById('mathsScore').value);
  const p = parseFloat(document.getElementById('physicsScore').value);
  const scores = [];
  if (!isNaN(m)) scores.push(m);
  if (!isNaN(p)) scores.push(p);
  if (!scores.length) return 'Not provided';
  const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
  return avg >= 80 ? 'Advanced' : avg >= 50 ? 'Regular' : 'Foundation';
}

function setSubmitLoading(loading) {
  const btn    = document.getElementById('regSubmitBtn');
  const text   = document.getElementById('regBtnText');
  const loader = document.getElementById('regBtnLoader');
  btn.disabled = loading;
  text.classList.toggle('hide', loading);
  loader.classList.toggle('hide', !loading);
}

document.getElementById('registrationForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validateStep(3)) return;

  setSubmitLoading(true);
  document.getElementById('reg-error-banner').classList.add('hide');

  // Ensure EmailJS is initialised
  if (typeof emailjs === 'undefined') {
    showRegError('EmailJS failed to load. Please check your internet and try again.');
    setSubmitLoading(false); return;
  }
  emailjs.init({ publicKey: window.EMAILJS_CONFIG.publicKey });

  const timing   = document.querySelector('input[name="timing"]:checked')?.value || 'No preference';
  const subjects = document.querySelector('input[name="subjects"]:checked')?.value || '';
  const ability  = getAbilityFromScores();
  const now      = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Template parameters — must match your EmailJS template variables
  const templateParams = {
    // Admin notification fields
    student_name:   document.getElementById('studentName').value.trim(),
    parent_name:    document.getElementById('parentName').value.trim(),
    email:          document.getElementById('email').value.trim(),
    phone:          document.getElementById('phone').value.trim(),
    alt_phone:      document.getElementById('altPhone').value.trim() || 'Not provided',
    city:           document.getElementById('city').value.trim(),
    student_class:  document.getElementById('class').value,
    school:         document.getElementById('school').value.trim(),
    maths_score:    document.getElementById('mathsScore').value || 'Not provided',
    physics_score:  document.getElementById('physicsScore').value || 'Not provided',
    ability_level:  ability,
    subjects:       subjects,
    preferred_timing: timing,
    message:        document.getElementById('message').value.trim() || 'No message',
    submitted_at:   now,

    // For confirmation email to parent
    to_name:        document.getElementById('parentName').value.trim(),
    to_email:       document.getElementById('email').value.trim(),
    reply_to:       document.getElementById('email').value.trim(),
  };

  try {
    await emailjs.send(
      window.EMAILJS_CONFIG.serviceId,
      window.EMAILJS_CONFIG.regTemplateId,
      templateParams
    );
    showRegSuccess(templateParams);
  } catch (err) {
    console.error('EmailJS error:', err);
    showRegError('Failed to send. Please try calling us directly or try again later.');
    setSubmitLoading(false);
  }
});

function showRegSuccess(params) {
  document.getElementById('registrationForm').classList.add('hide');
  const success = document.getElementById('regSuccess');
  success.classList.remove('hide');

  document.getElementById('regSummary').innerHTML = `
    <div class="sd-row">
      <span>Student</span>
      <strong>${params.student_name}</strong>
    </div>
    <div class="sd-row">
      <span>Class</span>
      <strong>${params.student_class}</strong>
    </div>
    <div class="sd-row">
      <span>Subjects</span>
      <strong>${params.subjects}</strong>
    </div>
    <div class="sd-row">
      <span>Suggested Batch</span>
      <strong style="color:var(--gold)">${params.ability_level}</strong>
    </div>
    <div class="sd-row">
      <span>We Will Call</span>
      <strong>${params.phone}</strong>
    </div>
  `;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showRegError(msg) {
  const banner = document.getElementById('reg-error-banner');
  document.getElementById('reg-error-text').textContent = msg;
  banner.classList.remove('hide');
  banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
