# Checkpoint Manifest — Australia Clarity

**Last updated:** 23 October 2026 (AEST) — version 0.1.0 delivered

This manifest lets any interrupted or future agent/developer resume work
without redoing completed research or breaking completed gates.

---

## Phase status (per specification §11)

| Phase | Description | Status | Evidence / notes |
|-------|-------------|--------|------------------|
| 1 | Inspect verified references and destination repo | **DONE** | Official repo inspected read-only (HEAD 1a67d1df, README only, Pages enabled serving Jekyll README render). Reference sites listed as design context only — not cloned into the repo. |
| 2 | Foundation and deployment configuration | **DONE** | Dual-mode `next.config.ts` (dev / `DEPLOY_TARGET=github-pages` → `out/`, both verified), design tokens, layout, hash router, sticky footer. |
| 3 | Homepage, methods, source registry, 14 chapter placeholders | **DONE** | Home, Chapters, Method, Data sources, Research status, About views; registry with honest status for all 14 chapters. |
| 4 | Chart platform | **DONE** | ECharts wrapper with strict lifecycle (init/dispose/resize), chart/table toggle with repeated restoration verified, CSV export, accessible tables, tooltips confined on mobile, source panels. |
| 5 | Chapter 01 source research | **DONE (initial)** | ABS + World Bank verification with quotes, URLs, access dates; provenance records; method notes; actions; corrections history. Verified data in `src/chapters/chapter-01/data/generated.ts` (generated from `research/chapter01/series/` via script). |
| 6 | Source/numeric audit | **DONE (bounded)** | Sanity checks in extraction scripts; cross-checks (World Bank AUS TFR 2024 = ABS 1.481); discrepancies (UN 2019 vs ABS 1.657/1.666; datacube TFR approximation) documented and avoided. Bounded by access date 2026-10-22. |
| 7 | End-to-end verification | **DONE (browser)** | See docs/VERIFICATION_LOG.md: typecheck, lint, npm ci, static export, static-serve smoke, browser battery (7 viewports, toggle cycles, tooltips, sticky footer, focus management). Unit test suite intentionally not included this round. |
| 8 | Package and review | **DONE** | Source-only ZIP + clean-clone Git Bash handoff + security audit + this manifest. No push/deploy performed. |

## Known blockers / open items

- **Deployment not verified** (owner action required — see
  docs/DEPLOYMENT_AND_GIT_HANDOFF.md §5–6). Pages currently serves the
  default README render.
- **CI workflows written but never executed** (they run on first PR/push).
- **OECD fertility dataflow retired** — international fertility comparison
  uses World Bank/UN WPP (labelled); OECD direct sourcing marked not
  verified.
- **Age/sex data lag**: pyramid at 30 June 2025 vs headline 31 March 2026
  (documented in chapter method notes).

## Next safe actions (recommended order)

1. Owner: review archive + audit; follow handoff §3–4 (branch, PR).
2. Owner: switch Pages source to "GitHub Actions"; merge; verify deploy.
3. After deploy: set `deploymentVerified: true` in `src/config/site.ts`
   and add canonical/og:url metadata (the config comments explain where).
4. Development: add research-integrity regression checks (schema,
   citation ID, chart/data agreement) before scaling chapters 02–14.
5. Development: Chapter 02 (Economy & Industry) research per method
   (observe → verify → …), following the Chapter 01 provenance pattern.

## Dataset versions (immutability notes)

Chapter 01 datasets were extracted on 2026-10-22 from:

- ABS "National, state and territory population, March 2026" (+ its
  time-series spreadsheets)
- ABS "Births, Australia, 2024"
- ABS "Deaths, Australia, 2025" and "Life expectancy, 2022–2024"
- ABS Indigenous population estimates (30 June 2021) and 2021 Census counts
- ABS "Household and Family Projections, Australia, 2021–2046"
- ABS "Population Projections, Australia, 2022 (base) – 2071"
- ABS "Regional population by age and sex, 2025"
- World Bank API SP.DYN.TFRT.IN and SP.DYN.LE00.IN (lastupdated
  2026-10-08; 2024 values)

ABS notes all data after 30 June 2021 are subject to revision: when
re-extracting, keep the previous series files and add a correction entry to
the chapter rather than silently changing published figures.
