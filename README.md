# stay-eat-container — stay and eat Traveller Web

The **customer-facing (Traveller) app** for the stay and eat homestay platform.
Built with Vite + React 18 + react-router-dom v6. No heavy UI libraries — all styling via the ported design-token CSS.

## Stack

| Layer | Choice |
|-------|--------|
| Bundler | Vite 5 |
| Framework | React 18 |
| Router | react-router-dom 6 |
| Styling | Plain CSS — `src/styles/tokens.css` (design tokens + utility classes) |
| Icons | Custom SVG icon set in `src/components/Icon.jsx` |
| Fonts | Space Grotesk (display) · DM Sans (body) · JetBrains Mono (labels) — Google Fonts |

## Development

```bash
npm install
npm run dev        # → http://localhost:3000
```

## Build

```bash
npm run build      # output: dist/
npm run preview    # preview the built SPA on port 3000
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3001/api/v1` | Back-end REST API base URL |
| `VITE_HOST_APP_URL` | `http://localhost:3002` | URL of the host-facing app (for the nav toggle) |

Vite inlines these at build time. When building the Docker image, pass them as build args:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.yourdomain.com/api/v1 \
  --build-arg VITE_HOST_APP_URL=https://host.yourdomain.com \
  -t stay-eat-container .
```

## Routes

| Path | Page | Notes |
|------|------|-------|
| `/` | Landing | Announcement bar, TopNav, SearchBar, CategoryStrip, 4-col PropertyGrid |
| `/property/:id` | Property Detail | Photo grid, amenities, sticky booking card with mini-calendar |
| `/login` | Login | Email + password form; on success stores `se_token` in localStorage |
| `*` | — | Redirects to `/` |

## Host / Traveller toggle

The TopNav contains a pill segmented control:

- **Traveller** (active, near-black) — this app; no navigation.
- **Host** (inactive, slate) — redirects the whole window to `VITE_HOST_APP_URL`.

## Booking flow

The "Reserve" button on the Property Detail page redirects to `/login`. Booking requires authentication. After login the token is stored under `localStorage.se_token`.

## API resilience

All `GET` calls in `src/lib/api.js` are wrapped in `try/catch`. If the API is unreachable, the app falls back to the bundled `src/lib/fallbackData.js` (8 properties, 9 categories, 4 experiences), so the UI always renders without errors.

## Docker

Multi-stage build. Stage 1 builds the Vite SPA; Stage 2 serves it with `nginx:alpine` on port 80 with SPA fallback (`try_files`) and gzip enabled.

```bash
docker build -t stay-eat-container .
docker run -p 3000:80 stay-eat-container
```
