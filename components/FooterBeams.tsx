// Curved "comet" beams behind the footer. Near-vertical bezier lines with a
// large horizontal sweep; light travels down each lit line. Path generation is
// deterministic so it runs at build time (server component); the comet light
// uses SVG SMIL gradient animation.
//
// NOTE: the plan floated a compositor-only transform port for perf. Kept SMIL:
// profiling showed it holds full framerate, and a GPU comet that follows a
// curved bezier is disproportionately complex. Revisit only if real stutter
// shows up on weak hardware.

// ===== tweakables (mirror the mockup) =====
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

// Lines that get lit, paired with a gradient (cycled).
const HOT_TARGETS = [5, 80, 220, 360, 500, 620];
const hot = HOT_TARGETS.map((target, k) => {
  let best = beams[0];
  for (const b of beams) {
    if (Math.abs(b.a - target) < Math.abs(best.a - target)) best = b;
  }
  return { d: best.d, grad: `beamGrad${(k % 5) + 1}` };
});

// Per-gradient SMIL timing (matches the mockup's staggered comets).
const GRAD_CONFIG = [
  { id: "beamGrad1", dur: "4.2s", keyTimes: "0;0.22;1", begin: "0s" },
  { id: "beamGrad2", dur: "6s", keyTimes: "0;0.3;1", begin: "-1.5s" },
  { id: "beamGrad3", dur: "7s", keyTimes: "0;0.18;1", begin: "-3s" },
  { id: "beamGrad4", dur: "5.3s", keyTimes: "0;0.27;1", begin: "-0.8s" },
  { id: "beamGrad5", dur: "8s", keyTimes: "0;0.2;1", begin: "-5s" },
];

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

      {/* lit comet lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 700 400"
        preserveAspectRatio="none"
        style={{ maskImage: MASK_HOT, WebkitMaskImage: MASK_HOT }}
      >
        <defs>
          {GRAD_CONFIG.map((g) => (
            <linearGradient
              key={g.id}
              id={g.id}
              gradientUnits="objectBoundingBox"
              x1="0"
              x2="0"
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#d99a4e" stopOpacity="0" />
              <stop offset="0.6" stopColor="#d99a4e" stopOpacity="0.07" />
              <stop offset="0.9" stopColor="#f0b366" stopOpacity="0.5" />
              <stop offset="0.99" stopColor="#ffe6c0" stopOpacity="1" />
              <stop offset="1" stopColor="#ffe6c0" stopOpacity="0" />
              <animate
                attributeName="y1"
                values="-0.5;-0.5;1.0"
                keyTimes={g.keyTimes}
                dur={g.dur}
                begin={g.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="-0.18;-0.18;1.32"
                keyTimes={g.keyTimes}
                dur={g.dur}
                begin={g.begin}
                repeatCount="indefinite"
              />
            </linearGradient>
          ))}
        </defs>
        {hot.map((h, i) => (
          <path
            key={i}
            d={h.d}
            fill="none"
            strokeWidth={1.3}
            stroke={`url(#${h.grad})`}
          />
        ))}
      </svg>
    </div>
  );
}
