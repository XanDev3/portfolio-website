import FooterBeams from "./FooterBeams";

function FootCol({
  title,
  links,
}: {
  title: string;
  links: [label: string, href: string][];
}) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-muted">
        {title}
      </h4>
      {links.map(([label, href]) => (
        <a
          key={label}
          href={href}
          className="mb-2.75 block font-mono text-[13px] text-ink no-underline transition-colors hover:text-accent"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-17.5 overflow-hidden border-t border-edge pb-9 pt-17.5"
    >
      <FooterBeams />

      <div className="relative z-1 mx-auto max-w-275 px-10">
        <div className="flex flex-wrap justify-between gap-12">
          {/* CTA */}
          <div className="max-w-107.5">
            <div className="mb-3 font-mono text-[13px] tracking-[0.08em] text-accent">
              {"// GET IN TOUCH"}
            </div>
            <h2 className="mb-3 font-serif text-[44px] font-medium tracking-[-0.01em]">
              Let&apos;s talk.
            </h2>
            <p className="mb-6 text-base text-muted">
              Open to SRE, DevOps, platform, and software engineering roles. The
              fastest way to reach me is email.
            </p>
            <a
              href="mailto:xander.nesta@gmail.com"
              className="relative isolate inline-flex items-center gap-2.25 overflow-hidden rounded-lg border border-edge bg-surface px-4 py-2.75 font-mono text-[13px] text-ink no-underline transition-colors hover:border-accent"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 animate-shimmer"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 35%, rgba(160,142,98,0.15) 50%, transparent 65%)",
                }}
              />
              <span className="relative z-1 inline-flex items-center gap-2.25">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                Email me
              </span>
            </a>
          </div>

          {/* link columns */}
          <div className="flex gap-13.5">
            <FootCol
              title="Navigate"
              links={[
                ["Home", "#top"],
                ["Stack", "#stack"],
                ["Experience", "#experience"],
                ["Projects", "#work"],
              ]}
            />
            <FootCol
              title="Aegis"
              links={[
                ["Overview", "#"],
                ["Architecture", "#"],
                ["Live demo", "#"],
                ["Source", "#"],
              ]}
            />
            <FootCol
              title="Connect"
              links={[
                ["GitHub", "#"],
                ["LinkedIn", "#"],
                ["Email", "mailto:xander.nesta@gmail.com"],
                ["Resume", "#"],
              ]}
            />
          </div>
        </div>

        <div className="relative z-1 mt-16 flex justify-between border-t border-edge pt-5.5 font-mono text-xs text-muted">
          <span>© 2026 Alex Nesta</span>
          <a
            href="#top"
            className="text-muted no-underline transition-colors hover:text-ink"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
