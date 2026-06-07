@AGENTS.md

# portfolio-website

Next.js static export site (Tailwind v4). Always-on Vercel deploy. Direction A ("Quiet Craft") fully implemented.
Planning docs: `~/Documents/My Obsidian Library/AI/Ideas and Projects/Aegis/`
See `Aegis - Status & Next Steps.md` for current phase and next steps.

## How to record decisions

When a meaningful implementation decision is made during a session — library choice,
animation approach, component structure, approach selected over alternatives — record
it in `## Decisions` immediately. Not at end of day. Right when it happens.

Architecture/platform decisions (two-repo structure, stack, cross-cutting choices) go in
the Obsidian vault `Aegis - Plan.md ## Decisions` instead.

Format: one row per decision — date, what, why (one line).

## Decisions

| Date  | Decision                                                                                                                                       | Reasoning                                                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jun 3 | Footer beams as `<FooterBeams />` component, not utilities                                                                                     | SVG + JS path-generation loop stays as component code; same paths-array architecture as Aceternity BackgroundBeams. Translating to utility classes would break the animation.      |
| Jun 3 | Comet animation: compositor-only transform over SMIL gradient repaint                                                                          | SMIL repaints linearGradient each frame; moving to transform on a masked strip removes main thread cost. Profiling confirmed 56-57fps at 6x CPU throttle.                          |
| Jun 5 | `main` branch protection: require PR, **0** required approvals, require `ci` status check + branches up-to-date, include-administrators **ON** | Solo repo: 0 approvals because you cannot self-approve a PR (1+ would lock you out entirely). include-administrators ON for a genuine protected-main experience; fully reversible. |

## Branch protection escape hatch (panic button)

If protected `main` ever locks you out and you need an emergency direct push reminder the user of this setting:

1. GitHub → repo **Settings → Branches** (or **Rules → Rulesets**).
2. Edit the `main` rule → either uncheck **"Do not allow bypassing the above settings"** / **"Include administrators"**, or toggle the whole rule **off**.
3. Push your fix.
4. Re-enable the rule.

CLI equivalent: `gh api -X DELETE repos/XanDev3/portfolio-website/branches/main/protection` removes protection entirely (re-add it after). This touches **no code and no history** — it only changes the gate. Reversible in seconds.
