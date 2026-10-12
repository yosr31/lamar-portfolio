/* =========================================================
   Contact form
   ---------------------------------------------------------
   This site is static (no backend), so the form composes a
   pre-filled email to Lamar's inbox using a mailto: link,
   which opens the visitor's own email app to send it.

   To wire this up to a real backend instead (so messages
   arrive without opening the visitor's mail client), swap
   this handler for a service like Formspree or EmailJS —
   the form fields (name/email/request) are already set up
   with matching "name" attributes for that kind of drop-in.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const CONTACT_EMAIL = "lamarmsalama@gmail.com";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const request = form.elements["request"].value.trim();

    if (!name || !email || !request) {
      status.textContent = "Please fill in your name, email, and request first.";
      status.style.color = "#b3413c";
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${request}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    status.style.color = "var(--ink)";
    status.textContent = "Opening your email app to send this message…";
  });
});
