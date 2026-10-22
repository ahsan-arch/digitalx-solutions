import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tsxCli = path.resolve(__dirname, "../node_modules/tsx/dist/cli.mjs");
const qaScript = path.resolve(__dirname, "seo-qa.ts");

const result = spawnSync(process.execPath, [tsxCli, qaScript], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 0);
