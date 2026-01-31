import type { ThemeColors } from "../config.js";

export const blinkCursorKeyframes = (theme: ThemeColors): string => {
  return `
    @keyframes blinkCursor {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .blink-cursor {
      fill: ${theme.cursor};
      animation: blinkCursor 1s step-end infinite;
    }`;
};
