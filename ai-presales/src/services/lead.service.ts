import { LeadInput } from "../utils/validate";
import { config } from "../config/env";

/**
 * Main pipeline orchestrator.
 * For now (Phase 1), it just logs the lead.
 * Future: save to DB → email → pre-qualify → call → analyze → book
 */
export async function processLead(
  lead: LeadInput
): Promise<{ leadId: string }> {
  // Generate a simple ID for now (Supabase will provide UUIDs later)
  const leadId = `lead_${Date.now()}`;

  console.log(`[PIPELINE] New lead received: ${leadId}`);
  console.log(`[PIPELINE] Name: ${lead.name}`);
  console.log(`[PIPELINE] Email: ${lead.email}`);
  console.log(`[PIPELINE] Phone: ${lead.phone}`);
  console.log(`[PIPELINE] Source: ${lead.source || "N/A"}`);
  console.log(`[PIPELINE] Niche: ${lead.niche || "N/A"}`);
  console.log(`[PIPELINE] Dry Run: ${config.dryRun}`);

  // TODO: Step 5 — Save to Supabase
  // TODO: Step 6 — Generate + send email via Gemini
  // TODO: Step 7 — Pre-qualification scoring
  // TODO: Step 8 — Trigger AI call
  // TODO: Step 10 — Analyze transcript
  // TODO: Step 11 — Book appointment

  return { leadId };
}
