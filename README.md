# @promise-inc/dev-reel

**Turn your README into a cinematic dev showcase.**
Animated SVG previews for open-source projects — zero JS, zero canvas, GitHub-native.

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/terminal-default.svg" alt="dev-reel demo" width="700" />
</p>

---

## What is dev-reel?

dev-reel generates **animated SVG previews** directly from your `README.md`.

No screenshots. No GIFs. No videos.

Just **pure SVG**, beautifully animated, rendered natively by GitHub.

---

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

> iPhone-style mockup with dynamic island, status bar and home indicator. Notification cards slide in from the right.

### None

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/frame-none-metrics.svg" alt="no frame" width="600" />

> No chrome, just content. Metrics dashboard with animated bar charts.

---

## Bento Grid Layout

Two-panel layout with synchronized scroll animation — panels scroll in opposite directions.

### Features Showcase

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/bento-features.svg" alt="bento features" width="830" />

### Metrics + Roadmap

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/bento-metrics-roadmap.svg" alt="bento metrics" width="830" />

### Before / After

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/bento-before-after.svg" alt="bento before after" width="830" />

### Browser + API Docs

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/bento-browser-api.svg" alt="bento browser api" width="830" />

---

## Customization

### Width

```yaml
width: 830  # fixed width (default: auto, 560-900px)
```

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/width-830-progress.svg" alt="custom width" width="830" />

### Prefix

```yaml
prefix: ">"  # custom command prefix (default: "$")
```

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/prefix-sql-query.svg" alt="custom prefix" width="600" />

### Raw Mode

```yaml
raw: true  # disables auto line-type detection, all lines are plain text
```

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/raw-tech-stack.svg" alt="raw mode" width="600" />

### Cursor

```yaml
cursor: false  # hides the blinking cursor
```

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/cursor-false-status.svg" alt="cursor false" width="600" />

### Show Title

```yaml
show-title: false  # hides the title bar
```

<img src="https://raw.githubusercontent.com/promise-inc/dev-reel/main/examples/assets/show-title-false.svg" alt="no title" width="600" />

---

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

---

## Themes

4 built-in themes inspired by modern dev tooling.

| Theme | Style |
|-------|-------|
| `promise-inc` (default) | Dark with purple/green accents |
| `dracula` | Classic Dracula palette |
| `nord` | Cool blue Nordic tones |
| `catppuccin-mocha` | Warm pastel Catppuccin |

---

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
width: auto
cursor: true
prefix: "$"

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

---

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

---

## Line Types

dev-reel automatically detects line types by prefix (unless `raw: true`):

| Prefix | Type | Color |
|--------|------|-------|
| `$` (or custom prefix) | Command | Accent |
| `✔` / `OK` / `✅` | Success | Green |
| `✖` / `ERROR` / `❌` | Error | Red |
| `⚠` / `WARN` / `❗` | Warning | Yellow |
| `[===...]` | Progress bar | Accent |
| *(notification type)* | Notification card | Custom dot color |
| *(bar type)* | Horizontal bar chart | Custom bar color |

---

## CLI Usage

```bash
npx dev-reel               # build all dev-reel blocks
npx dev-reel build         # explicit build command
npx dev-reel build --watch # regenerate on README change
```

---

## GitHub Actions

```yaml
- name: Update Dev Reel
  run: npx dev-reel
```

---

## Why SVG?

- Native GitHub rendering
- Ultra-lightweight
- Animations without JavaScript
- Version-control friendly
- Works on GitHub, GitLab, npm

---

## Other Packages by Promise Inc

| Package | Description |
|---------|-------------|
| [`@promise-inc/ai-guard`](https://www.npmjs.com/package/@promise-inc/ai-guard) | Detect AI-generated code patterns |
| [`@promise-inc/fs-guard`](https://www.npmjs.com/package/@promise-inc/fs-guard) | File system protection and validation |
| [`@promise-inc/devlog`](https://www.npmjs.com/package/@promise-inc/devlog) | Logger with automatic context |
| [`@promise-inc/ui-states`](https://www.npmjs.com/package/@promise-inc/ui-states) | Auto-skeleton from real DOM |

---

## License

MIT — see [LICENSE](./LICENSE)

---

Developed by [Promise Inc.](https://promise.codes)
