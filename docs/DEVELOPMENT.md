# Development Guide — Australia Clarity

**Site:** Australia Clarity — Understanding Australia Through Evidence
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · ECharts
**Modes:** one codebase, two builds (see below). English (`en-AU`) only.

## Quick start

```bash
npm ci                 # install exactly the committed lockfile
npm run dev            # development preview → http://localhost:3000
```

## Two build modes (never remove either)

| Mode | Command | Output | Use |
|------|---------|--------|-----|
| A — development preview | `npm run dev` | live dev server (port 3000) | writing and reviewing content/charts |
| B — GitHub Pages static export | `npm run build:github-pages` | static `out/` directory | exactly what CI deploys |

Both modes run the identical code: the site is a single static route with
client-side hash navigation (`#/method`, `#/chapters/chapter-01`, …), no
server APIs, no middleware, no auth, and no environment files — by design
(zero-secret static site).

## Quality gates (run before every commit)

```bash
npm run typecheck
npm run lint
npm run build:github-pages   # must produce out/ with index.html
```

## Architecture

```
src/
  app/                 # single route: layout (metadata), page (shell)
  components/
    shared/            # header, footer, cards, badges, callouts
    charts/            # ChartPanel (toggle+CSV+sources), EChart (lifecycle),
                       # ChartDataTable (accessible alternative), chartTheme
    views/             # Home, Chapters, Chapter, Method, Sources, Status, About
  chapters/
    chapter-01/        # content.ts, charts/, data/ (generated), sources/
    planned-chapters.ts# chapters 02–14 (honest "Planned" status)
    registry.ts        # typed registry — the only public chapter index
  config/site.ts       # identity/URL truth (deploymentVerified flag!)
  lib/
    research/          # typed contracts (provenance, chapters, charts)
    navigation/        # hash router
research/chapter01/    # reproducible pipeline: scripts/ + series/ CSVs
docs/                  # audit, verification log, handoff, checkpoints
.github/workflows/     # validate.yml (PR, no deploy) + deploy.yml (main)
```

### Chapter isolation rules

- A chapter owns its content, datasets, chart definitions, provenance,
  notes, actions and corrections in its own directory.
- The registry (`src/chapters/registry.ts`) is the only shared index.
- No chapter imports another chapter's private modules.
- Shared components consume the typed `ChapterModule` contract.

### Charts

`ChartPanel` renders a `ChartDefinition` (`src/lib/research/types.ts`):
interactive ECharts view, keyboard-operable chart↔table toggle (each
switch remounts a clean instance — safe repeated restoration), CSV export,
accessible description, interpretation note and full citation. Data comes
only from `src/chapters/chapter-01/data/generated.ts`, which is GENERATED —
do not hand-edit; re-run:

```bash
python3 research/chapter01/scripts/generate-app-data.py
```

after updating the verified CSVs in `research/chapter01/series/`.

### Data provenance discipline

Every dataset used by a chapter must carry a `ProvenanceRecord`
(institution, exact title, URL, access date, reference period, units,
extraction method, transformations, licence, verification status,
comparability notes, known gaps). Never publish a figure that was not
checked against the cited publication; mark unverified items as such.

## Identity and deployment status

`src/config/site.ts` is the single source of identity truth. Canonical and
og:url are omitted while `deploymentVerified === false`; flip the flag
only after observing the live deployment. Never reference the unowned
domain `australia-clarity.com`.

## Accessibility expectations

WCAG 2.2 AA target: visible focus styles, reduced-motion support, semantic
landmarks, skip link, scoped table headers, chart/table alternatives,
44 px touch targets, no horizontal scrolling from 320 px up. Test at 320 /
375 / 390 / 430 / 768 / 1024 / 1440 px.

## Code licence note

Site text is offered as CC BY 4.0 (see the About page). A code licence has
not yet been chosen by the owner; until then, default copyright applies to
the source files.
