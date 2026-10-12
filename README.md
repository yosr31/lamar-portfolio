# Lamar Mohamed — Portfolio Website

A fully functional recreation of your Canva portfolio design, built with plain HTML, CSS, and JavaScript (no frameworks, no build step). The site is now **one continuous scrolling page** with a navbar that smooth-scrolls to each section.

## Running it locally

There's nothing to install. Just open `index.html` in any browser — double-click the file, or drag it into a browser window.

**Important:** if you downloaded this as a zip, make sure you actually **extract** it first (right-click → Extract All on Windows, or double-click on Mac) before opening `index.html`. Opening a file from inside an unextracted zip will break the styling and images, since the browser can't find the `assets` folder next to it.

To publish it, upload the whole `lamar-portfolio` folder to any static host (GitHub Pages, Netlify, Vercel, etc.) — no server-side code required.

## Folder structure

```
lamar-portfolio/
├── index.html          The whole site — every section lives here now
├── about.html           ┐
├── skills.html          │
├── projects.html        │  these just redirect to index.html#section,
├── services.html        │  kept in case anything still links to them
├── education.html       │
├── contact.html         ┘
└── assets/
    ├── css/
    │   ├── style.css       shared design system, theme variables, nav
    │   └── home.css, about.css, skills.css, ...   one per section
    ├── js/
    │   ├── nav.js           nav bar, smooth-scroll, active-section highlighting, theme toggle
    │   ├── main.js          the Home section's laptop click/reveal interaction
    │   ├── skills-data.js   ← your skills + percentages live here
    │   ├── skills.js        builds the skills wheel from skills-data.js
    │   └── contact.js       the contact form's mailto handler
    └── images/, icons/     all pictures, icons, and decorative graphics
```

## How the one-page structure works

Every section (`Home`, `About`, `Skills`, `Projects`, `Services`, `Education`, `Contact`) is a `<section id="...">` stacked vertically inside `index.html`, in that order. The navbar links are just anchors (`#about`, `#skills`, etc.) — clicking one smooth-scrolls to that section, and the browser's native anchor scrolling handles the rest (no page reload).

As you scroll, the navbar automatically highlights whichever section is currently in view (this is the "scroll-spy" behavior, built with the browser's `IntersectionObserver` in `nav.js`).

**To add, remove, or reorder sections:** move the `<section>` blocks inside `<main>` in `index.html` to the order you want, and update the `NAV_LINKS` array at the top of `assets/js/nav.js` to match.

## Light / Dark Mode

The toggle button (sun/moon icon) in the nav switches themes instantly, remembers your choice (`localStorage`), respects your system preference on first visit, and never flashes the wrong theme on load. All colors for both themes live in the `:root` and `[data-theme="dark"]` blocks at the top of `assets/css/style.css`.

## Making common edits

**Your name, bio, or hero text** — open `index.html`, find `<section id="home">` near the top.

**Any section's text** — find the matching `<section id="...">` in `index.html` and edit the text directly.

**Skills and their percentages** — open `assets/js/skills-data.js`:

```js
{ name: "Java", icon: "assets/icons/skills/java.png", percent: 90, row: 1 },
```

**Projects** — inside `<section id="projects">`, each project is one `<article class="project-card">` block.

**Social links, email, phone** — inside `<section id="contact">`.

**Nav menu** — edit the `NAV_LINKS` array at the top of `assets/js/nav.js`. Each `href` must match a section's `id` in `index.html`.

**Theme colors** — the CSS variables in `assets/css/style.css`.

**Heading font** — see the note below about Symphony Bold.

## About the interactive pieces

**Home section laptop** — a real click interaction. Clicking (or tapping, or pressing Enter/Space while focused) the laptop slides up the framed photo with a spring animation. The polka-dot folder icon on the screen has its own gentle bob animation. Close via the × button, clicking outside, or Escape.

**Skills wheel** — hovering (or tapping, on touch) any icon fades it and reveals its name and percentage.

**Contact form** — since this is a static site, Submit composes a pre-filled email (to `lamarmsalama@gmail.com`) via a `mailto:` link. Swap the handler in `assets/js/contact.js` for a service like Formspree or EmailJS if you'd rather not open the visitor's mail client.

## About the header font

Your headers and Home page name use **Alex Brush**, a flowing script font, loaded from Google Fonts in `index.html`'s `<head>` and controlled by the `--font-heading` variable in `assets/css/style.css`.

(Note: an earlier round briefly swapped this to a bold serif based on a misidentified font called "Symphony" — that was a mistake and has been reverted. Alex Brush is the correct match, confirmed directly against a screenshot of your Canva file.)

**If you have access to the exact "Symphony" font from Canva** (e.g. exportable from a Canva Pro plan you own) and want to use that specific file instead, send it over and I'll add a proper `@font-face` rule and point `--font-heading` to it directly — everything is already set up to make that a one-line change.

## Notes on a couple of judgment calls

- **Skill percentages** are estimates — adjust them in `skills-data.js` to reflect your real level.
- **Projects section** content is placeholder — your Canva file didn't have real project content yet.
- The About section's five quick-link pills, and the Skills section's two "type here" text blocks, were left unfinished in your Canva file — real copy was written in the same spirit as the rest of your content.

See `CHANGELOG.md` for a full history of edits made across each round of feedback.
