import type { ThemeColors } from "../config.js";

export const glowSuccessKeyframes = (theme: ThemeColors): string => {
  return `
    @keyframes glowSuccess {
      0%, 100% { filter: drop-shadow(0 0 0px ${theme.success}00); }
      50% { filter: drop-shadow(0 0 4px ${theme.success}66); }
    }
    .glow-success {
      animation: glowSuccess 2.5s ease-in-out infinite;
    }`;
};
