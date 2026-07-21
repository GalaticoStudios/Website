/**
 * games-data.js
 * -------------
 * This file holds all the information about our games in one place (a plain
 * JS array of objects), plus a function that turns that data into HTML card
 * markup. Both index.html (a short "featured games" preview) and
 * Pages/our-games.html (the full grid) load this file and call
 * renderGameCards() with a different container - that way we only ever write
 * the game descriptions once.
 *
 * index.html and Pages/our-games.html live at different folder depths, so
 * every image/link path built here needs a "rootPrefix" telling it how to
 * get back to the repo root: "" from index.html, "../" from
 * Pages/our-games.html. Each page's inline script passes the right value in.
 */

// Each object below describes one game. Keeping this as data (rather than
// writing out three near-identical <div> blocks in the HTML) means adding a
// fourth game later is just a matter of adding one more object to this array.
const games = [
  {
    title: "Neolithic Trails",
    slug: "neolithic-trails",
    tagline: "Collect items, build a stone family, and rediscover the past.",
    description:
      "Neolithic Trails is a location-based collecting game set at the ancient " +
      "site of Avebury. Explore the landscape, collect items, build your own " +
      "stone family, and unlock an ever-growing array of achievements that " +
      "keep you moving and invested in your journey through the past.",
    image: "assets/media/games/neolithic-trails/cover.svg",
    platforms: ["Mobile"],
  },
  {
    title: "Echoes of Avebury",
    slug: "echoes-of-avebury",
    tagline: "An immersive mixed-reality detective mystery.",
    description:
      "Echoes of Avebury is an immersive mixed-reality experience that casts " +
      "you as a detective investigating a mystery hidden within the ancient " +
      "landscape of Avebury. Explore, gather clues, and help resolve a " +
      "dispute that spans thousands of years.",
    image: "assets/media/games/echoes-of-avebury/cover.svg",
    platforms: ["Mobile", "AR"],
  },
  {
    title: "Tales of Flint",
    slug: "tales-of-flint",
    tagline: "A story that moves at the same speed as you.",
    description:
      "Tales of Flint is an audio experience where the story adapts to your " +
      "walking pace. Walk the same routes as our ancestors did 5,000 years " +
      "ago, uncovering different tales spanning six different periods of " +
      "time.",
    image: "assets/media/games/tales-of-flint/cover.svg",
    platforms: ["Mobile"],
  },
];

/**
 * Builds the DOM markup for a single game card.
 * Using document.createElement + a template literal for the inner HTML is a
 * common pattern: we create one wrapper element with JS, then fill in its
 * contents with a string of HTML built from the game's data.
 *
 * @param {Object} game - one entry from the `games` array above
 * @param {string} rootPrefix - path back to the repo root from the current
 *   page ("" from index.html, "../" from Pages/our-games.html), used to
 *   build correct image and link paths regardless of which page is calling.
 * @returns {HTMLElement} a fully-built <article class="game-card"> element
 */
function createGameCard(game, rootPrefix) {
  const card = document.createElement("article");
  card.className = "game-card";
  // Gives each card a stable anchor (e.g. #neolithic-trails) so links from
  // the homepage can jump straight to a specific game on our-games.html.
  card.id = game.slug;

  // Build the row of platform tags (e.g. "Mobile", "AR") as a string of
  // <span> elements, one per platform.
  const platformTagsHtml = game.platforms
    .map((platform) => `<span class="platform-tag">${platform}</span>`)
    .join("");

  card.innerHTML = `
    <img src="${rootPrefix}${game.image}" alt="${game.title} cover art" loading="lazy">
    <span class="arrow-chip" aria-hidden="true">&rarr;</span>
    <div class="game-card-body">
      <h3>${game.title}</h3>
      <p class="game-card-tagline">${game.tagline}</p>
      <p class="game-card-description">${game.description}</p>
      <div class="platform-tags">${platformTagsHtml}</div>
      <a class="btn btn-secondary" href="${rootPrefix}Pages/our-games.html#${game.slug}"><span>Learn more</span></a>
    </div>
  `;

  return card;
}

/**
 * Renders game cards into a container element already present in the page.
 *
 * @param {string} containerId - id of the element to render cards into
 * @param {number} [limit] - optional max number of games to render (used on
 *   the homepage to show only a handful of "featured" games)
 * @param {string} [rootPrefix] - path back to the repo root from the current
 *   page, passed through to createGameCard(). Defaults to "" (root).
 */
function renderGameCards(containerId, limit, rootPrefix) {
  const container = document.getElementById(containerId);

  // If the page doesn't have this container (e.g. a legal page), do nothing.
  if (!container) {
    return;
  }

  const resolvedRootPrefix = rootPrefix || "";
  const gamesToRender = typeof limit === "number" ? games.slice(0, limit) : games;

  gamesToRender.forEach((game) => {
    container.appendChild(createGameCard(game, resolvedRootPrefix));
  });
}
