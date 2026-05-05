# UI hierarchy polish design

## Scope
Minor-to-moderate visual polish for existing Vue portfolio. No route/data architecture changes. No git commits.

## Direction
Cleaner hierarchy, pushed further than tiny polish:
- Stronger hero composition and CTA contrast.
- Add concise credibility/signal row below hero.
- Improve nav active state and mobile menu clarity.
- Improve section rhythm, spacing, separators, and card hierarchy.
- Improve experience timeline readability.
- Improve skills bento category emphasis.

## Constraints
- Keep current dark/light theme tokens.
- Keep existing content source in `src/data/profile.ts`.
- Avoid unrelated refactors.
- Maintain responsive behavior.
- Respect reduced-motion media query.

## Components
- `HeroSection.vue`: add signal row and use existing profile content more cleanly.
- `NavBar.vue`: no logic changes unless needed; visual classes only.
- `src/style.css`: main UI polish via CSS.

## Testing
- Run production build.
- If possible, visually inspect locally.
