const { execSync } = require("child_process");

const DELAY_HOURS = 5;
const DELAY_MS = DELAY_HOURS * 60 * 60 * 1000;
const targetTime = new Date(Date.now() + DELAY_MS);

console.log("============================================================");
console.log("   DIGITALX SOLUTIONS — SCHEDULED OUTREACH RUNNER (5 HOURS)   ");
console.log("============================================================");
console.log(`Current Time:        ${new Date().toISOString()}`);
console.log(`Scheduled Run Time:  ${targetTime.toISOString()}`);
console.log(`Countdown Duration:  ${DELAY_HOURS} hours (${DELAY_MS / 1000} seconds)\n`);
console.log("Waiting in background... Do not close this process.");

setTimeout(() => {
  console.log("\n============================================================");
  console.log(`[${new Date().toISOString()}] 5 Hours Elapsed! Launching outreach batch...`);
  console.log("============================================================\n");
  try {
    execSync("npm run outreach:scraped", { stdio: "inherit" });
    console.log("\nScheduled outreach execution completed successfully.");
  } catch (err) {
    console.error("Scheduled execution failed:", err);
  }
}, DELAY_MS);
