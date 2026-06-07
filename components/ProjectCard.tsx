import { TECH_ICONS } from "./techStack";

export type Project = {
  tag: string;
  name: string;
  desc: string;
  stack: string[];
  bg: string; // CSS background-image (placeholder gradient until real screenshots)
};

// Overlay gradient that keeps the title legible over the bg image.
const OVERLAY =
  "linear-gradient(to top, rgba(10,10,10,0.94), rgba(10,10,10,0.45) 46%, transparent 78%)";

export default function ProjectCard({ tag, name, desc, stack, bg }: Project) {
  return (
    <div className="group relative flex min-h-75 flex-col justify-end overflow-hidden rounded-2xl border border-edge p-6.5 shadow-[rgba(255,255,255,0.08)_0_-16px_70px_-28px_inset] transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-[#4a463e]">
      {/* background image, scales + brightens on hover, dissolves at the bottom */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50 transition-[transform,opacity] duration-600 group-hover:scale-106 group-hover:opacity-62 [mask-image:linear-gradient(to_top,transparent_16%,#000_92%)] [-webkit-mask-image:linear-gradient(to_top,transparent_16%,#000_92%)]"
        style={{ backgroundImage: bg }}
      />
      <div className="absolute inset-0 z-1" style={{ background: OVERLAY }} />

      <div className="relative z-2">
        <div className="font-mono text-[10px] tracking-[0.07em] text-accent">
          {tag}
        </div>
        <h3 className="mt-2 text-[27px] font-medium">{name}</h3>

        {/* description reveals on hover via max-height transition */}
        <div className="max-h-0 overflow-hidden text-[15px] leading-normal text-muted opacity-0 transition-[max-height,opacity,margin] duration-450 group-hover:mt-2.5 group-hover:max-h-32.5 group-hover:opacity-100">
          {desc}
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.75">
          {stack.map((tech) => {
            const meta = TECH_ICONS[tech];
            if (!meta) {
              // no logo for this one (e.g. "LLM") -> keep the text badge
              return (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-edge bg-[rgba(20,19,17,0.6)] px-2 py-1.5 font-mono text-[10px] text-ink"
                >
                  {tech}
                </span>
              );
            }
            const Icon = meta.Icon;
            return (
              <span
                key={tech}
                title={tech}
                aria-label={tech}
                className="inline-flex items-center justify-center rounded-md border border-edge bg-[rgba(20,19,17,0.6)] px-2 py-1.5"
              >
                <Icon size={16} style={{ color: meta.color }} />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
