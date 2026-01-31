export interface DevReelConfig {
  outputDir: string;
  defaultTheme: string;
  defaultAnimations: string[];
  maxLines: number;
}

export const DEFAULT_CONFIG: DevReelConfig = {
  outputDir: "assets",
  defaultTheme: "promise-inc",
  defaultAnimations: [],
  maxLines: 30,
};

export const LAYOUT_NAMES = ["single", "bento"] as const;
export type LayoutName = (typeof LAYOUT_NAMES)[number];

export const FRAME_NAMES = ["terminal", "none", "card", "browser", "mobile"] as const;
export type FrameName = (typeof FRAME_NAMES)[number];

export type PrefixOption = string | false;

export interface FontConfig {
  family: string;
  size: number;
}

export const DEFAULT_FONT: FontConfig = {
  family: "'JetBrains Mono','Fira Code','SF Mono','Cascadia Code',Consolas,monospace",
  size: 13,
};

export interface DevReelBlock {
  title: string;
  theme: string;
  animations: string[];
  lines: ParsedLine[];
  panels: ParsedLine[][];
  raw: string;
  watermark: boolean;
  width: number | "auto";
  frame: FrameName;
  cursor: boolean;
  prefix: PrefixOption;
  font: FontConfig;
  showTitle: boolean;
  rawMode: boolean;
  layout: LayoutName;
}

export interface ParsedLine {
  text: string;
  type: "command" | "error" | "warning" | "success" | "info" | "empty" | "progress" | "bar" | "notification";
  barValue?: number;
  barColor?: string;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  cursor: string;
  selectionBg: string;
  titleBar: string;
  titleText: string;
  dotRed: string;
  dotYellow: string;
  dotGreen: string;
  error: string;
  warning: string;
  success: string;
  command: string;
  comment: string;
  accent: string;
}

export type AnimationName =
  | "scanline"
  | "typing"
  | "fade-lines"
  | "blink-cursor"
  | "wave"
  | "pulse-error"
  | "glow-success"
  | "noise-overlay"
  | "progress-bar"
  | "grow-bars"
  | "slide-cards";
