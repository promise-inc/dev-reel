import type { ThemeColors } from "../config.js";

export const pulseErrorKeyframes = (theme: ThemeColors): string => {
  return `
    @keyframes pulseError {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    .pulse-error {
      animation: pulseError 2s ease-in-out infinite;
      fill: ${theme.error};
    }`;
};
