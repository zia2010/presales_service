# AI Pre-Sales Automation — Progress Tracker

**Project:** ai-presales  
**Location:** `presales_calling_system/ai-presales/`  
**Started:** April 20, 2026  

---

## ✅ STEP 1: Project Setup — DONE

### What was done:
- Created `ai-presales` project folder
- Initialized npm (`npm init -y`)
- Installed production dependencies: express, cors, dotenv, @supabase/supabase-js, nodemailer, @google/generative-ai, axios
- Installed dev dependencies: typescript, ts-node, nodemon, jest, ts-jest, supertest + all @types
- Configured TypeScript (`tsconfig.json`)
- Configured Jest (`jest.config.js`)
- Created `.env` with all placeholder values (DRY_RUN=true by default)
- Created `.gitignore`

### Files created:
```
ai-presales/
├── package.json
├── tsconfig.json
├── jest.config.js
├── .env
├── .gitignore
└── test-lead.ps1 (manual testing script)
```

---

## ✅ STEP 2: Basic Server + Config — DONE

### What was done:
- Created `src/config/env.ts` — centralized config from environment variables
- Created `src/app.ts` — Express app with CORS, JSON parsing, health check
- Created `src/server.ts` — Server startup on port 4000
- Server starts and responds on `GET /health`

### Verified:
- ✅ Server runs on `http://localhost:4000`
- ✅ `GET /health` returns `{ "status": "ok", "timestamp": "..." }`

---

## ✅ STEP 3: First API (POST /lead) — DONE

### What was done:
- Created `src/routes/lead.routes.ts` — Route definition
- Created `src/api/lead.controller.ts` — Request handler with validation
- Created `src/services/lead.service.ts` — Pipeline orchestrator (logs for now)
- Wired routes into app.ts

### Verified:
- ✅ `POST /lead` with valid data returns 201 + leadId
- ✅ `POST /lead` with invalid data returns 400 + error details

---

## ✅ STEP 4: Validation — DONE

### What was done:
- Created `src/utils/validate.ts`
- Validates: name (min 2, max 100), email (regex), phone (international 8-15 digits), message (max 1000)
- Invalid leads are rejected with specific error messages

### Verified:
- ✅ Valid leads pass validation
- ✅ Missing email → rejected
- ✅ Invalid phone → rejected
- ✅ Missing name → rejected
- ✅ Short name → rejected
- ✅ Long message → rejected
- ✅ Empty object → rejected

---

## ✅ STEP 5: Service Stubs (All Placeholder Services) — DONE

### What was done:
- Created `src/db/supabase.ts` — Supabase client (needs real credentials)
- Created `src/services/email.service.ts` — Email sending (dry-run skips)
- Created `src/services/gemini.service.ts` — AI: email gen, scoring, transcript analysis (dry-run returns defaults)
- Created `src/services/call.service.ts` — Voice call trigger (dry-run skips)
- Created `src/services/analysis.service.ts` — Transcript analysis + decision
- Created `src/webhooks/call.webhook.ts` — Webhook endpoint for call completion

### Verified:
- ✅ All services compile without errors
- ✅ Dry-run mode returns mock data correctly

---

## ✅ STEP 6: Tests — DONE (26/26 passing)

### Test suites:
| File | Tests | Status |
|------|-------|--------|
| `lead.test.ts` | 14 tests (validation + email/phone) | ✅ All pass |
| `email.test.ts` | 2 tests (email generation) | ✅ All pass |
| `gemini.test.ts` | 2 tests (lead scoring) | ✅ All pass |
| `pipeline.test.ts` | 8 tests (API endpoints + webhook) | ✅ All pass |

### Total: 26 tests, 4 suites, 0 failures

---

## Current Project Structure

```
ai-presales/
├── src/
│   ├── api/
│   │   └── lead.controller.ts    ← handles POST /lead
│   ├── routes/
│   │   └── lead.routes.ts        ← route definition
│   ├── services/
│   │   ├── lead.service.ts       ← pipeline orchestrator
│   │   ├── email.service.ts      ← email sending (stub)
│   │   ├── gemini.service.ts     ← AI interactions (stub)
│   │   ├── call.service.ts       ← voice call trigger (stub)
│   │   └── analysis.service.ts   ← transcript analysis (stub)
│   ├── db/
│   │   └── supabase.ts           ← database client
│   ├── utils/
│   │   └── validate.ts           ← input validation
│   ├── webhooks/
│   │   └── call.webhook.ts       ← call completion webhook
│   ├── config/
│   │   └── env.ts                ← centralized config
│   ├── tests/
│   │   ├── lead.test.ts          ← validation tests
│   │   ├── email.test.ts         ← email generation tests
│   │   ├── gemini.test.ts        ← AI scoring tests
│   │   └── pipeline.test.ts      ← API endpoint tests
│   ├── app.ts                    ← Express app setup
│   └── server.ts                 ← Server entry point
├── package.json
├── tsconfig.json
├── jest.config.js
├── .env
└── .gitignore
```

---

## How to Run

```bash
# Start server (development)
npm run dev

# Start server (manual)
npm run start

# Run tests
npm test

# Build
npm run build
```

---

## 🔜 NEXT STEPS

### 🔲 STEP 7: Connect Supabase Database
- Create Supabase project
- Create `leads` table
- Create `pipeline_logs` table
- Add real credentials to `.env`
- Save leads to DB in `lead.service.ts`

### 🔲 STEP 8: Email System (Gemini + Nodemailer)
- Connect Gemini API for email generation
- Configure SMTP via Nodemailer
- Send real emails on lead capture

### 🔲 STEP 9: Pre-Qualification Scoring
- Connect Gemini for lead scoring
- Add gate logic (score < 5 = stop pipeline)

### 🔲 STEP 10: AI Voice Calling (Vapi)
- Connect Vapi API
- Trigger calls for qualified leads
- Handle call webhook

### 🔲 STEP 11: Call Analysis
- Send transcript to Gemini
- Parse structured JSON output
- Route: qualified → book, not → nurture

### 🔲 STEP 12: Appointment Booking
- Connect Calendly or Google Calendar
- Book slots for qualified leads

### 🔲 STEP 13: Full Pipeline Automation (BullMQ)
- Add Redis + BullMQ queue
- Wire all steps as queue jobs

### 🔲 STEP 14: Monitoring + Logging
- Log every step to `pipeline_logs` table
- Add retry mechanisms

### 🔲 STEP 15: Deploy
- Push to GitHub
- Deploy on Railway
- Set production env vars
