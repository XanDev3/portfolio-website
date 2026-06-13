import { btnClass, iconBtnClass } from "./ui";

export default function Hero() {
  return (
    <header id="top" className="px-10 pb-30 pt-50">
      <div className="relative z-10 mx-auto max-w-275">
        <p className="mb-5.5 font-mono text-[13px] tracking-[0.08em] text-accent">
          SOFTWARE · SRE / DEVOPS · AI
        </p>

        <h1 className="mb-6 text-[62px] font-medium leading-[1.05] tracking-[-0.01em]">
          Hi, I&apos;m <span className="italic text-accent">Alex Nesta</span>.
        </h1>

        <p className="mb-9 max-w-155 text-[21px] text-muted">
          I&apos;m a systems and software engineer. I build and operate cloud
          infrastructure with Terraform and Kubernetes, ship full-stack web and
          blockchain apps, and design the agents that run them.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Primary CTA with the traveling shimmer overlay */}
          <a
            href="#work"
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
            <span className="relative z-1">See my work →</span>
          </a>

          {/* Resume (download icon) */}
          <a className={btnClass} href="#" download>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>

          {/* Email (icon only) */}
          <a
            className={iconBtnClass}
            href="mailto:xander.nesta@gmail.com"
            aria-label="Email me"
          >
            <svg
              className="h-4.5 w-4.5"
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
          </a>

          {/* GitHub */}
          <a
            className={iconBtnClass}
            href="https://github.com/"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.24-3.15-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02 0 2.04.14 3 .4 2.28-1.52 3.29-1.2 3.29-1.2.66 1.64.25 2.86.12 3.16.77.82 1.24 1.87 1.24 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.83.56C20.57 21.88 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            className={iconBtnClass}
            href="https://www.linkedin.com/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
