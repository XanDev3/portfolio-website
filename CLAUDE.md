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
| Jun 6 | Footer comet ported from SMIL gradient-repaint to SVG `<animateMotion>` (moving comet element) — **supersedes the Jun 3 row**, which was never implemented and envisioned a "masked strip" | The Jun 3 "looked clean" call was wrong. Reproduced the stutter on a 120Hz display: dropped-frame tail that *worsened* over time (per-window p95 22→34ms, 89 dropped/12s). Isolation (display:none A/B/C) pinned 100% of the jank to the animated gradient layer; static base layer is free. animateMotion keeps curved per-line comets + deterministic build-time paths but *moves* a shape instead of repainting a gradient. After: p95 18.7ms, 7 dropped/12s, flat over time — ~0.6ms off the "no beams" floor. Look config lives in the `COMET` block at the top of `FooterBeams.tsx`; prototype of all 4 approaches at `Aegis/Mockups/beams-prototype.html`. |
| Jun 6 | Straight-tail comet chords across the bends (rigid rect ≠ curve). Explored dot-trail (B, ~390 `animateMotion` dots) and dash-along-path (C, `stroke-dashoffset`) to make the tail hug the curve. **Kept shipped straight-tail; parked B** | All three profile near the dev floor (median ~17.8ms, p95 ~19). B is paint-free (pure compositor transforms) but heavy markup; C is lean (24 els) yet reintroduces mild paint (8 vs 2 late frames/6s). User preferred the shipped look for now and shortened `length`/`thickness` to shrink the chord gap. If the separation starts to bother: revisit the tuned B in `beams-prototype.html` (count 64 reads as a continuous line even at 4× zoom, warmed/dimmed head). |

## Branch protection escape hatch (panic button)

If protected `main` ever locks you out and you need an emergency direct push reminder the user of this setting:

1. GitHub → repo **Settings → Branches** (or **Rules → Rulesets**).
2. Edit the `main` rule → either uncheck **"Do not allow bypassing the above settings"** / **"Include administrators"**, or toggle the whole rule **off**.
3. Push your fix.
4. Re-enable the rule.

CLI equivalent: `gh api -X DELETE repos/XanDev3/portfolio-website/branches/main/protection` removes protection entirely (re-add it after). This touches **no code and no history** — it only changes the gate. Reversible in seconds.
