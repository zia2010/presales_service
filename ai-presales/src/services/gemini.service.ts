import { config } from "../config/env";

/**
 * Gemini AI service — handles all AI interactions.
 * Placeholder for Phase 1. Will use @google/generative-ai.
 */

/**
 * Generate a personalized email for a lead.
 */
export async function generateEmail(lead: {
  name: string;
  niche?: string;
  message?: string;
}): Promise<string> {
  if (config.dryRun) {
    console.log(`[GEMINI][DRY RUN] Would generate email for: ${lead.name}`);
    return `<p>Hi ${lead.name}, thanks for your interest!</p>`;
  }

  // TODO: Implement with actual Gemini API in Step 6
  return `<p>Hi ${lead.name}, thanks for your interest!</p>`;
}

/**
 * Score a lead for pre-qualification (1-10).
 */
export async function scoreLead(lead: {
  name: string;
  source?: string;
  niche?: string;
  message?: string;
}): Promise<{ score: number; reasoning: string }> {
  if (config.dryRun) {
    console.log(`[GEMINI][DRY RUN] Would score lead: ${lead.name}`);
    return { score: 7, reasoning: "Dry run default score" };
  }

  // TODO: Implement with actual Gemini API in Step 7
  return { score: 5, reasoning: "Default score — Gemini not connected yet" };
}

/**
 * Analyze a call transcript and return structured qualification data.
 */
export async function analyzeTranscript(transcript: string): Promise<{
  qualified: boolean;
  score: number;
  summary: string;
  budget: string;
  urgency: string;
}> {
  if (config.dryRun) {
    console.log(`[GEMINI][DRY RUN] Would analyze transcript`);
    return {
      qualified: true,
      score: 8,
      summary: "Dry run analysis",
      budget: "N/A",
      urgency: "medium",
    };
  }

  // TODO: Implement with actual Gemini API in Step 10
  return {
    qualified: false,
    score: 0,
    summary: "Gemini not connected yet",
    budget: "N/A",
    urgency: "low",
  };
}
