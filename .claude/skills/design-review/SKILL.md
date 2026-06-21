---
name: design-review
description: Review recent UI/styling changes in the KunDev frontend against frontend/DESIGN.md's brand guidelines. Use after making or proposing visual/component changes to this app, or when asked to check that the UI matches the brand.
---

Read `frontend/DESIGN.md` in full, then review the current diff (or the component/styles the user points to) against it.

Check specifically for violations of the explicit "avoid" list in DESIGN.md:
- Generic AI-template look
- Purple-blue gradients
- Decorative emojis in the interface
- Overcrowded cards / too many cards
- Explicit folk iconography

Also check alignment with the positive guidelines:
- Background tones near-white/sand (`#FAFAF9`–`#FFFFFF`)
- High-contrast text (`#111`/`#171717`) with grays for body copy
- Accents are subtle, warm, earth/copper/sunset tones — never saturated or excessive
- Clean sans-serif typography (Geist, Inter, or similar)
- Simple, uncluttered navigation
- Solid or outlined buttons, precise/subtle border radius (macOS/Vercel style, not heavily rounded)
- Shadows are soft and used sparingly; flat-layered design preferred
- Borders are thin (1px) and subtle (e.g. `#EAEAEA`)

Report concrete findings: what matches, what violates a specific rule (quote the rule), and a suggested fix for each violation. Don't invent new design rules beyond what's in DESIGN.md.
