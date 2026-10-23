# Verification Log — Australia Clarity 0.1.0

**Date:** 22–23 October 2026 (UTC/AEST)
**Environment:** Linux x86_64, Node.js 24.21.0, npm 11.19.0
**Toolchain verified:** Next.js 16.4.2, React 19.3.1, TypeScript 5.9.3,
Tailwind CSS 4.3.3, ESLint 9.39.5, ECharts 6.1.0

Every claim below was produced by actually running the command or tool
described. Verification screenshots were captured during the session and
are not redistributed in the archive; re-running the documented steps
reproduces them.

---

## 1. Research verification (Chapter 01)

| What | Method | Result |
|------|--------|--------|
| ABS key figures (population, births, deaths, life expectancy, Indigenous population, households, ageing, NOM) | Fetched each ABS release page with curl (browser user-agent); extracted verbatim quotes; archived extracts under `research/chapter01/raw/`; structured results in `research/chapter01/verified-data.json` | 30+ figures verified with quotes + URLs; explicit NOT VERIFIED list produced for unavailable claims |
| ABS time series (ERP 1981–2025; quarterly components 1981–2026; age structure 30 Jun 2025; states 31 Mar 2026; TFR 1924–2024) | Downloaded ABS time-series spreadsheets; parsed with Python/openpyxl; sanity-checked row counts and endpoint values (e.g. latest ERP 27,921.2 thousand matches published 27,921,150); scripts in `research/chapter01/scripts/` | 6 clean CSV series; all sanity checks passed; caveats recorded (post-Jun-2021 revision notice, datacube TFR approximation discrepancy documented and avoided) |
| International comparisons (fertility + life expectancy, 12 countries, 2024) | World Bank API JSON (SP.DYN.TFRT.IN, SP.DYN.LE00.IN); OECD SDMX attempted 3×, former national fertility dataflow retired (404) — recorded as NOT VERIFIED, not substituted | Australia TFR via World Bank (1.481) matches ABS exactly; UN WPP basis caveats documented |
| ABS / World Bank licence statements | Attempted automated extraction of licence pages | Pages are script-rendered; could not machine-extract — recorded honestly in provenance records with instruction to confirm |

## 2. Build and static verification

| Check | Command | Result |
|-------|---------|--------|
| Install (release copy) | `npm install` then `rm -rf node_modules && npm ci` | PASS — clean reproducible install from lockfile |
| Typecheck | `npx tsc --noEmit` | PASS — 0 errors |
| Lint | `npm run lint` | PASS — 0 errors, 0 warnings |
| Static export (Mode B) | `DEPLOY_TARGET=github-pages npm run build` | PASS — `out/` produced: index.html (56,232 bytes), robots.txt, sitemap.xml, og.png, icon.svg, `_next/` chunks; 30 files |
| Export functional smoke test | Served `out/` via `python3 -m http.server`, drove with browser automation | PASS — renders, hash navigation works, 6 chart canvases, 0 page errors |
| Development preview (Mode A) | `next dev` (port 3000) | PASS — HTTP 200, hot reload, 0 module errors |
| Dependency audit | `npm audit` | 5 high findings, ALL in dev-only ESLint toolchain (eslint-config-next → … → braces GHSA-vfj7-8cjw-p6xm); 0 in runtime dependencies; accepted with documentation |

## 3. Browser verification (headless Chromium via agent-browser)

| Check | Viewport(s) | Result |
|-------|-------------|--------|
| Home renders (hero, method, 14 chapter cards, disclaimer) | 1440×900 | PASS — full a11y tree verified |
| All views render (Chapters, Method, Data sources, Research status, About) | 1440×900 | PASS — each view's H1 verified |
| Chapter 01 renders (7 observations, 8 sections, 6 chart panels, provenance table, 4 actions, corrections) | 1440×900 and 375×800 | PASS |
| Chart canvases have real geometry | 1440×900 | PASS — e.g. 1078×360, pyramid 1078×460 |
| Chart → Table → Chart, 3 full cycles (desktop) | 1440×900 | PASS — table count 1 on table mode; canvas count back to 6 after each restore |
| Chart toggle on mobile | 375×800 | PASS |
| Tooltip appears, confined, correct values | 375×800 | PASS — e.g. "Sep 2000 · Births 64.1 · Deaths 36.3 · NI 27.9 · NOM 31.9", `within viewport: true` |
| No horizontal scrolling | 320, 375, 390, 430, 768, 1024, 1440 px | PASS — scrollWidth == innerWidth at all seven widths |
| Sticky footer short page | 1440×900 | PASS — footer bottom == viewport bottom (900 == 900), no gap |
| Footer pushed by long content | 1440×900 | PASS — footer top (8941) below main content |
| Skip link visible on keyboard focus | 1440×900 | PASS — 153×40 px visible box on focus |
| Console errors | all tests | NONE |
| Page errors | all tests | NONE |
| `lang` attribute | — | `en-AU` |

## 4. Visual review (VLM on screenshots)

| Screenshot | Verdict |
|------------|---------|
| Home 1440 | Dark theme highly readable, excellent contrast, layout well-aligned, no visual defects |
| Chapter 01 1440 | Excellent readability, clean professional layout, precise alignment, no defects |
| Chart panel mobile 375 | Chart rendered with visible line/axes, labels readable, nothing overflows |
| Components chart 1440 | All four series, legend, axes legible; no clipping or overlap |

## 5. Security scans

| Scan | Method | Result |
|------|--------|--------|
| Environment files | Filesystem search excluding node_modules/.next | 1 file in dev workspace (local DATABASE_URL, non-secret); untracked from index; excluded from release |
| Secret patterns | grep for AKIA / private keys / ghp_ / github_pat_ / sk- / api-key / password / Bearer across release candidates | 0 findings (gitleaks unavailable in environment — pattern scan only) |
| Machine paths / personal data | Machine home-directory paths and email regex across release candidates | 0 findings |
| Git history (dev workspace) | `git rev-list --all --objects`, `git log --all --name-only` | History: `.env`, `.gitignore`, `README` in initial scaffold commit; documented; never pushed; excluded from delivery |
| Release archive manifest | `unzip -l` + content scan at packaging | See packaging section — no `.env*`, no `.git/`, no node_modules, no logs, no raw extracts, no machine-specific paths |

## 6. What was NOT verified (honest list)

- **Live GitHub Pages deployment of the site** — not attempted (requires
  owner authorisation; Gate D). The Pages host currently serves the default
  README render only.
- **CI workflow execution** — workflows written and security-reviewed but
  never run (no push performed).
- **OECD-sourced fertility comparison** — OECD's former national dataflow
  retired; World Bank/UN series used and labelled; marked not verified in
  the chapter.
- **Screen-reader user testing** — structural accessibility implemented and
  machine-verified; human assistive-technology testing not performed.
- **Unit/integration test suite** — not included in this delivery
  (constraint); verification performed by typecheck, lint, build,
  static-serve smoke test and browser automation.
