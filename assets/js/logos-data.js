/**
 * logos-data.js
 * -------------
 * Powers the "Companies We've Worked With" logo strip on index.html, which
 * scrolls horizontally and loops forever (see .logo-scroll-track's CSS
 * animation in assets/css/pages/home.css).
 *
 * To add/remove/replace a logo, just edit the `logos` array below - you
 * don't need to touch the HTML or the render function.
 */

// Each entry needs an image path and a name (used as the alt text). Add
// your real client/partner logos here, replacing the placeholders.
const logos = [
  { name: "Bournemouth University", image: "assets/media/logos/bournemouth-university-logo-.png" },
  { name: "Loga Culture", image: "assets/media/logos/logaculture.png" },
  { name: "University of Southampton", image: "assets/media/logos/University_of_Southampton_Logo.png" },
  { name: "National Trust", image: "assets/media/logos/national-trust-logo.png" },
];

// With only a handful of logos, one pass through the `logos` array is
// narrower than most screens - the strip would just slide back and forth in
// the left portion of the page instead of scrolling across the whole width.
// Repeating the list a few times before duplicating it (see below) makes one
// "cycle" comfortably wider than even a large monitor.
const CYCLE_REPEATS = 4;

/**
 * Renders the logo strip into a container.
 *
 * The CSS animation scrolls the track left by exactly 50% of its own width,
 * then jumps back to 0% - for that jump to be invisible, the track's
 * content has to repeat exactly once. So this function builds one "cycle"
 * (the `logos` array repeated CYCLE_REPEATS times, so it's wide enough to
 * fill the screen) and renders that cycle twice in a row: once for real
 * (readable by screen readers) and once as a hidden visual-only copy
 * (aria-hidden, empty alt text) so the loop looks seamless without being
 * announced twice.
 *
 * @param {string} containerId - id of the element to render the track into
 */
function renderLogoScroll(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  let realCycleHtml = "";
  let hiddenCycleHtml = "";

  for (let i = 0; i < CYCLE_REPEATS; i++) {
    realCycleHtml += logos
      .map((logo) => `<img src="${logo.image}" alt="${logo.name}" loading="lazy">`)
      .join("");

    hiddenCycleHtml += logos
      .map((logo) => `<img src="${logo.image}" alt="" aria-hidden="true" loading="lazy">`)
      .join("");
  }

  container.innerHTML = realCycleHtml + hiddenCycleHtml;
}
