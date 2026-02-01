# @promise-inc/dev-reel

**Turn your README into a cinematic dev showcase.**
Animated SVG previews for open-source projects — zero JS, zero canvas, GitHub-native.

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/terminal-default.svg" alt="dev-reel demo" width="700" />
</p>

## Why?

README screenshots are static, GIFs are heavy, and videos don't render on GitHub:

- Screenshots go stale the moment you ship
- GIFs are huge files with bad quality
- Videos require external hosting
- None of them are version-control friendly

`dev-reel` generates **animated SVG previews** directly from your README — pure CSS, zero JavaScript, rendered natively by GitHub.

## Frames

5 built-in frame styles to match any context.

### Terminal (default)

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/terminal-default.svg" alt="terminal frame" width="600" />

> macOS-style terminal with traffic light dots and title bar.

### Card

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/frame-card-changelog.svg" alt="card frame" width="600" />

> Clean rounded card with subtle shadow. Great for changelogs and feature lists.

### Browser

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/frame-browser-api.svg" alt="browser frame" width="600" />

> Address bar with navigation dots. Perfect for API docs and web content.

### Mobile

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/frame-mobile-notifications.svg" alt="mobile frame" width="430" />

> iPhone-style mockup with dynamic island, status bar and home indicator.

### None

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/frame-none-metrics.svg" alt="no frame" width="600" />

> No chrome, just content. Metrics dashboard with animated bar charts.

## Bento Grid Layout

Two-panel layout with synchronized scroll animation — panels scroll in opposite directions.

### Features Showcase

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/bento-features.svg" alt="bento features" width="830" />

### Before / After

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/bento-before-after.svg" alt="bento before after" width="830" />

## How it works

### 1. Write a `dev-reel` block in your README

````markdown
```dev-reel
title: my project
theme: promise-inc
animation:
  - typing
  - blink-cursor
frame: terminal

$ npm install my-project
✔ added 1 package in 0.8s
$ npx my-project
✔ Done!
```
````

### 2. Run one command

```bash
npx dev-reel
```

### 3. dev-reel does the magic

- Reads your README
- Finds `dev-reel` blocks
- Generates animated SVGs
- Saves to `/assets`
- Replaces blocks with image references

## Animations

All animations are **pure CSS** — zero JavaScript, GitHub-compatible.

| Animation | Description |
|-----------|-------------|
| `typing` | Lines appear one by one with delay |
| `blink-cursor` | Classic terminal cursor blink |
| `fade-lines` | Progressive opacity reveal |
| `scanline` | CRT-style horizontal scan line |
| `wave` | Subtle vertical oscillation per line |
| `pulse-error` | Error lines pulse in and out |
| `glow-success` | Success lines glow softly |
| `noise-overlay` | CRT noise texture overlay |
| `progress-bar` | Animated loading bar for `[===]` lines |
| `grow-bars` | Bar charts grow from left to right |
| `slide-cards` | Notification cards slide in from right |

## Themes

4 built-in themes inspired by modern dev tooling.

| Theme | Style |
|-------|-------|
| `promise-inc` (default) | Dark with purple/green accents |
| `dracula` | Classic Dracula palette |
| `nord` | Cool blue Nordic tones |
| `catppuccin-mocha` | Warm pastel Catppuccin |

## Frontmatter Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | `"terminal"` | Title shown in frame chrome |
| `theme` | string | `"promise-inc"` | Color theme |
| `animation` | string[] | `[]` | List of animations to apply |
| `frame` | string | `"terminal"` | Frame style: `terminal`, `card`, `browser`, `mobile`, `none` |
| `layout` | string | `"single"` | Layout: `single` or `bento` (two panels split by `---`) |
| `width` | number \| `"auto"` | `"auto"` | SVG width in pixels |
| `cursor` | boolean | `true` | Show blinking cursor |
| `prefix` | string \| `false` | `"$"` | Command line prefix for line detection |
| `show-title` | boolean | `true` | Show/hide title bar |
| `raw` | boolean | `false` | Disable auto line-type detection |
| `font-family` | string | JetBrains Mono | Monospace font stack |
| `font-size` | number | `13` | Font size in pixels |
| `watermark` | boolean | `true` | Show `@promise-inc/dev-reel` watermark |

## CLI Usage

```bash
npx dev-reel               # build all dev-reel blocks
npx dev-reel build         # explicit build command
npx dev-reel build --watch # regenerate on README change
```

## GitHub Actions

```yaml
- name: Update Dev Reel
  run: npx dev-reel
```

## Why SVG?

- Native GitHub rendering
- Ultra-lightweight
- Animations without JavaScript
- Version-control friendly
- Works on GitHub, GitLab, npm

## Web Version

Don't want to use the CLI? Try the **web version** at [promise.codes/code-to-reel](https://promise.codes/code-to-reel) — generate previews directly in your browser with:

- **Static PNG** export
- **Animated SVG** export
- **WebM video** download
- Full configuration UI (themes, frames, animations, fonts)

## How to report bugs

To report a bug, please first read our guide on [opening issues](https://github.com/promise-inc/dev-reel/issues).

## How to contribute code

To open a pull request, please first read our guide on [opening pull requests](https://github.com/promise-inc/dev-reel/pulls), which outlines our process for RFCs and pull requests.

## Also by Promise Inc.

| Package | Description |
|---------|-------------|
| [`@promise-inc/ai-guard`](https://github.com/promise-inc/ai-guard) | Detect AI-generated code patterns |
| [`@promise-inc/ps-guard`](https://github.com/promise-inc/ps-guard) | Lighthouse-based performance guard |
| [`@promise-inc/fs-guard`](https://github.com/promise-inc/fs-guard) | Validate project folder and file structure |
| [`@promise-inc/devlog`](https://github.com/promise-inc/devlog) | Logger with automatic context (file + line) |
| [`@promise-inc/ui-states`](https://github.com/promise-inc/ui-states) | Auto-generated skeleton loading states |

---

Developed by [Promise Inc.](https://promise.codes)

## License

MIT © [Promise Inc.](https://promise.codes)
