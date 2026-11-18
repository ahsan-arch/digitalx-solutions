const { spawnSync } = require("child_process");
const path = require("path");

const mjsScript = path.resolve(__dirname, "seo-qa.mjs");
const result = spawnSync(process.execPath, [mjsScript], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 0);
