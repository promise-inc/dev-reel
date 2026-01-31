#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { createHash } from "node:crypto";
import { Command } from "commander";
import { parseReadme } from "../parser/index.js";
import { renderSvg } from "../renderer/index.js";
import type { DevReelConfig } from "../config.js";
import { DEFAULT_CONFIG } from "../config.js";

const loadConfig = (cwd: string): DevReelConfig => {
  const configPath = join(cwd, "dev-reel.config.ts");
  if (existsSync(configPath)) {
    try {
      const raw = readFileSync(configPath, "utf-8");
      const match = raw.match(/export\s+default\s+({[\s\S]*})/);
      if (match) {
        const parsed = new Function(`return ${match[1]}`)() as Partial<DevReelConfig>;
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch {
      // fall through to defaults
    }
  }
  return DEFAULT_CONFIG;
};

const contentHash = (content: string): string => {
  return createHash("md5").update(content).digest("hex").slice(0, 8);
};

const build = (readmePath: string, config: DevReelConfig, dryRun: boolean): void => {
  if (!existsSync(readmePath)) {
    console.error(`\x1b[31m\u2716\x1b[0m README.md not found at ${readmePath}`);
    process.exit(1);
  }

  const blocks = parseReadme(readmePath);

  if (blocks.length === 0) {
    console.log("\x1b[33m\u26A0\x1b[0m No dev-reel blocks found in README.md");
    return;
  }

  console.log(`\x1b[36m\u25B6\x1b[0m Found ${blocks.length} dev-reel block(s)\n`);

  const readmeDir = dirname(readmePath);
  const outputDir = resolve(readmeDir, config.outputDir);

  if (!dryRun && !existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  let readmeContent = readFileSync(readmePath, "utf-8");
  let modified = false;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const svg = renderSvg(block);
    const hash = contentHash(block.raw);
    const filename = blocks.length === 1 ? "dev-reel.svg" : `dev-reel-${i + 1}.svg`;
    const filePath = join(outputDir, filename);
    const relativePath = `./${config.outputDir}/${filename}`;

    console.log(`  \x1b[32m\u2714\x1b[0m ${block.title}`);
    console.log(`    Theme: ${block.theme}`);
    console.log(`    Animations: ${block.animations.join(", ")}`);
    console.log(`    Lines: ${block.lines.length}`);
    console.log(`    Hash: ${hash}`);
    console.log(`    Output: ${relativePath}\n`);

    if (dryRun) {
      console.log(`  \x1b[33m[dry-run]\x1b[0m Skipping file write\n`);
      continue;
    }

    writeFileSync(filePath, svg, "utf-8");

    const blockPattern = "```dev-reel\n" + block.raw + "```";
    const replacement = `![dev-reel](${relativePath})`;

    if (readmeContent.includes(blockPattern) && !readmeContent.includes(replacement)) {
      readmeContent = readmeContent.replace(blockPattern, replacement);
      modified = true;
    }
  }

  if (modified && !dryRun) {
    writeFileSync(readmePath, readmeContent, "utf-8");
    console.log("\x1b[32m\u2714\x1b[0m README.md updated with SVG references");
  }

  console.log("\n\x1b[32m\u2713 Done!\x1b[0m");
};

const watchMode = async (readmePath: string, config: DevReelConfig): Promise<void> => {
  const { watch } = await import("chokidar");

  console.log(`\x1b[36m\u25B6\x1b[0m Watching ${readmePath} for changes...\n`);

  const watcher = watch(readmePath, { persistent: true });

  watcher.on("change", () => {
    console.clear();
    console.log(`\x1b[36m\u21BB\x1b[0m Change detected, rebuilding...\n`);
    build(readmePath, config, false);
  });

  process.on("SIGINT", () => {
    watcher.close();
    console.log("\n\x1b[33m\u25A0\x1b[0m Stopped watching");
    process.exit(0);
  });
};

const program = new Command();

program
  .name("dev-reel")
  .description("Generate animated SVG terminal previews from your README.md")
  .version("1.0.0");

program
  .command("build", { isDefault: true })
  .description("Build SVG from dev-reel blocks in README.md")
  .option("-r, --readme <path>", "Path to README.md", "README.md")
  .option("--dry-run", "Generate SVG without writing files", false)
  .option("--watch", "Watch README.md for changes", false)
  .action(async (opts: { readme: string; dryRun: boolean; watch: boolean }) => {
    const cwd = process.cwd();
    const config = loadConfig(cwd);
    const readmePath = resolve(cwd, opts.readme);

    console.log("\x1b[1m\x1b[36m\u2588\u2588\u2588 dev-reel\x1b[0m\n");

    if (opts.watch) {
      await watchMode(readmePath, config);
      return;
    }

    build(readmePath, config, opts.dryRun);
  });

program.parse();
