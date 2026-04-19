import { Request, Response } from "express";
import { validateLead, LeadInput } from "../utils/validate";
import { processLead } from "../services/lead.service";

/**
 * POST /lead — Handles incoming lead submissions.
 */
export async function createLead(req: Request, res: Response): Promise<void> {
  try {
    const data: Partial<LeadInput> = req.body;

    // Step 1: Validate input
    const validation = validateLead(data);
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validation.errors,
      });
      return;
    }

    // Step 2: Process the lead through the pipeline
    const result = await processLead(data as LeadInput);

    res.status(201).json({
      success: true,
      message: "Lead received and processing started",
      leadId: result.leadId,
    });
  } catch (err: any) {
    console.error("Lead capture error:", err.message);
    // SECURITY_NOTE: Never expose stack traces or internal errors to client.
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
