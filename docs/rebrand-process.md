# Rebrand Development Process

**Estimated difficulty: Medium**
Well-scoped one-pager using the existing React + TypeScript + Vite stack. No new routing or data layer needed.

---

## Stage 1 — Scaffold and style foundation

- Create `web/src/pages/Home.tsx` as the new landing page
- Set up global CSS tokens: dark background, muted blue/gray/white palette, clean typography scale
- Wire `App.tsx` to render `Home` at `/` and move the existing 3D world to `/visual-experiments`

## Stage 2 — Build sections top to bottom

Work through each section in page order:

1. Hero (name, tagline, four CTA buttons)
2. Visual preview (screenshot placeholder + two buttons)
3. Featured project (description + feature list + links)
4. Experience (three entries, compact)
5. Education (two entries)
6. Other software work (language app card)
7. Skills (four grouped tag clusters)
8. About (short paragraph)
9. Contact (links row)
10. Footer (discreet visual experiments link)

## Stage 3 — Mobile pass

- Stack/wrap buttons on small screens
- Scale screenshot correctly
- Eliminate any horizontal overflow
- Test nav readability

## Stage 4 — Polish and placeholders

- Verify all real links work
- Confirm all `PLACEHOLDER_*` values are visible and easy to swap
- Subtle fade-in and hover transitions
- Final check across viewport sizes
