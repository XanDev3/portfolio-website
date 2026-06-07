import SectionHeading from "./SectionHeading";
import ProjectCard, { type Project } from "./ProjectCard";
import { btnClass } from "./ui";

// Aegis + ChainGainz copy is real; AURA / Xolotrain / 5 / 6 are PLACEHOLDERS
// pending the project-curation pass. The bg gradients stand in for real
// screenshots later. No em-dashes in the tags (middle dot instead).
const PROJECTS: Project[] = [
  {
    tag: "FLAGSHIP · AIOps PLATFORM",
    name: "Aegis",
    desc: "Autonomous, human-gated SRE platform. Detects incidents, proposes fixes, and acts only on approval, running on real cloud Kubernetes.",
    stack: ["Terraform", "k3s", "ArgoCD", "Grafana"],
    bg: "linear-gradient(135deg, #1a2620, #0c1411)",
  },
  {
    tag: "FULL-STACK + TAX ENGINE",
    name: "ChainGainz",
    desc: "IRS-compliant crypto tax tool. Cost-basis engine, DeFi classification, and Form 8949 generation. Filed my own 2025 taxes with it.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    bg: "linear-gradient(135deg, #251c11, #120f0a)",
  },
  {
    tag: "AI PROJECT",
    name: "AURA",
    desc: "Placeholder. Send the one-line pitch and stack and I'll fill this in.",
    stack: ["TypeScript", "LLM"],
    bg: "linear-gradient(135deg, #1d1726, #100c14)",
  },
  {
    tag: "PROJECT",
    name: "Xolotrain",
    desc: "Placeholder. Send the pitch and stack for Xolotrain and I'll write this.",
    stack: ["TypeScript", "React"],
    bg: "linear-gradient(135deg, #26161f, #140a10)",
  },
  {
    tag: "TBD",
    name: "[Project 5]",
    desc: "Placeholder. We'll pick this in the project-curation pass. Possibly your blog.",
    stack: ["Node", "Postgres"],
    bg: "linear-gradient(135deg, #16202a, #0a0f14)",
  },
  {
    tag: "TBD",
    name: "[Project 6]",
    desc: "Placeholder. We'll pick this in the project-curation pass.",
    stack: ["Python", "Bash"],
    bg: "linear-gradient(135deg, #202020, #101010)",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-17.5">
      <div className="relative z-10 mx-auto max-w-275 px-10">
        <SectionHeading>{"// selected work"}</SectionHeading>

        <div className="grid grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>

        <div className="mt-6">
          <a
            className={btnClass}
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.24-3.15-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02 0 2.04.14 3 .4 2.28-1.52 3.29-1.2 3.29-1.2.66 1.64.25 2.86.12 3.16.77.82 1.24 1.87 1.24 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.83.56C20.57 21.88 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
            </svg>
            All projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
