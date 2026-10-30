# CREI lab website

Static Astro site for the Climate Resilient and Equitable Infrastructure Lab (CREI), Department of Civil and Environmental Engineering, Tufts University. Working name until Farshid confirms the official English name.

Research notes for this project (`task_plan.md`, `findings.md`, `data/`, `docs/`, `scripts/`) live in the same folder and are not the site app.

## Content

Edit Markdown in `src/content/` (people, projects, publications, teaching, news). Empty collections render as “Content forthcoming.” Do not invent a student roster or fake citations.
## Review deployment

Live draft: https://ceri-lab.github.io/crei-lab-website/

The `main` branch contains website source only. Every push to `main` builds the site and
publishes it to GitHub Pages through GitHub Actions (`.github/workflows/deploy.yml`).
Internal research material and working notes are excluded from this public repository.

Run `npx astro check` and `npm run build` before pushing.

Internal links and public assets use `src/lib/paths.ts` for the
`/crei-lab-website` deployment base.

The decorative world map uses public-domain Natural Earth 1:110m land geometry (https://www.naturalearthdata.com/). It illustrates geography only, not project coverage.

Institutional marks are supplied Tufts University and Civil and Environmental Engineering white logo assets. The CEE header image is cropped to its department text, omitting the repeated Tufts mark and divider, as requested; its text proportions are preserved.

Projects are funded projects (`src/content/projects/`); each lists its papers in `pubs` (matched by grant acknowledgment). Home Highlighted Publications are hand-picked in `HIGHLIGHT_PUBS` (`src/lib/site.ts`).
