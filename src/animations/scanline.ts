import type { ThemeColors } from "../config.js";

export const scanlineAnimation = (
  theme: ThemeColors,
  terminalHeight: number,
  contentY: number,
): string => {
  const scanlineId = "scanline-grad";

  return `
    <defs>
      <linearGradient id="${scanlineId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0"/>
        <stop offset="45%" stop-color="${theme.accent}" stop-opacity="0.03"/>
        <stop offset="50%" stop-color="${theme.accent}" stop-opacity="0.06"/>
        <stop offset="55%" stop-color="${theme.accent}" stop-opacity="0.03"/>
        <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${contentY}" width="100%" height="30" fill="url(#${scanlineId})" opacity="0.8">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;0,${terminalHeight - contentY}"
        dur="4s"
        repeatCount="indefinite"
      />
    </rect>`;
};
