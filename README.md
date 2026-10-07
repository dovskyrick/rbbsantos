# fento

3D portfolio environment  - an attempt to avoid vibe coding and learn react the proper way 


Monorepo.

- web/ — React + Vite frontend (portfolio / interactive 3D)

## Deployment

**Pushing to `main` deploys the site.** There is nothing else to run.

`.github/workflows/firebase-deploy.yml` builds `web/` and publishes it to
Firebase Hosting:

| | |
|---|---|
| Trigger | any push to `main` (pull requests get a temporary preview URL instead) |
| Build | `npm ci && npm run build` in `web/` |
| Deploy | `FirebaseExtended/action-hosting-deploy` → project `rbbsantos-portfolio`, channel `live` |
| Live at | https://rbbsantos.com |

Authentication is the repository secret
**`FIREBASE_SERVICE_ACCOUNT_RBBSANTOS_PORTFOLIO`** (Settings → Secrets and
variables → Actions). It holds the JSON key of a Google Cloud service account
with the *Firebase Hosting Admin* role on the `rbbsantos-portfolio` project.
Service account keys do not expire on their own, so this needs no upkeep; if it
is ever lost, generate a new JSON key for that service account and replace the
secret's value.

Deploys are free — GitHub Actions minutes are unlimited on public repos and the
site fits Firebase Hosting's free tier. A run takes about a minute.

## Site configuration

Two hard-coded switches control how the site presents itself. Both are plain
booleans — edit, commit, and the deploy above picks them up.

### `web/src/site.ts` — `LIVE_DEMO_AVAILABLE`

Whether the hosted satellite-visualizer demo is up. Currently `false`: the
Fly.io deployment was taken down to stop paying for it, so all three links to
it are hidden (hero call to action, preview button, featured-project link) and
visitors reach the work through the GitHub repository and the scenario
walkthrough videos instead. Each button group promotes its first remaining
button to primary so it keeps one clear call to action.

Set it back to `true` if the demo is redeployed; the previous layout returns
exactly, and nothing else needs changing.

### `web/src/theme.ts` — `DEFAULT_THEME`

Which of the two themes ships. `'light'` is cream paper with a serif for the
slowly-read text; `'dark'` is dark ochre with warm gold accents. Both are
defined purely as CSS custom properties at the top of `web/src/pages/Home.css`,
so a theme is a block of token values and nothing else.

Visitors can switch themes with the toggle in the header, and their choice is
remembered in `localStorage`. An explicit `?theme=light` or `?theme=dark` in the
URL overrides both the saved choice and the build default, which is handy for
sharing one specific look. The older `?theme=mono` and `?theme=blue` names are
still accepted as aliases.

## Scripts

Run from `web/`:

| command | what it does |
|---|---|
| `npm run dev` | dev server |
| `npm run dev:dark` | dev server defaulting to the dark theme |
| `npm run build` | production build (uses `DEFAULT_THEME`) |
| `npm run build:dark` | production build forced to the dark theme |
| `npm run preview` | serve the built output locally |
| `npm run lint` | ESLint |
