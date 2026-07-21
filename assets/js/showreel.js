// Drives the showreel YouTube embed via the IFrame API so the poster image
// can stay up front while the stream buffers and ramps up to full quality,
// instead of visitors seeing YouTube's usual low-res start and its
// paused/buffering overlay (big play button + skip icons).
//
// window.onYouTubeIframeAPIReady is called by the YouTube IFrame API script
// (loaded separately in index.html) once it's finished loading - not on
// DOMContentLoaded, so this doesn't need to wait for that event.
const SHOWREEL_BUFFER_MS = 3000;

function onYouTubeIframeAPIReady() {
  const iframe = document.getElementById("showreel-player");
  if (!iframe) return;

  const poster = document.querySelector(".showreel-poster");

  new YT.Player("showreel-player", {
    events: {
      onReady: (event) => {
        event.target.mute();
        event.target.setPlaybackQuality("hd1080");
        event.target.playVideo();

        setTimeout(() => {
          event.target.setPlaybackQuality("hd1080");
          if (poster) poster.classList.add("is-hidden");
        }, SHOWREEL_BUFFER_MS);
      },
    },
  });
}
