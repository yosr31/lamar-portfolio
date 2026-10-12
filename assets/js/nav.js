/* =========================================================
   Shared site navigation.
   The site is now one continuous scrolling page — each nav
   link points to a section id (#about, #skills, ...) on the
   same page. To add / rename / reorder sections, edit the
   NAV_LINKS array below (the href must match a section's id).
   ========================================================= */

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#services", label: "services" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

(function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const linksHtml = NAV_LINKS.map((link, i) => {
    return `<a href="${link.href}" class="${i === 0 ? "active" : ""}">${link.label}</a>`;
  }).join("");

  mount.outerHTML = `
    <nav class="site-nav">
      <div class="nav-inner">
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
        <div class="nav-links" id="nav-links">${linksHtml}</div>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
        </button>
      </div>
    </nav>
  `;

  initThemeToggle();

  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.body.addEventListener("click", (e) => {
    if (
      links.classList.contains("open") &&
      !links.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      links.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  initScrollSpy(links);
})();

/* ---------------------------------------------------------
   Scroll-spy: highlights whichever section is currently in
   view as the person scrolls down the one long page. Falls
   back gracefully (first link stays active) if the browser
   doesn't support IntersectionObserver.
   --------------------------------------------------------- */
function initScrollSpy(navLinksEl) {
  if (!("IntersectionObserver" in window)) return;

  const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinksEl.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  };

  const visibleRatios = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestId = null;
      let bestRatio = 0;
      visibleRatios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) setActive(bestId);
    },
    {
      // A horizontal band centered a little above mid-viewport —
      // whichever section occupies that band counts as "current".
      rootMargin: "-35% 0px -50% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   Theme toggle (Light / Dark mode)
   The initial theme is already applied before this script runs
   (see the small inline snippet at the top of <head>, which
   prevents a flash of the wrong theme). This just wires up the
   button so people can switch it, and remembers their choice.
   --------------------------------------------------------- */
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const applyLabel = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };
  applyLabel();

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* localStorage unavailable — theme just won't persist */
    }
    applyLabel();
  });
}
