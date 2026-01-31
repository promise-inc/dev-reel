import YAML from "yaml";
import { FRAME_NAMES, DEFAULT_FONT, LAYOUT_NAMES } from "../config.js";
import type { FrameName, PrefixOption, FontConfig, LayoutName } from "../config.js";

const FRONTMATTER_KEYS = [
  "title:", "theme:", "animation", "watermark:",
  "width:", "frame:", "cursor:", "prefix:", "font:",
  "show-title:", "raw:", "layout:",
  "- ",
];

interface FrontmatterResult {
  title: string;
  theme: string;
  animations: string[];
  watermark: boolean;
  width: number | "auto";
  frame: FrameName;
  cursor: boolean;
  prefix: PrefixOption;
  font: FontConfig;
  showTitle: boolean;
  rawMode: boolean;
  layout: LayoutName;
  body: string;
}

export const parseFrontmatter = (raw: string): FrontmatterResult => {
  const lines = raw.split("\n");
  const frontmatterLines: string[] = [];
  const bodyLines: string[] = [];
  let isFrontmatter = true;

  for (const line of lines) {
    if (isFrontmatter) {
      const trimmed = line.trim();
      if (FRONTMATTER_KEYS.some((key) => trimmed.startsWith(key))) {
        frontmatterLines.push(line);
        continue;
      }
      if (trimmed === "") {
        if (frontmatterLines.length > 0) {
          isFrontmatter = false;
        }
        continue;
      }
      isFrontmatter = false;
      bodyLines.push(line);
    } else {
      bodyLines.push(line);
    }
  }

  const sanitizedLines = frontmatterLines.map((line) => {
    const match = line.match(/^(\s*(?:title|theme)\s*:\s*)(.+)$/);
    if (match) {
      const [, prefix, value] = match;
      const trimmedVal = value.trim();
      if (trimmedVal && !trimmedVal.startsWith('"') && !trimmedVal.startsWith("'")) {
        return `${prefix}"${trimmedVal}"`;
      }
    }
    return line;
  });

  const parsed = YAML.parse(sanitizedLines.join("\n")) as Record<string, unknown> | null;

  const title = typeof parsed?.title === "string" ? parsed.title : "terminal";
  const theme = typeof parsed?.theme === "string" ? parsed.theme : "promise-inc";
  const watermark = parsed?.watermark !== false;

  let animations: string[] = [];
  const rawAnimations = parsed?.animation ?? parsed?.animations;
  if (Array.isArray(rawAnimations)) {
    animations = rawAnimations.filter((a): a is string => typeof a === "string");
  }

  const width = parseWidth(parsed?.width);
  const frame = parseFrame(parsed?.frame);
  const cursor = parsed?.cursor !== false;
  const prefix = parsePrefix(parsed?.prefix);
  const font = parseFont(parsed?.font);
  const showTitle = (parsed?.["show-title"] as unknown) !== false;
  const rawMode = parsed?.raw === true;
  const layout = parseLayout(parsed?.layout);

  return {
    title,
    theme,
    animations,
    watermark,
    width,
    frame,
    cursor,
    prefix,
    font,
    showTitle,
    rawMode,
    layout,
    body: bodyLines.join("\n").trim(),
  };
};

const parseWidth = (value: unknown): number | "auto" => {
  if (typeof value === "number" && value > 0) return value;
  return "auto";
};

const parseFrame = (value: unknown): FrameName => {
  if (typeof value === "string" && (FRAME_NAMES as readonly string[]).includes(value)) {
    return value as FrameName;
  }
  return "terminal";
};

const parsePrefix = (value: unknown): PrefixOption => {
  if (value === false) return false;
  if (typeof value === "string") return value;
  return "$";
};

const parseLayout = (value: unknown): LayoutName => {
  if (typeof value === "string" && (LAYOUT_NAMES as readonly string[]).includes(value)) {
    return value as LayoutName;
  }
  return "single";
};

const parseFont = (value: unknown): FontConfig => {
  if (typeof value !== "object" || value === null) return { ...DEFAULT_FONT };
  const obj = value as Record<string, unknown>;
  return {
    family: typeof obj.family === "string" ? obj.family : DEFAULT_FONT.family,
    size: typeof obj.size === "number" && obj.size > 0 ? obj.size : DEFAULT_FONT.size,
  };
};
