#!/usr/bin/env node
import { writeFileSync, watch } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync, exec } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "preview.html");
const SRC = resolve(__dirname, "src");

function generate() {
  execSync("npm run build", { cwd: __dirname, stdio: "pipe" });
  execSync(`node preview-gen.mjs`, { cwd: __dirname, stdio: "inherit" });
}

// --watch mode
if (process.argv.includes("--watch")) {
  console.log("\x1b[36m▶\x1b[0m Initial build...");
  generate();
  exec(`open ${OUTPUT}`);
  console.log("\x1b[33m⇌ Watching src/ ... save any file to rebuild\x1b[0m\n");

  let debounce = null;
  watch(SRC, { recursive: true }, () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      console.log(`\x1b[90m${new Date().toLocaleTimeString()}\x1b[0m rebuilding...`);
      try { generate(); } catch { console.error("\x1b[31m✖ Build failed\x1b[0m"); }
    }, 400);
  });
  process.on("SIGINT", () => { console.log("\n\x1b[33m▌Stopped\x1b[0m"); process.exit(0); });
} else {
  generate();
}
