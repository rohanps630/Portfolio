/**
 * Generates the System cover images as designed abstract art — one hand-authored
 * "system diagram motif" per slug, derived from that system's actual domain and
 * architecture. Covers are editorial DESIGN assets; screenshots are EVIDENCE and
 * are never generated here (see Engram: "Media — no fake assets"). Nothing in
 * these compositions may resemble a product screenshot, mock UI, or real
 * topology — pure abstract geometry, no text, no logos.
 *
 * Deterministic by construction: every coordinate is hand-set (no randomness,
 * no clock), so re-running reproduces the same designs. Rendering goes through
 * Playwright's Chromium (already a devDependency) — SVG → canvas → WebP — to
 * avoid adding an image-encoding dependency.
 *
 * Usage: bun run generate-covers
 * Output: public/images/projects/<slug>/cover.webp (1600×900 — the same 16:9
 * the case-study page uses for static diagrams and the fallback aspect-video).
 */

import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const WIDTH = 1600;
const HEIGHT = 900;
const OUT_ROOT = path.join(process.cwd(), "public", "images", "projects");

// Mirrors the dark-theme tokens in src/app/globals.css @theme. Baked images
// can't read CSS variables, so the values are duplicated here on purpose —
// if the theme changes, re-run this script.
const C = {
  bg: "#0a0a12",
  fg: "#f0f0f5",
  muted: "#13132a",
  mutedFg: "#8888a0",
  accent: "#6366f1",
  accentHover: "#818cf8",
  border: "#1e1e3a",
  card: "#111128",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
};

// ---------------------------------------------------------------------------
// Shared visual grammar — every cover is built from the same small vocabulary
// so the set reads as one designed system (echoes the ImagePlaceholder
// fallback: dark field, 40px grid, soft accent glow).
// ---------------------------------------------------------------------------

function svgOpen(): string {
  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glowAccent"><stop offset="0%" stop-color="${C.accent}" stop-opacity="0.22"/><stop offset="100%" stop-color="${C.accent}" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowSoft"><stop offset="0%" stop-color="${C.accentHover}" stop-opacity="0.10"/><stop offset="100%" stop-color="${C.accentHover}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${C.fg}" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${C.bg}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>`;
}

const svgClose = `</svg>`;

function glow(cx: number, cy: number, r: number, soft = false): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${soft ? "glowSoft" : "glowAccent"})"/>`;
}

interface NodeOpts {
  rx?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  dash?: string;
  opacity?: number;
}

function box(x: number, y: number, w: number, h: number, o: NodeOpts = {}): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 14}" fill="${o.fill ?? C.card}" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""}/>`;
}

function ring(cx: number, cy: number, r: number, o: NodeOpts = {}): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill ?? C.card}" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""}/>`;
}

function dot(cx: number, cy: number, r: number, fill = C.accent, opacity = 1): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;
}

function line(x1: number, y1: number, x2: number, y2: number, o: NodeOpts = {}): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""} stroke-linecap="round"/>`;
}

function curve(d: string, o: NodeOpts = {}): string {
  return `<path d="${d}" fill="none" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""} stroke-linecap="round"/>`;
}

// Small arrowhead pointing along the (dx,dy) direction at (x,y).
function arrowHead(x: number, y: number, dx: number, dy: number, color = C.accent): string {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const s = 9;
  return `<path d="M ${x} ${y} L ${x - ux * s * 1.8 + px * s} ${y - uy * s * 1.8 + py * s} L ${x - ux * s * 1.8 - px * s} ${y - uy * s * 1.8 - py * s} Z" fill="${color}"/>`;
}

// Concentric arcs radiating to the right of (cx,cy) — the "live signal" motif.
function ripples(cx: number, cy: number, radii: number[], color = C.accentHover): string {
  return radii
    .map(
      (r, i) =>
        `<path d="M ${cx + r * 0.5} ${cy - r * 0.866} A ${r} ${r} 0 0 1 ${cx + r * 0.5} ${cy + r * 0.866}" fill="none" stroke="${color}" stroke-width="2" opacity="${0.5 - i * 0.12}" stroke-linecap="round"/>`
    )
    .join("");
}

// Data-store cylinder (ellipse-capped) — abstract, no labels.
function store(cx: number, cy: number, w: number, h: number, stroke = C.border): string {
  const ry = w * 0.16;
  return [
    `<path d="M ${cx - w / 2} ${cy - h / 2 + ry} v ${h - ry * 2} a ${w / 2} ${ry} 0 0 0 ${w} 0 v ${-(h - ry * 2)}" fill="${C.card}" stroke="${stroke}" stroke-width="2"/>`,
    `<ellipse cx="${cx}" cy="${cy - h / 2 + ry}" rx="${w / 2}" ry="${ry}" fill="${C.card}" stroke="${stroke}" stroke-width="2"/>`,
  ].join("");
}

// ---------------------------------------------------------------------------
// One composition per system. Each is designed from that system's real
// architecture as recorded in src/content/systems/<slug>.ts — abstracted to
// pattern level (generic motifs only; never a redraw of real topology).
// ---------------------------------------------------------------------------

const covers: Record<string, () => string> = {
  // ReAct review loop with hybrid retrieval: code chunks flow through two
  // ranking stages into the agent's orbit; the agent emits a review (diff
  // bars) and the loop feeds back.
  "ai-code-reviewer": () => {
    const parts: string[] = [glow(950, 450, 380), glow(280, 420, 260, true)];
    // scattered code chunks (left field)
    const chunks: Array<[number, number, number]> = [
      [150, 260, 0.5], [215, 330, 0.35], [160, 420, 0.6], [240, 470, 0.4],
      [175, 560, 0.45], [265, 620, 0.3], [310, 280, 0.35], [330, 390, 0.55],
      [300, 540, 0.5], [225, 200, 0.3], [355, 640, 0.35], [140, 660, 0.3],
    ];
    for (const [x, y, op] of chunks) parts.push(box(x, y, 30, 30, { rx: 6, opacity: op, stroke: C.mutedFg }));
    // two retrieval stages (vertical filters), progressively narrower
    parts.push(box(470, 240, 26, 420, { rx: 13, stroke: C.accent, opacity: 0.55 }));
    parts.push(box(620, 310, 26, 280, { rx: 13, stroke: C.accent, opacity: 0.8 }));
    // converging flow into the agent
    parts.push(curve(`M 496 330 C 600 340 700 400 830 430`, { stroke: C.mutedFg, opacity: 0.5 }));
    parts.push(curve(`M 496 450 C 560 450 600 450 618 450`, { stroke: C.mutedFg, opacity: 0.5 }));
    parts.push(curve(`M 496 570 C 600 560 700 500 830 470`, { stroke: C.mutedFg, opacity: 0.5 }));
    parts.push(curve(`M 646 450 C 720 450 780 450 830 450`, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(arrowHead(838, 450, 1, 0));
    // the agent: core + orbital loop + tool satellites
    parts.push(ring(950, 450, 64, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(ring(950, 450, 22, { fill: C.accent, stroke: C.accent }));
    parts.push(ring(950, 450, 108, { fill: "none", dash: "3 10", stroke: C.accentHover, opacity: 0.7 }));
    const sat: Array<[number, number]> = [[950 + 108 * Math.cos(-Math.PI / 3), 450 + 108 * Math.sin(-Math.PI / 3)], [950 + 108 * Math.cos(Math.PI * 0.75), 450 + 108 * Math.sin(Math.PI * 0.75)], [950 + 108 * Math.cos(Math.PI / 2.4), 450 + 108 * Math.sin(Math.PI / 2.4)]];
    for (const [sx, sy] of sat) parts.push(ring(sx, sy, 14, { stroke: C.accentHover }));
    // review output: diff bars (evidence of added/removed lines, abstracted)
    parts.push(line(1058, 450, 1210, 450, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(arrowHead(1218, 450, 1, 0));
    parts.push(box(1230, 330, 230, 240, { rx: 16 }));
    const bars: Array<[number, string, number, number]> = [
      [378, C.success, 0.75, 120], [420, C.success, 0.6, 88], [462, C.error, 0.6, 104],
      [504, C.mutedFg, 0.5, 140], [546, C.error, 0.45, 72],
    ];
    for (const [by, col, op, bw] of bars) parts.push(`<rect x="1262" y="${by}" width="${bw}" height="14" rx="7" fill="${col}" opacity="${op}"/>`);
    // iteration loop back under the canvas
    parts.push(curve(`M 1345 570 C 1345 720 950 740 950 622`, { stroke: C.accentHover, dash: "4 10", opacity: 0.8 }));
    parts.push(arrowHead(950, 614, 0, -1, C.accentHover));
    return parts.join("\n");
  },

  // Orchestrator fan-out: one coordinator hands off to worker agents (one
  // path live), tools hang off each worker, event streams tick along below.
  "multi-agent-ops": () => {
    const parts: string[] = [glow(800, 260, 340), glow(800, 720, 300, true)];
    parts.push(box(700, 130, 200, 110, { rx: 18, stroke: C.accent, strokeWidth: 3 }));
    parts.push(dot(800, 185, 16, C.accent));
    const agents: Array<[number, boolean]> = [[430, false], [800, true], [1170, false]];
    for (const [ax, live] of agents) {
      parts.push(curve(`M 800 240 C 800 320 ${ax} 330 ${ax} 400`, { stroke: live ? C.accent : C.border, strokeWidth: live ? 3 : 2 }));
      if (live) parts.push(arrowHead(ax, 402, 0, 1));
      parts.push(box(ax - 80, 400, 160, 96, { rx: 16, stroke: live ? C.accentHover : C.border }));
      parts.push(dot(ax, 448, 11, live ? C.accentHover : C.mutedFg, live ? 1 : 0.7));
      // tool satellites per worker
      for (const off of [-46, 46]) {
        parts.push(line(ax + off * 0.55, 496, ax + off, 560, { opacity: 0.8 }));
        parts.push(ring(ax + off, 572, 11, { stroke: C.mutedFg }));
      }
    }
    // telemetry drops from each worker into the event streams below
    for (const [ax] of agents) parts.push(line(ax, 505, ax, 688, { dash: "2 10", stroke: C.mutedFg, opacity: 0.35 }));
    // event streams: three lanes of ticks, density varying — telemetry flowing
    for (const [ly, n, col] of [[700, 22, C.mutedFg], [745, 16, C.accent], [790, 26, C.mutedFg]] as Array<[number, number, string]>) {
      parts.push(line(300, ly, 1300, ly, { opacity: 0.35 }));
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        parts.push(dot(300 + 1000 * (t * t * 0.35 + t * 0.65), ly, 4.5, col, col === C.accent ? 0.9 : 0.5));
      }
    }
    return parts.join("\n");
  },

  // Two clients (landscape web, portrait mobile) bridged by one API spine;
  // realtime ripples off the spine, twin stores feed it from below.
  "learning-portal": () => {
    const parts: string[] = [glow(800, 450, 360), glow(1290, 430, 220, true)];
    parts.push(box(210, 320, 300, 200, { rx: 18 }));
    for (const iy of [370, 410, 450] as const) parts.push(line(250, iy, 250 + (iy === 370 ? 180 : iy === 410 ? 130 : 90), iy, { stroke: C.mutedFg, opacity: 0.5, strokeWidth: 6 }));
    parts.push(box(1200, 290, 170, 270, { rx: 24 }));
    for (const iy of [340, 380, 420] as const) parts.push(line(1232, iy, 1232 + (iy === 340 ? 106 : iy === 380 ? 78 : 50), iy, { stroke: C.mutedFg, opacity: 0.5, strokeWidth: 6 }));
    // the shared spine
    parts.push(box(770, 260, 60, 330, { rx: 30, stroke: C.accent, strokeWidth: 3 }));
    for (const sy of [330, 425, 520]) parts.push(dot(800, sy, 9, C.accent, 0.9));
    // identical contracts to both clients — mirrored connectors
    parts.push(line(510, 390, 770, 390, { stroke: C.accent, strokeWidth: 2.5 }));
    parts.push(line(510, 470, 770, 470, { stroke: C.border, strokeWidth: 2.5 }));
    parts.push(line(830, 390, 1200, 390, { stroke: C.accent, strokeWidth: 2.5 }));
    parts.push(line(830, 470, 1200, 470, { stroke: C.border, strokeWidth: 2.5 }));
    for (const dx of [600, 690, 950, 1090]) parts.push(dot(dx, 390, 6, C.accentHover));
    // realtime ripples from the spine
    parts.push(ripples(842, 425, [40, 64, 88]));
    // twin stores
    parts.push(store(700, 730, 90, 100));
    parts.push(store(900, 730, 90, 100));
    parts.push(line(730, 680, 782, 592, { opacity: 0.8 }));
    parts.push(line(870, 680, 818, 592, { opacity: 0.8 }));
    return parts.join("\n");
  },

  // Terminal fleet converging through one aggregation seam into heavy legacy
  // blocks; a deterministic checkout stepper runs beneath.
  "telecom-pos": () => {
    const parts: string[] = [glow(760, 430, 340), glow(1200, 450, 260, true)];
    // fleet of terminals
    const rows = [250, 350, 450, 550];
    const cols = [170, 260, 350, 440];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < cols.length; c++) {
        const active = (r + c) % 3 === 0;
        parts.push(box(cols[c], rows[r], 52, 52, { rx: 10, stroke: active ? C.accentHover : C.border, opacity: active ? 0.95 : 0.6 }));
        parts.push(dot(cols[c] + 26, rows[r] + 26, 5, active ? C.accentHover : C.mutedFg, active ? 0.9 : 0.4));
      }
    }
    // convergence into the BFF seam
    for (const ry of [276, 376, 476, 576]) parts.push(curve(`M 496 ${ry} C 600 ${ry} 620 ${430 + (ry - 430) * 0.15} 688 ${430 + (ry - 430) * 0.12}`, { stroke: C.mutedFg, opacity: 0.45 }));
    parts.push(box(690, 360, 140, 140, { rx: 20, stroke: C.accent, strokeWidth: 3 }));
    parts.push(ring(760, 430, 26, { stroke: C.accent }));
    parts.push(dot(760, 430, 9, C.accent));
    // one clean edge out, fanning to legacy blocks (double-stroked = heavy)
    parts.push(line(830, 430, 960, 430, { stroke: C.accent, strokeWidth: 3.5 }));
    for (const [ly, op] of [[270, 0.85], [430, 1], [590, 0.85]] as Array<[number, number]>) {
      parts.push(curve(`M 960 430 C 1020 430 1030 ${ly} 1090 ${ly}`, { stroke: C.border, strokeWidth: 2.5, opacity: op }));
      parts.push(box(1090, ly - 55, 200, 110, { rx: 8, opacity: op }));
      parts.push(box(1104, ly - 41, 172, 82, { rx: 5, fill: "none", stroke: C.border, opacity: 0.7 * op }));
      parts.push(line(1130, ly, 1250, ly, { stroke: C.mutedFg, strokeWidth: 5, opacity: 0.4 * op }));
    }
    // checkout as a deterministic state chain
    const steps = [560, 680, 800, 920, 1040];
    parts.push(line(steps[0], 780, steps[4], 780, { opacity: 0.7 }));
    steps.forEach((sx, i) => {
      const done = i < 2;
      const current = i === 2;
      parts.push(ring(sx, 780, 15, { stroke: done || current ? C.accent : C.border, fill: done ? C.accent : C.card, strokeWidth: current ? 3 : 2 }));
      if (current) parts.push(dot(sx, 780, 6, C.accentHover));
    });
    return parts.join("\n");
  },

  // Voice waveform enters a queue lane, fans out to services; a scored-lead
  // ramp rises below, call ripples top-left.
  "ai-automation-hub": () => {
    const parts: string[] = [glow(700, 450, 360), glow(220, 400, 220, true)];
    parts.push(ripples(180, 240, [30, 52, 74]));
    // waveform (deterministic sinusoid envelope)
    for (let i = 0; i < 15; i++) {
      const x = 150 + i * 20;
      const h = 24 + 92 * Math.abs(Math.sin(i * 0.9)) * (1 - Math.abs(i - 7) / 11);
      parts.push(line(x, 450 - h / 2, x, 450 + h / 2, { stroke: C.accentHover, strokeWidth: 8, opacity: 0.35 + 0.6 * (h / 116) }));
    }
    parts.push(curve(`M 460 450 C 500 450 520 450 545 450`, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(arrowHead(553, 450, 1, 0));
    // the queue lane with in-flight messages
    parts.push(box(565, 424, 400, 52, { rx: 26, stroke: C.accent }));
    for (const qx of [610, 685, 760, 835, 910]) parts.push(box(qx, 438, 24, 24, { rx: 6, fill: C.accent, stroke: C.accent, opacity: qx === 910 ? 1 : 0.45 + (qx - 610) / 700 }));
    // fan-out to services
    for (const [sy, live] of [[250, false], [450, true], [650, false]] as Array<[number, boolean]>) {
      parts.push(curve(`M 965 450 C 1050 450 1060 ${sy} 1130 ${sy}`, { stroke: live ? C.accent : C.border, strokeWidth: live ? 3 : 2 }));
      parts.push(box(1130, sy - 52, 170, 104, { rx: 16, stroke: live ? C.accentHover : C.border }));
      parts.push(dot(1215, sy, 10, live ? C.accentHover : C.mutedFg, live ? 1 : 0.6));
      if (live) parts.push(ripples(1310, sy, [26, 44]));
    }
    // lead-scoring ramp: ascending bars, best one lit
    const ramp = [36, 62, 92, 128, 170];
    ramp.forEach((h, i) => {
      const x = 560 + i * 56;
      const top = i === ramp.length - 1;
      parts.push(`<rect x="${x}" y="${790 - h}" width="30" height="${h}" rx="8" fill="${top ? C.accent : C.muted}" stroke="${top ? C.accent : C.border}" stroke-width="2" opacity="${top ? 1 : 0.8}"/>`);
      if (top) parts.push(dot(x + 15, 790 - h - 18, 7, C.accentHover));
    });
    return parts.join("\n");
  },

  // Two-way conversion: a waveform on one side becomes text-row dashes on the
  // other; mirrored message shapes, bidirectional arrows, live-region ripples.
  "accessible-chat-system": () => {
    const parts: string[] = [glow(800, 450, 380), glow(390, 300, 220, true)];
    // left message shape (speech side)
    parts.push(box(230, 210, 320, 180, { rx: 24, stroke: C.accentHover }));
    for (let i = 0; i < 9; i++) {
      const x = 285 + i * 24;
      const h = 22 + 70 * Math.abs(Math.sin(i * 1.1));
      parts.push(line(x, 300 - h / 2, x, 300 + h / 2, { stroke: C.accentHover, strokeWidth: 7, opacity: 0.85 }));
    }
    // right message shape (text side), mirrored low
    parts.push(box(1050, 510, 320, 180, { rx: 24, stroke: C.accent }));
    const rows: Array<[number, number[]]> = [
      [560, [70, 46, 90]], [600, [110, 60]], [640, [50, 84, 40]],
    ];
    for (const [ry, widths] of rows) {
      let rx = 1094;
      for (const w of widths) {
        parts.push(line(rx, ry, rx + w, ry, { stroke: C.fg, strokeWidth: 8, opacity: 0.35 }));
        rx += w + 22;
      }
    }
    // conversion axis: bars degrade into dashes across the center
    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      const x = 600 + i * 34;
      const y = 380 + t * 130;
      if (t < 0.5) {
        const h = 46 * (1 - t * 1.4);
        parts.push(line(x, y - h / 2, x, y + h / 2, { stroke: C.accent, strokeWidth: 6, opacity: 0.9 - t * 0.5 }));
      } else {
        parts.push(line(x - 10, y, x + 10, y, { stroke: C.accent, strokeWidth: 6, opacity: 0.4 + t * 0.5 }));
      }
    }
    // bidirectional arrows — the system runs both directions
    parts.push(curve(`M 570 260 C 800 170 1100 300 1210 480`, { stroke: C.accentHover, strokeWidth: 2.5, dash: "1 0" }));
    parts.push(arrowHead(1212, 484, 0.5, 0.9, C.accentHover));
    parts.push(curve(`M 1030 640 C 760 740 460 560 350 410`, { stroke: C.mutedFg, strokeWidth: 2.5 }));
    parts.push(arrowHead(348, 407, -0.5, -0.9, C.mutedFg));
    // live-region ripples announcing the new message
    parts.push(ripples(1382, 600, [28, 48, 68]));
    return parts.join("\n");
  },

  // Field device queues mutations under a pitched-roof frame; sync crosses a
  // connectivity gap to the server; a weather signal feeds the schedule slots.
  "roofing-crm": () => {
    const parts: string[] = [glow(800, 400, 360), glow(430, 600, 260, true)];
    // the pitch: two slopes meeting at an apex, with shingle-course lines
    // running parallel beneath — the compositional frame
    parts.push(line(150, 690, 800, 270, { stroke: C.mutedFg, strokeWidth: 3.5, opacity: 0.75 }));
    parts.push(line(800, 270, 1450, 690, { stroke: C.mutedFg, strokeWidth: 3.5, opacity: 0.75 }));
    for (const [off, op] of [[48, 0.4], [96, 0.26], [144, 0.15]] as Array<[number, number]>) {
      parts.push(line(150 + off * 0.9, 690, 800, 270 + off, { stroke: C.mutedFg, strokeWidth: 2, opacity: op }));
      parts.push(line(800, 270 + off, 1450 - off * 0.9, 690, { stroke: C.mutedFg, strokeWidth: 2, opacity: op }));
    }
    // weather signal above the apex, feeding the schedule
    parts.push(ring(800, 150, 30, { stroke: C.warning, strokeWidth: 3, fill: "none" }));
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      parts.push(line(800 + Math.cos(a) * 44, 150 + Math.sin(a) * 44, 800 + Math.cos(a) * 58, 150 + Math.sin(a) * 58, { stroke: C.warning, strokeWidth: 3, opacity: 0.85 }));
    }
    parts.push(line(800, 208, 800, 252, { stroke: C.warning, dash: "2 8", strokeWidth: 2.5, opacity: 0.9 }));
    // local store + queued mutations waiting for connectivity (left slope)
    parts.push(ring(400, 590, 52, { stroke: C.accent, strokeWidth: 3.5 }));
    parts.push(dot(400, 590, 16, C.accent));
    for (const [qx, qy, op] of [[510, 545, 1], [565, 575, 0.7], [620, 605, 0.45]] as Array<[number, number, number]>) {
      parts.push(box(qx, qy, 44, 44, { rx: 10, stroke: C.accentHover, strokeWidth: 2.5, opacity: op }));
      parts.push(dot(qx + 22, qy + 22, 6, C.accentHover, op * 0.9));
    }
    // connectivity gap
    parts.push(line(800, 400, 800, 800, { dash: "6 14", stroke: C.mutedFg, opacity: 0.65, strokeWidth: 2.5 }));
    // server + two-way sync across the gap
    parts.push(store(1130, 610, 120, 140, C.accent));
    parts.push(curve(`M 665 545 C 800 480 950 505 1050 555`, { stroke: C.accent, strokeWidth: 3.5 }));
    parts.push(arrowHead(1058, 559, 1, 0.4));
    for (const [dx2, dy2] of [[790, 505], [900, 508]]) parts.push(dot(dx2, dy2, 6, C.accentHover));
    parts.push(curve(`M 1055 680 C 940 725 700 715 470 660`, { stroke: C.mutedFg, dash: "4 10", strokeWidth: 2.5, opacity: 0.9 }));
    parts.push(arrowHead(462, 658, -1, -0.15, C.mutedFg));
    // schedule slots hanging off the right slope, weather-aware slot lit
    for (const [sx, sy, live] of [[905, 390, false], [1030, 465, true], [1155, 545, false], [1280, 625, false]] as Array<[number, number, boolean]>) {
      parts.push(box(sx, sy, 82, 42, { rx: 10, stroke: live ? C.warning : C.mutedFg, strokeWidth: live ? 3 : 2, opacity: live ? 1 : 0.55 }));
      parts.push(dot(sx + 41, sy + 21, 7, live ? C.warning : C.mutedFg, live ? 1 : 0.45));
    }
    return parts.join("\n");
  },

  // Claim stages as a state chain with a timed escalation branch; geotagged
  // evidence below; notifications fan out to stakeholders.
  "transit-claims": () => {
    const parts: string[] = [glow(800, 400, 360), glow(800, 170, 200, true)];
    // stage chain
    const stages = [250, 525, 800, 1075, 1350];
    stages.forEach((sx, i) => {
      if (i) {
        parts.push(line(stages[i - 1] + 30, 400, sx - 30, 400, { stroke: i <= 2 ? C.accent : C.border, strokeWidth: i <= 2 ? 3 : 2 }));
        parts.push(arrowHead(sx - 32, 400, 1, 0, i <= 2 ? C.accent : C.border));
      }
      const done = i < 2;
      const current = i === 2;
      parts.push(ring(sx, 400, 28, { stroke: done || current ? C.accent : C.border, strokeWidth: current ? 3.5 : 2.5, fill: C.card }));
      if (done) parts.push(dot(sx, 400, 11, C.accent, 0.9));
      if (current) parts.push(ring(sx, 400, 40, { fill: "none", stroke: C.accentHover, dash: "3 9", opacity: 0.8 }));
    });
    // escalation timer branch off the current stage
    parts.push(curve(`M 800 360 C 800 300 800 280 800 245`, { stroke: C.warning, dash: "4 9", strokeWidth: 2.5 }));
    parts.push(arrowHead(800, 240, 0, -1, C.warning));
    parts.push(ring(800, 185, 46, { stroke: C.warning, strokeWidth: 3, fill: C.card }));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      parts.push(line(800 + Math.cos(a) * 36, 185 + Math.sin(a) * 36, 800 + Math.cos(a) * 42, 185 + Math.sin(a) * 42, { stroke: C.warning, opacity: 0.8 }));
    }
    parts.push(line(800, 185, 800, 158, { stroke: C.warning, strokeWidth: 3 }));
    parts.push(line(800, 185, 818, 196, { stroke: C.warning, strokeWidth: 3 }));
    // geotagged evidence frame with annotation strokes
    parts.push(box(330, 570, 300, 200, { rx: 16 }));
    parts.push(dot(430, 640, 13, C.accent));
    parts.push(ring(430, 640, 22, { fill: "none", stroke: C.accent, opacity: 0.6 }));
    parts.push(`<path d="M 430 662 L 418 690 L 442 690 Z" fill="${C.accent}" opacity="0.85"/>`);
    parts.push(curve(`M 480 620 C 520 590 560 640 590 615`, { stroke: C.error, strokeWidth: 3, opacity: 0.8 }));
    parts.push(ring(540, 700, 26, { fill: "none", stroke: C.error, strokeWidth: 3, opacity: 0.7 }));
    // notification fan to stakeholders
    for (const [nx, ny] of [[1120, 690], [1230, 730], [1340, 690]]) {
      parts.push(line(1075, 440, nx, ny - 16, { stroke: C.mutedFg, opacity: 0.5, dash: "3 8" }));
      parts.push(dot(nx, ny, 11, C.accentHover, 0.85));
    }
    parts.push(ripples(1090, 452, [24, 40]));
    return parts.join("\n");
  },

  // Constraint inputs meet a solver; the solved schedule packs a grid without
  // overlap; nested rings mark encryption at rest.
  "dental-clinic-hms": () => {
    const parts: string[] = [glow(1040, 430, 340), glow(400, 450, 220, true)];
    // constraint inputs → solver diamond
    for (const [iy, op] of [[300, 0.9], [450, 0.7], [600, 0.9]] as Array<[number, number]>) {
      parts.push(dot(230, iy, 12, C.mutedFg, op * 0.8));
      parts.push(curve(`M 246 ${iy} C 330 ${iy} 380 ${450 + (iy - 450) * 0.15} 448 ${450 + (iy - 450) * 0.1}`, { stroke: C.mutedFg, opacity: 0.5 }));
    }
    parts.push(`<rect x="470" y="396" width="108" height="108" rx="18" transform="rotate(45 524 450)" fill="${C.card}" stroke="${C.accent}" stroke-width="3"/>`);
    parts.push(dot(524, 450, 12, C.accent));
    parts.push(line(600, 450, 690, 450, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(arrowHead(698, 450, 1, 0));
    // schedule grid
    const gx = 720, gy = 220, cw = 110, ch = 105, ncols = 6, nrows = 4;
    for (let cIdx = 0; cIdx <= ncols; cIdx++) parts.push(line(gx + cIdx * cw, gy, gx + cIdx * cw, gy + nrows * ch, { opacity: 0.6 }));
    for (let r = 0; r <= nrows; r++) parts.push(line(gx, gy + r * ch, gx + ncols * cw, gy + r * ch, { opacity: 0.6 }));
    // packed, non-overlapping blocks (col, row, span, color, opacity)
    const blocks: Array<[number, number, number, string, number]> = [
      [0, 0, 2, C.accent, 0.9], [3, 0, 1, C.muted, 1], [5, 0, 1, C.success, 0.5],
      [1, 1, 1, C.success, 0.5], [3, 1, 2, C.accent, 0.65], [0, 2, 1, C.muted, 1],
      [2, 2, 2, C.muted, 1], [5, 2, 1, C.accent, 0.5], [1, 3, 2, C.success, 0.4], [4, 3, 1, C.muted, 1],
    ];
    for (const [bc, br, span, col, op] of blocks) {
      parts.push(`<rect x="${gx + bc * cw + 10}" y="${gy + br * ch + 12}" width="${span * cw - 20}" height="${ch - 24}" rx="12" fill="${col}" opacity="${op}" stroke="${col === C.muted ? C.border : col}" stroke-width="2"/>`);
    }
    // encryption-at-rest: nested rings, bottom-left of the grid
    parts.push(ring(560, 720, 44, { stroke: C.accentHover, strokeWidth: 2.5, fill: C.card }));
    parts.push(ring(560, 720, 28, { stroke: C.accentHover, strokeWidth: 2, fill: "none", dash: "4 7" }));
    parts.push(dot(560, 720, 9, C.accentHover));
    parts.push(line(560, 676, 560, 640, { stroke: C.accentHover, opacity: 0.6, dash: "2 6" }));
    return parts.join("\n");
  },

  // The local ledger is the source of truth: rows queue on-device, sync
  // crosses the offline boundary both ways, a signature stroke seals the
  // report, a status timeline tracks the claim.
  "insurance-claims-field-app": () => {
    const parts: string[] = [glow(430, 470, 320), glow(1170, 450, 300, true)];
    // status timeline across the top
    const tl = [400, 640, 880, 1120];
    parts.push(line(tl[0], 140, tl[3], 140, { opacity: 0.7 }));
    tl.forEach((tx, i) => {
      const done = i < 3;
      parts.push(ring(tx, 140, 12, { stroke: done ? C.accent : C.border, fill: i === 2 ? C.accent : C.card, strokeWidth: 2.5 }));
    });
    // the device: portrait frame, ledger rows inside (two pending = accent)
    parts.push(box(280, 240, 300, 440, { rx: 30, stroke: C.accentHover, strokeWidth: 3 }));
    const ledger: Array<[number, boolean]> = [[300, false], [366, false], [432, true], [498, true], [564, false]];
    for (const [ly, pending] of ledger) {
      parts.push(box(320, ly, 220, 44, { rx: 10, stroke: pending ? C.accent : C.border, fill: pending ? C.muted : C.card }));
      parts.push(dot(348, ly + 22, 7, pending ? C.accent : C.mutedFg, pending ? 1 : 0.5));
      parts.push(line(374, ly + 22, 510, ly + 22, { stroke: C.mutedFg, strokeWidth: 5, opacity: pending ? 0.6 : 0.35 }));
    }
    // local store anchors the device — the source of truth
    parts.push(ring(430, 680, 34, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(dot(430, 680, 11, C.accent));
    // offline boundary
    parts.push(line(790, 200, 790, 780, { dash: "6 14", stroke: C.mutedFg, opacity: 0.6, strokeWidth: 2.5 }));
    // remote side: API face + store beneath
    parts.push(box(1060, 300, 260, 150, { rx: 20 }));
    for (const [py, pw] of [[350, 150], [390, 100]] as Array<[number, number]>) parts.push(line(1100, py, 1100 + pw, py, { stroke: C.mutedFg, strokeWidth: 6, opacity: 0.4 }));
    parts.push(store(1190, 620, 110, 130, C.border));
    parts.push(line(1190, 450, 1190, 552, { opacity: 0.8 }));
    // two-way sync across the boundary
    parts.push(curve(`M 580 400 C 720 350 900 350 1050 375`, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(arrowHead(1056, 376, 1, 0.15));
    parts.push(curve(`M 1050 420 C 900 470 720 480 590 470`, { stroke: C.mutedFg, dash: "4 10", strokeWidth: 2.5 }));
    parts.push(arrowHead(584, 470, -1, 0, C.mutedFg));
    // signature: one flowing stroke on its own card
    parts.push(box(880, 620, 300, 150, { rx: 16 }));
    parts.push(curve(`M 920 720 C 950 650 985 640 1000 700 C 1010 740 1040 660 1070 680 C 1095 697 1120 690 1148 672`, { stroke: C.accentHover, strokeWidth: 3.5 }));
    parts.push(line(915, 740, 1145, 740, { stroke: C.border, opacity: 0.9 }));
    return parts.join("\n");
  },

  // Staged onboarding climbs step by step (verification pips at the OTP
  // stage); the protected content grid unlocks at the top.
  "elearning-student-app": () => {
    const parts: string[] = [glow(760, 470, 380), glow(1300, 490, 240, true)];
    // rising path of stages
    const steps: Array<[number, number]> = [[250, 680], [500, 585], [750, 490], [1000, 395], [1250, 300]];
    steps.forEach(([sx, sy], i) => {
      if (i) {
        const [px, py] = steps[i - 1];
        parts.push(curve(`M ${px + 34} ${py - 12} C ${px + 130} ${py - 45} ${sx - 130} ${sy + 45} ${sx - 34} ${sy + 12}`, { stroke: i <= 3 ? C.accent : C.border, strokeWidth: i <= 3 ? 3 : 2 }));
      }
      const done = i < 3;
      const current = i === 3;
      parts.push(ring(sx, sy, 30, { stroke: done || current ? C.accent : C.border, strokeWidth: current ? 3.5 : 2.5 }));
      if (done) parts.push(dot(sx, sy, 12, C.accent, 0.9));
      if (current) {
        parts.push(dot(sx, sy, 8, C.accentHover));
        parts.push(ring(sx, sy, 44, { fill: "none", stroke: C.accentHover, dash: "3 9", opacity: 0.8 }));
      }
    });
    // OTP pips beneath the verification stage
    for (let i = 0; i < 4; i++) {
      const px = 690 + i * 44;
      parts.push(box(px, 570, 34, 42, { rx: 9, stroke: i < 2 ? C.accent : C.border }));
      if (i < 2) parts.push(dot(px + 17, 591, 6, C.accent));
    }
    // protected content grid past the final stage
    const cells: Array<[number, number, boolean]> = [
      [1150, 430, false], [1270, 430, true], [1390, 430, false],
      [1150, 560, false], [1270, 560, false], [1390, 560, false],
    ];
    for (const [cx2, cy2, lit] of cells) parts.push(box(cx2, cy2, 100, 110, { rx: 14, stroke: lit ? C.accentHover : C.mutedFg, strokeWidth: lit ? 3 : 2, fill: C.muted, opacity: lit ? 1 : 0.55 }));
    // final stage unlocks the content — dashed reach into the lit cell
    parts.push(curve(`M 1268 332 C 1290 365 1305 390 1315 422`, { stroke: C.accentHover, dash: "3 8", strokeWidth: 2.5, opacity: 0.9 }));
    parts.push(arrowHead(1317, 428, 0.3, 1, C.accentHover));
    // the lock seam guarding the grid's corner
    parts.push(ring(1148, 428, 26, { stroke: C.accentHover, strokeWidth: 2.5, fill: C.card }));
    parts.push(ring(1148, 428, 14, { stroke: C.accentHover, fill: "none", dash: "3 6" }));
    parts.push(dot(1148, 428, 5, C.accentHover));
    return parts.join("\n");
  },

  // A media-tile mosaic fed by a realtime hub; consumer, admin, and storage
  // orbit the shared API.
  "event-services-marketplace": () => {
    const parts: string[] = [glow(430, 450, 300), glow(1140, 450, 340, true)];
    // hub with socket ripples
    parts.push(ring(430, 450, 58, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(dot(430, 450, 18, C.accent));
    parts.push(ripples(500, 450, [80, 106, 132]));
    // consumer + admin clients and media storage around the hub
    parts.push(box(170, 190, 170, 120, { rx: 18, stroke: C.accentHover }));
    parts.push(dot(255, 250, 10, C.accentHover, 0.9));
    parts.push(box(170, 600, 170, 120, { rx: 18 }));
    parts.push(dot(255, 660, 10, C.mutedFg, 0.7));
    parts.push(store(560, 700, 100, 110));
    parts.push(curve(`M 340 275 C 380 320 395 350 415 392`, { stroke: C.accentHover, strokeWidth: 2.5 }));
    parts.push(curve(`M 340 645 C 380 600 395 555 415 508`, { stroke: C.border, strokeWidth: 2.5 }));
    parts.push(curve(`M 470 500 C 500 560 520 600 545 640`, { stroke: C.border, strokeWidth: 2.5, dash: "4 9" }));
    // feed line into the mosaic
    parts.push(line(488, 450, 810, 450, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(arrowHead(818, 450, 1, 0));
    // media mosaic: masonry tiles with varied tonal fills, one lit tile
    // kind: 0 = quiet card, 1 = raised, 2 = accent-tinted, 3 = lit
    const tiles: Array<[number, number, number, number, number]> = [
      [840, 180, 190, 210, 1], [1046, 180, 300, 130, 0], [1362, 180, 100, 210, 2],
      [1046, 326, 145, 200, 1], [1207, 326, 255, 64, 0],
      [840, 406, 190, 260, 2], [1207, 406, 255, 240, 3],
      [1046, 542, 145, 178, 0], [840, 682, 190, 38, 1],
    ];
    for (const [tx, ty, tw, th, kind] of tiles) {
      if (kind === 2) parts.push(`<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="12" fill="${C.accent}" opacity="0.14"/>`);
      parts.push(box(tx, ty, tw, th, {
        rx: 12,
        fill: kind === 1 || kind === 3 ? C.muted : "none",
        stroke: kind === 3 ? C.accent : C.mutedFg,
        strokeWidth: kind === 3 ? 3 : 2,
        opacity: kind === 3 ? 1 : 0.55,
      }));
      if (kind === 3) parts.push(ring(tx + tw / 2, ty + th / 2, 26, { fill: "none", stroke: C.accent, strokeWidth: 3 }));
    }
    return parts.join("\n");
  },

  // A farm-to-market route threads distinct waypoint stations; consignments
  // ride the path, documents accumulate, entity lanes gate into one channel.
  "supply-chain-field-app": () => {
    const parts: string[] = [glow(800, 450, 400), glow(280, 640, 220, true)];
    // entity lanes converging into the single typed gateway
    for (const [ly, op] of [[160, 0.5], [200, 0.65], [240, 0.5], [280, 0.4]] as Array<[number, number]>) {
      parts.push(line(140, ly, 330, ly, { stroke: C.mutedFg, opacity: op }));
      parts.push(curve(`M 330 ${ly} C 400 ${ly} 410 220 470 220`, { stroke: C.mutedFg, opacity: op * 0.8 }));
    }
    parts.push(box(470, 190, 64, 60, { rx: 14, stroke: C.accentHover }));
    parts.push(curve(`M 534 220 C 620 220 660 380 700 430`, { stroke: C.accentHover, dash: "4 9", opacity: 0.8 }));
    // the route: one continuous thread through the chain
    parts.push(curve(`M 220 700 C 380 560 420 420 560 400 C 700 380 760 520 900 540 C 1040 560 1120 380 1240 320 C 1300 290 1350 280 1400 275`, { stroke: C.accent, strokeWidth: 4 }));
    // waypoints: distinct station geometry per stage of the chain
    parts.push(ring(220, 700, 34, { stroke: C.success, strokeWidth: 3 }));
    parts.push(dot(220, 700, 11, C.success, 0.9));
    parts.push(box(524, 364, 72, 72, { rx: 12, stroke: C.accentHover, strokeWidth: 3 }));
    parts.push(dot(560, 400, 9, C.accentHover));
    parts.push(box(864, 504, 72, 72, { rx: 12, stroke: C.accentHover, strokeWidth: 3 }));
    parts.push(dot(900, 540, 9, C.accentHover));
    parts.push(ring(1240, 320, 34, { stroke: C.accent, strokeWidth: 3 }));
    parts.push(ring(1240, 320, 18, { stroke: C.accent, fill: "none" }));
    // consignments riding the route
    for (const [px, py, rot] of [[400, 520, -12], [730, 468, 8], [1080, 448, -6]] as Array<[number, number, number]>) {
      parts.push(`<rect x="${px - 15}" y="${py - 15}" width="30" height="30" rx="7" transform="rotate(${rot} ${px} ${py})" fill="${C.muted}" stroke="${C.accentHover}" stroke-width="2.5"/>`);
    }
    // the paper trail: offset document stack with rule lines
    for (let i = 2; i >= 0; i--) {
      const ox = 1240 + i * 16;
      const oy = 600 + i * 14;
      parts.push(box(ox, oy, 150, 190, { rx: 12, opacity: i === 0 ? 1 : 0.55 }));
      if (i === 0) {
        for (const [ry2, rw] of [[650, 90], [685, 64], [720, 78]] as Array<[number, number]>) parts.push(line(1265, ry2, 1265 + rw, ry2, { stroke: C.mutedFg, strokeWidth: 5, opacity: 0.5 }));
        parts.push(line(1265, 755, 1330, 755, { stroke: C.accent, strokeWidth: 5, opacity: 0.9 }));
      }
    }
    return parts.join("\n");
  },
};

// ---------------------------------------------------------------------------
// Render: SVG → Chromium canvas → WebP file.
// ---------------------------------------------------------------------------

async function main() {
  const only = process.argv.slice(2);
  const slugs = only.length > 0 ? only : Object.keys(covers);
  for (const slug of slugs) {
    if (!covers[slug]) {
      console.error(`❌ No cover design for slug: ${slug}`);
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

  for (const slug of slugs) {
    const svg = `${svgOpen()}\n${covers[slug]()}\n${svgClose}`;
    const dataUrl: string = await page.evaluate(
      async ({ source, w, h }) => {
        const img = new Image();
        const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("SVG failed to decode"));
          img.src = url;
        });
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        return canvas.toDataURL("image/webp", 0.9);
      },
      { source: svg, w: WIDTH, h: HEIGHT }
    );

    const base64 = dataUrl.split(",")[1];
    if (!dataUrl.startsWith("data:image/webp") || !base64) {
      console.error(`❌ WebP encoding failed for ${slug}`);
      process.exit(1);
    }
    const outDir = path.join(OUT_ROOT, slug);
    mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, "cover.webp");
    writeFileSync(outPath, Buffer.from(base64, "base64"));
    console.log(`✓ ${path.relative(process.cwd(), outPath)} (${(Buffer.from(base64, "base64").length / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
