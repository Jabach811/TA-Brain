// scene-engine.jsx — Canvas-based particle/lattice renderer for TA Brain animation
// v2: Bigger orbs/cubes, unified phase keeps cube integrity

const TAU = Math.PI * 2;
const DURATION = 50;
const TRANSITION_PAD = 1.15;

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function project(x, y, z, cx, cy, fov) {
  const scale = fov / (fov + z);
  return { px: cx + x * scale, py: cy + y * scale, s: scale };
}

// ── TWEAKABLE DEFAULTS (read from window) ───────────────────────────────────
function getTweaks() {
  const d = window.__TWEAKS || {};
  return {
    orbScale: d.orbScale ?? 2.2,
    cubeScale: d.cubeScale ?? 2.0,
    glowIntensity: d.glowIntensity ?? 1.4,
    particleCount: d.particleCount ?? 24,
    rotationSpeed: d.rotationSpeed ?? 0.15,
    beamBrightness: d.beamBrightness ?? 1.0,
    pulseSpeed: d.pulseSpeed ?? 1.5,
  };
}

// ── ORB definitions ─────────────────────────────────────────────────────────
const ORB_COLORS = [
  { h: 220, s: 80, l: 65 },
  { h: 270, s: 70, l: 60 },
  { h: 200, s: 75, l: 55 },
  { h: 250, s: 65, l: 70 },
  { h: 190, s: 85, l: 50 },
];

const ORB_NAMES = ['Engineering', 'Design', 'Operations', 'Strategy', 'Data'];

// Spread wider for bigger visual
const ORB_POSITIONS = [
  { x: -380, y: -220 },
  { x: 340, y: -200 },
  { x: -280, y: 200 },
  { x: 360, y: 220 },
  { x: 0, y: 0 },
];

// Final unified positions — cubes stay distinct, arranged in a pentagon
const UNIFIED_POSITIONS = [
  { x: -220, y: -130 },
  { x: 220, y: -130 },
  { x: -280, y: 110 },
  { x: 280, y: 110 },
  { x: 0, y: -10 },
];

const rng = seededRandom(42);

function generateOrbParticles(count) {
  const orbs = [];
  for (let i = 0; i < 5; i++) {
    const particles = [];
    for (let j = 0; j < count; j++) {
      const theta = rng() * TAU;
      const phi = rng() * Math.PI;
      const r = 50 + rng() * 80;
      particles.push({
        theta, phi, r,
        speed: 0.3 + rng() * 0.7,
        phase: rng() * TAU,
        size: 2.5 + rng() * 4,
      });
    }
    orbs.push(particles);
  }
  return orbs;
}

let ORB_PARTICLES = generateOrbParticles(24);

// Cube lattice — 3x3x3
function generateCubeNodes(spacing) {
  const nodes = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++)
        nodes.push({ x: x * spacing, y: y * spacing, z: z * spacing });
  return nodes;
}

function generateCubeEdges(nodes, maxDist) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.abs(nodes[i].x - nodes[j].x) + Math.abs(nodes[i].y - nodes[j].y) + Math.abs(nodes[i].z - nodes[j].z);
      if (d <= maxDist) edges.push([i, j]);
    }
  }
  return edges;
}

const CUBE_SPACING = 45; // much bigger cubes
const CUBE_NODES = generateCubeNodes(CUBE_SPACING);
const CUBE_EDGES = generateCubeEdges(CUBE_NODES, CUBE_SPACING + 1);

const SCENES = [
  { start: 0,  end: 8,  name: 'Disconnection' },
  { start: 8,  end: 16, name: 'Internal Awareness' },
  { start: 16, end: 24, name: 'Internal Structure' },
  { start: 24, end: 34, name: 'Cross-Department Connection' },
  { start: 34, end: 44, name: 'Unified System' },
  { start: 44, end: 50, name: 'Final Moment' },
];

// ── MAIN RENDER ─────────────────────────────────────────────────────────────
function renderFrame(ctx, w, h, t) {
  const tw = getTweaks();
  const cx = w / 2;
  const cy = h / 2;
  const fov = 600;

  ctx.fillStyle = '#030308';
  ctx.fillRect(0, 0, w, h);

  // Background glow
  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.6);
  const bgI = (t < 34 ? 0.04 : smoothStep(34, 44, t) * 0.1 + 0.04) * tw.glowIntensity;
  bgGrad.addColorStop(0, `rgba(100, 120, 255, ${bgI})`);
  bgGrad.addColorStop(0.5, `rgba(60, 40, 120, ${bgI * 0.5})`);
  bgGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  drawStars(ctx, w, h, t);

  if (t < 24 + TRANSITION_PAD) {
    drawOrbPhase(ctx, cx, cy, fov, t, tw);
  }
  if (t >= 16 - TRANSITION_PAD) {
    drawLatticePhase(ctx, cx, cy, fov, t, tw);
  }

  drawTransitionWash(ctx, w, h, t, tw);
  drawSceneLabel(ctx, w, h, t);
}

function smoothStep(start, end, t) {
  const x = clamp((t - start) / (end - start), 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function fadeInOut(start, end, t, fade = TRANSITION_PAD) {
  const fadeIn = start <= 0
    ? smoothStep(start, start + fade, t)
    : smoothStep(start - fade, start + fade, t);
  return Math.min(
    fadeIn,
    1 - smoothStep(end - fade, end + fade, t)
  );
}

function getSceneBlend(t) {
  let strength = 0;
  for (const scene of SCENES) {
    if (scene.start <= 0) continue;
    const local = 1 - Math.abs(t - scene.start) / TRANSITION_PAD;
    strength = Math.max(strength, clamp(local, 0, 1));
  }
  return smoothStep(0, 1, strength);
}

// ── STARS ───────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 200 }, () => ({
  x: seededRandom(Math.floor(Math.random() * 9999))() * 2 - 1,
  y: seededRandom(Math.floor(Math.random() * 9999))() * 2 - 1,
  size: 0.5 + Math.random() * 1.5,
  twinkleSpeed: 0.5 + Math.random() * 2,
  twinklePhase: Math.random() * TAU,
}));

function drawStars(ctx, w, h, t) {
  for (const star of STARS) {
    const alpha = 0.15 + 0.15 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);
    ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc((star.x * 0.5 + 0.5) * w, (star.y * 0.5 + 0.5) * h, star.size, 0, TAU);
    ctx.fill();
  }
}

// ── ORB PHASE (Scenes 1-3) ─────────────────────────────────────────────────
function drawOrbPhase(ctx, cx, cy, fov, t, tw) {
  const orbAlpha = Math.min(fadeInOut(0, 24, t, TRANSITION_PAD), 1 - smoothStep(20.5, 24.8, t) * 0.35);
  if (orbAlpha <= 0) return;

  ctx.globalAlpha = orbAlpha;
  const sc = tw.orbScale;

  for (let i = 0; i < 5; i++) {
    const basePos = ORB_POSITIONS[i];
    const color = ORB_COLORS[i];
    const particles = ORB_PARTICLES[i];

    const driftScale = 1 - smoothStep(7, 15, t) * 0.8;
    const ox = basePos.x + Math.sin(t * 0.3 + i * 2) * 40 * driftScale;
    const oy = basePos.y + Math.cos(t * 0.25 + i * 1.5) * 30 * driftScale;

    // Core glow — much bigger
    const glowR = 90 * sc;
    const coreGrad = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, glowR);
    const gi = (0.2 + 0.08 * Math.sin(t * 1.2 + i)) * tw.glowIntensity;
    coreGrad.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${color.l}%, ${gi})`);
    coreGrad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx + ox, cy + oy, glowR, 0, TAU);
    ctx.fill();

    const orbitTightness = 1 - smoothStep(7, 15.5, t) * 0.6;
    const connectionAlpha = smoothStep(9, 14.5, t);
    const positions = [];

    for (let j = 0; j < particles.length; j++) {
      const p = particles[j];
      const angle = p.theta + t * p.speed * (t < 8 ? 1 : 0.5);
      const r = p.r * orbitTightness * sc;
      const px = ox + Math.cos(angle) * r * Math.sin(p.phi + t * 0.1);
      const py = oy + Math.sin(angle) * r * Math.cos(p.phi + t * 0.15);

      positions.push({ x: cx + px, y: cy + py });

      const pSize = p.size * sc;
      const grad = ctx.createRadialGradient(cx + px, cy + py, 0, cx + px, cy + py, pSize * 4);
      const pAlpha = 0.6 + 0.3 * Math.sin(t * 2 + p.phase);
      grad.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${color.l + 20}%, ${pAlpha})`);
      grad.addColorStop(0.5, `hsla(${color.h}, ${color.s}%, ${color.l}%, ${pAlpha * 0.4})`);
      grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx + px, cy + py, pSize * 4, 0, TAU);
      ctx.fill();

      ctx.fillStyle = `hsla(${color.h}, ${color.s - 10}%, ${color.l + 30}%, ${pAlpha})`;
      ctx.beginPath();
      ctx.arc(cx + px, cy + py, pSize, 0, TAU);
      ctx.fill();
    }

    if (connectionAlpha > 0) {
      ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l + 10}%, ${connectionAlpha * 0.3})`;
      ctx.lineWidth = 1;
      for (let a = 0; a < positions.length; a++) {
        for (let b = a + 1; b < positions.length; b++) {
          const dist = Math.hypot(positions[a].x - positions[b].x, positions[a].y - positions[b].y);
          if (dist < 80 * sc) {
            ctx.beginPath();
            ctx.moveTo(positions[a].x, positions[a].y);
            ctx.lineTo(positions[b].x, positions[b].y);
            ctx.stroke();
          }
        }
      }
    }
  }

  ctx.globalAlpha = 1;
}

// ── LATTICE PHASE (Scenes 3-6) — cubes persist through the end ─────────────
function drawLatticePhase(ctx, cx, cy, fov, t, tw) {
  const formProgress = smoothStep(15, 24.5, t);
  if (formProgress <= 0) return;

  const sc = tw.cubeScale;
  const rotY = t * tw.rotationSpeed;
  const rotX = 0.3;

  // In scenes 5-6, cubes stay visible — no fade out!
  // They just converge to unified positions and get cross-connected

  // Convergence: scene 4 moves toward each other, scene 5+ holds unified positions
  const convergeToCenter = smoothStep(23, 34, t);

  // All cube screen positions for cross-connections
  const allCubeScreenNodes = [];

  for (let i = 0; i < 5; i++) {
    const basePos = ORB_POSITIONS[i];
    const uniPos = UNIFIED_POSITIONS[i];
    const color = ORB_COLORS[i];

    // Interpolate from scattered to unified positions
    const ox = basePos.x + (uniPos.x - basePos.x) * convergeToCenter;
    const oy = basePos.y + (uniPos.y - basePos.y) * convergeToCenter;

    const nodeScreenPos = [];

    for (let n = 0; n < CUBE_NODES.length; n++) {
      const node = CUBE_NODES[n];
      const ns = sc;

      const cosY = Math.cos(rotY + i * 0.4);
      const sinY = Math.sin(rotY + i * 0.4);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      let rx = node.x * ns * cosY - node.z * ns * sinY;
      let rz = node.x * ns * sinY + node.z * ns * cosY;
      let ry = node.y * ns * cosX - rz * sinX;
      rz = node.y * ns * sinX + rz * cosX;

      const { px, py, s } = project(rx + ox, ry + oy, rz, cx, cy, fov);
      nodeScreenPos.push({ x: px, y: py, s, z: rz });

      const nodeAlpha = formProgress * (0.7 + 0.3 * Math.sin(t * 1.5 + n * 0.5));
      const glowSize = 10 * s * tw.glowIntensity;

      if (nodeAlpha > 0.05) {
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
        grad.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${color.l + 25}%, ${nodeAlpha * 0.8})`);
        grad.addColorStop(0.4, `hsla(${color.h}, ${color.s}%, ${color.l}%, ${nodeAlpha * 0.3})`);
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, TAU);
        ctx.fill();

        ctx.fillStyle = `hsla(${color.h}, 60%, 92%, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 3 * s, 0, TAU);
        ctx.fill();
      }
    }

    // Edges within each cube
    if (formProgress > 0.1) {
      // Brighter edges in later scenes
      const edgeBright = 0.4 + smoothStep(32, 36, t) * 0.2;
      for (const [a, b] of CUBE_EDGES) {
        const pa = nodeScreenPos[a];
        const pb = nodeScreenPos[b];
        const edgeAlpha = formProgress * edgeBright;

        ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${edgeAlpha})`;
        ctx.lineWidth = 1.5 * ((pa.s + pb.s) / 2);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
    }

    allCubeScreenNodes.push({ nodes: nodeScreenPos, color, ox, oy });
  }

  // ── Cross-department beams (scenes 4+) ────────────────────────────────────
  if (t >= 24.5) {
    const beamAlpha = smoothStep(24.5, 31, t) * 0.35 * tw.beamBrightness;
    const intensify = smoothStep(42.5, 49, t);
    const finalBeam = beamAlpha * (1 + intensify * 0.8);

    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 5; j++) {
        const ci = allCubeScreenNodes[i];
        const cj = allCubeScreenNodes[j];

        // Main beam between cube centers
        const ax = cx + ci.ox;
        const ay = cy + ci.oy;
        const bx = cx + cj.ox;
        const by = cy + cj.oy;

        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, `hsla(${ci.color.h}, ${ci.color.s}%, ${ci.color.l}%, ${finalBeam})`);
        grad.addColorStop(0.5, `hsla(${(ci.color.h + cj.color.h) / 2}, 70%, 75%, ${finalBeam * 1.2})`);
        grad.addColorStop(1, `hsla(${cj.color.h}, ${cj.color.s}%, ${cj.color.l}%, ${finalBeam})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 + intensify * 1.5;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();

        // Additional node-to-node connections in unified phase
        if (t >= 32.5) {
          const crossAlpha = smoothStep(32.5, 40.5, t) * 0.2 * tw.beamBrightness;
          ctx.strokeStyle = `hsla(${(ci.color.h + cj.color.h) / 2}, 60%, 65%, ${crossAlpha})`;
          ctx.lineWidth = 0.8;
          // Connect a few edge nodes between cubes
          const edgeNodes = [0, 2, 6, 8, 18, 20, 24, 26]; // corner nodes of 3x3x3
          for (const ni of edgeNodes) {
            for (const nj of edgeNodes) {
              const na = ci.nodes[ni];
              const nb = cj.nodes[nj];
              if (!na || !nb) continue;
              const dist = Math.hypot(na.x - nb.x, na.y - nb.y);
              if (dist < 250) {
                ctx.beginPath();
                ctx.moveTo(na.x, na.y);
                ctx.lineTo(nb.x, nb.y);
                ctx.stroke();
              }
            }
          }
        }

        // Traveling pulses
        const ps = tw.pulseSpeed;
        for (let p = 0; p < 2; p++) {
          const pulseT = ((t * ps * 0.8 + i * 0.3 + j * 0.5 + p * 0.5) % 1);
          const px = ax + (bx - ax) * pulseT;
          const py = ay + (by - ay) * pulseT;
          const pulseAlpha = finalBeam * 1.5 * Math.sin(pulseT * Math.PI);
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 10);
          pg.addColorStop(0, `hsla(220, 95%, 88%, ${pulseAlpha})`);
          pg.addColorStop(1, 'hsla(0,0%,0%,0)');
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, TAU);
          ctx.fill();
        }
      }
    }

    // Energy pulses along internal cube edges in unified phase
    if (t >= 32.5) {
      const internalPulseAlpha = smoothStep(32.5, 40.5, t) * 0.6;
      for (let i = 0; i < 5; i++) {
        const cube = allCubeScreenNodes[i];
        const color = cube.color;
        for (const [a, b] of CUBE_EDGES) {
          const na = cube.nodes[a];
          const nb = cube.nodes[b];
          const pulseT = ((t * tw.pulseSpeed + a * 0.2 + i * 2) % 2) / 2;
          if (pulseT < 1) {
            const px = na.x + (nb.x - na.x) * pulseT;
            const py = na.y + (nb.y - na.y) * pulseT;
            const pa = internalPulseAlpha * Math.sin(pulseT * Math.PI) * 0.7;
            const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
            pg.addColorStop(0, `hsla(${color.h}, 90%, 85%, ${pa})`);
            pg.addColorStop(1, 'hsla(0,0%,0%,0)');
            ctx.fillStyle = pg;
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, TAU);
            ctx.fill();
          }
        }
      }
    }
  }

  // Scene 6: intensified central glow
  if (t >= 42.5) {
    const intensify = smoothStep(42.5, 49, t);
    const centralGlow = intensify * 0.12 * tw.glowIntensity;
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 400);
    cg.addColorStop(0, `rgba(140, 160, 255, ${centralGlow})`);
    cg.addColorStop(0.5, `rgba(100, 80, 200, ${centralGlow * 0.3})`);
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx, cy, 400, 0, TAU);
    ctx.fill();
  }
}

// ── SCENE LABEL ─────────────────────────────────────────────────────────────
function drawTransitionWash(ctx, w, h, t, tw) {
  const blend = getSceneBlend(t);
  if (blend <= 0) return;

  const cx = w / 2;
  const cy = h / 2;
  const alpha = blend * 0.09 * tw.glowIntensity;
  const wash = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
  wash.addColorStop(0, `rgba(185, 205, 255, ${alpha})`);
  wash.addColorStop(0.5, `rgba(90, 105, 210, ${alpha * 0.4})`);
  wash.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, w, h);
}

function drawSceneLabel(ctx, w, h, t) {
  ctx.font = '500 16px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';

  for (const scene of SCENES) {
    const alpha = fadeInOut(scene.start, scene.end, t, 0.9) * 0.5;
    if (alpha <= 0.01) continue;

    const slide = (1 - alpha / 0.5) * 10;
    ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
    ctx.fillText(scene.name.toUpperCase(), 40 + slide, h - 30);
  }
}

Object.assign(window, {
  renderFrame, DURATION, SCENES, smoothStep,
});
