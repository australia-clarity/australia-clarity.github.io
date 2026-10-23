# Deployment and Git Handoff — Australia Clarity

**Prepared:** 23 October 2026 (AEST)
**Status:** Delivery is a source-only archive; no push, commit or deployment
to the official repository has been performed by the development agent.

This document gives the owner a safe, non-destructive, reviewable path from
the release archive to a deployed GitHub Pages site. Every step is written
for Git Bash on Windows and also works on macOS/Linux terminals.

---

## 0. Non-negotiable safety rules (why these steps look like this)

1. Never use `git push --force`, `--force-with-lease`, `git reset --hard`
   on shared work, or `--allow-unrelated-histories`.
2. Never push a new local history directly to `main`.
3. Never commit `.env*` files, secrets or private archives (this project
   needs none — the static site uses zero environment files).
4. Human review before deployment. A passing build is not a deployment.
5. The custom domain `australia-clarity.com` is not owned: no CNAME, no
   DNS, no canonical URL referencing it.

## 1. What you received

- `australia-clarity-source-0.1.0.zip` — reviewed source only (no `.git`,
  no `node_modules`, no build output, no environment files, no logs).
- `docs/` inside the archive: security audit, verification log, checkpoint
  manifest, this file.
- The official repository `australia-clarity/australia-clarity.github.io`
   remains exactly as it is today (single README commit, Pages enabled and
   serving the default README render).

## 2. Review the archive (recommended)

```bash
# Inspect the manifest — confirm no .env, no .git, no node_modules
unzip -l australia-clarity-source-0.1.0.zip | less

# Extract somewhere separate from any existing clone
mkdir -p ~/review/australia-clarity && cd ~/review/australia-clarity
unzip /path/to/australia-clarity-source-0.1.0.zip
```

Optional local verification (Node.js 20+; verified on 24.21.0):

```bash
npm ci          # installs exactly from package-lock.json
npm run dev      # preview at http://localhost:3000
# In a second terminal, verify the production export:
npm run build:github-pages   # creates out/
```

## 3. Apply the source to the official repository (feature branch)

```bash
cd ~
git clone https://github.com/australia-clarity/australia-clarity.github.io.git
cd australia-clarity.github.io

# Confirm you started from the official history (expect 1a67d1df)
git log --oneline -n 5

# Create a scoped feature branch
git switch -c site/initial-release-0.1.0

# Copy the reviewed source into the repository
# (this adds files; it does not touch your existing README.md)
cp -r ~/review/australia-clarity/src .
cp -r ~/review/australia-clarity/public .
cp -r ~/review/australia-clarity/docs .
cp -r ~/review/australia-clarity/research .
cp -r ~/review/australia-clarity/.github .
cp ~/review/australia-clarity/{package.json,package-lock.json,tsconfig.json,next.config.ts,postcss.config.mjs,eslint.config.mjs,components.json,.gitignore} .

# Review exactly what is about to be staged (Gate B discipline)
git status --short
```

Verify before committing — the following must be true:

```bash
git ls-files | grep -E '(^|/)\.env' ; echo "exit=$?"   # must show exit=1 (nothing found)
git ls-files | grep node_modules ; echo "exit=$?"     # must show exit=1
```

Commit only the reviewed file set:

```bash
git add src public docs research .github package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs components.json .gitignore
git diff --cached --name-only | less   # final review of the staged list
git commit -m "Site 0.1.0: foundation, Chapter 01 initial release, workflows, docs"
```

## 4. Push the feature branch and open a pull request

```bash
git push -u origin site/initial-release-0.1.0
```

Then on GitHub: open a pull request from `site/initial-release-0.1.0` into
`main`. The **Validate PR** workflow will run (install, typecheck, lint,
static export, artifact upload — it cannot deploy). Review the diff and the
workflow result yourself.

## 5. Enable deployment (after you are satisfied with the review)

Before merging, confirm repository settings:

- **Settings → Pages → Build and deployment → Source: GitHub Actions**
  (not "Deploy from a branch"). This matters: the repository currently
  uses the legacy Jekyll render.
- Optional but recommended: **Settings → Branches → Add rule** for `main`
  (require pull request reviews before merging).

Merging the pull request (or pushing to `main`) triggers **Deploy to GitHub
Pages**: build → typecheck → lint → static export → assert `out/` → upload
artifact → deploy with official Pages actions and least-privilege tokens.

## 6. Verify the deployment yourself (Gate D)

1. GitHub → Actions → the "Deploy to GitHub Pages" run must be green.
2. Open `https://australia-clarity.github.io/` — you must see the dark
   Australia Clarity site (not the README render).
3. Spot-check: the Chapters page, Chapter 01, a chart toggle, and a phone
   width.

Only after that is the deployment "verified". Until then, do not advertise
the URL as live.

## 7. If something goes wrong

- A failed workflow: read the failing step's log; re-run jobs after fixing.
  The PR workflow never deploys, so nothing is at risk during validation.
- Wrong Pages source: switch Settings → Pages to "GitHub Actions" and
  re-run the deploy workflow.
- Need to stop Pages from serving the Jekyll README before the first
  deploy: temporarily set Pages source to "GitHub Actions" with no workflow
  run yet, or leave as-is until the first deploy replaces it.
- Roll back: the Pages deployment history in GitHub Actions allows
  restoring a previous artifact; the repository history is never rewritten.

## 8. Local development commands (for future work)

| Command | Purpose |
|---------|---------|
| `npm ci` | Install exactly the committed lockfile |
| `npm run dev` | Development preview (port 3000) |
| `npm run build:github-pages` | Static export to `out/` (what CI deploys) |
| `npm run lint` / `npm run typecheck` | Quality gates |
| `python3 research/chapter01/scripts/generate-app-data.py` | Regenerate chart data modules from verified CSVs |
