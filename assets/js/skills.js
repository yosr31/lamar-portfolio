/* =========================================================
   Skills wheel — builds the icon grid from SKILLS_DATA and
   wires up the hover/tap "reveal percentage" interaction.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const wheel = document.getElementById("skills-icons");
  if (!wheel || typeof SKILLS_DATA === "undefined") return;

  const rows = {};
  SKILLS_DATA.forEach((skill) => {
    rows[skill.row] = rows[skill.row] || [];
    rows[skill.row].push(skill);
  });

  Object.keys(rows)
    .sort((a, b) => a - b)
    .forEach((rowKey) => {
      const rowEl = document.createElement("div");
      rowEl.className = "skill-row";

      rows[rowKey].forEach((skill) => {
        const item = document.createElement("div");
        item.className = "skill-item" + (skill.big ? " skill-item--big" : "");
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute(
          "aria-label",
          `${skill.name}: ${skill.percent} percent proficiency`
        );

        item.innerHTML = `
          <img src="${skill.icon}" alt="${skill.name} icon" loading="lazy" />
          <div class="skill-percent">
            <span class="skill-percent-number">${skill.percent}%</span>
            <span class="skill-percent-name">${skill.name}</span>
          </div>
        `;

        // Touch / keyboard support: tap or focus toggles the reveal,
        // in addition to the CSS :hover state used on desktop.
        item.addEventListener("click", () => {
          const isActive = item.classList.contains("is-active");
          document
            .querySelectorAll(".skill-item.is-active")
            .forEach((el) => el.classList.remove("is-active"));
          if (!isActive) item.classList.add("is-active");
        });

        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            item.click();
          }
        });

        rowEl.appendChild(item);
      });

      wheel.appendChild(rowEl);
    });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".skill-item")) {
      document
        .querySelectorAll(".skill-item.is-active")
        .forEach((el) => el.classList.remove("is-active"));
    }
  });
});
