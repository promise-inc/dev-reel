import type { AnimationName, ParsedLine, ThemeColors } from "../config.js";
import { scanlineAnimation } from "./scanline.js";
import { blinkCursorKeyframes } from "./blink.js";
import { noiseOverlayAnimation } from "./noise-overlay.js";
import { progressBarKeyframes } from "./progress-bar.js";

interface AnimationResult {
  css: string;
  svgElements: string;
}

interface BuildOptions {
  animations: string[];
  lines: ParsedLine[];
  theme: ThemeColors;
  dimensions: { width: number; height: number; contentY: number };
}

export const buildAnimations = (opts: BuildOptions): AnimationResult => {
  const { animations, lines, theme, dimensions } = opts;
  const active = new Set(animations as AnimationName[]);
  let css = "";
  let svgElements = "";

  const hasTyping = active.has("typing");
  const hasFade = active.has("fade-lines");
  const hasWave = active.has("wave");
  const hasPulseError = active.has("pulse-error");
  const hasGlowSuccess = active.has("glow-success");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const anims: string[] = [];
    const baseDelay = 0.3 + i * 0.5;

    if (hasTyping) {
      const delay = baseDelay + Math.random() * 0.1;
      anims.push(`typeLine 0.4s ease-out ${delay.toFixed(2)}s forwards`);
    }

    if (hasFade && !hasTyping) {
      const delay = 0.2 + i * 0.35;
      anims.push(`fadeLine 0.8s ease-in-out ${delay.toFixed(2)}s forwards`);
    }

    if (hasWave) {
      const delay = i * 0.12;
      anims.push(`waveBob 3s ease-in-out ${(baseDelay + 0.5 + delay).toFixed(2)}s infinite`);
    }

    if (line.type === "error" && hasPulseError) {
      anims.push(`pulseError 2s ease-in-out ${(baseDelay + 0.5).toFixed(2)}s infinite`);
    }

    if (line.type === "success" && hasGlowSuccess) {
      anims.push(`glowSuccess 2.5s ease-in-out ${(baseDelay + 0.5).toFixed(2)}s infinite`);
    }

    if (anims.length === 0) continue;

    const needsHidden = hasTyping || (hasFade && !hasTyping);
    css += `
    .line-${i} {${needsHidden ? "\n      opacity: 0;" : ""}
      animation: ${anims.join(",\n        ")};
    }`;
  }

  if (hasTyping) {
    css += `
    @keyframes typeLine {
      0% { opacity: 0; transform: translateX(-4px); }
      100% { opacity: 1; transform: translateX(0); }
    }`;
  }

  if (hasFade && !hasTyping) {
    css += `
    @keyframes fadeLine {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }`;
  }

  if (hasWave) {
    css += `
    @keyframes waveBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-1.5px); }
    }`;
  }

  if (hasPulseError) {
    css += `
    @keyframes pulseError {
      0%, 100% { fill-opacity: 1; }
      50% { fill-opacity: 0.5; }
    }`;
  }

  if (hasGlowSuccess) {
    css += `
    @keyframes glowSuccess {
      0%, 100% { filter: drop-shadow(0 0 0px ${theme.success}00); }
      50% { filter: drop-shadow(0 0 4px ${theme.success}88); }
    }`;
  }

  if (active.has("slide-cards")) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.type === "notification") {
        const delay = (0.3 + i * 0.25).toFixed(2);
        css += `
    .notif-card-${i} {
      opacity: 0;
      transform: translateX(40px);
      animation: slideCard 0.5s ease-out ${delay}s forwards;
    }`;
      }
    }
    css += `
    @keyframes slideCard {
      0% { opacity: 0; transform: translateX(40px); }
      100% { opacity: 1; transform: translateX(0); }
    }`;
  }

  if (active.has("grow-bars")) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.type === "bar") {
        const delay = (0.4 + i * 0.35).toFixed(2);
        css += `
    .bar-fill-${i} {
      transform: scaleX(0);
      transform-origin: left center;
      animation: growBar 0.8s ease-out ${delay}s forwards;
    }`;
      }
    }
    css += `
    @keyframes growBar {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }`;
  }

  if (active.has("blink-cursor")) {
    css += blinkCursorKeyframes(theme);
  }

  if (active.has("progress-bar")) {
    css += progressBarKeyframes(theme);
  }

  if (active.has("scanline")) {
    svgElements += scanlineAnimation(theme, dimensions.height, dimensions.contentY);
  }

  if (active.has("noise-overlay")) {
    svgElements += noiseOverlayAnimation(dimensions.width, dimensions.height);
  }

  return { css, svgElements };
};

export const listAnimations = (): string[] => [
  "scanline",
  "typing",
  "fade-lines",
  "blink-cursor",
  "wave",
  "pulse-error",
  "glow-success",
  "noise-overlay",
  "progress-bar",
  "grow-bars",
  "slide-cards",
];
