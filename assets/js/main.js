/* =========================================================
   Shared interactive behavior
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initLaptopReveal();
  initFolderClickSound();

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------
   About page: click sound on the folder's Skills / Projects /
   Services / Education / Contact links.
   --------------------------------------------------------- */
function initFolderClickSound() {
  document.querySelectorAll(".folder-links .pill-link").forEach((link) => {
    link.addEventListener("click", () => playClickSound());
  });
}

/* ---------------------------------------------------------
   Home page: clickable laptop that pops open a photo
   --------------------------------------------------------- */
function initLaptopReveal() {
  const stage = document.querySelector(".hero-visual");
  if (!stage) return;

  const trigger = stage.querySelector(".laptop-trigger");
  const closeBtn = stage.querySelector(".reveal-close");

  const open = () => {
    stage.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    stage.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  const toggle = () => {
    stage.classList.contains("is-open") ? close() : open();
  };

  trigger.addEventListener("click", () => {
    playClickSound();
    toggle();
  });
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      close();
    });
  }

  document.addEventListener("click", (e) => {
    if (!stage.contains(e.target)) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}
