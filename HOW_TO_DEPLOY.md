# Desire of Knowledge — Vercel Deployment Guide
# =====================================================
# Total time: About 20–30 minutes
# Cost: COMPLETELY FREE (EmailJS free tier + Vercel free)
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
8. Give it a name like: Desire of Knowledge Gmail
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
Sent from Desire of Knowledge Website
────────────────────────────────────────────────────

15. Set "To Email" to:  your@gmail.com
16. Set "From Name" to: Desire of Knowledge Website
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
Sent from Desire of Knowledge Website
────────────────────────────────────────────────────

23. Set "To Email" to:  your@gmail.com
24. Set "From Name" to: Desire of Knowledge Website
25. Set "Reply To" to:  {{reply_to}}
26. Click "Save"
27. COPY this Template ID too → write it down

─── Get Your Public Key ───────────────────────────
28. Click "Account" at top right → "General"
29. Find "Public Key" → COPY it → write it down

You should now have 4 values written down:
  ✅ Service ID                 (e.g. service_abc123)
  ✅ Registration Template ID   (e.g. template_xyz789)
  ✅ Query Template ID          (e.g. template_def456)
  ✅ Public Key                 (e.g. abcDEF123xyz)


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

   Search for: contact@desireofknowledge.in
   Replace with: your actual email address

   Search for: wa.me/91XXXXXXXXXX
   Replace with: wa.me/91YOURNUMBER (your WhatsApp number)


## STEP 3 — Deploy to Vercel (2 minutes)
═══════════════════════════════════════════════

OPTION A — Deploy from GitHub (Recommended — Auto-deploys on every push)
─────────────────────────────────────────────────────────────────────────
1. Go to:  https://vercel.com

2. Click "Sign Up" → Click "Continue with GitHub"
   → Log in with your GitHub account → Click "Authorize Vercel"

3. After login, click "Add New..." → "Project"

4. You see a list of your GitHub repositories.
   Find your repo → click "Import"

5. Fill in the project settings:

   ┌─────────────────────────────────────────────────────┐
   │  Project Name    →  desire-of-knowledge             │
   │  Framework       →  Other  (NOT Next.js or React)   │
   │  Root Directory  →  DoK_light  (your folder name)   │
   │                     Leave blank if HTML files are   │
   │                     directly in root of repo        │
   │  Build Command   →  (leave completely empty)        │
   │  Output Dir      →  (leave completely empty)        │
   │  Install Command →  (leave completely empty)        │
   └─────────────────────────────────────────────────────┘

6. Click "Deploy"

7. Wait 20–30 seconds → Vercel shows confetti 🎉
   and gives you a live URL like:
   https://desire-of-knowledge.vercel.app

8. Click that URL → your website is LIVE! 🎉

   From now on, every time you push changes to GitHub
   → Vercel auto-redeploys within 30 seconds. ✅


OPTION B — Drag & Drop (No GitHub needed)
──────────────────────────────────────────
1. Go to:  https://vercel.com

2. Click "Sign Up" → Sign up with Email (free)

3. After login, click "Add New..." → "Project"

4. Scroll down → click "Or deploy from your local files"

5. Open your File Explorer / Finder

6. Navigate to this project folder (DoK_light)

7. DRAG the entire "DoK_light" FOLDER onto
   the Vercel upload area

8. Wait 30–60 seconds while it uploads

9. Vercel gives you a live URL like:
   https://desire-of-knowledge.vercel.app

   → Your website is LIVE! 🎉


─── Change Your Site Name (Optional) ─────────────
1. On Vercel dashboard → click your project
2. Click "Settings" → "Domains"
3. You can rename the Vercel subdomain to something like:
   desireofknowledge.vercel.app
4. Or add your own custom domain:
   desireofknowledge.in (if you own one)


## STEP 4 — Test Everything
═══════════════════════════════════════════════

1. Open your site URL in browser
2. Click "Enroll Now" → fill the registration form
3. Submit → you should see the green success screen
4. Check your Gmail → you should get an email
   with all the student details within 1–2 minutes

5. Go back → click "Ask Us" → fill the query form
6. Submit → check your Gmail again

If emails arrive → EVERYTHING IS WORKING! ✅

If no email arrives:
  → Check Step 2 again — make sure keys are correct
    in js/emailjs-config.js
  → Check Gmail Spam folder (first email may land there)
  → Go to emailjs.com → Email Templates → click
    "Test It" to verify the template works directly


## FREE TIER LIMITS
═══════════════════════════════════════════════

EmailJS Free Plan:
  • 200 emails / month
  • 200 form submissions per month
  • More than enough when starting with 4–5 students
  • Upgrade at $15/month for 1,000 emails/month when you grow

Vercel Free Plan (Hobby):
  • Unlimited static site deployments
  • 100 GB bandwidth per month
  • Custom domain support (free)
  • Automatic HTTPS / SSL (free)
  • Global Edge Network (fast worldwide)
  • Automatic deploys from GitHub


## UPDATING YOUR WEBSITE LATER
═══════════════════════════════════════════════

To change anything (phone number, fees, batch details,
timings, teacher name, etc.):

Via GitHub (if connected):
1. Edit the HTML/JS files on your computer
2. Save the files
3. Run in terminal:
      git add .
      git commit -m "Updated fees and timings"
      git push
4. Vercel auto-deploys within 30 seconds ✅

Via Drag & Drop (if not using GitHub):
1. Edit the files on your computer
2. Go to vercel.com → your project → "Deployments" tab
3. Click "Deploy" → drag your updated folder
4. Done in 30 seconds ✅


## YOUR FINAL URLs
═══════════════════════════════════════════════

Website:      https://desire-of-knowledge.vercel.app
Registration: https://desire-of-knowledge.vercel.app/register.html
Query Form:   https://desire-of-knowledge.vercel.app/query.html
Batches:      https://desire-of-knowledge.vercel.app/batches.html

(Replace "desire-of-knowledge" with whatever name
 you chose for your Vercel project)


## FILE STRUCTURE (for reference)
═══════════════════════════════════════════════

DoK_light/
├── index.html            ← Home page
├── register.html         ← Student registration form
├── query.html            ← Parent query form
├── batches.html          ← All batches listing
├── netlify.toml          ← (Ignored by Vercel, safe to keep)
├── css/
│   └── style.css         ← All styles (light purple theme)
└── js/
    ├── main.js           ← Navbar, animations, particles
    ├── emailjs-config.js ← ⚠️ PUT YOUR KEYS HERE
    ├── register.js       ← Registration form logic
    ├── query.js          ← Query form logic
    └── batches.js        ← Batch filter logic


## TROUBLESHOOTING
═══════════════════════════════════════════════

Problem: Vercel shows "404 Not Found"
→ Your Root Directory setting is wrong
→ Go to Vercel → Project → Settings → General
→ Change "Root Directory" to the folder that
  contains your index.html file

Problem: Site loads but pages are blank
→ Make sure Framework Preset is set to "Other"
  (not Next.js, React, or Vue)

Problem: Form submits but no email received
→ Double-check all 4 keys in emailjs-config.js
→ Make sure there are no extra spaces inside quotes
→ Check Gmail Spam folder
→ Test directly on emailjs.com → Templates → Test It

Problem: Vercel build fails
→ This is a plain HTML site — there is no build step
→ Make sure Build Command and Output Directory
  are both completely empty in Vercel settings

Problem: Old version still showing after update
→ Vercel caches aggressively
→ Hard refresh: Ctrl + Shift + R (Windows) / Cmd + Shift + R (Mac)
→ Or open in a private/incognito browser tab


## NEED HELP?
═══════════════════════════════════════════════
EmailJS Docs:  https://www.emailjs.com/docs/
Vercel Docs:   https://vercel.com/docs
Vercel Support: https://vercel.com/help