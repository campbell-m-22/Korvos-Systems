import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";

/* -----------------------------------------------------------------------------
   ScrollThread — a single continuous "one-line" ink stroke that threads the
   page and draws itself as you scroll, echoing the hand-drawn line style.

   It routes around the real text boxes (measured from the DOM): the text is
   merged into a few blocks, a clear gutter is chosen for each, and one smooth
   Catmull-Rom curve is drawn through those gutter points — so the line weaves
   around the words rather than across them. Teardrop loops drop in only where
   there's clear room. Orange ink over a faint grey "planned route".

   Layering is handled in the page: this sits at z-0 (in front of most
   sections); the hero and What-we-build sections are raised above it so the
   line reads as sitting behind those two.
----------------------------------------------------------------------------- */

function frac(n) {
  return Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;
}

// clear x-intervals within [lo,hi] at a given y (used for loop clearance)
function clearX(y, obs, lo, hi) {
  const blocks = obs
    .filter((o) => y >= o.y0 && y <= o.y1)
    .map((o) => [Math.max(lo, o.x0), Math.min(hi, o.x1)])
    .filter((b) => b[1] > b[0])
    .sort((a, b) => a[0] - b[0]);
  const gaps = [];
  let cur = lo;
  for (const [a, b] of blocks) {
    if (a > cur) gaps.push([cur, a]);
    cur = Math.max(cur, b);
  }
  if (cur < hi) gaps.push([cur, hi]);
  return gaps.length ? gaps : [[lo, hi]];
}

// merge padded text rects into a few vertical "bands" (union x-extent)
function mergeBands(obs, gapMerge) {
  const rs = obs.slice().sort((a, b) => a.y0 - b.y0);
  const bands = [];
  for (const r of rs) {
    const last = bands[bands.length - 1];
    if (last && r.y0 <= last.y1 + gapMerge) {
      last.y1 = Math.max(last.y1, r.y1);
      last.minX = Math.min(last.minX, r.x0);
      last.maxX = Math.max(last.maxX, r.x1);
    } else {
      bands.push({ y0: r.y0, y1: r.y1, minX: r.x0, maxX: r.x1 });
    }
  }
  return bands;
}

// pick a clear gutter per band, continuous with the previous choice
function buildWaypoints(bands, w, h, lo, hi) {
  const minGut = 44;
  const center = w / 2;
  const wp = [];
  let prevX = center;
  for (const b of bands) {
    const leftC = (lo + b.minX) / 2;
    const rightC = (b.maxX + hi) / 2;
    const leftW = b.minX - lo;
    const rightW = hi - b.maxX;
    const cands = [];
    if (leftW > minGut) cands.push(leftC);
    if (rightW > minGut) cands.push(rightC);
    if (!cands.length) cands.push(leftW >= rightW ? lo + 22 : hi - 22);
    const gx = cands.reduce((a, c) =>
      Math.abs(c - prevX) < Math.abs(a - prevX) ? c : a
    );
    wp.push({ x: gx, y: b.y0 });
    wp.push({ x: gx, y: b.y1 });
    prevX = gx;
  }
  wp.unshift({ x: wp.length ? wp[0].x : center, y: 0 });
  wp.push({ x: center, y: h });
  return wp;
}

// Catmull-Rom sampled to a smooth 2D polyline (increasing y)
function crSample(wp, perSeg) {
  const pts = [];
  const n = wp.length;
  for (let i = 0; i < n - 1; i++) {
    const p0 = wp[Math.max(0, i - 1)];
    const p1 = wp[i];
    const p2 = wp[i + 1];
    const p3 = wp[Math.min(n - 1, i + 2)];
    for (let s = 0; s < perSeg; s++) {
      const t = s / perSeg;
      const t2 = t * t;
      const t3 = t2 * t;
      pts.push({
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  pts.push({ x: wp[n - 1].x, y: wp[n - 1].y });
  return pts;
}

function buildPath(w, h, obstacles, behindZones = []) {
  // sections the thread sits behind: keep loops sparse (max 2, well apart) so
  // they read as intentional flourishes rather than clutter
  const zoneState = behindZones.map((z) => ({
    y0: z.y0,
    y1: z.y1,
    count: 0,
    lastY: -1e9,
  }));
  const zoneAt = (y) => zoneState.find((z) => y >= z.y0 && y <= z.y1);
  const margin = Math.max(w * 0.03, 24);
  const lo = margin;
  const hi = w - margin;
  const pad = 26;
  const obs = obstacles.map((o) => ({
    x0: o.x0 - pad,
    x1: o.x1 + pad,
    y0: o.y0 - pad,
    y1: o.y1 + pad,
  }));

  const bands = mergeBands(obs, 30);
  const wp = buildWaypoints(bands, w, h, lo, hi);
  const pts = crSample(wp, 26);

  const step = 5;
  const n = Math.ceil(h / step);

  // resample the smooth curve onto a uniform y grid
  let sm = new Array(n + 1);
  let j = 0;
  for (let i = 0; i <= n; i++) {
    const y = Math.min(h, i * step);
    while (j < pts.length - 2 && pts[j + 1].y < y) j++;
    const p0 = pts[j];
    const p1 = pts[Math.min(pts.length - 1, j + 1)];
    const t = Math.max(0, Math.min(1, (y - p0.y) / ((p1.y - p0.y) || 1)));
    sm[i] = p0.x + (p1.x - p0.x) * t;
  }

  // soften any curvature kinks at the spline joins (symmetric → no drift)
  const blur = (a, rad) => {
    const out = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      let s = 0;
      let c = 0;
      for (let k = i - rad; k <= i + rad; k++) {
        const kk = k < 0 ? 0 : k >= a.length ? a.length - 1 : k;
        s += a[kk];
        c++;
      }
      out[i] = s / c;
    }
    return out;
  };
  sm = blur(blur(blur(sm, 16), 16), 16);

  // emit, dropping teardrop loops at bends that sit in clear space
  const yOf = (i) => Math.min(h, i * step);
  let d = `M ${sm[0].toFixed(1)} 0`;
  let prevDx = 0;
  let bend = 0;
  let skipUntil = -1;
  let blendStart = -1;
  let blendEnd = -1;
  let anchorX = 0;
  const smooth = (t) => t * t * (3 - 2 * t);

  for (let i = 1; i <= n; i++) {
    const y = yOf(i);
    const dx = sm[i] - sm[i - 1];
    const isBend =
      prevDx !== 0 &&
      Math.sign(dx) !== Math.sign(prevDx) &&
      y > 240 &&
      y < h - 240 &&
      i >= skipUntil;

    if (isBend) {
      bend += 1;
      const Qx = sm[i - 1];
      const gaps = clearX(y, obs, lo, hi);
      const b = Math.sign(prevDx) || 1;
      const r = 12 + frac(bend * 2.71) * 20;
      const roomSide = gaps.some(
        (g) =>
          Qx >= g[0] &&
          Qx <= g[1] &&
          (b > 0 ? g[1] - Qx : Qx - g[0]) > 2.4 * r
      );
      const roomV =
        clearX(y - 2 * r, obs, lo, hi).some((g) => Qx >= g[0] && Qx <= g[1]) &&
        clearX(y + 2 * r, obs, lo, hi).some((g) => Qx >= g[0] && Qx <= g[1]);
      // inside a behind-section, cap at 2 loops and keep them far apart
      const z = zoneAt(y);
      const zoneOk = !z || (z.count < 2 && y - z.lastY > 520);
      if (frac(bend * 7.13) > 0.35 && roomSide && roomV && zoneOk) {
        if (z) {
          z.count += 1;
          z.lastY = y;
        }
        const drift = r * 0.16;
        const netY = 2 * Math.PI * drift;
        const yc = y - drift * (Math.PI / 2);
        const ls = 44;
        for (let jj = 0; jj <= ls; jj++) {
          const th = Math.PI / 2 + Math.PI * 2 * (jj / ls);
          const lx = Qx + b * r * (1 - Math.sin(th));
          const ly = yc + drift * th - r * Math.cos(th);
          d += ` L ${lx.toFixed(1)} ${ly.toFixed(1)}`;
        }
        skipUntil = i + Math.ceil(netY / step);
        blendStart = y + netY;
        blendEnd = blendStart + Math.max(90, r * 4);
        anchorX = Qx;
        prevDx = dx;
        continue;
      }
    }

    prevDx = dx;
    if (i < skipUntil) continue;
    let x = sm[i];
    if (y < blendEnd) {
      const t = smooth((y - blendStart) / (blendEnd - blendStart));
      x = anchorX + (x - anchorX) * t;
    }
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export default function ScrollThread() {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ w: 0, h: 0, obs: [], zones: [] });
  const leadCfg = useRef({ a: 1, b: 0 });

  const { scrollYProgress } = useScroll();
  // Lead the draw so the pen head sits ~40% down the viewport (where the eye
  // is) and a stiff spring keeps it tracking the scroll closely.
  const lead = useTransform(scrollYProgress, (p) => {
    const { a, b } = leadCfg.current;
    return Math.max(0, Math.min(1, p * a + b));
  });
  const drawn = useSpring(lead, {
    stiffness: 210,
    damping: 32,
    restDelta: 0.0004,
  });

  // one-time intro: on load, draw the orange from nothing down to its resting
  // (scroll-top) position, then hand off to the scroll-driven length
  const intro = useMotionValue(0);
  useEffect(() => {
    const controls = animate(intro, 1, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.35,
    });
    return () => controls.stop();
  }, [intro]);
  const inked = useTransform([drawn, intro], ([d, i]) => d * i);

  useEffect(() => {
    const measure = () => {
      const H = document.documentElement.scrollHeight;
      const W = window.innerWidth;
      const vh = window.innerHeight;
      const sx = window.scrollX;
      const sy = window.scrollY;
      leadCfg.current = {
        a: H > 0 ? (H - vh) / H : 1,
        b: H > 0 ? (vh * 0.85) / H : 0, // pen head runs ahead, low in the viewport
      };
      const els = document.querySelectorAll(
        "main :is(h1,h2,h3,h4,p,li), main [data-thread-avoid]"
      );
      const obs = [];
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        obs.push({
          x0: r.left + sx,
          y0: r.top + sy,
          x1: r.right + sx,
          y1: r.bottom + sy,
        });
      });
      // sections the thread sits behind — suppress loops here, otherwise the
      // connecting line hides behind the raised section and the loop reads as a
      // disconnected circle floating in the gutter
      const zones = [];
      document.querySelectorAll("[data-thread-behind]").forEach((el) => {
        const r = el.getBoundingClientRect();
        zones.push({ y0: r.top + sy, y1: r.bottom + sy });
      });
      setState({ w: W, h: H, obs, zones });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const t = setTimeout(measure, 450); // fonts/images settle → layout shifts
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t);
    };
  }, []);

  // The weave needs the side gutters that only exist once the viewport is
  // wider than the content column. Below that there's no whitespace to route
  // through, so hide it rather than run a line through the text.
  if (!state.w || !state.h || state.w < 1280) return null;
  const d = buildPath(state.w, state.h, state.obs, state.zones);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        width={state.w}
        height={state.h}
        viewBox={`0 0 ${state.w} ${state.h}`}
        fill="none"
        className="absolute inset-0"
      >
        {/* faint grey "planned route" — the whole line, visible before scroll */}
        <path
          d={d}
          stroke="var(--color-navy)"
          strokeOpacity="0.12"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* the orange ink that gets drawn on scroll */}
        <motion.path
          d={d}
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
          style={{ pathLength: reduce ? 1 : inked }}
        />
      </svg>
    </div>
  );
}
