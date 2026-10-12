/* =========================================================
   Shared click sound effect
   ---------------------------------------------------------
   A short, subtle click sound used across the site's key
   interactive elements (the Home laptop/photo reveal, and the
   About page's folder links). Kept in one place so the sound
   — or its volume — only needs changing in one spot.
   ========================================================= */

const CLICK_SOUND_SRC = "assets/audio/click.wav";
const CLICK_SOUND_VOLUME = 0.30;

let _clickAudio = null;

function playClickSound() {
  try {
    if (!_clickAudio) {
      _clickAudio = new Audio(CLICK_SOUND_SRC);
      _clickAudio.volume = CLICK_SOUND_VOLUME;
    }
    // Restart from the beginning so rapid repeat clicks still play cleanly.
    _clickAudio.currentTime = 0;
    _clickAudio.play().catch(() => {
      /* Autoplay can be blocked before the user has interacted with the
         page at all — harmless to ignore; the click itself still works. */
    });
  } catch (e) {
    /* Never let a sound failure break the actual click interaction. */
  }
}
