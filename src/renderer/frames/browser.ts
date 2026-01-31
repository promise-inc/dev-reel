import type { FrameRenderer, FrameRenderOptions, FrameMetrics } from "./types.js";
import { escapeXml } from "../utils.js";

const TITLE_BAR_H = 42;

export const browserFrame: FrameRenderer = {
  getMetrics(showTitle: boolean): FrameMetrics {
    return {
      titleBarHeight: showTitle ? TITLE_BAR_H : 0,
      paddingX: 20,
      paddingY: 16,
      lineHeight: 20,
    };
  },

  render(opts: FrameRenderOptions): string {
    const { width, height, title, theme, showTitle } = opts;
    const r = 10;

    const titleBar = showTitle
      ? `
    <rect x="0" y="0" width="${width}" height="${TITLE_BAR_H}" rx="${r}" ry="0" fill="${theme.titleBar}"/>
    <rect x="0" y="${r}" width="${width}" height="${TITLE_BAR_H - r}" fill="${theme.titleBar}"/>

    <circle cx="18" cy="18" r="6" fill="${theme.dotRed}"/>
    <circle cx="38" cy="18" r="6" fill="${theme.dotYellow}"/>
    <circle cx="58" cy="18" r="6" fill="${theme.dotGreen}"/>

    <rect x="80" y="10" width="${width - 100}" height="22" rx="6" fill="${theme.background}" opacity="0.5"/>
    <text x="${width / 2}" y="25" text-anchor="middle" fill="${theme.titleText}" font-family="'Inter','SF Pro Display',-apple-system,system-ui,sans-serif" font-size="11" opacity="0.7">${escapeXml(title)}</text>

    <line x1="0" y1="${TITLE_BAR_H}" x2="${width}" y2="${TITLE_BAR_H}" stroke="${theme.background}" stroke-width="1" opacity="0.3"/>`
      : "";

    return `
    <defs>
      <clipPath id="browser-clip">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}"/>
      </clipPath>
    </defs>
    <g clip-path="url(#browser-clip)">
      <rect x="0" y="0" width="${width}" height="${height}" fill="${theme.background}"/>${titleBar}
    </g>
    <rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}" fill="none" stroke="${theme.titleBar}" stroke-width="1" opacity="0.5"/>`;
  },
};
