const LINKS = [
  { href: "#stack", label: "stack" },
  { href: "#experience", label: "experience" },
  { href: "#work", label: "work" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  return (
    <nav className="fixed left-1/2 top-7 z-50 flex -translate-x-1/2 items-center gap-6.5 rounded-[10px] border border-edge bg-[rgba(20,19,17,0.7)] px-5 py-2.5 font-mono text-[13px] backdrop-blur-[10px]">
      <span className="font-bold text-accent">~/alex-nesta</span>
      {LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className="text-muted transition-colors hover:text-ink"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
