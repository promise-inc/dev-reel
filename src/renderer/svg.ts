import type { DevReelBlock, ThemeColors } from "../config.js";
import { getTheme } from "../themes/index.js";
import { buildAnimations } from "../animations/index.js";
import { getFrame } from "./frames/index.js";
import { renderLine, measureTextWidth } from "./lines.js";
import { renderBentoSvg } from "./bento.js";

export const renderSvg = (block: DevReelBlock): string => {
  if (block.layout === "bento") {
    return renderBentoSvg(block);
  }

  const theme: ThemeColors = getTheme(block.theme);
  const lines = block.lines;
  const lineCount = lines.length;
  const font = block.font;

  const frame = getFrame(block.frame);
  const metrics = frame.getMetrics(block.showTitle);

  const maxTextWidth = Math.max(...lines.map((l) => measureTextWidth(l.text, font)), 400);
  const isMobile = block.frame === "mobile";
  const resolvedWidth = block.width === "auto"
    ? isMobile
      ? Math.min(Math.max(maxTextWidth, 375), 430)
      : Math.min(Math.max(maxTextWidth, 560), 900)
    : block.width;

  const contentY = metrics.titleBarHeight + metrics.paddingY;
  const bottom = metrics.bottomPadding ?? metrics.paddingY;
  const height = contentY + lineCount * metrics.lineHeight + bottom + 8;

  const hasAnimations = block.animations.length > 0;
  const hasProgressBar = block.animations.includes("progress-bar");

  const { css, svgElements } = buildAnimations({
    animations: block.animations,
    lines,
    theme,
    dimensions: { width: resolvedWidth, height, contentY },
  });

  const linesSvg = lines
    .map((line, i) => {
      const x = metrics.paddingX;
      const y = contentY + i * metrics.lineHeight + 14;
      return renderLine(line, i, x, y, { hasAnimations, hasProgressBar, terminalWidth: resolvedWidth, theme, font });
    })
    .join("\n    ");

  const showCursor = block.cursor && block.animations.includes("blink-cursor");
  const cursorSvg = showCursor
    ? `<rect class="blink-cursor" x="${metrics.paddingX}" y="${contentY + lineCount * metrics.lineHeight + 2}" width="8" height="15" rx="1"/>`
    : "";

  const watermarkSvg = block.watermark
    ? `<text x="${resolvedWidth - 8}" y="${height - 6}" text-anchor="end" fill="${theme.foreground}" opacity="0.05" font-family="'Inter','SF Pro Display',-apple-system,system-ui,sans-serif" font-size="10">@promise-inc/dev-reel</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${resolvedWidth} ${height}" width="${resolvedWidth}" height="${height}">
  <style>
    ${css}
  </style>
  ${frame.render({ width: resolvedWidth, height, title: block.title, theme, showTitle: block.showTitle })}
  <g>
    ${linesSvg}
  </g>
  ${cursorSvg}
  ${watermarkSvg}
  ${svgElements}
</svg>`;
};
