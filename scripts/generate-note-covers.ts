/**
 * Generates the Note (blog) cover images as designed abstract art — one motif
 * per note *category*, varied deterministically per slug so same-category notes
 * never look identical. Covers are editorial DESIGN assets (same rule as the
 * System covers in generate-covers.ts): pure abstract geometry, no text, no
 * logos, nothing resembling a real screenshot or UI. They are used only for
 * social-share / JSON-LD metadata, never rendered on-page.
 *
 * Deterministic by construction: the only "randomness" is a seeded PRNG keyed
 * off each note's slug (no clock, no Math.random), so re-running reproduces the
 * exact same images. This mirrors generate-covers.ts on purpose — the shared
 * visual grammar (dark field, 40px grid, accent glow, the box/ring/dot/line/
 * curve vocabulary) keeps System and Note art reading as one designed system.
 *
 * Rendering goes through Playwright's Chromium (already a devDependency):
 * SVG → canvas → JPEG. Output paths come straight from each note's frontmatter
 * `coverImage`, so the files land exactly where the validator expects.
 *
 * Usage: bun run generate-note-covers            (all notes)
 *        bun run generate-note-covers <slug ...>  (subset)
 */

import { chromium } from "@playwright/test";
import matter from "gray-matter";
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const WIDTH = 1600;
const HEIGHT = 900;
const NOTES_DIR = path.join(process.cwd(), "src", "content", "notes");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Mirrors the dark-theme tokens in src/app/globals.css @theme (kept in sync
// with generate-covers.ts). Baked images can't read CSS variables.
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
  warning: "#f59e0b",
};

// --- deterministic seeded PRNG (FNV-1a hash → mulberry32) ------------------
function seedFromSlug(slug: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number): () => number {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Rng = () => number;
const pick = <T>(rng: Rng, arr: T[]): T => arr[Math.floor(rng() * arr.length)];
const between = (rng: Rng, lo: number, hi: number): number => lo + rng() * (hi - lo);

// --- shared visual grammar (mirrors generate-covers.ts) --------------------
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

interface Opts {
  rx?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  dash?: string;
  opacity?: number;
}
const glow = (cx: number, cy: number, r: number, soft = false) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${soft ? "glowSoft" : "glowAccent"})"/>`;
const box = (x: number, y: number, w: number, h: number, o: Opts = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 14}" fill="${o.fill ?? C.card}" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""}/>`;
const ring = (cx: number, cy: number, r: number, o: Opts = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill ?? C.card}" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""}/>`;
const dot = (cx: number, cy: number, r: number, fill = C.accent, opacity = 1) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;
const line = (x1: number, y1: number, x2: number, y2: number, o: Opts = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""} stroke-linecap="round"/>`;
const curve = (d: string, o: Opts = {}) =>
  `<path d="${d}" fill="none" stroke="${o.stroke ?? C.border}" stroke-width="${o.strokeWidth ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity !== undefined ? ` opacity="${o.opacity}"` : ""} stroke-linecap="round"/>`;
function arrowHead(x: number, y: number, dx: number, dy: number, color = C.accent): string {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len, px = -uy, py = ux, s = 9;
  return `<path d="M ${x} ${y} L ${x - ux * s * 1.8 + px * s} ${y - uy * s * 1.8 + py * s} L ${x - ux * s * 1.8 - px * s} ${y - uy * s * 1.8 - py * s} Z" fill="${color}"/>`;
}
function ripples(cx: number, cy: number, radii: number[], color = C.accentHover): string {
  return radii
    .map(
      (r, i) =>
        `<path d="M ${cx + r * 0.5} ${cy - r * 0.866} A ${r} ${r} 0 0 1 ${cx + r * 0.5} ${cy + r * 0.866}" fill="none" stroke="${color}" stroke-width="2" opacity="${0.5 - i * 0.12}" stroke-linecap="round"/>`
    )
    .join("");
}
function store(cx: number, cy: number, w: number, h: number, stroke = C.border): string {
  const ry = w * 0.16;
  return [
    `<path d="M ${cx - w / 2} ${cy - h / 2 + ry} v ${h - ry * 2} a ${w / 2} ${ry} 0 0 0 ${w} 0 v ${-(h - ry * 2)}" fill="${C.card}" stroke="${stroke}" stroke-width="2"/>`,
    `<ellipse cx="${cx}" cy="${cy - h / 2 + ry}" rx="${w / 2}" ry="${ry}" fill="${C.card}" stroke="${stroke}" stroke-width="2"/>`,
  ].join("");
}

// --- one motif per category, seeded per slug -------------------------------
// Each composition is anchored to the right/centre with a soft glow, echoing
// the System covers. The seeded rng only nudges counts, the highlighted index,
// and small offsets — never enough to break the layout.

type Motif = (rng: Rng) => string;

const motifs: Record<string, Motif> = {
  // AI — an agent core with a dashed orbit + tool satellites, fed by a signal
  // from the left; concentric ripples answer on the right.
  ai: (rng) => {
    const p: string[] = [glow(980, 450, 380), glow(300, 430, 240, true)];
    const cx = 960, cy = 450;
    // scattered token chunks drifting in from the left
    const n = 8 + Math.floor(rng() * 5);
    for (let i = 0; i < n; i++) {
      const x = between(rng, 140, 430), y = between(rng, 210, 690);
      p.push(box(x, y, 26, 26, { rx: 6, opacity: between(rng, 0.25, 0.6), stroke: C.mutedFg }));
    }
    // signal into the core
    p.push(curve(`M 470 ${cy} C 620 ${cy - 20} 760 ${cy + 10} ${cx - 74} ${cy}`, { stroke: C.accent, strokeWidth: 3 }));
    p.push(arrowHead(cx - 70, cy, 1, 0));
    // the agent
    p.push(ring(cx, cy, 66, { stroke: C.accent, strokeWidth: 3 }));
    p.push(ring(cx, cy, 22, { fill: C.accent, stroke: C.accent }));
    p.push(ring(cx, cy, 112, { fill: "none", dash: "3 10", stroke: C.accentHover, opacity: 0.7 }));
    const sats = 3 + Math.floor(rng() * 2);
    const lit = Math.floor(rng() * sats);
    const start = between(rng, 0, Math.PI);
    for (let i = 0; i < sats; i++) {
      const a = start + (i / sats) * Math.PI * 2;
      const sx = cx + 112 * Math.cos(a), sy = cy + 112 * Math.sin(a);
      p.push(ring(sx, sy, 14, { stroke: i === lit ? C.accentHover : C.mutedFg, strokeWidth: i === lit ? 2.5 : 2 }));
      if (i === lit) p.push(dot(sx, sy, 5, C.accentHover));
    }
    p.push(ripples(1130, cy, [40, 64, 88]));
    return p.join("\n");
  },

  // Architecture — three stacked service tiers wired into a small topology,
  // one path lit; a store anchors the base.
  architecture: (rng) => {
    const p: string[] = [glow(820, 430, 380), glow(1240, 640, 220, true)];
    const tiers = [250, 430, 610];
    const litRow = Math.floor(rng() * 3);
    const nodesPerTier = [3 + Math.floor(rng() * 2), 3 + Math.floor(rng() * 2), 2 + Math.floor(rng() * 2)];
    const centers: Array<Array<[number, number]>> = [];
    tiers.forEach((ty, t) => {
      const cnt = nodesPerTier[t];
      const span = 760, x0 = 440;
      const row: Array<[number, number]> = [];
      for (let i = 0; i < cnt; i++) {
        const x = x0 + (cnt === 1 ? span / 2 : (i / (cnt - 1)) * span);
        row.push([x, ty]);
        const on = t === litRow;
        p.push(box(x - 60, ty - 34, 120, 68, { rx: 14, stroke: on ? C.accent : C.border, strokeWidth: on ? 2.5 : 2 }));
        p.push(dot(x, ty, on ? 9 : 6, on ? C.accent : C.mutedFg, on ? 1 : 0.6));
        for (const iy of [-12, 6] as const) p.push(line(x - 40, ty + iy, x - 40 + between(rng, 40, 78), ty + iy, { stroke: C.mutedFg, strokeWidth: 4, opacity: 0.4 }));
      }
      centers.push(row);
    });
    // wire adjacent tiers, one edge lit accent
    for (let t = 0; t < 2; t++) {
      for (const [ax, ay] of centers[t]) {
        const [bx, by] = pick(rng, centers[t + 1]);
        const on = rng() > 0.68;
        p.push(curve(`M ${ax} ${ay + 34} C ${ax} ${ay + 90} ${bx} ${by - 90} ${bx} ${by - 34}`, { stroke: on ? C.accent : C.border, strokeWidth: on ? 3 : 2, opacity: on ? 1 : 0.6 }));
      }
    }
    p.push(store(1230, 760, 96, 96, C.border));
    return p.join("\n");
  },

  // React — a component tree: root fans to children fans to leaves; a couple of
  // leaves lit, a render pulse ripples out.
  react: (rng) => {
    const p: string[] = [glow(800, 300, 360), glow(800, 720, 260, true)];
    const rootX = 800, rootY = 190;
    const childXs = [520, 800, 1080];
    p.push(ring(rootX, rootY, 34, { stroke: C.accent, strokeWidth: 3 }));
    p.push(dot(rootX, rootY, 11, C.accent));
    const litChild = Math.floor(rng() * 3);
    childXs.forEach((cxi, ci) => {
      const cyi = 440;
      const on = ci === litChild;
      p.push(curve(`M ${rootX} ${rootY + 34} C ${rootX} ${rootY + 130} ${cxi} ${cyi - 130} ${cxi} ${cyi - 30}`, { stroke: on ? C.accent : C.border, strokeWidth: on ? 3 : 2 }));
      p.push(ring(cxi, cyi, 28, { stroke: on ? C.accentHover : C.border, strokeWidth: on ? 2.5 : 2 }));
      p.push(dot(cxi, cyi, on ? 8 : 6, on ? C.accentHover : C.mutedFg, on ? 1 : 0.6));
      const leaves = 2 + Math.floor(rng() * 2);
      for (let l = 0; l < leaves; l++) {
        const lx = cxi - 90 + (leaves === 1 ? 90 : (l / (leaves - 1)) * 180);
        const ly = 680;
        const lon = on && l === Math.floor(rng() * leaves);
        p.push(curve(`M ${cxi} ${cyi + 28} C ${cxi} ${cyi + 110} ${lx} ${ly - 110} ${lx} ${ly - 22}`, { stroke: lon ? C.accentHover : C.border, strokeWidth: lon ? 2.5 : 2, opacity: lon ? 1 : 0.7 }));
        p.push(box(lx - 22, ly - 22, 44, 44, { rx: 10, stroke: lon ? C.accentHover : C.mutedFg, opacity: lon ? 1 : 0.55 }));
      }
    });
    p.push(ripples(childXs[litChild] + 44, 440, [30, 52, 74]));
    return p.join("\n");
  },

  // Accessibility — a waveform (speech) converting to text-row dashes, wrapped
  // by a focus ring; the system runs both directions.
  accessibility: (rng) => {
    const p: string[] = [glow(760, 450, 380), glow(360, 320, 220, true)];
    // waveform on the left
    const bars = 10 + Math.floor(rng() * 3);
    for (let i = 0; i < bars; i++) {
      const x = 250 + i * 26;
      const h = 24 + 84 * Math.abs(Math.sin(i * 1.1 + rng() * 0.3));
      p.push(line(x, 360 - h / 2, x, 360 + h / 2, { stroke: C.accentHover, strokeWidth: 7, opacity: 0.8 }));
    }
    // conversion axis: bars degrade into dashes toward the right
    for (let i = 0; i < 12; i++) {
      const t = i / 11, x = 620 + i * 30, y = 340 + t * 150;
      if (t < 0.5) p.push(line(x, y - 22 * (1 - t), x, y + 22 * (1 - t), { stroke: C.accent, strokeWidth: 6, opacity: 0.9 - t * 0.4 }));
      else p.push(line(x - 10, y, x + 10, y, { stroke: C.accent, strokeWidth: 6, opacity: 0.4 + t * 0.5 }));
    }
    // text rows on the right
    const ry0 = 560;
    for (let r = 0; r < 3; r++) {
      let rx = 1050;
      for (const w of [70, 46, 90, 40].slice(0, 2 + Math.floor(rng() * 3))) {
        p.push(line(rx, ry0 + r * 42, rx + w, ry0 + r * 42, { stroke: C.fg, strokeWidth: 8, opacity: 0.35 }));
        rx += w + 22;
      }
    }
    // focus ring wrapping the output
    p.push(ring(1180, 470, 150, { fill: "none", stroke: C.accent, strokeWidth: 3, dash: "2 12" }));
    p.push(ripples(1340, 590, [26, 46]));
    return p.join("\n");
  },

  // Career — distributed nodes across zones, joined by long dashed arcs; an
  // async timeline of ticks arriving at uneven intervals below.
  career: (rng) => {
    const p: string[] = [glow(800, 400, 400), glow(300, 300, 220, true)];
    const nodes: Array<[number, number]> = [];
    const cnt = 5 + Math.floor(rng() * 2);
    for (let i = 0; i < cnt; i++) nodes.push([between(rng, 220, 1380), between(rng, 210, 560)]);
    // connect each to the next-nearest with dashed arcs
    for (let i = 0; i < nodes.length; i++) {
      const [ax, ay] = nodes[i];
      const [bx, by] = nodes[(i + 1) % nodes.length];
      const mx = (ax + bx) / 2 + between(rng, -80, 80), my = (ay + by) / 2 - between(rng, 40, 120);
      p.push(curve(`M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`, { stroke: C.mutedFg, dash: "3 10", opacity: 0.5 }));
    }
    const lit = Math.floor(rng() * cnt);
    nodes.forEach(([x, y], i) => {
      const on = i === lit;
      p.push(ring(x, y, on ? 30 : 22, { stroke: on ? C.accent : C.border, strokeWidth: on ? 3 : 2 }));
      p.push(dot(x, y, on ? 10 : 6, on ? C.accent : C.mutedFg, on ? 1 : 0.6));
      if (on) p.push(ring(x, y, 44, { fill: "none", stroke: C.accentHover, dash: "3 9", opacity: 0.8 }));
    });
    // async timeline
    p.push(line(220, 760, 1380, 760, { opacity: 0.5 }));
    let tx = 260;
    while (tx < 1360) {
      const on = rng() > 0.6;
      p.push(dot(tx, 760, on ? 7 : 4.5, on ? C.accent : C.mutedFg, on ? 0.95 : 0.5));
      tx += between(rng, 60, 150);
    }
    return p.join("\n");
  },

  // Mobile — two device frames (portrait phone + landscape tablet) bridged by a
  // shared API spine; content dashes inside each.
  mobile: (rng) => {
    const p: string[] = [glow(800, 450, 380), glow(1240, 430, 220, true)];
    // portrait phone (left)
    p.push(box(250, 250, 260, 420, { rx: 34, stroke: C.accentHover, strokeWidth: 3 }));
    for (let i = 0; i < 4; i++) p.push(line(300, 320 + i * 66, 300 + [150, 110, 130, 90][i], 320 + i * 66, { stroke: C.mutedFg, strokeWidth: 6, opacity: 0.45 }));
    p.push(box(300, 590, 160, 40, { rx: 10, stroke: C.accent, opacity: 0.9 }));
    // landscape tablet (right)
    p.push(box(1050, 300, 320, 320, { rx: 26, stroke: C.accent, strokeWidth: 3 }));
    for (let i = 0; i < 3; i++) p.push(line(1100, 360 + i * 66, 1100 + [200, 150, 220][i], 360 + i * 66, { stroke: C.mutedFg, strokeWidth: 6, opacity: 0.45 }));
    // shared spine + mirrored contracts
    p.push(box(770, 330, 60, 260, { rx: 30, stroke: C.accent, strokeWidth: 3 }));
    for (const sy of [390, 460, 530]) p.push(dot(800, sy, 8, C.accent, 0.9));
    const litLeft = rng() > 0.5;
    p.push(line(510, 430, 770, 430, { stroke: litLeft ? C.accent : C.border, strokeWidth: 2.5 }));
    p.push(line(510, 500, 770, 500, { stroke: C.border, strokeWidth: 2.5 }));
    p.push(line(830, 430, 1050, 430, { stroke: !litLeft ? C.accent : C.border, strokeWidth: 2.5 }));
    p.push(line(830, 500, 1050, 500, { stroke: C.border, strokeWidth: 2.5 }));
    for (const dx of [610, 690, 900, 980]) p.push(dot(dx, 430, 6, C.accentHover));
    return p.join("\n");
  },
};

// --- collect notes with a /images/blog/ cover -----------------------------
interface NoteCover {
  slug: string;
  category: string;
  coverImage: string;
}
function collectNotes(filter: string[]): NoteCover[] {
  const out: NoteCover[] = [];
  for (const file of readdirSync(NOTES_DIR)) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    if (filter.length && !filter.includes(slug)) continue;
    const { data } = matter(readFileSync(path.join(NOTES_DIR, file), "utf8"));
    const coverImage: string | undefined = data.coverImage;
    if (!coverImage || !coverImage.startsWith("/images/blog/")) continue;
    const category: string = data.category ?? "architecture";
    out.push({ slug, category, coverImage });
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function main() {
  const notes = collectNotes(process.argv.slice(2));
  if (notes.length === 0) {
    console.error("No notes with a /images/blog/ cover matched.");
    process.exit(1);
  }
  for (const n of notes) {
    if (!motifs[n.category]) {
      console.error(`❌ No motif for category "${n.category}" (note ${n.slug})`);
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

  for (const n of notes) {
    const rng = mulberry32(seedFromSlug(n.slug));
    const svg = `${svgOpen()}\n${motifs[n.category](rng)}\n${svgClose}`;
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
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#0a0a12";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        return canvas.toDataURL("image/jpeg", 0.92);
      },
      { source: svg, w: WIDTH, h: HEIGHT }
    );

    const base64 = dataUrl.split(",")[1];
    if (!dataUrl.startsWith("data:image/jpeg") || !base64) {
      console.error(`❌ JPEG encoding failed for ${n.slug}`);
      process.exit(1);
    }
    const outPath = path.join(PUBLIC_DIR, n.coverImage);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, Buffer.from(base64, "base64"));
    console.log(`✓ ${n.coverImage}  [${n.category}]  (${(Buffer.from(base64, "base64").length / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
