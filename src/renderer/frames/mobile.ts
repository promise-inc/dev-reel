import type { FrameRenderer, FrameRenderOptions, FrameMetrics } from "./types.js";
import { escapeXml } from "../utils.js";

const STATUS_BAR_HEIGHT = 54;
const HOME_INDICATOR_HEIGHT = 34;

export const mobileFrame: FrameRenderer = {
  getMetrics(showTitle: boolean): FrameMetrics {
    return {
      titleBarHeight: showTitle ? STATUS_BAR_HEIGHT : 20,
      paddingX: 24,
      paddingY: 24,
      bottomPadding: 120,
      lineHeight: 28,
    };
  },

  render(opts: FrameRenderOptions): string {
    const { width, height, title, theme, showTitle } = opts;
    const r = 44;
    const islandW = 120;
    const islandH = 34;
    const islandX = (width - islandW) / 2;
    const islandY = 10;
    const islandR = islandH / 2;

    const statusBar = showTitle
      ? `
    <rect x="${islandX}" y="${islandY}" width="${islandW}" height="${islandH}" rx="${islandR}" ry="${islandR}" fill="#000"/>
    <text x="28" y="30" fill="${theme.foreground}" font-family="'SF Pro Display','Inter',-apple-system,system-ui,sans-serif" font-size="14" font-weight="600" opacity="0.9">9:41</text>
    <g transform="translate(${width - 76}, 18)" opacity="0.9">
      <rect x="0" y="2" width="16" height="10" rx="1.5" fill="none" stroke="${theme.foreground}" stroke-width="1.2"/>
      <rect x="1.5" y="3.5" width="11" height="7" rx="0.5" fill="${theme.foreground}"/>
      <rect x="16" y="5" width="1.5" height="4" rx="0.5" fill="${theme.foreground}"/>
      <g transform="translate(24, 0)">
        <path d="M0 12 L4 2 L8 8 L12 0 L16 12" fill="none" stroke="${theme.foreground}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g transform="translate(48, 0)">
        <path d="M0 10 C0 10, 4 0, 8 0 C12 0, 16 10, 16 10" fill="none" stroke="${theme.foreground}" stroke-width="1.3" stroke-linecap="round"/>
      </g>
    </g>
    <text x="${width / 2}" y="${STATUS_BAR_HEIGHT - 6}" text-anchor="middle" fill="${theme.foreground}" font-family="'SF Pro Display','Inter',-apple-system,system-ui,sans-serif" font-size="16" font-weight="600">${escapeXml(title)}</text>`
      : "";

    const homeIndicator = `
    <rect x="${(width - 134) / 2}" y="${height - 18}" width="134" height="5" rx="2.5" fill="${theme.foreground}" opacity="0.2"/>`;

    return `
    <defs>
      <clipPath id="mobile-clip">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}"/>
      </clipPath>
    </defs>
    <g clip-path="url(#mobile-clip)">
      <rect x="0" y="0" width="${width}" height="${height}" fill="${theme.background}"/>${statusBar}
    </g>
    <rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}" fill="none" stroke="${theme.foreground}" stroke-width="3" opacity="0.12"/>${homeIndicator}`;
  },
};

export const MOBILE_DEFAULT_WIDTH = 375;
export const MOBILE_HOME_INDICATOR_HEIGHT = HOME_INDICATOR_HEIGHT;
