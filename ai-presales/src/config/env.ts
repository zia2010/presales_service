import dotenv from "dotenv";
dotenv.config();

// SECURITY_NOTE: All config externalized via env vars. Never hardcode secrets.
export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  dryRun: process.env.DRY_RUN === "true",

  supabase: {
    url: process.env.SUPABASE_URL || "",
    key: process.env.SUPABASE_KEY || "",
  },

  gemini: {
    key: process.env.GEMINI_KEY || "",
  },

  email: {
    user: process.env.EMAIL || "",
    pass: process.env.EMAIL_PASS || "",
  },

  vapi: {
    key: process.env.VAPI_API_KEY || "",
  },
};
