AI-powered pre-sales automation service.

## Business Idea:

The service helps businesses (especially service-based businesses like interior designers, real estate agents, dental clinics, and consultants) convert inbound leads into qualified booked appointments automatically.

## Core Workflow:

1. Leads are generated via ads (Instagram, LinkedIn, landing pages).
2. Lead data is sent to a Node.js backend API.
3. The system validates and stores lead data in a database (Supabase or similar).
4. An AI (use Google Gemini) generates and sends a personalized email to the lead.
5. The system performs pre-qualification using AI to decide whether the lead is worth calling.
6. If qualified, an AI voice agent (via platforms like Vapi or Twilio) calls the lead.
7. The AI asks questions (budget, requirements, timeline, intent) and booking timing.
8. Call transcript is captured.
9. The transcript is sent to AI (Gemini) for analysis.
10. AI returns structured output:

* Qualified (yes/no)
* Budget
* Requirement summary
* Urgency
* Score (1–10)

11. Based on score:

* If qualified → book appointment (Calendly or Google Calendar)
* If not → send nurture email

12. Save all data (lead info, transcript, analysis, status) in database.
13. Send final email confirmation to lead.

## Technical Stack:

* Backend: Node.js
* Database: Supabase
* AI: Google Gemini
* Email: SMTP / Nodemailer
* Voice AI: Vapi or Twilio
* Scheduling: Calendly or Google Calendar

## Requirements:

Generate a detailed business plan that includes:

### 1. Value Proposition

* What problem this solves
* Why businesses will pay
* Key differentiator vs chatbots

### 2. Target Market

* Ideal customer profiles
* Best niches to start with
* Geographic focus (start with India but scalable globally)

### 3. Features Breakdown

* Core features
* Advanced features (future roadmap)

### 4. Pricing Strategy

* Monthly subscription model
* Performance-based pricing (per qualified lead / booked call)
* Hybrid pricing model

### 5. Unit Economics

* Cost per lead handled
* Monthly cost per client
* Expected revenue per client
* Profit margins
* Break-even analysis

### 6. Go-To-Market Strategy

* How to acquire first 5 clients
* Outreach strategy (cold DM, LinkedIn, Instagram)
* Free trial or pilot strategy
* Sales pitch positioning

### 7. Competitive Analysis

* Compare with human SDRs
* Compare with chatbots
* Advantages and disadvantages

### 8. Risks and Challenges

* Technical risks
* AI limitations
* Sales challenges
* Cost risks (especially voice calls)

### 9. Execution Plan (Step-by-step)

* asap

### 10. Scaling Strategy

* Automating onboarding
* Reducing costs
* Expanding to multiple niches

## Important Instructions:

* Keep it practical and execution-focused, not theoretical
* Include realistic numbers (costs, pricing, margins)
* Assume bootstrapped startup (low budget)
* Focus on fast validation and revenue generation

## Output Format:

* Clear sections with headings
* Actionable steps
* Simple language (no fluff)

---

## ADD THIS CRITICAL REQUIREMENT: TESTING & VALIDATION LAYER

The system MUST be designed as a **step-based pipeline with validation gates**.

Each step should:

* Run test cases
* Log result (success/failure)
* Only proceed if test passes
* Retry or stop on failure

---

## For EACH STEP, define:

### 1. Validation Rules

* What conditions must be true

### 2. Test Cases

* Positive cases (valid input)
* Negative cases (invalid input)
* Edge cases

### 3. Failure Handling

* Retry logic
* Fallback behavior
* When to stop pipeline

### 4. Sample Code Logic (Node.js style pseudocode)

---

## Steps that MUST include tests:

### Step 1: Lead Capture

* Validate email, phone, required fields
* Reject invalid leads

### Step 2: Email Generation (Gemini)

* Ensure response is not empty
* Ensure minimum length
* Ensure email successfully sent

### Step 3: Pre-Qualification (Gemini)

* Ensure score exists
* Ensure valid decision (yes/no)
* Skip call if low quality

### Step 4: Call Trigger (Vapi/Twilio)

* Ensure API response success
* Ensure call initiated

### Step 5: Call Completion

* Ensure webhook received
* Ensure transcript exists and is valid

### Step 6: AI Analysis (Gemini)

* Enforce strict JSON output
* Validate all required fields exist
* Handle malformed responses

### Step 7: Appointment Booking

* Ensure booking confirmed
* Ensure valid time slot

### Step 8: Data Persistence

* Ensure data saved correctly in DB
* Ensure no data loss

### Step 9: Final Email

* Ensure email delivered
* Ensure correct content

---

## Additional System Requirements:

### 1. Queue-Based Execution

* Use job queue (BullMQ or similar)
* Each step is an independent job

### 2. Dry Run Mode

* Ability to simulate full pipeline without:

  * Sending emails
  * Making calls

### 3. Logging & Observability

* Store:

  * Step name
  * Status
  * Error message
  * Timestamp

### 4. Cost Optimization Logic

* Avoid calling low-quality leads
* Minimize call duration

---

## Important Instructions:

* Be practical and implementation-focused
* Include realistic costs and pricing
* Assume bootstrapped startup
* Focus on speed → MVP → revenue

---

### END-TO-END FLOW (WITH CONTROL & TESTING)
Lead → Validate → Save → Email → Pre-Qualify → (Gate)
     → Call → Transcript → Analyze → (Gate)
     → Book → Save → Final Email

---

### HIGH-LEVEL FLOW (SYSTEM VIEW)
[Client Ads/Form]
        ↓
[Node.js API]
        ↓
[Queue (BullMQ)]
        ↓
[Workers executing steps one by one]
        ↓
[Supabase DB + Logs]

---

### STEP-BY-STEP FLOW (WITH LOGIC)
## 1️⃣ Lead Capture

User submits form → `POST /lead`

### Backend:
- Validate input
- Reject bad data
- Save lead

```ts
if (!isValidLead(data)) STOP
else enqueue("send_email")
```

## 2️⃣ Send Email (AI Generated)

Queue Job → send_email

Generate using Google Gemini
Send via SMTP

```ts
if (!emailSent) RETRY / STOP
else enqueue("pre_qualify")
```

## 3️⃣ Pre-Qualification (Cost Saver)

Queue Job → pre_qualify

Use Gemini to score lead

```ts
if (score < 5) {
  mark as "cold"
  STOP PIPELINE
} else {
  enqueue("trigger_call")
}
```
note: This step protects your margins

## 4️⃣ Trigger AI Call

Queue Job → trigger_call
Call via Vapi (or Twilio)

Gate:
```ts
if (callFailed) RETRY
else WAIT for webhook
```

## 5️⃣ Call Happens (External)
AI talks to lead
Collects:
Budget
Requirement
Timeline

## 6️⃣ Call Completion (Webhook)
POST /call-complete

Backend receives:
Transcript
Call metadata

Gate:
```ts
if (!transcript || transcript.length < 50) STOP
else enqueue("analyze_call")
```

## 7️⃣ AI Analysis
Queue Job → analyze_call

Send transcript → Google Gemini
Expected Output:
```ts
{
  "qualified": true,
  "score": 8,
  "summary": "2BHK interior, budget 5L"
}
```

Gate:
```ts
if (!validJSON) RETRY

if (!qualified || score < 7) {
  mark as "not qualified"
  enqueue("nurture_email")
} else {
  enqueue("book_appointment")
}
```

## 8️⃣ Book Appointment

Queue Job → book_appointment

Use Calendly or Google Calendar
Gate:
```ts
if (!bookingSuccess) RETRY / ALERT
else enqueue("finalize")
```

## 9️⃣ Save Everything

Queue Job → finalize

Save to:
Supabase
Store:
Lead data
Email status
Call transcript
AI analysis
Booking status

## 🔟 Final Email

Queue Job → final_email

If qualified:
“Your call is booked”
If not:
“Here’s more info…”

----

### Lead
 → Validate
 → Send Email
 → Pre-Qualify
 → (Gate: skip or continue)
 → Trigger Call
 → Wait for Webhook
 → Analyze Call
 → (Gate: qualify or reject)
 → Book Appointment
 → Save Data
 → Final Email

### STATE MACHINE (CLEAN THINKING)
NEW_LEAD
  ↓
EMAIL_SENT
  ↓
PREQUALIFIED
  ↓
CALLED
  ↓
ANALYZED
  ↓
QUALIFIED → BOOKED
        OR
NOT_QUALIFIED → NURTURE

### WHERE TESTS RUN
| Step        | Test             |
| ----------- | ---------------- |
| Lead        | Valid data       |
| Email       | Generated + sent |
| Pre-qualify | Score valid      |
| Call        | Trigger success  |
| Transcript  | Exists           |
| Analysis    | Valid JSON       |
| Booking     | Confirmed        |

### REAL IMPLEMENTATION FLOW (QUEUE)
POST /lead
  → addJob("validate_lead")

Worker:

validate_lead
  → pass → send_email

send_email
  → pass → pre_qualify

pre_qualify
  → pass → trigger_call
  → fail → stop

trigger_call
  → wait webhook

webhook
  → analyze_call

analyze_call
  → pass → book OR nurture

### KEY DESIGN PRINCIPLES
1. Never auto-chain blindly
Every step = decision

2. Async > sync
Calls + AI = slow
👉 Use queue always

3. Fail fast
Bad lead → stop early
👉 Saves money

4. Log everything
You will debug this

### SIMPLE SUMMARY
Your system is not a chatbot.
It’s a decision engine with actions at each step.


# AI Pre-Sales Automation — Phased Development Plan

---

## 🟢 Phase 1: Lead Capture + Email (MVP Core)

### Goal
Capture leads and respond instantly.

### Build
- Node.js API (`POST /lead`)
- Validate input
- Save to database (Supabase)
- Generate email using Google Gemini
- Send email via SMTP (Nodemailer)

### Flow
Lead → API → Validate → Save → Email


### Tests
- Valid lead is stored in DB
- Invalid lead is rejected
- Email is generated (non-empty)
- Email is successfully sent

### Done When
- A user submits a form and receives an instant email response

### Cost
- ~$0–20/month

---

## 🟡 Phase 2: Pre-Qualification (Cost Control Layer)

### Goal
Filter out low-quality leads before spending on calls.

### Build
- Gemini-based scoring logic
- Qualification gate before calling

### Flow
Lead → Score → Pass / Reject


### Tests
- Score is generated for every lead
- Low-score leads are skipped
- High-score leads proceed

### Done When
- System automatically filters poor leads

### Impact
- Reduces unnecessary call costs

---

## 🟠 Phase 3: AI Calling (Core Differentiator)

### Goal
Automatically call and interact with leads.

### Build
- Integration with Vapi or Twilio
- API to trigger calls
- Basic AI call script

### Flow
Qualified Lead → Trigger Call → AI Conversation


### Tests
- Call API triggers successfully
- Call connects
- Transcript is received

### Done When
- AI successfully talks to real users

### Cost
- ~$50–150/month

---

## 🔵 Phase 4: Call Analysis + Decision Engine

### Goal
Convert call conversations into structured insights.

### Build
- Send transcript to Gemini
- Parse structured JSON output
- Qualification decision logic

### Flow
Transcript → AI Analysis → Decision


### Expected Output
```json
{
  "qualified": true,
  "score": 8,
  "summary": "2BHK interior, budget 5L"
}
```

### Tests
JSON output is valid
Required fields exist (qualified, score, summary)
Invalid responses handled

### Done When
AI correctly interprets call data

---

## 🟣 Phase 5: Appointment Booking

### Goal
Convert qualified leads into booked meetings.

### Build
- Integration with Calendly or Google Calendar
- Booking logic

### Flow
``` id="7c1m2a"
Qualified Lead → Book Slot → Confirm
```

### Tests
- Booking is successfully created
- Time slot is valid
- Confirmation is sent

### Done When
- Calendar shows real appointments

---

## 🔴 Phase 6: Full Pipeline Automation

### Goal
Connect all steps into a seamless automated system.

### Build
- Queue system (BullMQ)
- Step orchestration
- Gates between steps

### Flow
``` 
id="k1z7yb"
Lead → Email → Score → Call → Analyze → Book
```

### Tests
Full pipeline executes automatically
Failures handled correctly
Steps execute in correct order

### Done When
No manual intervention required

---

## ⚫ Phase 7: Monitoring + Logging + Stability

### Goal
Ensure reliability and debuggability.

### Build
- Logging for each step
- Error tracking
- Retry mechanisms

### Logs Should Include
- Step name
- Status (success/failure)
- Error message
- Timestamp

### Tests
- Errors are logged
- Retries work correctly

### Done When
- Issues can be easily debugged

---

## 🟤 Phase 8: Optimization (Profit Phase)

### Goal
Improve margins and performance.

### Optimize
- Reduce call duration
- Improve pre-qualification accuracy
- Refine AI prompts
- Reuse workflows across clients

### Metrics
- Cost per lead
- Conversion rate
- Profit per client

### Done When
- System is profitable and scalable





### Full Roadmap Summary
Phase 1 → Lead Capture + Email
Phase 2 → Pre-Qualification
Phase 3 → AI Calling
Phase 4 → Analysis
Phase 5 → Booking
Phase 6 → Automation
Phase 7 → Monitoring
Phase 8 → Optimization

---

### Key Insight

You don’t need the full system to start selling.
Start with:

```ts
Lead Capture → Email → Score → Pass / Reject
```
Then expand.

---

### Final Note

This is not just automation.

This is a decision-driven system with controlled execution at every step.

---