import app from "./app";
import { config } from "./config/env";

app.listen(config.port, () => {
  console.log(`\n========================================`);
  console.log(`  AI Pre-Sales Automation Server`);
  console.log(`  Port:     ${config.port}`);
  console.log(`  Mode:     ${config.nodeEnv}`);
  console.log(`  Dry Run:  ${config.dryRun}`);
  console.log(`========================================\n`);
});
