// The "// label" mono heading shared by stack / experience / work sections.
export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-6.5 font-mono text-sm uppercase tracking-[0.1em] text-muted">
      {children}
    </h2>
  );
}
