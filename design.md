# stay and eat — Design System & Responsive Spec

Single source of truth for both frontends (`se-container`, `se-host-frontend`). Derived from the original design handoff; **the visual language does not change** — only the brand name and the addition of a proper mobile/responsive layer.

---

## 1. Brand

- **Name:** `stay and eat` — applied everywhere (UI text, code identifiers, test data, docs).
- **Wordmark:** lowercase `stay and eat`, Space Grotesk, 500 weight, `letter-spacing: -0.02em`.
- **Host app wordmark:** `stay and eat · host`.
- **Logo mark:** house glyph + coral dot SVG. Logo component is `Logo` (`src/components/Logo.jsx` in `se-container`); the host app renders the wordmark inline.
- **Established copy:** `Find your stay`, `stay and eat Rewards`, `stay and eat points`, `stay and eat Circle`, page `<title>`: `stay and eat — …`.
- **Internal identifiers (also renamed):** localStorage token key is `se_token` (both frontends); seed login emails are `*@stayandeat.test`.

---

## 2. Color tokens (unchanged — see `src/styles/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--c-near-black` | `#17171c` | primary text, pill CTAs, dark cards |
| `--c-deep-green` | `#003c33` | quality/verified, success |
| `--c-coral` | `#ff7759` | primary accent, highlights, progress |
| `--c-soft-coral` | `#ffad9b` | gradients, chips |
| `--c-stone` | `#eeece7` | media placeholders |
| `--c-pale-green` | `#edfce9` | verified surfaces |
| `--c-canvas` | `#ffffff` | page background |
| `--c-slate` | `#75758a` | secondary text / labels |
| `--c-hairline` | `#d9d9dd` | borders/dividers |

**Type:** Space Grotesk (`--f-display`), DM Sans (`--f-body`), JetBrains Mono (`--f-mono`).
**Radii:** card 16px, large 22px, pill 999px. **Icons:** thin-line geometric (existing `Icon.jsx`).

---

## 3. Responsive breakpoints

Use these exact breakpoints (max-width, mobile-last). Prefer CSS media queries in `tokens.css`/`app.css` + responsive className utilities over JS where possible.

| Name | Range | Target |
|---|---|---|
| Desktop | `> 1024px` | full layouts (current desktop design) |
| Tablet | `≤ 1024px` | condensed multi-column |
| Mobile | `≤ 768px` | single-column, stacked, touch-first |
| Small | `≤ 480px` | phone — tightened spacing |

Global mobile rules (`≤768px`):
- Replace fixed horizontal padding `56px` → `20px` (`16px` at ≤480).
- All `display:grid` multi-column → `1fr` unless noted.
- Sticky side cards become **non-sticky, full-width, stacked below** the main content.
- Tap targets ≥ 44px. Font sizes: display headings clamp down (use `clamp()`), e.g. `clamp(32px, 9vw, 64px)`.
- Horizontal scroll rows keep `overflow-x:auto; scrollbar-width:none`.
- Add `<meta name="viewport" content="width=device-width, initial-scale=1">` (verify in index.html).

---

## 4. Per-screen responsive behavior

### se-container (traveller)

**TopNav**
- Desktop: logo · center nav links · Host/Traveller toggle · globe · user pill.
- ≤768: logo (smaller) + **Host/Traveller toggle stays visible** (it is the key feature) + a hamburger/menu button. Hide the center text links (Stays/Experiences/Quality checks) behind the menu or drop them. Reduce padding.
- Toggle must remain easily tappable on mobile.

**Announcement bar:** smaller text, wraps gracefully at ≤480.

**SearchBar**
- Desktop: 4-segment pill (Where / Check in / Check out / Who) + coral round button.
- ≤768: collapse to a single rounded search pill — `🔍 where are you going?` (mirrors the handoff mobile Explore search). Tapping can expand later; for now a single pill is fine.

**CategoryStrip:** already horizontally scrollable — ensure it scrolls cleanly on mobile, hide the Filters/tax toggle on ≤480 (or wrap below).

**Property grid:** 4 cols → 3 (`≤1024`) → 2 (`≤768`) → 1 (`≤480`). Cards keep 1:1 media, badge, heart, dot indicators.

**PropertyDetail**
- Photo grid (`2fr 1fr 1fr` × 2 rows) → on ≤768 show a single full-width hero image + a horizontal thumbnail strip (like handoff mobile detail).
- Body `1.6fr / 1fr` → single column.
- Booking card: stop being sticky-aside; on ≤768 render a **fixed bottom action bar** (`From $price /night` + `Reserve →`) like the handoff mobile detail, and move the full booking/calendar card inline above it. Reserve still → `/login`.
- Amenities grid 2col → 1col.
- Quality Check green strip: chips wrap.

**Login:** already a centered card — ensure it fits small screens (max-width, padding).

### se-host-frontend (host)

**HostHeader**
- Desktop: brand `stay and eat · host` · tabs (Today/Listings/Earnings/Inbox) · Host/Traveller toggle · New listing · avatar.
- ≤768: brand + toggle + a compact menu; tabs become a horizontal scroll row; `New listing` becomes an icon/`+` button. Toggle stays visible.

**Dashboard**
- Greeting heading: `clamp()` down from 64px.
- Stat cards: 4 cols → 2 (`≤768`) → 1 (`≤480`).
- Main `1.7fr / 1fr` (queue + rewards rail) → single column; **rewards rail moves below** the queue, full-width, non-sticky.
- Quality Check queue rows (`120px 1fr auto`) → stack image on top / content / full-width action button on ≤480.
- Listings 2-col grid → 1col on ≤768.

**QualityCheck (host submit)**
- `1.7fr / 1fr` → single column; side panel (guest preview / reward / guidance) stacks below.
- Submission progress band: items wrap; the `Submit` button goes full-width on ≤480.
- ChecklistItem rows: keep thumb + content; allow the upload button to wrap under on very small screens.

**NewListing form:** inputs full-width; counters and category chips wrap; `Publish listing` full-width on mobile.

---

## 5. Optional mobile nicety (recommended)

A floating bottom tab bar on ≤768 for the traveller app (Home · Saved · center logo · Profile), mirroring the handoff mobile companion. Keep it lightweight; it must not overlap the PropertyDetail fixed booking bar (hide the tab bar on the detail page, or stack correctly).

---

## 6. Constraints

- **Do not** change colors, fonts, radii, or the component visual style — only rebrand text + add responsive rules.
- **Do not** change colors, fonts, radii, or component visual style. The logo component is `Logo`.
- Keep everything fast/minimal (no new heavy deps). CSS media queries + small JS (`window.matchMedia`) only where needed.
- Re-verify each app builds (`npm run build`) after changes.
