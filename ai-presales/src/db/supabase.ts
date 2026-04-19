import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env";

// SECURITY_NOTE: Service role key used server-side only. Never expose to client.
if (!config.supabase.url || !config.supabase.key) {
  console.warn("WARNING: Supabase credentials not set. DB operations will fail.");
}

export const supabase = createClient(
  config.supabase.url,
  config.supabase.key
);
