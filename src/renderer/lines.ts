import type { ParsedLine, ThemeColors, FontConfig } from "../config.js";
import { DEFAULT_FONT } from "../config.js";
import { escapeXml } from "./utils.js";

interface LineRenderOptions {
  hasAnimations: boolean;
  hasProgressBar: boolean;
  terminalWidth: number;
  theme: ThemeColors;
  font?: FontConfig;
}

export const renderLine = (
  line: ParsedLine,
  index: number,
  x: number,
  y: number,
  opts: LineRenderOptions,
): string => {
  const { hasAnimations, hasProgressBar, terminalWidth, theme } = opts;
  const font = opts.font ?? DEFAULT_FONT;
  const escaped = escapeXml(line.text);

  const colorMap: Record<string, string> = {
    command: theme.command,
    error: theme.error,
    warning: theme.warning,
    success: theme.success,
    info: theme.foreground,
    empty: theme.foreground,
    progress: theme.accent,
    notification: theme.foreground,
  };

  const fill = colorMap[line.type] ?? theme.foreground;
  const classAttr = hasAnimations ? ` class="line-${index}"` : "";

  if (line.type === "progress" && hasProgressBar) {
    const barWidth = terminalWidth - x * 2;
    const barHeight = 10;
    const barY = y - 9;
    return `<g${classAttr}>
      <rect x="${x}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="4" fill="${theme.selectionBg}"/>
      <rect class="progress-bar-fill" x="${x}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="4"/>
    </g>`;
  }

  if (line.type === "bar") {
    const barValue = Math.max(0, Math.min(100, line.barValue ?? 0));
    const barColor = line.barColor ?? theme.accent;
    const barPadding = 0;
    const totalBarWidth = terminalWidth - x * 2 - barPadding;
    const fillWidth = Math.round(totalBarWidth * (barValue / 100));
    const barHeight = 8;
    const barY = y - 8;
    const hasGrow = hasAnimations;
    const growClass = hasGrow ? ` class="bar-fill bar-fill-${index}"` : "";
    return `<g${classAttr}>
      <rect x="${x}" y="${barY}" width="${totalBarWidth}" height="${barHeight}" rx="4" fill="${theme.selectionBg}"/>
      <rect${growClass} x="${x}" y="${barY}" width="${fillWidth}" height="${barHeight}" rx="4" fill="${barColor}" opacity="0.85"/>
      ${escaped ? `<text x="${x + totalBarWidth + 8}" y="${y}" fill="${theme.foreground}" font-family="${font.family}" font-size="${font.size - 1}" opacity="0.6">${escaped}</text>` : ""}
    </g>`;
  }

  if (line.type === "notification") {
    const dotColor = line.barColor ?? theme.accent;
    const cardWidth = terminalWidth - x * 2;
    const cardHeight = 44;
    const cardY = y - 18;
    const cardX = x;
    const dotR = 6;
    const dotCx = cardX + 18;
    const dotCy = cardY + cardHeight / 2;
    const textX = dotCx + dotR + 12;
    const textY = cardY + cardHeight / 2 + 4;
    const slideClass = hasAnimations ? ` class="notif-card notif-card-${index}"` : "";
    return `<g${classAttr}>
      <g${slideClass}>
        <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" rx="10" fill="${theme.selectionBg}" opacity="0.6"/>
        <circle cx="${dotCx}" cy="${dotCy}" r="${dotR}" fill="${dotColor}"/>
        <text x="${textX}" y="${textY}" fill="${theme.foreground}" font-family="'Inter','SF Pro Display',-apple-system,system-ui,sans-serif" font-size="${font.size}">${escaped}</text>
      </g>
    </g>`;
  }

  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${font.family}" font-size="${font.size}"${classAttr}>${escaped}</text>`;
};

export const measureTextWidth = (text: string, font?: FontConfig): number => {
  const size = font?.size ?? DEFAULT_FONT.size;
  const charWidth = size * 0.6;
  return text.length * charWidth + 40;
};
