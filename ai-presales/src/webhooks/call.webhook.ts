import { Router, Request, Response } from "express";

const router = Router();

/**
 * POST /webhook/call-complete — Receives call completion data from Vapi/Twilio.
 * Placeholder for Phase 3.
 */
router.post("/call-complete", async (req: Request, res: Response) => {
  try {
    const { leadId, transcript } = req.body;

    if (!leadId) {
      res.status(400).json({ error: "Missing leadId" });
      return;
    }

    // SECURITY_NOTE: In production, validate webhook signature.
    // Gate: transcript must exist and be meaningful
    if (!transcript || transcript.length < 50) {
      console.log(`[WEBHOOK] Insufficient transcript for lead: ${leadId}`);
      res.status(200).json({ action: "stopped — insufficient transcript" });
      return;
    }

    console.log(`[WEBHOOK] Call complete for lead: ${leadId}`);
    console.log(`[WEBHOOK] Transcript length: ${transcript.length}`);

    // TODO: Enqueue analyze_call job in Phase 4
    res.status(200).json({ success: true, message: "Transcript received" });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
