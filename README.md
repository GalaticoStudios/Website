# Galatico Studios Website

The marketing website for Galatico Studios, an independent UK games studio. This is a
plain static HTML/CSS/JS site - no frameworks, no build tools, no npm dependencies -
built so it can be hosted directly on GitHub Pages.

## Project structure

```
index.html                   Home page (must stay at repo root - see note below)
404.html                      Custom "page not found" page (must stay at repo root)
favicon.ico                   Browser tab icon
site.webmanifest              Basic PWA manifest (name, theme color, icon)
robots.txt                    Search engine crawl rules
sitemap.xml                   Search engine sitemap

Pages/
  our-games.html               Full games grid
  legal-notice.html            Placeholder legal page
  privacy-policy.html          Privacy policy
  terms-and-conditions.html    Placeholder terms page

assets/
  css/
    base.css                  Reset, CSS variables (colors/spacing/type), base typography
    layout.css                Header/nav, footer, containers, section spacing
    components.css            Buttons, cards, testimonials, cookie banner
    pages/
      home.css                Styles specific to index.html (hero, featured games)
      our-games.css           Styles specific to Pages/our-games.html (full grid)
  js/
    main.js                   Mobile nav toggle + footer copyright year
    cookie-consent.js         Cookie/privacy notice banner (localStorage-backed)
    games-data.js             Game data array + card-rendering function
  media/
    logo/                     Studio logo
    games/                    Per-game images/gifs/video (currently placeholder SVGs -
                              swap these for real artwork/screenshots/clips)
    icons/                    Manifest icon(s)
```

> **Why isn't everything under `Pages/`?** GitHub Pages (using the simple "deploy
> from branch" hosting, no Actions workflow) requires `index.html` and `404.html` to
> sit at the actual published root - it won't serve a subfolder as `/`, and it won't
> use a custom 404 page that isn't at the root. Every other page lives in `Pages/`.

## Running locally

Because there's no build step, you can just double-click `index.html` to open it in
your browser. Everything - fonts, styles, scripts, images - is either loaded from a
relative path in this folder or comes with the browser, so nothing else needs to be
installed.

If you'd rather view it through a local server (closer to how it'll behave once
deployed, and needed if you ever add anything that requires `fetch()` from `file://`),
run this from the project folder:

```
python -m http.server
```

Then open `http://localhost:8000` in your browser.

## Editing content

- **Game descriptions/data**: edit the `games` array at the top of
  `assets/js/games-data.js`. Both the homepage's "Featured Games" section and the
  full `Pages/our-games.html` grid are generated from this one array, so you only
  need to update a game's details in one place. Each game's `image` path is stored
  relative to the repo root (e.g. `assets/media/games/neolithic-trails/cover.svg`) -
  the renderer prefixes it with `../` automatically when rendering on a page inside
  `Pages/`, so you shouldn't need to touch that logic.
- **Game images/gifs/video**: drop files into `assets/media/games/<slug>/`, then
  update the `image` path for that game in `games-data.js` (currently placeholder
  SVGs - swap these for real artwork/screenshots/clips).
- **Colors/spacing**: the CSS custom properties at the top of `assets/css/base.css`
  control the whole site's color palette, spacing scale, and type scale.
- **Legal pages**: `Pages/legal-notice.html` and `Pages/terms-and-conditions.html`
  currently contain placeholder text and need real content before launch.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In the repo's Settings -> Pages, set the source to the `main` branch (root).
3. If using the custom domain `galaticostudios.co.uk`, add a `CNAME` file to the
   repository root containing the domain name, and configure DNS as per
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
   Without a custom domain, the site will be served at
   `https://<org-or-username>.github.io/<repo-name>/`, and `robots.txt`/`sitemap.xml`
   should be updated to match.
