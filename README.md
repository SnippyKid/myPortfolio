# SnippyKid Portfolio

Personal portfolio site for **Abhay Hanchate** (SnippyKid): creative developer and designer. The page is a single-page experience with GSAP-driven motion, three full-site theme modes, and a cinematic project list with hover video previews.

**Live demo:** [snippykid.github.io/myPortfolio](https://snippykid.github.io/myPortfolio/)

---

## Highlights

- **Theme modes** — Volcano (**Space**), Space (**E**), Jungle (**J**): background video, cursor effects (embers, laser + stars, rain + leaves), atmosphere overlays, and mode-specific typography accents.
- **Hero** — Navada display title with scramble-on-load; Space Grotesk body copy; prominent name treatment for Abhay Hanchate.
- **Featured projects** — Row-based layout with floating preview card (video, scanlines, live badge, 3D tilt), magnetic row hover, and mode-tinted accents.
- **About** — Stats row and scrolling skills ticker (no card grid).
- **Clients** — Full-width accordion rows with logos and labels.
- **Footer** — Large centered logotype, mode-aware glow and label, social links.
- **Polish** — Animated film grain (`body::after`), scroll progress bar, optional dramatic transitions when entering or leaving a mode.

---

## Tech stack

| Layer | Details |
|-------|---------|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, animations, responsive rules) |
| Motion | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger + ScrollToPlugin (CDN) |
| Icons | Font Awesome 6.5.1 (CDN) |
| Body font | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts) |
| Display font | Navada (local `assets/font/navada/`) |
| Extra (local) | Coolvetica — defined in CSS `@font-face`; not used as the main body font |

Bootstrap is **not** linked from `index.html`; the site is layout-built with custom CSS. Legacy Bootstrap files may still exist under `assets/bootstrap-*` but are unused by the main page.

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| **Space** | Toggle Volcano mode (when not typing in an input) |
| **E** | Toggle Space mode |
| **J** | Toggle Jungle mode |
| **Escape** | Exit the active theme mode |

Theme pills in the hero also trigger the same modes via click.

---

## Run locally

1. Clone or download the repository.
2. Open `index.html` in a modern desktop browser (Chrome, Firefox, Edge, Safari).
3. For correct font loading and video paths, serving the folder over HTTP is recommended (e.g. VS Code Live Server, `npx serve`, or any static file server).

Mode background videos are loaded from `assets/videos/`; ensure those files are present if you want full theme visuals.

---

## Repository layout

```
Portfolio/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── font/
│   │   ├── navada/
│   │   └── coolvetica/
│   ├── img/
│   ├── videos/           # referenced by theme backgrounds and project previews
│   ├── bootstrap-css/    # present in repo; not linked from index.html
│   └── bootstrap-js/
```

If `assets/videos/` is missing, add your MP4s or update paths in `index.html` / `script.js` to match.

---

## License

© 2025 Abhay Hanchate (SnippyKid). All rights reserved.
