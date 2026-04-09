const pageName = document.body.dataset.page;
const navLinks = document.querySelectorAll(".main-nav a");
const revealItems = document.querySelectorAll(".hero-copy, .hero-card, .content-section");
const searchForms = document.querySelectorAll("[data-search-form]");
const searchMessages = document.querySelectorAll("[data-search-message]");

const siteIndex = [
  { page: "index.html", label: "Overview", terms: ["overview", "home", "landing", "stupid steven", "steven"] },
  { page: "about.html", label: "About", terms: ["about", "story", "background", "description", "personality"] },
  { page: "gallery.html", label: "Gallery", terms: ["gallery", "photos", "pictures", "images", "photo"] },
  { page: "hobbies.html", label: "Hobbies", terms: ["hobbies", "interests", "activities", "fun facts", "style"] },
  { page: "basics.html", label: "Basics", terms: ["basics", "age", "height", "weight", "birthday", "location"] },
  { page: "relationships.html", label: "Relationships", terms: ["relationships", "friends", "people", "knows", "rival", "best friend"] },
  { page: "more-info.html", label: "More Info", terms: ["more info", "socials", "links", "awards", "extra"] },
];

navLinks.forEach((link) => {
  if (link.dataset.nav === pageName) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

searchForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector('input[name="query"]');
    const rawQuery = input.value.trim();
    const query = rawQuery.toLowerCase();

    if (!query) {
      searchMessages.forEach((message) => {
        message.textContent = "Type a word like photos, age, friends, or about.";
      });
      return;
    }

    const match = siteIndex.find((entry) =>
      entry.terms.some((term) => term.includes(query) || query.includes(term))
    );

    if (match) {
      window.location.href = match.page;
      return;
    }

    searchMessages.forEach((message) => {
      message.textContent = `No match for "${rawQuery}". Try photos, basics, hobbies, or relationships.`;
    });
  });
});

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));
