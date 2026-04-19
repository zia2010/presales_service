import { config } from "../config/env";

/**
 * Call service — triggers AI voice calls.
 * Placeholder for Phase 3. Will use Vapi or Twilio.
 */
export async function triggerCall(phone: string, leadId: string): Promise<boolean> {
  if (config.dryRun) {
    console.log(`[CALL][DRY RUN] Would call: ${phone} for lead: ${leadId}`);
    return true;
  }

  // TODO: Implement with Vapi API in Step 8
  console.log(`[CALL] Triggering call to: ${phone}`);
  return true;
}
