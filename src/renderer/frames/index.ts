import type { FrameName } from "../../config.js";
import type { FrameRenderer } from "./types.js";
import { terminalFrame } from "./terminal.js";
import { noneFrame } from "./none.js";
import { cardFrame } from "./card.js";
import { browserFrame } from "./browser.js";
import { mobileFrame } from "./mobile.js";

const FRAME_REGISTRY: Record<FrameName, FrameRenderer> = {
  terminal: terminalFrame,
  none: noneFrame,
  card: cardFrame,
  browser: browserFrame,
  mobile: mobileFrame,
};

export const getFrame = (name: FrameName): FrameRenderer => {
  return FRAME_REGISTRY[name];
};

export type { FrameRenderer, FrameMetrics, FrameRenderOptions, FrameResult } from "./types.js";
