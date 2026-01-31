import type { DevReelBlock, ParsedLine, ThemeColors, FontConfig } from "../config.js";
import { DEFAULT_FONT } from "../config.js";
import { getTheme } from "../themes/index.js";
import { getFrame } from "./frames/index.js";
import { escapeXml } from "./utils.js";

const GAP = 16;
const LINE_HEIGHT = 22;
const PANEL_PADDING_X = 20;
const PANEL_PADDING_Y = 16;
const SCROLL_DURATION = 14;
const SLIDE_DURATION = 0.6;
const PAUSE_BEFORE_SCROLL = 0.8;

let bentoCounter = 0;

export const renderBentoSvg = (block: DevReelBlock): string => {
  const uid = `b${++bentoCounter}`;
  const theme: ThemeColors = getTheme(block.theme);
  const font = block.font ?? DEFAULT_FONT;
  const frame = getFrame(block.frame);
  const metrics = frame.getMetrics(block.showTitle);

  const panels = block.panels.length >= 2
    ? [block.panels[0], block.panels[1]]
    : [block.panels[0] ?? [], block.panels[0] ?? []];

  const totalWidth = block.width === "auto" ? 830 : block.width;
  const innerWidth = totalWidth - metrics.paddingX * 2;
  const panelWidth = (innerWidth - GAP) / 2;

  const maxPanelLines = Math.max(panels[0].length, panels[1].length);
  const visibleLines = Math.min(maxPanelLines, 10);
  const visibleHeight = visibleLines * LINE_HEIGHT + PANEL_PADDING_Y * 2;
  const totalHeight = metrics.titleBarHeight + metrics.paddingY + visibleHeight + metrics.paddingY + 8;

  const panelTopY = metrics.titleBarHeight + metrics.paddingY;
  const panelLeftX = metrics.paddingX;
  const panelRightX = metrics.paddingX + panelWidth + GAP;

  const panelsSvg = panels.map((panelLines, idx) => {
    const panelX = idx === 0 ? panelLeftX : panelRightX;
    const clipId = `${uid}-clip-${idx}`;
    const slideClass = idx === 0 ? `${uid}-slide-left` : `${uid}-slide-right`;
    const scrollClass = idx === 0 ? `${uid}-scroll-up` : `${uid}-scroll-down`;

    const duplicatedLines = [...panelLines, ...panelLines];

    const linesSvg = duplicatedLines.map((line, i) => {
      const x = PANEL_PADDING_X;
      const y = PANEL_PADDING_Y + i * LINE_HEIGHT + 15;
      return renderBentoLine(line, x, y, font, theme);
    }).join("\n          ");

    return `
    <defs>
      <clipPath id="${clipId}">
        <rect x="${panelX}" y="${panelTopY}" width="${panelWidth}" height="${visibleHeight}" rx="10"/>
      </clipPath>
    </defs>
    <g class="${slideClass}">
      <g clip-path="url(#${clipId})">
        <rect x="${panelX}" y="${panelTopY}" width="${panelWidth}" height="${visibleHeight}" rx="10" fill="${theme.selectionBg}" opacity="0.15"/>
        <g class="${scrollClass}">
          <g transform="translate(${panelX}, ${panelTopY})">
            ${linesSvg}
          </g>
        </g>
      </g>
    </g>`;
  }).join("\n");

  const panel0FullH = panels[0].length * LINE_HEIGHT;
  const panel1FullH = panels[1].length * LINE_HEIGHT;

  const css = buildBentoCss(panel0FullH, panel1FullH, uid);

  const watermarkSvg = block.watermark
    ? `<text x="${totalWidth - 8}" y="${totalHeight - 6}" text-anchor="end" fill="${theme.foreground}" opacity="0.05" font-family="'Inter','SF Pro Display',-apple-system,system-ui,sans-serif" font-size="10">@promise-inc/dev-reel</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <style>
    ${css}
  </style>
  ${frame.render({ width: totalWidth, height: totalHeight, title: block.title, theme, showTitle: block.showTitle })}
  ${panelsSvg}
  ${watermarkSvg}
</svg>`;
};

const renderBentoLine = (
  line: ParsedLine,
  x: number,
  y: number,
  font: FontConfig,
  theme: ThemeColors,
): string => {
  const escaped = escapeXml(line.text);
  const colorMap: Record<string, string> = {
    command: theme.command,
    error: theme.error,
    warning: theme.warning,
    success: theme.success,
    info: theme.foreground,
    empty: theme.foreground,
    progress: theme.accent,
  };
  const fill = colorMap[line.type] ?? theme.foreground;
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${font.family}" font-size="${font.size}">${escaped}</text>`;
};

const buildBentoCss = (
  panel0FullH: number,
  panel1FullH: number,
  uid: string,
): string => {
  const totalDelay = SLIDE_DURATION + PAUSE_BEFORE_SCROLL;

  return `
    .${uid}-slide-left {
      opacity: 0;
      animation: ${uid}-slideLeft ${SLIDE_DURATION}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .${uid}-slide-right {
      opacity: 0;
      animation: ${uid}-slideRight ${SLIDE_DURATION}s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
    }
    @keyframes ${uid}-slideLeft {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes ${uid}-slideRight {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .${uid}-scroll-up {
      animation: ${uid}-scrollUp ${SCROLL_DURATION}s ease-in-out ${totalDelay}s infinite;
    }
    .${uid}-scroll-down {
      transform: translateY(-${panel1FullH}px);
      animation: ${uid}-scrollDown ${SCROLL_DURATION}s ease-in-out ${totalDelay}s infinite;
    }
    @keyframes ${uid}-scrollUp {
      0%, 5% { transform: translateY(0); }
      45%, 55% { transform: translateY(-${panel0FullH}px); }
      95%, 100% { transform: translateY(0); }
    }
    @keyframes ${uid}-scrollDown {
      0%, 5% { transform: translateY(-${panel1FullH}px); }
      45%, 55% { transform: translateY(0); }
      95%, 100% { transform: translateY(-${panel1FullH}px); }
    }`;
};
