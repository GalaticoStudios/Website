/**
 * cookie-consent.js
 * -----------------
 * A minimal cookie/privacy notice banner.
 *
 * How it works:
 *   - On every page load we check localStorage for a saved choice.
 *   - If the visitor has already accepted or declined, we don't show the
 *     banner again.
 *   - If there's no saved choice yet, we reveal the banner (it starts
 *     hidden in the HTML via the `hidden` attribute) and wait for a click
 *     on either button.
 *
 * localStorage is a small key/value store built into the browser that
 * persists between visits (unlike a normal JS variable, which resets every
 * time the page reloads).
 */

const COOKIE_CONSENT_KEY = "galatico-cookie-consent";

/**
 * Shows the cookie banner if - and only if - the visitor hasn't already
 * made a choice on a previous visit.
 */
function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");

  if (!banner) {
    return;
  }

  const existingChoice = localStorage.getItem(COOKIE_CONSENT_KEY);

  if (existingChoice) {
    // Visitor already told us what they want - keep the banner hidden.
    return;
  }

  banner.hidden = false;

  const acceptButton = document.getElementById("cookie-accept");
  const declineButton = document.getElementById("cookie-decline");

  acceptButton.addEventListener("click", () => {
    saveChoiceAndHideBanner("accepted", banner);
  });

  declineButton.addEventListener("click", () => {
    saveChoiceAndHideBanner("declined", banner);
  });
}

/**
 * Saves the visitor's choice to localStorage (so we remember it on their
 * next visit) and hides the banner immediately.
 *
 * @param {"accepted" | "declined"} choice
 * @param {HTMLElement} banner
 */
function saveChoiceAndHideBanner(choice, banner) {
  localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  banner.hidden = true;
}

initCookieBanner();
