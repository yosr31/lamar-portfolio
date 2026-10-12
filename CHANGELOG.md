# Changelog

## Round 3 — Font correction

You sent a screenshot of your actual Canva file showing the header font should be a **flowing script/cursive** style — not the bold serif I'd switched to in Round 2. That switch was a mistake: my web search for "Symphony Bold" turned up an unrelated font from a different type foundry, and I wrongly assumed that's what was meant.

Reverted `--font-heading` back to **Alex Brush** (the same script font used elsewhere on the site), which your screenshot confirms is a close match — this also restores the original flowing, overlapping two-line layout for your name on the Home section, and the lighter font weight that suits a script typeface (forcing "bold" on a script font like this doesn't apply cleanly, since script fonts are generally designed at one weight).

Verified directly against your reference screenshot by rendering the actual font locally (my test sandbox can't reach Google Fonts, so I downloaded the real font file just to confirm pixel-for-pixel it matches) — headers and your name now render as genuine flowing script across every section.

**Files:** `assets/css/style.css`, `assets/css/home.css`

---

## Round 2 — Font, spacing fixes, one-page structure

### 1. Header / page title font
Requested: **Symphony Bold**. Every version of this font available online is either a paid professional typeface or restricted to personal, non-commercial use — I can't legally embed and redistribute either on your site. Used **Playfair Display** instead (free, properly OFL-licensed, similar bold/elegant "classic title" character) for every section header and your name on the Home section. Full explanation and how to swap in a properly-licensed file later is in `README.md`.

While wiring this up, found and fixed a real leftover bug from Round 1: the CSS variable powering your headers had been accidentally deleted during an earlier edit, so headers had been silently falling back to the plain body font. Fixed as part of this change.

**Files:** `assets/css/style.css`, `assets/css/home.css`, `index.html` (font import)

### 2. Education polka dots
Increased dot radius slightly (2.2px → 2.9px). Same pattern, spacing, and colors — confirmed subtle via a zoomed before/after comparison.

**Files:** `assets/css/education.css`

### 3. About Me black lace position
Measured your two reference images precisely and matched the target exactly: the lace is now sized and positioned flush to the bottom-right corner, covering roughly the bottom-right half of the folder (previously it was smaller and had a small gap from the corner). Also swapped in the freshly-provided lace asset.

While fixing this, found and fixed a genuine bug: on mobile, the lace was overflowing past the edge of the screen. Root cause was a CSS quirk — `width:auto`/`height:auto` behaves differently on `<img>` elements than on regular boxes, so my sizing approach wasn't actually filling the intended area correctly. Fixed by wrapping the image in a positioned container div, which is the technically correct approach for this kind of layout.

**Files:** `assets/css/about.css`, `index.html`, `assets/images/about/lace-corner.png`

### 4–7. One continuous scrolling page
All 7 sections (Home, About, Skills, Projects, Services, Education, Contact) are now merged into a single `index.html`, stacked vertically in their original order, instead of separate pages.

- **Navbar** now uses anchor links (`#about`, `#skills`, etc.) and smooth-scrolls to each section using the browser's native anchor scrolling — no page reloads.
- **Active section highlighting**: as you scroll, the navbar automatically highlights whichever section is currently in view, using `IntersectionObserver`.
- **Internal links preserved**: the Home section's "Find Out More" button and the About section's five folder pills (Skills/Projects/Services/Education/Contact) now jump to the matching section instead of loading a separate page.
- **Old page files** (`about.html`, `skills.html`, etc.) were converted into instant redirects to `index.html#section`, so nothing breaks if any of them were bookmarked or linked elsewhere.

Also removed a "force every section to fill the screen" rule that made sense for separate pages but created an awkward empty gap between short sections (like Skills) and the next section, now that everything scrolls continuously.

**Files:** `index.html` (rebuilt), `assets/js/nav.js` (rewritten for anchors + scroll-spy), `assets/css/style.css`, old page `.html` files (now redirects)

### 8–10. Responsiveness
Found and fixed a real bug while testing: a CSS conflict between two style rules (`.page-section` and `.container`, both setting the `padding` shorthand on the same element) had been silently canceling out your side padding on mobile — meaning content was sitting flush against the screen edges on every section, on every phone size, since this was first built. It only became obvious once the bigger lace image started overflowing because of it. Fixed by using more specific padding rules that don't conflict.

Re-tested every section at desktop, tablet (800px), and mobile (390px) widths, in both light and dark mode, and confirmed with an automated check that there's no horizontal scrolling anywhere on the site.

**Files:** `assets/css/style.css`

### Final verification (Round 2)
- Tested 6 combinations (desktop/tablet/mobile × light/dark): all pass with zero console errors, zero broken images, zero horizontal overflow
- Scroll-spy tested by scrolling through the entire page and confirming the correct nav link highlights at every position
- All 20 links on the page verified to point somewhere valid (no dead links)
- Laptop reveal, skill hover, theme toggle, and contact form validation all re-tested and working on the merged page
- Old page redirects tested and confirmed working

---

## Round 1 — Folder-in-laptop, lace centering, Light/Dark Mode

- Added the polka-dot desktop folder icon inside the Home laptop screen, with its own floating animation (this had been missing from the original build)
- Fixed the Skills page lace centering (was a CSS bug, not an asset issue)
- Corrected the About page lace position and size to match a Canva reference (later refined further in Round 2 with more precise reference images)
- Built the full Light/Dark Mode system: toggle button, persistence via `localStorage`, system-preference detection, no flash of the wrong theme on load
- Found and fixed two bugs during that work: a rendering artifact behind the nav in dark mode, and some skill icons (Git, GitHub, etc.) becoming unreadable on dark backgrounds
