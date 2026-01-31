#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderSvg } from "./dist/renderer/svg.js";
import { DEFAULT_FONT } from "./dist/config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "preview.html");

function block(overrides) {
  return {
    title: "terminal",
    theme: "promise-inc",
    animations: [],
    lines: [],
    panels: [],
    raw: "",
    watermark: true,
    width: "auto",
    frame: "terminal",
    cursor: true,
    prefix: "$",
    font: { ...DEFAULT_FONT },
    showTitle: true,
    rawMode: false,
    layout: "single",
    ...overrides,
  };
}

function lines(strs) {
  return strs.map((s) => {
    const t = s.trim();
    if (t === "") return { text: s, type: "empty" };
    if (t.startsWith("$")) return { text: s, type: "command" };
    if (t.startsWith("\u2714") || t.startsWith("OK") || t.startsWith("\u2705")) return { text: s, type: "success" };
    if (t.startsWith("\u2716") || t.startsWith("ERROR") || t.startsWith("\u274C")) return { text: s, type: "error" };
    if (t.startsWith("\u26A0") || t.startsWith("WARN") || t.startsWith("\u2757")) return { text: s, type: "warning" };
    if (t.includes("[") && t.includes("]") && (t.includes("=") || t.includes("#"))) return { text: s, type: "progress" };
    return { text: s, type: "info" };
  });
}

function rawLines(strs) {
  return strs.map((s) => {
    if (s.trim() === "") return { text: s, type: "empty" };
    return { text: s, type: "info" };
  });
}

// ── #1 Terminal default ──
const svg1 = renderSvg(block({
  title: "npm install",
  animations: ["typing", "blink-cursor"],
  lines: lines([
    "$ npm install @promise-inc/dev-reel",
    "\u2714 added 1 package in 0.8s",
    "",
    "$ npx dev-reel",
    "\u2714 Found 3 dev-reel blocks",
    "\u2714 Generated assets/dev-reel-1.svg",
    "\u2714 Generated assets/dev-reel-2.svg",
    "\u2714 Generated assets/dev-reel-3.svg",
    "\u2714 README.md updated",
  ]),
}));

// ── #2 Frame: none ──
const svg2 = renderSvg(block({
  title: "metrics",
  frame: "none",
  theme: "dracula",
  animations: ["fade-lines", "grow-bars"],
  cursor: false,
  rawMode: true,
  lines: [
    { text: "Acme Corp \u2014 Q4 Results", type: "info" },
    { text: "", type: "empty" },
    { text: "Revenue          $4.2M  \u2191 23%", type: "info" },
    { text: "", type: "bar", barValue: 85, barColor: "#50fa7b" },
    { text: "", type: "empty" },
    { text: "Active Users       18K  \u2191 41%", type: "info" },
    { text: "", type: "bar", barValue: 72, barColor: "#8be9fd" },
    { text: "", type: "empty" },
    { text: "Churn Rate        1.2%  \u2193 0.3%", type: "info" },
    { text: "", type: "bar", barValue: 12, barColor: "#ff5555" },
    { text: "", type: "empty" },
    { text: "NPS Score           72  \u2191 8pts", type: "info" },
    { text: "", type: "bar", barValue: 72, barColor: "#bd93f9" },
    { text: "", type: "empty" },
    { text: "Uptime          99.97%", type: "info" },
    { text: "", type: "bar", barValue: 99, barColor: "#50fa7b" },
  ],
}));

// ── #3 Frame: card ──
const svg3 = renderSvg(block({
  title: "Changelog v2.0",
  frame: "card",
  theme: "catppuccin-mocha",
  animations: ["typing", "glow-success"],
  cursor: false,
  rawMode: true,
  lines: rawLines([
    "What\u2019s New in v2.0",
    "",
    "\u2714 Dark mode support",
    "\u2714 Multi-language (12 languages)",
    "\u2714 Offline-first with sync",
    "\u2714 Redesigned dashboard",
    "\u2714 API v2 with GraphQL",
    "\u2714 60% faster load times",
    "\u26A0 Deprecated: REST v1 (sunset March)",
  ]),
}));

// ── #4 Frame: browser ──
const svg4 = renderSvg(block({
  title: "api.myapp.com/docs",
  frame: "browser",
  theme: "nord",
  animations: ["fade-lines"],
  cursor: false,
  rawMode: true,
  lines: rawLines([
    "GET    /api/users          List all users",
    "POST   /api/users          Create a user",
    "GET    /api/users/:id      Get user by ID",
    "PUT    /api/users/:id      Update user",
    "DELETE /api/users/:id      Delete user",
    "",
    "GET    /api/projects       List projects",
    "POST   /api/projects       Create project",
    "",
    "\u2714 All endpoints authenticated via Bearer token",
  ]),
}));

// ── #5 Frame: mobile ──
const svg5 = renderSvg(block({
  title: "Notifications",
  frame: "mobile",
  animations: ["slide-cards", "fade-lines"],
  cursor: false,
  rawMode: true,
  lines: [
    { text: "Today", type: "info" },
    { text: "", type: "empty" },
    { text: "Sarah liked your photo \u2022 2m", type: "notification", barColor: "#ff6b8a" },
    { text: "", type: "empty" },
    { text: "New follower: @designlabs \u2022 5m", type: "notification", barColor: "#8b5cf6" },
    { text: "", type: "empty" },
    { text: "Your order has shipped! \u2022 12m", type: "notification", barColor: "#f59e0b" },
    { text: "", type: "empty" },
    { text: "Payment received: $49.00 \u2022 1h", type: "notification", barColor: "#10b981" },
    { text: "", type: "empty" },
    { text: "", type: "empty" },
    { text: "Yesterday", type: "info" },
    { text: "", type: "empty" },
    { text: "Welcome to the app! \u2022 18h", type: "notification", barColor: "#3b82f6" },
    { text: "", type: "empty" },
    { text: "Complete your profile \u2022 1d", type: "notification", barColor: "#6366f1" },
  ],
}));

// ── #6 Width 830 + progress ──
const svg6 = renderSvg(block({
  title: "deploy preview",
  width: 830,
  animations: ["typing", "progress-bar", "blink-cursor"],
  lines: lines([
    "$ npx vercel --prod",
    "Vercel CLI 33.0.0",
    "Building project...",
    "[#########################################] 100%",
    "\u2714 Build complete",
    "\u2714 Deployed to production",
    "\u2714 https://myapp.vercel.app",
  ]),
}));

// ── #7 cursor: false ──
const svg7 = renderSvg(block({
  title: "system status",
  cursor: false,
  animations: ["fade-lines"],
  rawMode: true,
  lines: rawLines([
    "Service Status \u2014 All Systems Operational",
    "",
    "API Gateway       \u25CF Online     < 45ms",
    "Database          \u25CF Online     < 12ms",
    "CDN               \u25CF Online     < 8ms",
    "Search            \u25CF Online     < 92ms",
    "Email Service     \u25CF Online     < 200ms",
    "",
    "Last incident: 14 days ago",
  ]),
}));

// ── #8 prefix: > ──
const svg8 = renderSvg(block({
  title: "psql \u2014 myapp_production",
  prefix: ">",
  animations: ["fade-lines"],
  lines: lines([
    "> SELECT plan, COUNT(*) FROM users GROUP BY plan;",
    "  plan       | count",
    "  free       |  8421",
    "  pro        |  2105",
    "  enterprise |   342",
    "\u2714 3 rows returned (12ms)",
  ]),
}));

// ── #9 raw: true ──
const svg9 = renderSvg(block({
  title: "Tech Stack",
  frame: "card",
  theme: "dracula",
  animations: ["fade-lines"],
  cursor: false,
  rawMode: true,
  lines: rawLines([
    "Frontend     React 19 + TypeScript",
    "Styling      Tailwind CSS v4",
    "Backend      Node.js + Fastify",
    "Database     PostgreSQL + Drizzle",
    "Cache        Redis",
    "Search       Meilisearch",
    "Hosting      Vercel + Railway",
    "CI/CD        GitHub Actions",
  ]),
}));

// ── #10 show-title: false ──
const svg10 = renderSvg(block({
  title: "hidden",
  showTitle: false,
  animations: ["typing", "blink-cursor"],
  lines: lines([
    "$ cat .env.example",
    "DATABASE_URL=postgresql://...",
    "REDIS_URL=redis://localhost:6379",
    "API_KEY=your-key-here",
    "JWT_SECRET=change-me",
  ]),
}));

// ── #11 Bento: features ──
const b11L = rawLines(["For Developers","","Auto-generates SVGs from README","Pure CSS animations, zero JS","Works on GitHub, GitLab, npm","5 frames: terminal, card,","  browser, mobile, none","Bento grid layout","4 built-in color themes","Watch mode with hot reload"]);
const b11R = rawLines(["For Teams","","Consistent README branding","No design tools needed","Version-controlled animations","One command to update all","CI/CD friendly (npx dev-reel)","Customizable prefix & fonts","Mobile & browser mockups","Open source, MIT license"]);
const svg11 = renderSvg(block({ title: "Features", layout: "bento", frame: "card", showTitle: false, cursor: false, rawMode: true, lines: b11L, panels: [b11L, b11R] }));

// ── #12 Bento: metrics + roadmap ──
const b12L = rawLines(["Performance","","Lighthouse Score     98/100","First Paint          0.8s","Bundle Size          12 kB","Dependencies              3","Weekly Downloads      2.4K","GitHub Stars            480","Open Issues               2","Test Coverage           94%"]);
const b12R = rawLines(["Roadmap 2025","","\u2714 Frame system (5 types)","\u2714 Bento grid layout","\u2714 Custom fonts & prefix","  Theme editor (visual)","  prefers-color-scheme","  Export to PNG / video","  VS Code extension","  Plugin API for frames"]);
const svg12 = renderSvg(block({ title: "Project Health", layout: "bento", theme: "catppuccin-mocha", frame: "card", cursor: false, rawMode: true, lines: b12L, panels: [b12L, b12R] }));

// ── #13 Bento: before/after ──
const b13L = rawLines(["Before","","Plain text README","No visual previews","Static badges only","Hard to show features","Users scroll past docs","No brand consistency","Boring, forgettable","Low engagement"]);
const b13R = rawLines(["After","","Animated SVG previews","Terminal & app mockups","Interactive feel, no JS","Features come alive","Users stop and look","Consistent branding","Memorable, shareable","2x more engagement"]);
const svg13 = renderSvg(block({ title: "README Comparison", layout: "bento", theme: "dracula", frame: "none", cursor: false, rawMode: true, lines: b13L, panels: [b13L, b13R] }));

// ── #14 Bento: browser API ──
const b14L = rawLines(["Authentication","","POST /auth/login","  email: string","  password: string","  \u2192 { token, refreshToken }","","POST /auth/register","  name: string","  email: string","  password: string","  \u2192 { user, token }","","POST /auth/refresh","  refreshToken: string","  \u2192 { token }"]);
const b14R = rawLines(["Resources","","GET  /api/projects","  \u2192 { data: Project[], total }","","POST /api/projects","  name: string","  description?: string","  \u2192 { data: Project }","","GET  /api/projects/:id","  \u2192 { data: Project }","","PUT  /api/projects/:id","  \u2192 { data: Project }"]);
const svg14 = renderSvg(block({ title: "docs.myapp.com", layout: "bento", width: 830, theme: "nord", frame: "browser", cursor: false, rawMode: true, lines: b14L, panels: [b14L, b14R] }));

// ── HTML ──
const items = [
  { id: 1, label: "Terminal (default) — typing + blink-cursor", svg: svg1 },
  { id: 2, label: "Frame: none — metricas", svg: svg2 },
  { id: 3, label: "Frame: card — changelog catppuccin", svg: svg3 },
  { id: 4, label: "Frame: browser — API docs nord", svg: svg4 },
  { id: 5, label: "Frame: mobile — notifications", svg: svg5 },
  { id: 6, label: "Width 830px — progress-bar + deploy", svg: svg6 },
  { id: 7, label: "cursor: false — system status", svg: svg7 },
  { id: 8, label: "prefix: > — SQL query", svg: svg8 },
  { id: 9, label: "raw: true — tech stack", svg: svg9 },
  { id: 10, label: "show-title: false", svg: svg10 },
  { id: 11, label: "Bento: features showcase", svg: svg11 },
  { id: 12, label: "Bento: metrics + roadmap", svg: svg12 },
  { id: 13, label: "Bento: before / after", svg: svg13 },
  { id: 14, label: "Bento: browser 830px + API docs", svg: svg14 },
];

//
// ── APPROVAL STATE ──
// Set to true when approved. Hidden in HTML.
//
const approved = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  13: true,
  14: true,
};

// Which one to show now
const CURRENT = 14;

const sections = items.map((item) => {
  const isApproved = approved[item.id] === true;
  const isCurrent = item.id === CURRENT;
  const show = isCurrent && !isApproved;
  const comment = isApproved ? "APPROVED" : isCurrent ? "CURRENT" : "PENDING";
  return `
  <!-- #${item.id} ${item.label} [${comment}] -->
  <section id="item-${item.id}"${show ? '' : ' style="display:none"'}>
    <p class="label">#${item.id} — ${item.label}</p>
    <div class="svg-wrap">${item.svg}</div>
  </section>`;
}).join("\n");

const approvedCount = Object.values(approved).filter(Boolean).length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>dev-reel preview — #${CURRENT}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @media (prefers-color-scheme: dark) {
      body { background: #0e1116; color: #fff; }
    }
    @media (prefers-color-scheme: light) {
      body { background: #ffffff; color: #111; }
    }
    body {
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      padding: 48px 24px 96px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .container { max-width: 900px; width: 100%; }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 4px; }
    .sub { font-size: 13px; opacity: 0.4; margin-bottom: 48px; }
    section { margin-bottom: 48px; }
    .label { font-size: 13px; opacity: 0.5; margin-bottom: 16px; letter-spacing: 0.02em; }
    .svg-wrap { display: flex; justify-content: center; }
    .svg-wrap svg { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>dev-reel preview</h1>
    <p class="sub">#${CURRENT} of ${items.length} — ${approvedCount} approved</p>
    ${sections}
  </div>
</body>
</html>`;

writeFileSync(OUTPUT, html, "utf-8");
console.log(`\x1b[32m\u2714\x1b[0m preview.html \u2192 showing #${CURRENT} (${approvedCount}/${items.length} approved)`);

// ── Export SVGs ──
if (process.argv.includes("--export")) {
  const { mkdirSync } = await import("node:fs");
  const ASSETS = resolve(__dirname, "examples", "assets");
  mkdirSync(ASSETS, { recursive: true });

  const fileNames = {
    1: "terminal-default",
    2: "frame-none-metrics",
    3: "frame-card-changelog",
    4: "frame-browser-api",
    5: "frame-mobile-notifications",
    6: "width-830-progress",
    7: "cursor-false-status",
    8: "prefix-sql-query",
    9: "raw-tech-stack",
    10: "show-title-false",
    11: "bento-features",
    12: "bento-metrics-roadmap",
    13: "bento-before-after",
    14: "bento-browser-api",
  };

  for (const item of items) {
    const name = fileNames[item.id] ?? `dev-reel-${item.id}`;
    const path = resolve(ASSETS, `${name}.svg`);
    writeFileSync(path, item.svg, "utf-8");
  }
  console.log(`\x1b[32m\u2714\x1b[0m ${items.length} SVGs exported to examples/assets/`);
}
