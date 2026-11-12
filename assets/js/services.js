/**
 * services.js
 * -----------
 * Behaviour for Pages/services.html:
 *   1. Reveal-on-scroll for elements with the .reveal class.
 *   2. Typing animation for the AI terminal visual.
 *   3. Consultancy chat that loops question -> typing -> answer.
 *   4. Rotating word in the hero ("We build ___ with you.").
 *   5. The service explorer tabs, which auto-cycle until the visitor clicks
 *      one, plus the cursor-following glow on the detail panel.
 *
 * Every animation is skipped for visitors who have asked their OS to reduce
 * motion; the content itself is always available.
 */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal elements as they scroll into view.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Type out the AI terminal the first time it becomes visible.
function typeTerminal(pre) {
  if (pre.dataset.done || reduceMotion) return;
  pre.dataset.done = "1";
  const spans = [...pre.querySelectorAll("span")];
  const texts = spans.map((s) => s.textContent);
  spans.forEach((s) => (s.textContent = ""));
  pre.classList.add("typing");
  let si = 0, ci = 0;
  (function tick() {
    if (si >= spans.length) { pre.classList.remove("typing"); return; }
    spans[si].textContent = texts[si].slice(0, ++ci);
    if (ci >= texts[si].length) { si++; ci = 0; setTimeout(tick, 450); } else { setTimeout(tick, 22); }
  })();
}
const termObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting && e.target.offsetParent) typeTerminal(e.target); });
}, { threshold: 0.4 });
document.querySelectorAll("[data-type]").forEach((el) => termObserver.observe(el));

// Consultancy chat: loop through question -> typing -> answer pairs.
document.querySelectorAll(".qa-list").forEach((list) => {
  const qas = [...list.querySelectorAll(".qa")];
  if (reduceMotion) { qas[0].classList.add("on", "show-q", "show-a"); return; }
  let i = 0;
  (function play() {
    qas.forEach((q) => q.classList.remove("on", "show-q", "typing", "show-a"));
    const qa = qas[i];
    qa.classList.add("on");
    setTimeout(() => qa.classList.add("show-q"), 100);
    setTimeout(() => qa.classList.add("typing"), 900);
    setTimeout(() => { qa.classList.remove("typing"); qa.classList.add("show-a"); }, 2100);
    i = (i + 1) % qas.length;
    setTimeout(play, 5600);
  })();
});

// Rotating word in the hero.
const words = ["games", "AR apps", "location trails", "local AI", "backends", "better plans"];
const rot = document.querySelector(".rot-word");
let wi = 0;
if (!reduceMotion) setInterval(() => {
  rot.classList.add("out");
  setTimeout(() => { wi = (wi + 1) % words.length; rot.textContent = words[wi]; rot.classList.remove("out"); }, 350);
}, 2200);

// Tabs: click / arrow keys, plus auto-cycling until the visitor takes over.
const CYCLE_MS = 7000;
const tabs = [...document.querySelectorAll(".ex-tab")];
const panelsWrap = document.querySelector(".ex-panels");
panelsWrap.style.setProperty("--cycle", CYCLE_MS + "ms");
let auto = !reduceMotion, timer;
function select(i, focus) {
  tabs.forEach((t, j) => {
    const on = i === j;
    t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    const bar = t.querySelector(".ex-bar"); bar.classList.remove("run");
    if (on && auto) { void bar.offsetWidth; bar.classList.add("run"); }
  });
  if (focus) tabs[i].focus();
  const term = document.getElementById(tabs[i].getAttribute("aria-controls")).querySelector("[data-type]");
  if (term) typeTerminal(term);
  clearTimeout(timer);
  if (auto) timer = setTimeout(() => select((i + 1) % tabs.length), CYCLE_MS);
}
function stopAuto() { auto = false; clearTimeout(timer); tabs.forEach((t) => t.querySelector(".ex-bar").classList.remove("run")); }
tabs.forEach((t, i) => {
  t.addEventListener("click", () => { stopAuto(); select(i); });
  t.addEventListener("keydown", (e) => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (k) { e.preventDefault(); stopAuto(); select((i + k + tabs.length) % tabs.length, true); }
  });
});
// Only start cycling once the explorer is on screen.
new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { select(0); o.disconnect(); } }, { threshold: .3 }).observe(panelsWrap);
panelsWrap.addEventListener("pointermove", (e) => {
  const r = panelsWrap.getBoundingClientRect();
  panelsWrap.style.setProperty("--mx", e.clientX - r.left + "px");
  panelsWrap.style.setProperty("--my", e.clientY - r.top + "px");
});
