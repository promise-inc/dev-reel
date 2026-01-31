import type { DevReelBlock, ParsedLine, PrefixOption } from "../config.js";
import { parseFrontmatter } from "./yaml.js";

const BLOCK_REGEX = /```dev-reel\n([\s\S]*?)```/g;
const PANEL_SEPARATOR = /^---$/;

export const extractBlocks = (content: string): DevReelBlock[] => {
  const blocks: DevReelBlock[] = [];
  let match: RegExpExecArray | null;

  while ((match = BLOCK_REGEX.exec(content)) !== null) {
    const raw = match[1];
    const {
      title, theme, animations, watermark, body,
      width, frame, cursor, prefix, font, showTitle, rawMode, layout,
    } = parseFrontmatter(raw);

    const panels = splitPanels(body).map((panelBody) => parseLines(panelBody, prefix, rawMode));
    const lines = panels[0] ?? [];

    blocks.push({
      title, theme, animations, lines, panels, raw, watermark,
      width, frame, cursor, prefix, font, showTitle, rawMode, layout,
    });
  }

  return blocks;
};

const splitPanels = (body: string): string[] => {
  const lines = body.split("\n");
  const panels: string[][] = [[]];

  for (const line of lines) {
    if (PANEL_SEPARATOR.test(line.trim())) {
      panels.push([]);
    } else {
      panels[panels.length - 1].push(line);
    }
  }

  return panels
    .map((p) => p.join("\n").trim())
    .filter((p) => p.length > 0);
};

const parseLines = (body: string, prefix: PrefixOption, rawMode: boolean): ParsedLine[] => {
  return body.split("\n").map((text): ParsedLine => {
    const trimmed = text.trim();

    if (trimmed === "") return { text, type: "empty" };
    if (rawMode) return { text, type: "info" };

    if (prefix !== false && trimmed.startsWith(prefix)) {
      return { text, type: "command" };
    }

    if (trimmed.startsWith("\u2716") || trimmed.startsWith("ERROR") || trimmed.startsWith("\u274C")) {
      return { text, type: "error" };
    }
    if (trimmed.startsWith("\u26A0") || trimmed.startsWith("WARN") || trimmed.startsWith("\u2757")) {
      return { text, type: "warning" };
    }
    if (trimmed.startsWith("\u2714") || trimmed.startsWith("OK") || trimmed.startsWith("\u2705")) {
      return { text, type: "success" };
    }
    if (trimmed.includes("[") && trimmed.includes("]") && (trimmed.includes("=") || trimmed.includes("#"))) {
      return { text, type: "progress" };
    }

    return { text, type: "info" };
  });
};
