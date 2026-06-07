import SectionHeading from "./SectionHeading";
import Marquee from "./Marquee";
import { TECH } from "./techStack";

// Marquee styling is swappable via props if we want to change it later:
//   <Marquee items={TECH} />                       chips + mono icons
//   <Marquee items={TECH} colorMode="hover" />     chips + brand color on hover
//   <Marquee items={TECH} colorMode="brand" />     chips + full brand color
//   <Marquee items={TECH} bare colorMode="mono" /> bare (jzitnik) monochrome
// Current pick: bare layout (no chips) with full brand color.
export default function Stack() {
  return (
    <section id="stack" className="py-17.5">
      <div className="relative z-10 mx-auto max-w-275 px-10">
        <SectionHeading>{"// stack"}</SectionHeading>
        <Marquee items={TECH} bare colorMode="brand" />
      </div>
    </section>
  );
}
