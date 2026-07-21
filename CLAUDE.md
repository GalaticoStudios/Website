# Project Brief: Galatico Studios Website Rebuild

## Goal
Rebuild the Galatico Studios marketing website (currently at galaticostudios.co.uk, built on a WordPress-style site builder) as a lightweight, static HTML/CSS/JS site suitable for hosting on GitHub Pages. No frameworks, no build tools, no npm dependencies — plain HTML/CSS/vanilla JS only. Part of the goal is for me to learn JS, so favor readable, well-commented vanilla JS over clever one-liners.

## Reference site
https://www.galaticostudios.co.uk/ — use this for content and page structure, not for visual design (we want a fresh, clean look).

## Pages needed
1. **Home (`index.html`)**
   - Hero section: "Galatico Studios is an independent UK games studio delivering gameplay-first, systems-driven experiences across PC, mobile and augmented reality (AR)."
   - "Our Approach" section with 3 sub-points: System Driven Design, Collaborative Development, Follow the Fun (short description each).
   - Testimonials section (Bournemouth University, Southampton University, a player review).
   - Featured games section: Neolithic Trails, Echoes of Avebury, Tales of Flint — each with a short description and a "Learn more" link to `Pages/our-games.html`.
   - Footer with social links (Instagram, YouTube, email) and legal links.

2. **Our Games (`Pages/our-games.html`)**
   - Card/grid layout for the three games above, each with image, longer description, and platform tags (PC / Mobile / AR).
   - Render the game data from a JS array/object rather than hardcoding three separate HTML blocks (see JS notes below).

3. **Legal Notice (`Pages/legal-notice.html`)**
4. **Privacy Policy (`Pages/privacy-policy.html`)**
5. **Terms and Conditions (`Pages/terms-and-conditions.html`)**
   - These three can start as placeholder text with proper heading structure — content to be filled in later.

6. **404.html** — simple "page not found" page, since GitHub Pages supports a custom 404.

## File structure
Note: `index.html` and `404.html` must stay at the repo root — GitHub Pages (simple
"deploy from branch" hosting) requires this and won't serve a subfolder as `/` or use
a nested custom 404. Every other HTML page lives under `Pages/`.
```
galatico-studios-website/
├── index.html
├── 404.html
├── favicon.ico
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── README.md
├── .gitignore
├── Pages/
│   ├── our-games.html
│   ├── legal-notice.html
│   ├── privacy-policy.html
│   └── terms-and-conditions.html
├── assets/
│   ├── css/
│   │   ├── base.css          # reset, CSS variables, typography
│   │   ├── layout.css        # header, nav, footer, containers/grid
│   │   ├── components.css    # buttons, cards, testimonial blocks
│   │   └── pages/
│   │       ├── home.css
│   │       └── our-games.css
│   ├── js/
│   │   ├── main.js           # shared behaviour: nav toggle, footer year
│   │   ├── cookie-consent.js # simple cookie banner (accept/decline, localStorage)
│   │   └── games-data.js     # array of game objects + render function for game cards
│   └── media/
│       ├── logo/
│       ├── games/
│       │   ├── neolithic-trails/
│       │   ├── echoes-of-avebury/
│       │   └── tales-of-flint/
│       └── icons/
```

## Design direction
- Clean, dark-leaning theme fitting an indie games studio (avoid generic corporate look).
- Fully responsive (mobile-first), no layout breakage under ~360px width.
- No external CSS/JS frameworks (no Bootstrap/Tailwind CDN). Hand-written CSS using custom properties for colors/spacing so theme is easy to tweak later.
- Accessible: semantic HTML5 elements, alt text on all images, sufficient color contrast, visible focus states, proper heading hierarchy.

## JavaScript requirements (learning-focused)
- `games-data.js`: define games as a JS array of objects (title, slug, tagline, description, image path, platforms). Write a function that loops over the array and injects card markup into the DOM via `document.createElement` / template literals — used on both `index.html` (featured, maybe just first 3) and `Pages/our-games.html` (full grid).
- `main.js`: mobile nav toggle (hamburger menu open/close), and set the copyright year in the footer dynamically via JS (`new Date().getFullYear()`).
- `cookie-consent.js`: minimal cookie/privacy banner — show on first visit, store the user's choice in `localStorage`, don't show again once dismissed.
- Comment the JS reasonably well since I'm using this to learn — explain what each function does, not just what each line does.
- No jQuery, no build tools, no bundler. Plain ES6+ JS loaded via `<script src="..." defer>`.

## Content notes
- Use the real content/copy from https://www.galaticostudios.co.uk/ for hero text, approach section, testimonials, and game descriptions (pull from the live site).
- Contact: inquiries@galaticostudios.co.uk
- Social: Instagram (instagram.com/galaticostudiosofficial), YouTube (youtube.com/@GalaticoStudiosOfficial)

## Deliverable expectations
- Working site openable locally by double-clicking `index.html` (no local server required, though a simple `README.md` note on using `python -m http.server` for local dev is welcome).
- `README.md` explaining the project structure and how to run/edit it locally.
- `.gitignore` suitable for a static site (OS files, editor folders — e.g. `.DS_Store`, `.vscode/`, `node_modules/` just in case).
- Ready to be pushed straight to a GitHub repo and served via GitHub Pages with no further build step.
