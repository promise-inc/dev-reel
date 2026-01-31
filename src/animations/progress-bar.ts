import type { ThemeColors } from "../config.js";

export const progressBarKeyframes = (theme: ThemeColors): string => {
  return `
    @keyframes progressFill {
      0% { transform: scaleX(0); }
      80% { transform: scaleX(1); }
      100% { transform: scaleX(1); }
    }
    .progress-bar-fill {
      fill: ${theme.accent};
      transform-origin: left center;
      animation: progressFill 3s ease-out forwards;
    }`;
};
