import type { ThemeColors } from "../config.js";
import { catppuccinMocha, catppuccinLatte } from "./catppuccin.js";
import { dracula } from "./dracula.js";
import { nord } from "./nord.js";
import { promiseInc } from "./promise.js";

const THEMES: Record<string, ThemeColors> = {
  "promise-inc": promiseInc,
  "catppuccin-mocha": catppuccinMocha,
  "catppuccin-latte": catppuccinLatte,
  dracula,
  nord,
};

export const getTheme = (name: string): ThemeColors => {
  const theme = THEMES[name];
  if (!theme) {
    const available = Object.keys(THEMES).join(", ");
    throw new Error(`Unknown theme "${name}". Available: ${available}`);
  }
  return theme;
};

export const listThemes = (): string[] => Object.keys(THEMES);
