import { readFileSync } from "node:fs";
import { extractBlocks } from "./block.js";
import type { DevReelBlock } from "../config.js";

export const parseReadme = (filePath: string): DevReelBlock[] => {
  const content = readFileSync(filePath, "utf-8");
  return extractBlocks(content);
};
