    # 🧠 AI Pre-Sales Automation — Full Project Plan (End-to-End)

---

# 📁 PROJECT STRUCTURE

ai-presales/
│
├── src/
│   ├── api/
│   │   └── lead.controller.ts
│   │
│   ├── routes/
│   │   └── lead.routes.ts
│   │
│   ├── services/
│   │   ├── lead.service.ts
│   │   ├── email.service.ts
│   │   ├── gemini.service.ts
│   │   ├── call.service.ts
│   │   └── analysis.service.ts
│   │
│   ├── db/
│   │   └── supabase.ts
│   │
│   ├── utils/
│   │   └── validate.ts
│   │
│   ├── webhooks/
│   │   └── call.webhook.ts
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── tests/
│   │   ├── lead.test.ts
│   │   ├── email.test.ts
│   │   ├── gemini.test.ts
│   │   └── pipeline.test.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── .env

---

# ⚙️ INSTALLATION

npm init -y

npm install express cors dotenv axios
npm install @supabase/supabase-js
npm install nodemailer
npm install @google/generative-ai

npm install -D typescript ts-node nodemon jest ts-jest @types/jest @types/node @types/express

npx tsc --init

npx ts-jest config:init

---

# 🔐 ENV CONFIG (.env)

PORT=4000
NODE_ENV=development
DRY_RUN=true

SUPABASE_URL=your_url
SUPABASE_KEY=your_key

GEMINI_KEY=your_key

EMAIL=your_email
EMAIL_PASS=your_password

VAPI_API_KEY=your_key

---

# ▶️ RUNNING MODES

## Development (nodemon)
npm run dev

## Production
npm run start

## Test
npm run test

---

# 📦 PACKAGE.JSON SCRIPTS

"scripts": {
  "dev": "nodemon src/server.ts",
  "start": "ts-node src/server.ts",
  "test": "jest"
}

---

# 🔌 SERVER CONFIG (PORT CHANGE)

const PORT = process.env.PORT || 4000

app.listen(PORT)

---

# 🧠 DRY RUN VS PRODUCTION MODE

Use:

const isDryRun = process.env.DRY_RUN === "true"

Behavior:

DRY RUN:
- No email sent
- No call triggered
- Only logs

PRODUCTION:
- Full execution

---

# 🔄 PIPELINE FLOW

Lead
→ Validate
→ Save
→ Email
→ Score
→ Gate
→ Call
→ Webhook
→ Analyze
→ Gate
→ Book
→ Save
→ Final Email

---

# 🧩 FILE RESPONSIBILITIES

## lead.controller.ts
- Handles request
- Calls service

## lead.service.ts
- Main pipeline logic
- Orchestrates steps

## email.service.ts
- Generate email via Gemini
- Send email (skip in dry run)

## gemini.service.ts
- Email generation
- Lead scoring
- Transcript analysis

## call.service.ts
- Trigger AI call
- Skip if dry run

## analysis.service.ts
- Parse transcript
- Decide qualified or not

## supabase.ts
- DB connection
- Insert/update leads

## validate.ts
- Validate email, phone, required fields

## call.webhook.ts
- Handle transcript
- Trigger analysis

---

# 🧪 UNIT TEST STRATEGY

Each layer tested independently

---

## lead.test.ts
- Valid lead passes
- Invalid lead rejected

---

## email.test.ts
- Email content generated
- Empty email fails

---

## gemini.test.ts
- Score returned
- JSON format valid

---

## pipeline.test.ts
- Full flow simulation
- Reject low score
- Pass high score

---

# 🧪 SAMPLE TEST IDEAS

Validate:
- Missing email → fail
- Invalid phone → fail

Email:
- Empty response → fail

Score:
- No score → fail

Transcript:
- Too short → fail

---

# ⚙️ CORE LOGIC RULES

- Each step must validate input/output
- Never trust AI blindly
- Always log results
- Stop pipeline early if needed

---

# 📡 LEAD CAPTURE

Use:

Make/Zapier → POST to your API

OR

Google Forms → Apps Script → API

---

# 🌍 DEPLOYMENT

Use Railway:

Steps:
1. Push to GitHub
2. Connect Railway
3. Add env variables
4. Deploy

---

# 🧠 DEVELOPMENT PHASES

Phase 1:
Lead + Email

Phase 2:
Qualification

Phase 3:
Calling

Phase 4:
Analysis

Phase 5:
Booking

Phase 6:
Queue (BullMQ)

Phase 7:
Monitoring

Phase 8:
Optimization


# STEP-BY-STEP (FROM ZERO TO MVP)
## 🟢 STEP 1: Setup Project
Create folder ai-presales
Initialize project (npm init)
Install dependencies (express, dotenv, supabase, nodemailer, gemini, axios)
Install dev tools (typescript, ts-node, nodemon, jest)
Initialize TypeScript
Create folder structure (api, routes, services, db, utils, webhooks, config, tests)

## 🟢 STEP 2: Basic Server
Create app.ts
Create server.ts
Set port to 4000 (not 3000)
Add JSON middleware
Start server using nodemon
Confirm server runs on localhost:4000

## 🟢 STEP 3: Create First API
Create route /lead
Create controller for handling request
Log incoming request
Test using Postman

👉 Goal: API receives data successfully

## 🟢 STEP 4: Add Validation
Create validation utility
Check:
email exists
phone exists
Reject invalid requests

👉 Goal: Only valid leads pass

## 🟢 STEP 5: Connect Database
Create Supabase project
Create leads table
Add Supabase config file
Save lead from API

👉 Goal: Lead gets stored

## 🟡 STEP 6: Add Email System
Create Gemini service
Generate email text
Create email service (Nodemailer)
Send email after lead saved

👉 Add DRY_RUN:

If true → log only
If false → send email

👉 Goal: Lead → email triggered

## 🟡 STEP 7: Add Pre-Qualification
Use Gemini to score lead
Parse score
Add rule:
if score < 5 → stop
else → continue

👉 Goal: Filter bad leads

## 🟠 STEP 8: Add AI Calling
Create call service
Trigger call via Vapi API
Pass phone number

👉 Add DRY_RUN:

Skip actual call

👉 Goal: Lead → call triggered

## 🔵 STEP 9: Add Webhook Endpoint
Create /call-complete route
Receive transcript
Log transcript
Save transcript in DB

👉 Goal: Call result captured

## 🔵 STEP 10: Add Analysis
Send transcript to Gemini
Get:
qualified
score
summary
Add logic:
if score < 7 → reject
else → proceed

👉 Goal: AI decision working

## 🟣 STEP 11: Booking
Integrate Calendly or Google Calendar
Trigger booking for qualified leads

## 🔴 STEP 12: Connect Full Flow
Lead → Validate
Save → Email
Score → Gate
Call → Webhook
Analyze → Decision

👉 Goal: End-to-end working

## ⚫ STEP 13: Add Logging
Log each step:
lead received
email sent
score
call triggered
analysis result

👉 Goal: Easy debugging

## ⚫ STEP 14: Add Unit Tests
Test validation
Test scoring logic
Test pipeline flow
Mock Gemini + email

👉 Goal: Each step verified

## ⚫ STEP 15: Setup Nodemon + Scripts
Add dev script
Run using nodemon
Enable auto reload

👉 Goal: Faster development

## 🌍 STEP 16: Deploy
Push code to GitHub
Deploy on Railway
Add env variables
Test live API

👉 Goal: Public API ready

## 📡 STEP 17: Connect Lead Source
Use Make/Zapier
Connect:
Ads / Google Forms
→ Your API

👉 Goal: Real leads flow in

---

## 🧠 FINAL FLOW YOU SHOULD HAVE

Lead
→ API
→ Validate
→ Save
→ Email
→ Score
→ (Gate)
→ Call
→ Webhook
→ Analyze
→ (Gate)
→ Done

---

## Each step should follow this pattern:
1. Validate input → 2. Execute → 3. Validate output → 4. Decide next step

---

# Validation steps - Validation Strategy for AI Pre-Sales Pipeline


## 🧠 PURPOSE

Goal:
- Prevent bad data from flowing forward
- Reduce failures
- Save cost (especially calls)
- Ensure system reliability

---

## 🔁 VALIDATION PRINCIPLE

Each step MUST follow:

1. Validate Input  
2. Execute Logic  
3. Validate Output  
4. Decide Next Step (Gate)

---

## 🟢 STEP 1: LEAD CAPTURE

### Input Validation
- email exists
- email format valid
- phone exists
- phone format valid
- required fields present (name/email/phone)

### Failure Handling
- Reject request
- Return error response

---

## 🟡 STEP 2: DATABASE SAVE

### Input Validation
- Cleaned data (no undefined/null critical fields)

### Output Validation
- Record inserted successfully
- ID returned

### Failure Handling
- Log error
- Stop pipeline

---

## 🟡 STEP 3: EMAIL GENERATION (AI)

### Input Validation
- lead has name
- lead has email

### Output Validation
- Response is not empty
- Response length > 20 characters
- Response is readable text (not junk)

### Failure Handling
- Retry once
- Fallback to static template

---

## 🟡 STEP 4: EMAIL SENDING

### Input Validation
- Email address valid

### Output Validation
- Email sent successfully

### Failure Handling
- Retry (max 2–3 times)
- Log failure

---

## 🟠 STEP 5: PRE-QUALIFICATION (AI)

### Input Validation
- Lead data exists

### Output Validation
- Score exists
- Score is number
- Score between 1–10

### Failure Handling
- Retry once
- Fallback to default score

---

## 🚦 GATE: PRE-QUALIFICATION

### Rule
- If score < threshold → STOP pipeline
- If score ≥ threshold → CONTINUE

### Purpose
- Avoid unnecessary AI calls
- Reduce cost

---

## 🔵 STEP 6: CALL TRIGGER

### Input Validation
- Phone number valid
- Lead passed qualification gate

### Output Validation
- API response success
- Call ID returned

### Failure Handling
- Retry
- Stop if repeated failure

---

## 🔵 STEP 7: CALL WEBHOOK

### Input Validation
- Webhook payload exists
- Transcript present

### Output Validation
- Transcript length > 50 characters

### Failure Handling
- Mark as failed
- Stop pipeline

---

## 🔵 STEP 8: AI ANALYSIS

### Input Validation
- Transcript exists

### Output Validation
- Valid JSON format
- Required fields:
  - qualified (boolean)
  - score (number)
  - summary (string)

### Failure Handling
- Retry
- Fallback to default decision

---

## 🚦 GATE: FINAL QUALIFICATION

### Rule
- If qualified = false → STOP
- If qualified = true → CONTINUE

---

## 🟣 STEP 9: BOOKING

### Input Validation
- Lead is qualified

### Output Validation
- Booking created
- Time slot valid
- Confirmation received

### Failure Handling
- Retry
- Log error

---

## ⚫ STEP 10: FINAL SAVE

### Input Validation
- All required fields present

### Output Validation
- Data saved successfully

---

## 🧠 GLOBAL VALIDATION RULES

---

### 1. NEVER TRUST AI OUTPUT

Always validate:
- Type
- Format
- Structure

---

### 2. FAIL FAST

If invalid:
- Stop immediately
- Do NOT continue pipeline

---

### 3. ADD FALLBACKS

Examples:
- AI fails → use default response
- Missing score → assign safe value

---

### 4. LOG EVERYTHING

At every step log:
- Input
- Output
- Errors

---

### 5. RETRY STRATEGY

- Retry max 1–3 times
- Avoid infinite loops

---

### 6. DRY RUN MODE

If DRY_RUN = true:
- Skip email sending
- Skip call triggering
- Only log actions

---

## 🧪 TEST COVERAGE MAPPING

Each validation MUST have test cases:

- Valid input → pass
- Invalid input → fail
- Edge cases → handled

---

## 🔥 FINAL RULE

Every function must protect itself.

Never assume:
"Previous step already validated"

Always validate again.
```
