import type { ThemeColors } from "../config.js";
import { terminalFrame } from "./frames/terminal.js";

interface TerminalFrameOptions {
  width: number;
  height: number;
  title: string;
  theme: ThemeColors;
}

export const renderTerminalFrame = (opts: TerminalFrameOptions): string => {
  return terminalFrame.render({ ...opts, showTitle: true });
};

const metrics = terminalFrame.getMetrics(true);
export const TITLE_BAR_HEIGHT = metrics.titleBarHeight;
export const PADDING_X = metrics.paddingX;
export const PADDING_Y = metrics.paddingY;
export const LINE_HEIGHT = metrics.lineHeight;
