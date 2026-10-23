# Public Release Security Audit — Australia Clarity

**Audit date:** 23 October 2026 (AEST) / 22 October 2026 (UTC)
**Auditor:** GLM-5.3 development agent (automated, evidence-linked)
**Release candidate:** Version 0.1.0 — site foundation + Chapter 01 initial release

This audit is sanitised for public sharing: no secret values, credentials,
machine-specific paths or personal data appear. Every item states status
**PASS**, **FAIL**, or **NOT RUN/BLOCKED**, the method used, the observed
evidence, and limitations. Any security FAIL blocks public release.

---

## 1. Release-gate checklist (machine-readable)

| # | Gate | Status | Method / evidence | Limitations |
|---|-----|--------|-------------------|-------------|
| 1 | Correct official repository targeted; remote history respected | **PASS** | `git ls-remote` on `https://github.com/australia-clarity/australia-clarity.github.io` returned `main` at `1a67d1df` (read-only). A read-only inspection clone (not redistributed) shows a single commit containing only `README.md`. Release delivery is a **source-only archive** plus a clean-clone feature-branch procedure (docs/DEPLOYMENT_AND_GIT_HANDOFF.md). No push performed. | Repository settings (branch protection, Pages config) not visible without authenticated API; GitHub REST API was rate-limited during inspection (unauthenticated). |
| 2 | No unrelated local history shipped as canonical | **PASS** | The development workspace has an independent local history (no remote, never pushed, never advertised as canonical). The delivery archive excludes `.git/` entirely. | None. |
| 3 | No `.env*` files in the release archive | **PASS** | Archive manifest (see §3) contains no `.env*`. The only environment file in the development workspace (`DATABASE_URL` for a local SQLite file — non-secret) is untracked from the local index as of commit `e91239f` and excluded by allowlist. | A local-workspace-only `.env` was part of the workspace's *local* scaffold history (initial commit `1d7db4c`). That history has no remote, was never published, and is not part of the delivery. Documented for transparency. |
| 4 | No secrets/tokens/credentials in tracked, staged or archived files | **PASS** | Pattern scan (AKIA, private keys, `ghp_`, `github_pat_`, `sk-`, api-key/password assignments, Bearer tokens) across release candidates: **0 findings**. gitleaks not installed in environment (fallback grep used). | Pattern scanning cannot guarantee absence of secrets; human review still required by owner. |
| 5 | No personal data or machine-specific paths in release | **PASS** | Scan for machine-specific home-directory paths and email addresses in release candidates: **0 findings**. | None. |
| 6 | Repository minimality (Gate C) | **PASS** | Release `package.json` contains 9 runtime dependencies (next, react, react-dom, echarts, lucide-react, @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge) and 9 dev dependencies. No Prisma, database, auth, server or unused UI-framework packages. Only 3 shadcn/ui components actually used are included. | None. |
| 7 | Dependency vulnerability check | **PASS (with accepted risk)** | `npm audit` on the release lockfile: 5 high findings, all in the development-only ESLint toolchain (eslint-config-next → @next/eslint-plugin-next → fast-glob/micromatch/braces; GHSA-vfj7-8cjw-p6xm — glob stack-exhaustion during linting). Zero findings in runtime/production dependencies. | The findings are upstream of Next.js's own recommended lint config; accepted as development-only risk, tracked upstream. `npm audit fix --force` deliberately not run (breaking). |
| 8 | Data licence audit | **PASS (with caveat)** | Chapter 01 data extracted from ABS publications (site policy links to a Creative Commons Attribution licence from the ABS footer) and World Bank API (UN WPP series). Attribution and licensing recorded per dataset in the chapter's provenance records. Raw source HTML extracts are NOT redistributed (excluded from archive). | The ABS licence-statement page is script-rendered and could not be machine-extracted on the access date; provenance records direct the owner to confirm current ABS terms before redistributing source materials. World Bank terms page similarly not machine-extractable. |
| 9 | `npm ci` reproducibility | **PASS** | `npm ci` run in the isolated release copy after `rm -rf node_modules`: clean install, lint + typecheck + export build all pass. Lockfile v3 committed. | Verified on Node 24.21.0 / npm 11.19.0 only. |
| 10 | TypeScript check | **PASS** | `npx tsc --noEmit` in release copy: 0 errors. Strict mode on. | The development workspace additionally contains pre-existing scaffold examples (excluded from the release). |
| 11 | Lint | **PASS** | `npm run lint` (eslint 9, next config): 0 errors, 0 warnings. | None. |
| 12 | Production static export | **PASS** | `DEPLOY_TARGET=github-pages npm run build` produced `out/` with `index.html`, `robots.txt`, `sitemap.xml`, `og.png`, `icon.svg`, `_next/` assets (30 files). | None. |
| 13 | Static export functional check | **PASS** | `out/` served with a static file server: page renders, hash navigation works, all 6 interactive charts render, 0 page errors (browser automation). | Short smoke test; not a substitute for full CI. |
| 14 | Development preview (Mode A) | **PASS** | `next dev` on port 3000: 200, hot reload, 0 module errors, all views and charts verified. | None. |
| 15 | Browser responsive battery | **PASS** | Viewports 320/375/390/430/768/1024/1440 px: `document.scrollWidth == window.innerWidth` at every width (no horizontal scrolling). | Tested via headless Chromium (agent-browser). |
| 16 | Repeated Chart → Table → Chart restoration | **PASS** | 3 full cycles on the desktop chart panel: table appears on toggle; canvas count returns to baseline (6) after each restore. Mobile (375 px) toggle also verified. | Tested on 2 of 6 charts in depth plus mobile toggle; remaining charts use the identical component. |
| 17 | Touch interaction & tooltips | **PASS** | Tooltip appears on pointer interaction at 375 px, stays within viewport (`confine` on), shows axis values. | Automated touch-gesture fidelity is limited in headless mode. |
| 18 | Accessible table alternative | **PASS** | Every chart exposes a keyboard-operable toggle; tables use caption, scoped headers, sticky header, scrollable region with focusable container. | Screen-reader user testing not performed (tooling limitation). |
| 19 | Sticky footer / layout integrity | **PASS** | Short page: footer bottom == viewport bottom (no gap). Long page: footer below content. Safe-area padding included. | None. |
| 20 | Language & identity | **PASS** | `<html lang="en-AU">` verified; no language switcher; Australian English copy; no unowned domain in metadata/canonical. Custom domain NOT configured (not purchased). | None. |
| 21 | Canonical/og:url honesty | **PASS** | Canonical and og:url omitted while deployment is unverified; `metadataBase` set to the organisation's verified-live Pages host for og:image resolution only. Sitemap carries the intended root with an explanatory code comment. | Deployment of the built site not yet performed (owner gate). |
| 22 | CI workflow security (Gate D) | **PASS (prepared, not run)** | PR validation workflow: `permissions: contents: read`, never deploys, uploads artifact for review only. Deploy workflow: build job read-only; deploy job scoped `pages: write, id-token: write`; concurrency non-cancelling; official actions pinned to major versions (checkout@v4, setup-node@v4, configure-pages@v5, upload-pages-artifact@v3, deploy-pages@v4). | Workflows have NOT been executed (no push performed). Pinning is by major version tag, not SHA — documented as residual supply-chain risk acceptable to the owner's review. |
| 23 | Live deployment verified | **NOT RUN / BLOCKED** | Deployment intentionally not attempted: requires owner authorisation and release review (Gate D). GitHub Pages is currently enabled and serves the default Jekyll README render (verified HTTP 200 on 2026-10-22). | **Deployment NOT verified.** The site's production URL must not be advertised until a real deployment is observed. |
| 24 | Automated unit test suite | **NOT RUN** | No unit test code is included (project constraint for this delivery). Verification performed via typecheck, lint, static build, static-serve smoke test and browser automation instead. | Research-integrity regression tests (schema/citation/chart agreement) are recommended before scaling to more chapters (see checkpoint manifest). |
| 25 | Research citation and dataset verification | **PASS (bounded)** | Every Chapter 01 figure carries a provenance record with URL, access date (2026-10-22), reference period and verbatim evidence quote (archived locally in research/chapter01/). Unverifiable items (OECD fertility dataflow retirement; "record" NOM wording; current national median age on the quarterly release) are explicitly marked NOT VERIFIED in the chapter rather than approximated. | Spot-checking is NOT validation of every chart, year or claim; the provenance register defines the exact verification boundary. |

---

## 2. Repository, history and Git safety

- **Official repository (canonical):** `australia-clarity/australia-clarity.github.io`, branch `main`, single commit `1a67d1df` ("Initial commit" via web UI, 2026-10-22 17:40:47 UTC), containing only `README.md` (title + one-sentence project description).
- **GitHub Pages:** enabled; `https://australia-clarity.github.io/` currently serves the auto-generated Jekyll render of that README (HTTP/2 200 verified 2026-10-22). The organisation's custom site has **not** been deployed.
- **Custom domain:** `australia-clarity.com` is NOT owned. No CNAME, no DNS, no metadata references. Do not configure without explicit owner instruction.
- **Delivery method:** source-only ZIP + clean-clone feature-branch Git Bash procedure. No force push, no unrelated-history merge, no `git push origin main`, no authenticated operations. The agent has no credentials for the owner's GitHub account.
- **Development workspace history:** independent (no remote). Commit `1d7db4c` (scaffold) unintentionally tracked a local `.env` (local SQLite `DATABASE_URL`, non-secret, never published). Remediation commit `e91239f` untracked the file and extended `.gitignore`. This history never leaves the machine and is excluded from delivery. Staging/index inspection (`git status --short`, `git diff --cached --name-only`, `git ls-files`) performed before every commit during development (Gate B discipline).

## 3. Release archive manifest (allowlist)

The source-only archive contains 65 application/research files plus this
documentation and workflow set: `package.json`, `package-lock.json`,
`tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`,
`components.json`, `.gitignore`, `public/og.png`, `src/**` (app shell,
components, chapters, config, lib), `research/chapter01/{series,scripts}`
plus `findings.md` and `verified-data.json` (reproducible pipeline),
`.github/workflows/{validate,deploy}.yml`, `docs/*`.

**Explicitly excluded:** `.git/`, `.env*`, `.next/`, `node_modules/`, `out/`,
`db/`, `prisma/`, raw research HTML extracts, logs, machine-specific files,
sandbox scaffold (`examples/`, `mini-services/`, `tests/`, `Caddyfile`,
`upload/`, `tool-results/`, `.zscripts/`).

Archive scan performed at packaging time (see VERIFICATION_LOG.md §5).

## 4. Residual risks and owner action items

1. **Deployment is not verified.** Do not treat the site as live until a
   GitHub Actions deploy run succeeds and the Pages URL serves the built
   site (Gate D). Recommended sequence is in
   docs/DEPLOYMENT_AND_GIT_HANDOFF.md.
2. **Workflow action pinning** is by major tag, not commit SHA; an owner
   with stricter supply-chain requirements may wish to pin SHAs.
3. **Secret-scanning** used pattern matching (gitleaks unavailable in this
   environment). Running a gitleaks/secret-scanning service against the
   repository before making it public is recommended defence-in-depth.
4. **Branch protection** on `main` (require PR review before merge) is
   recommended; if unavailable on the current plan, the manual review
   discipline in the handoff document substitutes imperfectly. No protection
   mechanism replaces human review.
5. **Licence statement pages** for ABS and World Bank data are
   script-rendered; confirm current terms before redistributing source
   materials beyond the attribution and linking practised here.

## 5. Verdict

**No security FAILs. Release candidate is approved for owner review.**
Items marked NOT RUN (live deployment; unit-test suite; CI execution)
remain explicitly unverified and must not be claimed otherwise.
