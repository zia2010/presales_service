import { config } from "../config/env";

/**
 * Email service — generates and sends emails.
 * Placeholder for Phase 1. Will use Gemini + Nodemailer.
 */
export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  if (config.dryRun) {
    console.log(`[EMAIL][DRY RUN] Would send to: ${to}`);
    console.log(`[EMAIL][DRY RUN] Subject: ${subject}`);
    return true;
  }

  // TODO: Implement with Nodemailer in Step 6
  console.log(`[EMAIL] Sending to: ${to}`);
  return true;
}
