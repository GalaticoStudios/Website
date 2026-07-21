/**
 * main.js
 * -------
 * Shared behaviour used on every page:
 *   1. Mobile navigation toggle (the hamburger menu).
 *   2. Setting the footer's copyright year automatically, so we never have
 *      to remember to update "© 2024" by hand every January.
 *
 * This file is loaded with `defer` on every page, which means the browser
 * downloads it in the background but only runs it once the whole HTML
 * document has been parsed - so document.getElementById() calls below are
 * guaranteed to find the elements they're looking for.
 */

/**
 * Wires up the hamburger button to show/hide the mobile navigation menu.
 * We toggle a CSS class ("is-open") rather than writing inline styles, so
 * all the actual visual behaviour (max-height, animation) stays in CSS.
 */
function setupMobileNav() {
  const toggleButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggleButton || !nav) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    // aria-expanded tells screen readers whether the menu is currently
    // open or closed - important because the menu is visually hidden via
    // CSS (max-height: 0), not the `hidden` attribute.
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });
}

/**
 * Finds every element with the class "current-year" and fills it in with
 * today's year. Used in the footer copyright line, e.g.
 * "&copy; <span class="current-year"></span> Galatico Studios".
 */
function setFooterYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

setupMobileNav();
setFooterYear();
