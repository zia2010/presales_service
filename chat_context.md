I am building an AI-powered pre-sales automation system and business. Below is the full context. Use this as the base for all future responses.

---

# 🧠 PRODUCT IDEA

I am building a system that converts inbound leads into qualified booked appointments automatically using AI.

This replaces:

* Pre-sales agents
* SDRs (Sales Development Reps)
* Initial customer support

---

# 🔄 CORE FLOW

1. Lead comes from ads (Instagram, LinkedIn, landing page)
2. Lead data hits a Node.js API (`POST /lead`)
3. Backend:

   * Validates input
   * Saves to database (Supabase)
4. AI (Google Gemini) generates and sends a personalized email
5. AI pre-qualifies the lead (score-based filtering)
6. If qualified → trigger AI voice call
7. AI call (via Vapi/Twilio):

   * Asks budget, requirements, timeline
   * Handles basic objections
8. Call transcript is captured
9. Transcript is sent to Gemini for analysis
10. Gemini returns structured output:

    * qualified (true/false)
    * score (1–10)
    * summary
    * urgency
11. If qualified:

    * Book appointment (Calendly/Google Calendar)
12. Save everything:

    * Lead data
    * Transcript
    * Analysis
    * Status
13. Send final email (confirmation or nurture)

---

# ⚙️ TECH STACK

* Backend: Node.js (TypeScript)
* Database: Supabase
* AI: Google Gemini
* Email: Nodemailer (SMTP)
* Voice AI: Vapi (preferred) or Twilio
* Scheduling: Calendly / Google Calendar

---

# 🧠 SYSTEM DESIGN PRINCIPLE

This is NOT a chatbot.

This is a **decision engine with gated steps**:

Each step:

* Validates input/output
* Decides next action
* Stops or retries on failure

---

# 🚦 GATES (IMPORTANT)

A “Gate” is a checkpoint:

* If success → proceed
* If failure → retry / stop

Example:

* Bad lead → stop early
* Failed email → retry
* Low score → skip call

---

# 🧱 PIPELINE FLOW

Lead
→ Validate
→ Send Email
→ Pre-Qualify
→ (Gate: pass/reject)
→ Trigger Call
→ Wait for webhook
→ Analyze transcript
→ (Gate: qualify/reject)
→ Book appointment
→ Save data
→ Send final email

---

# 🧪 TESTING STRATEGY

Each step must have:

* Validation rules
* Test cases (valid, invalid, edge)
* Failure handling

Examples:

* Lead must have valid email/phone
* Email must not be empty
* Transcript must exist
* AI must return valid JSON

---

# 🧠 DEVELOPMENT PHASES

## Phase 1: Lead + Email

Capture leads and send AI email

## Phase 2: Pre-Qualification

Filter bad leads using Gemini

## Phase 3: AI Calling

Call leads automatically

## Phase 4: Analysis

Convert transcript into structured data

## Phase 5: Booking

Book appointments automatically

## Phase 6: Automation

Connect everything using queue (BullMQ)

## Phase 7: Monitoring

Logs, retries, error tracking

## Phase 8: Optimization

Improve margins and performance

---

# ⚡ MVP SCOPE (IMPORTANT)

In first 7–10 days, only build:

* Lead API
* Email system
* Pre-qualification
* Basic AI calling
* Transcript storage
* Basic analysis

Skip:

* Complex automation
* Perfect prompts
* Full queue system (add later)

---

# 💰 BUSINESS MODEL

Sell as:
“AI system that converts leads into booked calls automatically”

Pricing:

Entry:

* ₹5,000–₹10,000/month

Mid:

* ₹20,000–₹40,000/month

Advanced:

* ₹40,000–₹1,00,000/month

OR performance-based:

* ₹200 per qualified lead
* ₹500 per booked call

---

# 📊 UNIT ECONOMICS

Per client:

* Cost: ₹6,000–₹13,000
* Revenue: ₹30,000–₹60,000

Gross profit:
~70–80%

Real profit (after effort):
~40–60%

---

# ⚠️ RISKS

* AI calls sounding robotic
* Poor qualification logic
* Overbuilding before selling
* Clients expecting perfect human-level interaction

---

# 🚀 STRATEGY

1. Build fast (MVP)
2. Start outreach early (Day 7–10)
3. Get 1–2 clients
4. Improve system with real data
5. Scale

---

# 🎯 POSITIONING

Do NOT sell:
“AI tool”

Sell:
“We help you convert more leads into booked sales calls automatically”

---

# 🧠 FINAL CONTEXT

This is a:

* Semi-product
* Semi-service
* Revenue-focused system

The goal is NOT perfect AI.

The goal is:
👉 More qualified calls
👉 More revenue for clients

---

Use this context for:

* Building system
* Writing code
* Designing prompts
* Creating business strategy
* Outreach and sales

Always prioritize:

* Simplicity
* Speed
* ROI

updated - 1:35AM 20-4-2026 