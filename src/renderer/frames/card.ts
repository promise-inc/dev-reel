import type { FrameRenderer, FrameRenderOptions, FrameMetrics } from "./types.js";
import { escapeXml } from "../utils.js";

const TITLE_BAR_H = 40;

export const cardFrame: FrameRenderer = {
  getMetrics(showTitle: boolean): FrameMetrics {
    return {
      titleBarHeight: showTitle ? TITLE_BAR_H : 0,
      paddingX: 24,
      paddingY: 20,
      lineHeight: 20,
    };
  },

  render(opts: FrameRenderOptions): string {
    const { width, height, title, theme, showTitle } = opts;
    const r = 12;

    const shadow = `<defs>
      <filter id="card-shadow" x="-4%" y="-4%" width="108%" height="108%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.15"/>
      </filter>
    </defs>`;

    const titleSvg = showTitle
      ? `<text x="${width / 2}" y="26" text-anchor="middle" fill="${theme.titleText}" font-family="'Inter','SF Pro Display',-apple-system,system-ui,sans-serif" font-size="13" font-weight="600">${escapeXml(title)}</text>
    <line x1="0" y1="${TITLE_BAR_H}" x2="${width}" y2="${TITLE_BAR_H}" stroke="${theme.foreground}" stroke-width="0.5" opacity="0.1"/>`
      : "";

    return `
    ${shadow}
    <rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}" fill="${theme.background}" filter="url(#card-shadow)"/>
    <rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}" fill="none" stroke="${theme.foreground}" stroke-width="0.5" opacity="0.1"/>
    ${titleSvg}`;
  },
};
