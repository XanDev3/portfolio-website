"use client";

import { useEffect, useState } from "react";

// Order matches the page sections top-to-bottom.
const SECTIONS = ["top", "stack", "experience", "work", "contact"];

export default function SideNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    // Scroll-position based, not IntersectionObserver: pick the last section
    // whose top has crossed the viewport's vertical middle. This is robust at
    // any page height (a thin center-band observer fails on short pages because
    // the lower sections can't scroll far enough to reach it).
    const onScroll = () => {
      const line = window.innerHeight * 0.5;
      let current = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-6.5 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-5.5">
      {SECTIONS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={id}
          // Invisible hit-area: the ::before expands the clickable region well
          // beyond the 2px bar without affecting layout or moving the bar.
          // Horizontal (-inset-x) is generous — no column neighbors to collide
          // with. WARNING: keep vertical (-inset-y) at or below ~-inset-y-2.5;
          // it must stay under gap-5.5/2 (≈11px). Push it higher and adjacent
          // bars' hit-areas overlap, so a click near the gap lands on the wrong
          // section. Bump -inset-x for a bigger target instead.
          className="relative block before:absolute before:-inset-x-4 before:-inset-y-2 before:content-['']"
        >
          <div
            className={
              "w-0.5 transition-all duration-300 ease-in-out " +
              (active === id ? "h-11.5 bg-accent" : "h-7 bg-[#3a362f]")
            }
          />
        </a>
      ))}
    </div>
  );
}
