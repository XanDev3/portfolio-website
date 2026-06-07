// Curved "comet" beams behind the footer. Near-vertical bezier lines with a
// large horizontal sweep; a comet of light travels down each lit line.
//
// Path generation is deterministic, so this stays a server component (no client
// JS). The light is an SVG <animateMotion> element moved along each bezier —
// it is NOT an animated gradient.
//
// PERF — why animateMotion, not the old SMIL gradient:
//   The previous build animated a linearGradient's y1/y2, which repaints six
//   full-height gradient strokes (under a mask) on the main thread every frame.
//   Profiling on a 120Hz display (June 6) showed a persistent dropped-frame
//   tail — p95 ~33ms, ~52fps, worsening over time — i.e. the reported stutter.
//   animateMotion *moves* a small pre-rendered comet instead of repainting, so
//   the per-frame cost collapses to "translate one tiny shape." Isolation test:
//   the static base layer costs nothing; all jank came from the animated layer.
//   See "Aegis - Initial Website MVP Research and Development.md".

// ===== beam geometry (mirror the mockup) =====
const TOP_ANGLE = 50; // lean off-vertical at the top
const BOT_ANGLE = 40; // lean off-vertical at the bottom
const OFF = 270; // total horizontal sweep
const LEAD = 45; // how far left the top start is shifted
const STEP = 15; // spacing between lines
const TOP_Y = 140; // height of the top bend
const MID_Y = 250; // height of the bottom bend
const H = 400;

const rad = (d: number) => (d * Math.PI) / 180;
const c1x = Math.round(TOP_Y * Math.tan(rad(TOP_ANGLE)) - LEAD);
const c2x = Math.round(OFF - (H - MID_Y) * Math.tan(rad(BOT_ANGLE)));

const beams: { a: number; d: string }[] = [];
for (let a = -300; a <= 920; a += STEP) {
  beams.push({
    a,
    d: `M${a - LEAD} 0 C${a + c1x} ${TOP_Y}, ${a + c2x} ${MID_Y}, ${a + OFF} ${H}`,
  });
}

// Per-comet stagger slots (mirror the old gradient timing so the rhythm holds).
const TIMING = [
  { dur: "2.8s", begin: "0s" }, // Original vals: 3.2
  { dur: "4.3s", begin: "-1.5s" }, // 6
  { dur: "5s", begin: "-3s" }, // 7
  { dur: "3.4s", begin: "-0.95s" }, // 5.3
  { dur: "6s", begin: "-5s" }, // 8
];

// Lines that get lit. Each picks the nearest generated beam and a stagger slot.
const HOT_TARGETS = [5, 80, 220, 360, 500, 620];
const hot = HOT_TARGETS.map((target, k) => {
  let best = beams[0];
  for (const b of beams) {
    if (Math.abs(b.a - target) < Math.abs(best.a - target)) best = b;
  }
  return { d: best.d, slot: k % TIMING.length };
});

// ===== comet look — DIAL THESE IN =====
// The comet is drawn once in local coords (head at origin, tail trailing in -x)
// and moved along the path with rotate="auto", so +x always points downhill.
const COMET = {
  length: 45, // tail length, viewBox units, 70 to start
  thickness: 1.5, // tail width, 1.8 to start
  dwell: 0.1, // fraction of each cycle spent waiting off the top before sweeping, .22 to start
  head: { radius: 0.1, color: "#fff3e0" }, // bright tip dot, 1.6 to start
  glow: { radius: 2, color: "#f0b366", opacity: 0.6 }, // soft halo behind tip (no filter — cheap), 5 to start
  // tail gradient, tail (0) -> head (1)
  tail: [
    { o: 0, color: "#d99a4e", op: 0 },
    { o: 0.55, color: "#d99a4e", op: 0.18 },
    { o: 0.88, color: "#f0b366", op: 0.6 },
    { o: 0.98, color: "#ffe6c0", op: 1 },
    { o: 1, color: "#ffe6c0", op: 0 },
  ],
};

// Edge fade (wrapper) + separate vertical fades for base vs comet layers.
const MASK_WRAP =
  "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)";
const MASK_BASE =
  "linear-gradient(180deg, transparent, #000 0%, #000 50%, transparent 86%)";
const MASK_HOT =
  "linear-gradient(180deg, transparent, #000 10%, #000 150%, transparent)";

export default function FooterBeams() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ maskImage: MASK_WRAP, WebkitMaskImage: MASK_WRAP }}
    >
      {/* faint static base lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 700 400"
        preserveAspectRatio="none"
        style={{ maskImage: MASK_BASE, WebkitMaskImage: MASK_BASE }}
      >
        {beams.map((b, i) => (
          <path
            key={i}
            d={b.d}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.6}
          />
        ))}
      </svg>

      {/* comets of light traveling down the lit lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 700 400"
        preserveAspectRatio="none"
        style={{ maskImage: MASK_HOT, WebkitMaskImage: MASK_HOT }}
      >
        <defs>
          <linearGradient
            id="cometTail"
            gradientUnits="userSpaceOnUse"
            x1={-COMET.length}
            y1="0"
            x2="0"
            y2="0"
          >
            {COMET.tail.map((s, i) => (
              <stop
                key={i}
                offset={s.o}
                stopColor={s.color}
                stopOpacity={s.op}
              />
            ))}
          </linearGradient>
          <radialGradient id="cometGlow">
            <stop
              offset="0"
              stopColor={COMET.glow.color}
              stopOpacity={COMET.glow.opacity}
            />
            <stop offset="1" stopColor={COMET.glow.color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {hot.map((h, i) => (
          <g key={i}>
            {/* invisible reference path the comet rides along */}
            <path id={`beam-hot-${i}`} d={h.d} fill="none" stroke="none" />
            <g>
              <circle
                cx="0"
                cy="0"
                r={COMET.glow.radius}
                fill="url(#cometGlow)"
              />
              <rect
                x={-COMET.length}
                y={-COMET.thickness / 2}
                width={COMET.length}
                height={COMET.thickness}
                rx={COMET.thickness / 2}
                fill="url(#cometTail)"
              />
              <circle
                cx="0"
                cy="0"
                r={COMET.head.radius}
                fill={COMET.head.color}
              />
              <animateMotion
                dur={TIMING[h.slot].dur}
                begin={TIMING[h.slot].begin}
                repeatCount="indefinite"
                rotate="auto"
                calcMode="linear"
                keyPoints="0;0;1"
                keyTimes={`0;${COMET.dwell};1`}
              >
                <mpath href={`#beam-hot-${i}`} xlinkHref={`#beam-hot-${i}`} />
              </animateMotion>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
