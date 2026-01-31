import type { FrameRenderer, FrameRenderOptions, FrameMetrics } from "./types.js";

export const noneFrame: FrameRenderer = {
  getMetrics(): FrameMetrics {
    return {
      titleBarHeight: 0,
      paddingX: 16,
      paddingY: 12,
      lineHeight: 20,
    };
  },

  render(opts: FrameRenderOptions): string {
    const { width, height, theme } = opts;
    return `
    <rect x="0" y="0" width="${width}" height="${height}" fill="${theme.background}"/>`;
  },
};
