import { Router } from "express";
import { createLead } from "../api/lead.controller";

const router = Router();

// POST /lead — receive new lead
router.post("/", createLead);

export default router;
