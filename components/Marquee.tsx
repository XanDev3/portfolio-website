import type { IconType } from "react-icons";
import type { CSSProperties } from "react";

export type Tech = { label: string; Icon: IconType; color: string };

type ColorMode = "mono" | "hover" | "brand";

// Infinite horizontal marquee. The item list is rendered twice so the track
// can translate -50% and loop seamlessly (the keyframe lives in globals.css).
// Hovering anywhere on the strip pauses it via the `group` on the wrapper.
//
// Variants (for the styling comparison):
//   bare      - drop the chip border/fill, bare icon+label like jzitnik
//   colorMode - mono (icons inherit ink) | hover (mono, brand color on hover) | brand (always brand)
export default function Marquee({
  items,
  bare = false,
  colorMode = "mono",
}: {
  items: Tech[];
  bare?: boolean;
  colorMode?: ColorMode;
}) {
  const doubled = [...items, ...items];

  const itemClass = bare
    ? "inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-[13px] text-ink"
    : "inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-edge bg-surface px-3.75 py-2.25 font-mono text-[13px] text-ink";

  const iconClass =
    colorMode === "mono"
      ? "text-muted"
      : colorMode === "hover"
        ? "text-muted transition-colors group-hover/chip:[color:var(--bc)]"
        : "[color:var(--bc)]"; // brand

  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-2 w-[18%] bg-linear-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-2 w-[18%] bg-linear-to-l from-bg to-transparent" />

      <div
        className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] ${bare ? "gap-8" : "gap-3.5"}`}
      >
        {doubled.map(({ label, Icon, color }, i) => (
          <span
            key={`${label}-${i}`}
            className={`${itemClass}${colorMode === "hover" ? " group/chip" : ""}`}
            style={
              colorMode === "mono"
                ? undefined
                : ({ "--bc": color } as CSSProperties)
            }
          >
            <Icon size={bare ? 22 : 16} className={iconClass} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
