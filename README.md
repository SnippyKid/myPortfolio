# SnippyKid — Portfolio

> Personal portfolio of **Abhay Hanchate** (SnippyKid), creative developer & designer.  
> A single-page cinematic experience built with vanilla HTML, CSS, and JavaScript — zero frameworks, pure craft.

**Live:** [snippykid.github.io/myPortfolio](https://snippykid.github.io/myPortfolio/)

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Theme System — Deep Dive](#theme-system--deep-dive)
5. [Footer Image Cards — Deep Dive](#footer-image-cards--deep-dive)
6. [Animations & Motion](#animations--motion)
7. [Sections](#sections)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Folder Structure](#folder-structure)
10. [Running Locally](#running-locally)

---

## Overview

SnippyKid Portfolio is a fully hand-coded, single-page portfolio site. There are no component frameworks, no build tools, and no bundlers — every pixel is authored directly in HTML, CSS, and vanilla JavaScript. The design philosophy is **cinematic and interactive**: the site responds to keyboard input, mouse movement, and scroll position to create an experience that feels alive.

Key experiences:
- **Three full-site theme modes** that transform every element — colors, cursors, particles, typography accents, and backgrounds
- **Cinematic project rows** with floating video preview cards, 3D tilt, scanline overlays, and magnetic hover
- **Footer logotype** with per-letter hover image cards that scatter randomly over the text with idle float animations
- **Hero name scramble** on first load — letters cycle through random characters before resolving into the real name
- **Film grain overlay** rendered via CSS SVG filter for a premium dark-screen feel
- **Scroll progress bar** and GSAP ScrollTrigger-driven reveal animations throughout

---

## Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Markup** | HTML5 | Semantic structure, `data-*` attributes for JS hooks |
| **Styles** | CSS3 | Custom properties (`--var`), `@keyframes`, `clip-path`, `backdrop-filter`, `mask-image`, CSS Grid, Flexbox |
| **Motion** | [GSAP 3.12.5](https://greensock.com/gsap/) | Core tween engine — all JS-driven animations |
| **Scroll** | GSAP ScrollTrigger 3.12.5 | Scroll-linked reveals, parallax, pin effects |
| **Scroll-to** | GSAP ScrollToPlugin 3.12.5 | Smooth programmatic scroll on nav clicks |
| **Icons** | [Font Awesome 6.5.1](https://fontawesome.com/) | Social icons, UI indicators |
| **Display font** | Navada (local) | Used for all headings, hero title, footer logotype — loaded via `@font-face` from `assets/font/navada/` |
| **Body font** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Weights 300–700 — all body copy, labels, tags, UI text |
| **Extra font** | Coolvetica (local) | Defined in `@font-face`; available but not used as primary body font |
| **Canvas API** | Native browser | Volcano ember particles, Space laser + star field, Jungle rain + leaf trail — all drawn on `<canvas>` elements injected by JS |
| **SVG filters** | Inline `<feDisplacementMap>` + `<feTurbulence>` | Film grain `body::after` noise overlay |
| **IntersectionObserver** | Native browser | Stat counter triggers, section reveal fallbacks |
| **MutationObserver** | Native browser | Watches `body.classList` to sync footer mode label and re-run mode-specific setup |
| **requestAnimationFrame** | Native browser | Particle loops, cursor lerp, footer card float animations |

> **No React, Vue, Angular, or any JS framework. No Webpack, Vite, or bundler. No npm dependencies.**  
> All CDN scripts are loaded at the bottom of `<body>` in the correct dependency order: GSAP core → ScrollTrigger → ScrollToPlugin → `script.js`.

---

## Architecture

```
index.html          ← single HTML file; all content lives here
assets/
  css/style.css     ← ~4 300 lines; all styling, theming, animations
  js/script.js      ← ~1 900 lines; all interactivity, GSAP setup, modes
  font/             ← local @font-face sources (Navada, Coolvetica)
  img/              ← project screenshots, client logos, footer images
  videos/           ← background videos for theme modes + project previews
```

`style.css` is structured in layers:
1. CSS custom properties (`:root` variables for colors, transitions)
2. Reset / base styles
3. Component styles (header, hero, about, projects, clients, tech, CTA, footer)
4. Mode overrides — `body.volcano-theme`, `body.space-theme`, `body.jungle-theme` blocks that cascade over base styles
5. Animations (`@keyframes`) and responsive breakpoints

`script.js` is structured as a single `DOMContentLoaded` callback containing named IIFE blocks and init functions:
- GSAP + ScrollTrigger setup
- Custom cursor (magnetic, lerp-smoothed)
- Mobile menu
- Hero scramble
- Mode system (keyboard listeners, activation/deactivation functions, canvas particle systems)
- Project preview (video card, 3D tilt, lerp mouse tracking)
- Scroll progress bar
- Stat counters (IntersectionObserver)
- Clients accordion
- Footer image cards (IIFE)

---

## Theme System — Deep Dive

### How modes are stored

Each mode is tracked by a boolean flag (`volcanoMode`, `spaceMode`, `jungleMode`) and a CSS class on `<body>`:

```
body.volcano-theme
body.space-theme
body.jungle-theme
```

A `MutationObserver` watches `body.classList`. Whenever a class is added or removed it fires callbacks that:
- Sync the footer mode label text
- Re-run mode-specific JS setup (e.g. re-attach particle loops)

### Activation flow

```
keydown (Space / E / J)
  → playModeDramaticTransition(color, label, emoji, onMid)
      → full-screen flash overlay fades in
      → at midpoint: body class toggled, canvas injected/removed
      → overlay fades out
  → activateVolcanoInteractions() / activateSpaceInteractions() / activateJungleInteractions()
```

`playModeDramaticTransition` creates a `div` with `position:fixed; inset:0; z-index:99999` and animates it from `opacity:0 → 1 → 0` over ~700ms. The actual DOM class change happens at the opacity peak so the transition feels like a hard cut.

### CSS cascade for modes

Every section has a base style. Mode blocks override specific custom properties and add extra effects:

```css
/* base */
.hero-title { color: #fff; text-shadow: none; }

/* space mode override */
body.space-theme .hero-title {
  color: #00d0ff;
  text-shadow: 0 0 30px rgba(0,208,255,0.5), 0 0 60px rgba(0,208,255,0.2);
  animation: space-title-flicker 4s ease-in-out infinite;
}
```

This pattern repeats for ~40 selectors per mode — section titles, project rows, client rows, footer, cursor, dividers, tags, hotkey badges, scroll progress bar.

### Canvas particle systems

Each mode injects a `<canvas id="mode-canvas">` with `position:fixed; inset:0; pointer-events:none; z-index:9999` so it floats above all content without blocking clicks.

| Mode | Effect | Implementation |
|------|--------|---------------|
| **Volcano** | Ember particles trail the cursor | `mousemove` pushes `{x,y,vx,vy,life,size}` objects into an array. Each `rAF` tick: gravity applied to `vy`, `x += vx`, `y += vy`, `life--`. Drawn as radial gradients from orange-white core to transparent. Dead particles spliced out. |
| **Space** | Laser beam trail + drifting star field | Two layers: (1) star field — array of `{x,y,speed,size}` objects that drift downward, reset to top when off-screen, parallax-shifted by mouse position via `mousemove` delta. (2) Laser — last N cursor positions stored in a ring buffer; drawn as a `lineTo` path with decreasing `lineWidth` and `globalAlpha` toward the tail. |
| **Jungle** | Rain columns + leaf cursor trail | Rain: array of `{x,y,speed,length,opacity}` drops falling from `y=0`, reset when `y > canvas.height`. Drawn as short vertical lines. Leaf trail: `mousemove` pushes leaf objects `{x,y,rot,vx,vy,life}` that drift and rotate; drawn as small rotated ellipses in green tones. |

On mode deactivation the canvas is removed and all `rAF` loops are cancelled via a stored `rafId`.

### Zero-gravity (Space mode)

When Space mode activates, GSAP applies a continuous float to selected elements:

```js
gsap.to(el, {
  y: `random(-18, 18)`,
  x: `random(-6, 6)`,
  rotation: `random(-3, 3)`,
  duration: `random(3, 5)`,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
});
```

On deactivation: `gsap.killTweensOf(el)` + `gsap.to(el, { y:0, x:0, rotation:0, duration:0.6 })` resets all transforms cleanly.

### Jungle leaf-sway on section titles

In Jungle mode, `.section-title` elements get a `leaf-sway` CSS animation:

```css
@keyframes leaf-sway {
  0%, 100% { transform: rotate(-1.5deg); }
  50%       { transform: rotate(1.5deg);  }
}
```

`transform-origin` is set to `center center` and the element uses `display:block; width:100%; text-align:center` (not `inline-block` + `translateX(-50%)`) to prevent the rotation from shifting the element off-center.

---

## Footer Image Cards — Deep Dive

### HTML structure

The SNIPPYKID logotype is split into individual `<span>` elements, one per letter:

```html
<h2 class="footer-big-name">
  <span class="fl-letter footer-name-snippy" data-img="./assets/img/footer5.jpg">S</span>
  <span class="fl-letter footer-name-snippy" data-img="./assets/img/footer2.jpg">N</span>
  <!-- … one per letter … -->
  <span class="fl-letter footer-name-kid"    data-img="./assets/img/footer4.jpg">D</span>
</h2>
```

Each `span` carries a `data-img` attribute pointing to its associated image. The `footer-big-name` element has `white-space: nowrap` to prevent any wrapping at narrow viewports.

### JavaScript logic (IIFE)

```
DOMContentLoaded
  └─ Footer IIFE
       ├─ Collect all letter srcs → allSrcs[]
       ├─ On letter mouseenter:
       │    ├─ removeAllCards() — fade out + remove existing cards
       │    ├─ pickOtherSrcs(hoveredSrc, 3) — shuffle allSrcs, exclude hovered letter's own image, take 3
       │    └─ For each src:
       │         ├─ findPosition(nameRect, w, h, placed[]) — collision-aware random placement
       │         └─ spawnCard(src, x, y, delay, idx)
       │              ├─ Create div.fl-hover-card with position:fixed (all layout inline, no CSS conflicts)
       │              ├─ Entry animation: opacity 0→1, translateY(16px)→0, scale(0.8)→1 via CSS transition
       │              └─ Idle float: rAF loop oscillates translateY ±2.8px after entry completes
       └─ On bigName mouseleave → removeAllCards()
```

### Collision avoidance

`findPosition` runs up to **40 attempts** to find a clear spot. Each candidate `(x, y)` is checked against all already-placed cards:

```js
const overlapX = x < p.x + p.w + MIN_GAP && x + w + MIN_GAP > p.x;
const overlapY = y < p.y + p.h + MIN_GAP && y + h + MIN_GAP > p.y;
if (overlapX && overlapY) reject;
```

`MIN_GAP = 14px` ensures cards never touch. The placement zone spans from `nameRect.top - h*0.55` to `nameRect.bottom - h*0.45` so cards genuinely overlap the text letters.

### Why `position:fixed` inline (not CSS class)

Earlier iterations used a `.fl-hover-card` CSS class for positioning. This caused a CSS specificity conflict: the class's `position:absolute` overrode the JS's `position:fixed`, placing cards at `(0,0)`. The fix was to set **all layout properties exclusively via `element.style.*`** in JavaScript and leave the CSS class for purely visual properties only (border-radius, box-shadow, border).

### Mode-aware styling

```css
body.volcano-theme .fl-hover-card { border-color: rgba(255,90,0,0.55);  box-shadow: …, 0 0 24px rgba(255,90,0,0.18); }
body.space-theme   .fl-hover-card { border-color: rgba(0,195,255,0.5);  box-shadow: …, 0 0 24px rgba(0,195,255,0.16); }
body.jungle-theme  .fl-hover-card { border-color: rgba(100,230,60,0.5); box-shadow: …, 0 0 24px rgba(100,230,60,0.16); }
```

The JS also calls `getAccentColor()` and sets `card.style.borderColor` inline for immediate application before the CSS class cascade resolves.

---

## Animations & Motion

| Feature | Technique |
|---------|-----------|
| **Hero name scramble** | On `DOMContentLoaded`, each character cycles through `Math.random()` ASCII chars at 40ms intervals, resolving left-to-right over ~3s |
| **Film grain** | `body::after` with `position:fixed; inset:0; pointer-events:none` renders an SVG `<feTurbulence>` + `<feDisplacementMap>` filter. A CSS `@keyframes grain-shift` animates `baseFrequency` via `filter` to make the grain move |
| **Scroll progress bar** | `#scroll-progress` fixed at top of viewport; `width` updated on `scroll` event as `(scrollY / (scrollHeight - innerHeight)) * 100 + '%'` |
| **Magnetic cursor** | Custom `div.custom-cursor` + `div.cursor-dot` follow mouse via lerp: `cx += (mx - cx) * 0.12` per `rAF` tick. On hover of magnetic elements, cursor scale and blend-mode change |
| **Project preview 3D tilt** | On `mousemove` over a `.proj-row`, the preview card's `rotateX` and `rotateY` are set based on cursor offset from card center: `rx = (dy / h - 0.5) * -14`, `ry = (dx / w - 0.5) * 14`. Applied via lerp for smoothness |
| **GSAP reveals** | `gsap.from(el, { opacity:0, y:40, duration:0.8, scrollTrigger:{ trigger:el, start:'top 85%' } })` pattern used for section entries |
| **Stat counters** | `IntersectionObserver` fires when `.stat-number` enters viewport; JS increments a counter from 0 to target value over ~1.2s with an ease-out curve |
| **Clients accordion** | Each client row is `height:72px` by default. On `mouseenter`, `height` transitions to `auto` (via a max-height trick) and inner content fades in |
| **Text glitch / chromatic aberration** | `.section-title:hover` and `.proj-row:hover .proj-row-title` use `::before`/`::after` pseudo-elements with `clip-path` animations (`glitch-clip-1`, `glitch-clip-2`) and color-channel offset (`chroma-r`, `chroma-b`) |

---

## Sections

| Section | ID | Notes |
|---------|----|-------|
| Hero | — | Full-viewport, name scramble, mode hotkey pills, Navada display type |
| About | `#about` | Stats row (animated counters), horizontal skills ticker (CSS marquee) |
| Featured Projects | `#projects` | Row list with floating video preview card, magnetic hover, teaser CTA to GitHub |
| Tech Stack | — | Icon grid of technologies |
| Clients | — | Full-width accordion rows — Vision Systems, ACME Infocom, Primetech Solutions, Holystone Construction |
| CTA | — | "Everybody needs a website, don't you?" freelancer call-to-action |
| Footer | `#contact` | SNIPPYKID logotype with per-letter image cards, poem, social links, mode label |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Toggle Volcano mode |
| `E` | Toggle Space mode |
| `J` | Toggle Jungle mode |
| `Escape` | Exit any active mode |

Mode pills in the hero section also trigger modes on click.

---

## Folder Structure

```
Portfolio/
├── index.html                  ← entire page content
├── README.md
└── assets/
    ├── css/
    │   └── style.css           ← ~4 300 lines of custom CSS
    ├── js/
    │   └── script.js           ← ~1 900 lines of vanilla JS
    ├── font/
    │   ├── navada/             ← Navada display font (@font-face)
    │   └── coolvetica/         ← Coolvetica (@font-face, available but not primary)
    ├── img/
    │   ├── footer1-9.jpg       ← footer letter hover images
    │   ├── favicon.svg         ← site favicon (purple SK monogram)
    │   └── [client logos, project screenshots]
    ├── videos/
    │   ├── volcano-bg.mp4      ← Volcano mode background
    │   ├── space-bg.mp4        ← Space mode background
    │   ├── jungle-bg.mp4       ← Jungle mode background
    │   └── [project preview videos]
    ├── gsap.min.js             ← local GSAP fallback copy
    ├── ScrollTrigger.min.js    ← local ScrollTrigger fallback copy
    ├── bootstrap-css/          ← present in repo; NOT linked from index.html
    └── bootstrap-js/           ← present in repo; NOT linked from index.html
```

> Bootstrap files exist in the repo from an earlier scaffold but are **not imported** anywhere in `index.html` or `style.css`. The entire layout is built with custom CSS Grid and Flexbox.

---

## Running Locally

```bash
# Option 1 — VS Code Live Server
# Right-click index.html → "Open with Live Server"

# Option 2 — npx serve
npx serve .

# Option 3 — Python
python -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port your server reports).

> Serving over HTTP is required for correct font loading, video autoplay policies, and relative asset paths. Opening `index.html` directly as a `file://` URL may cause some assets to fail.

---

## License

© 2025 Abhay Hanchate (SnippyKid). All rights reserved.
