import SectionHeading from "./SectionHeading";

// PLACEHOLDER content from the mockup — real dates/titles/copy land once
// Alex sends his resumes. Keep the shape; swap the strings.
const EXPERIENCE = [
  {
    period: "2021 - Present",
    title: "Sr. Systems Administrator",
    company: "Raytheon",
    summary:
      "Operate and automate production infrastructure for mission systems. Manage Linux and Windows fleets, harden and patch systems to security baselines, and script away the repetitive work that used to be done by hand.",
  },
  {
    period: "2018 - 2021",
    title: "IT Support Specialist",
    company: "University of Florida, Help Desk",
    summary:
      "Frontline support across thousands of staff and student endpoints. Triaged and resolved hardware, network, and account issues, and built documentation that cut repeat tickets.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-17.5">
      <div className="relative z-10 mx-auto max-w-275 px-10">
        <SectionHeading>{"// experience"}</SectionHeading>

        <div className="flex flex-col">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="grid grid-cols-[190px_1fr] gap-6 border-t border-edge py-6 last:border-b"
            >
              <div className="pt-1 font-mono text-[13px] text-muted">
                {job.period}
              </div>
              <div>
                <h3 className="mb-1 text-[23px] font-medium">{job.title}</h3>
                <div className="mb-3 font-mono text-[13px] text-accent">
                  {job.company}
                </div>
                <p className="text-base text-muted">{job.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
