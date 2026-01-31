import type { ThemeColors } from "../../config.js";

export interface FrameMetrics {
  titleBarHeight: number;
  paddingX: number;
  paddingY: number;
  bottomPadding?: number;
  lineHeight: number;
}

export interface FrameRenderOptions {
  width: number;
  height: number;
  title: string;
  theme: ThemeColors;
  showTitle: boolean;
}

export interface FrameResult {
  svg: string;
  metrics: FrameMetrics;
}

export interface FrameRenderer {
  render(opts: FrameRenderOptions): string;
  getMetrics(showTitle: boolean): FrameMetrics;
}
