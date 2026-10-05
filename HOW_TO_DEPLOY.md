# EduStart Academy — Netlify Deployment Guide
# =====================================================
# Total time: About 20–30 minutes
# Cost: COMPLETELY FREE (EmailJS free tier + Netlify free)
# No backend needed. No Azure needed. No coding needed.
# =====================================================


## HOW IT WORKS
─────────────────────────────────────────────────────
When a student fills the Registration form  →  EmailJS
sends an email directly to YOUR Gmail with all details.

When a parent fills the Query form  →  EmailJS sends
another email to YOUR Gmail with the query details.

No database. No server. Just emails straight to you.
─────────────────────────────────────────────────────


## STEP 1 — Set Up EmailJS (Free Email Service)
═══════════════════════════════════════════════

1. Open browser → go to:  https://www.emailjs.com

2. Click "Sign Up Free" → register with your Gmail

3. After login, you land on the Dashboard.

─── Connect Your Gmail ────────────────────────────
4. Click "Email Services" on the left menu
5. Click "Add New Service"
6. Choose "Gmail"
7. Click "Connect Account" → select your Gmail → Allow
8. Give it a name like: EduStart Gmail
9. Click "Create Service"
10. COPY the Service ID (looks like: service_abc123)
    → Write it down / save it somewhere

─── Create Registration Email Template ────────────
11. Click "Email Templates" on the left menu
12. Click "Create New Template"
13. Set Subject to:
    New Student Registration — {{student_name}} (Class {{student_class}})

14. In the email BODY (click "Edit" if needed), paste:

────────────────────────────────────────────────────
NEW STUDENT REGISTRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Student Name:     {{student_name}}
Parent Name:      {{parent_name}}
Email:            {{email}}
Phone:            {{phone}}
Alternate Phone:  {{alt_phone}}
City:             {{city}}
Class:            {{student_class}}
School:           {{school}}
Maths Score:      {{maths_score}}%
Physics Score:    {{physics_score}}%
Ability Level:    {{ability_level}}
Subjects:         {{subjects}}
Preferred Timing: {{preferred_timing}}
Message:          {{message}}
Submitted At:     {{submitted_at}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from EduStart Academy Website
────────────────────────────────────────────────────

15. Set "To Email" to:  your@gmail.com
16. Set "From Name" to: EduStart Academy Website
17. Set "Reply To" to:  {{reply_to}}
18. Click "Save"
19. COPY the Template ID (looks like: template_abc123)
    → Write it down

─── Create Query Email Template ───────────────────
20. Click "Email Templates" → "Create New Template" again
21. Set Subject to:
    New Parent Query — {{query_type}} from {{parent_name}}

22. Paste this in the Body:

────────────────────────────────────────────────────
NEW PARENT QUERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Parent Name:   {{parent_name}}
Email:         {{email}}
Phone:         {{phone}}
Child Name:    {{student_name}}
Child Class:   {{student_class}}
Query Type:    {{query_type}}
Subject:       {{subject}}

Message:
{{message}}

Submitted At:  {{submitted_at}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from EduStart Academy Website
────────────────────────────────────────────────────

23. Set "To Email" to:  your@gmail.com
24. Set "From Name" to: EduStart Academy Website
25. Set "Reply To" to:  {{reply_to}}
26. Click "Save"
27. COPY this Template ID too → write it down

─── Get Your Public Key ───────────────────────────
28. Click "Account" at top right → "General"
29. Find "Public Key" → COPY it → write it down

You should now have 4 values written down:
  ✅ Service ID        (e.g. service_abc123)
  ✅ Registration Template ID  (e.g. template_xyz789)
  ✅ Query Template ID (e.g. template_def456)
  ✅ Public Key        (e.g. abcDEF123xyz)


## STEP 2 — Add Your Keys to the Website
═══════════════════════════════════════════════

1. Open the file:  js/emailjs-config.js
   (use Notepad, VS Code, or any text editor)

2. Find these 4 lines and replace the placeholder values:

   const EMAILJS_PUBLIC_KEY     = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID     = 'YOUR_SERVICE_ID';
   const EMAILJS_REG_TEMPLATE   = 'YOUR_REG_TEMPLATE_ID';
   const EMAILJS_QUERY_TEMPLATE = 'YOUR_QUERY_TEMPLATE_ID';

3. Replace with YOUR actual values, example:

   const EMAILJS_PUBLIC_KEY     = 'abcDEF123xyz';
   const EMAILJS_SERVICE_ID     = 'service_abc123';
   const EMAILJS_REG_TEMPLATE   = 'template_xyz789';
   const EMAILJS_QUERY_TEMPLATE = 'template_def456';

4. Save the file.

5. Also update these in all 4 HTML files (index.html,
   batches.html, register.html, query.html):

   Search for: +91 XXXXX XXXXX
   Replace with: your actual phone number

   Search for: contact@edustartacademy.in
   Replace with: your actual email

   Search for: wa.me/91XXXXXXXXXX
   Replace with: wa.me/91YOURNUMBER (your WhatsApp number)


## STEP 3 — Deploy to Netlify (2 minutes)
═══════════════════════════════════════════════

OPTION A — Drag & Drop (Easiest, no account needed initially)
──────────────────────────────────────────────────────────────
1. Go to:  https://app.netlify.com

2. Click "Sign up" → use "Sign up with Email" (free)

3. After login, you see the dashboard with a big box:
   "Drag and drop your site folder here"

4. Open your File Explorer / Finder

5. Navigate to this project folder (EduStartNetlify)

6. DRAG the entire "EduStartNetlify" FOLDER onto
   that Netlify box

7. Wait 30–60 seconds while it uploads

8. Netlify gives you a URL like:
   https://clever-panda-abc123.netlify.app

   → Your website is LIVE! 🎉

OPTION B — Change the Site Name (Recommended)
──────────────────────────────────────────────
1. On Netlify → click your site
2. Click "Site configuration" → "Change site name"
3. Type: edustartacademy  (or similar)
4. Click Save
5. Your site is now at: https://edustartacademy.netlify.app


## STEP 4 — Test Everything
═══════════════════════════════════════════════

1. Open your site URL in browser
2. Click "Enroll Now" → fill the registration form
3. Submit → you should see the success screen
4. Check your Gmail → you should get an email
   with all the student details within 1–2 minutes

5. Go back → click "Ask Us" → fill the query form
6. Submit → check your Gmail again

If emails arrive → EVERYTHING IS WORKING! ✅

If no email arrives → check Step 2 again, make sure
keys are correct in emailjs-config.js


## FREE TIER LIMITS (EmailJS)
═══════════════════════════════════════════════

EmailJS free plan includes:
  • 200 emails / month
  • That means 200 form submissions per month
  • More than enough when starting with 4–5 students
  • When you grow, upgrade at just $15/month for 1000/mo

Netlify free plan includes:
  • Unlimited static sites
  • 100 GB bandwidth/month
  • Custom domain support
  • HTTPS automatically


## UPDATING YOUR WEBSITE LATER
═══════════════════════════════════════════════

To change anything (phone number, fees, batch details):
1. Edit the HTML/JS files on your computer
2. Go to Netlify → your site → "Deploys" tab
3. Drag your updated folder again → it redeploys
   (takes about 30 seconds)

OR

Connect to GitHub for automatic deploys:
1. Push code to GitHub repository
2. In Netlify → "Connect to Git" → select your repo
3. Every time you push changes → site auto-updates


## YOUR FINAL URLS
═══════════════════════════════════════════════

Website:      https://edustartacademy.netlify.app
Registration: https://edustartacademy.netlify.app/register.html
Query Form:   https://edustartacademy.netlify.app/query.html
Batches:      https://edustartacademy.netlify.app/batches.html


## FILE STRUCTURE (for reference)
═══════════════════════════════════════════════

EduStartNetlify/
├── index.html          ← Home page
├── register.html       ← Student registration form
├── query.html          ← Parent query form
├── batches.html        ← All batches listing
├── netlify.toml        ← Netlify configuration
├── css/
│   └── style.css       ← All styles
└── js/
    ├── main.js         ← Navbar, animations, particles
    ├── emailjs-config.js ← ⚠️ PUT YOUR KEYS HERE
    ├── register.js     ← Registration form logic
    ├── query.js        ← Query form logic
    └── batches.js      ← Batch filter logic


## NEED HELP?
═══════════════════════════════════════════════
EmailJS Docs:  https://www.emailjs.com/docs/
Netlify Docs:  https://docs.netlify.com/
