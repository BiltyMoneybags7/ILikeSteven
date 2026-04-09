const pageName = document.body.dataset.page;
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".main-nav a");
const revealItems = document.querySelectorAll(".hero-copy, .hero-card, .content-section");
const searchForms = document.querySelectorAll("[data-search-form]");
const resultsHeading = document.querySelector("[data-results-heading]");
const resultsList = document.querySelector("[data-results-list]");

const siteIndex = [
  {
    page: "index.html",
    pageLabel: "Overview",
    anchor: "overview-intro",
    title: "Landing Page Intro",
    content:
      "A landing page for the legend known as Stupid Steven. This homepage sets the tone for a playful joke site all about Steven, with enough space to roast him a little while still showing off his stories, habits, and random facts.",
  },
  {
    page: "index.html",
    pageLabel: "Overview",
    anchor: "overview-snapshot",
    title: "Quick Snapshot",
    content:
      "Being Steven, for better or worse. Lovably chaotic and a little ridiculous. About, basics, and relationships pages.",
  },
  {
    page: "index.html",
    pageLabel: "Overview",
    anchor: "overview-about-page",
    title: "About Page Overview Card",
    content:
      "Use it for Steven's fuller story, personality, background, and the running joke behind the site.",
  },
  {
    page: "index.html",
    pageLabel: "Overview",
    anchor: "overview-gallery-page",
    title: "Gallery Page Overview Card",
    content:
      "Keep photos in their own dedicated space so visitors can admire the many faces of Stupid Steven.",
  },
  {
    page: "index.html",
    pageLabel: "Overview",
    anchor: "overview-relationships-page",
    title: "Relationships Page Overview Card",
    content:
      "List people he knows, friends, rivals, and anyone else who gets dragged into the Steven lore.",
  },
  {
    page: "about.html",
    pageLabel: "About",
    anchor: "about-description",
    title: "About Description",
    content:
      "Steven is the star of an intentionally unserious profile site. Explain the joke, describe his personality, and document the chaotic little details that make Steven, well, Steven. The nickname Stupid Steven somehow stuck.",
  },
  {
    page: "about.html",
    pageLabel: "About",
    anchor: "about-quote",
    title: "About Quote",
    content: "Some people build a normal profile page. Steven somehow earned an entire comedy archive.",
  },
  {
    page: "gallery.html",
    pageLabel: "Gallery",
    anchor: "gallery-portrait",
    title: "Portrait Photo",
    content: "Portrait photo of the man himself.",
  },
  {
    page: "gallery.html",
    pageLabel: "Gallery",
    anchor: "gallery-best-moment",
    title: "Best Moment",
    content: "One of Steven's finest or dumbest moments.",
  },
  {
    page: "gallery.html",
    pageLabel: "Gallery",
    anchor: "gallery-hobby-shot",
    title: "Hobby Shot",
    content: "Doing whatever Steven does best.",
  },
  {
    page: "gallery.html",
    pageLabel: "Gallery",
    anchor: "gallery-extra-look",
    title: "Extra Look",
    content: "Extra evidence for the Steven archive.",
  },
  {
    page: "hobbies.html",
    pageLabel: "Hobbies",
    anchor: "hobbies-favorite-activities",
    title: "Favorite Activities",
    content: "Sports, gaming, music, travel, or whatever he suddenly gets obsessed with.",
  },
  {
    page: "hobbies.html",
    pageLabel: "Hobbies",
    anchor: "hobbies-personal-style",
    title: "Personal Style",
    content: "The vibe he gives off and the weird signature habits people roast him for.",
  },
  {
    page: "hobbies.html",
    pageLabel: "Hobbies",
    anchor: "hobbies-fun-facts",
    title: "Fun Facts",
    content: "Little facts, recurring jokes, and classic Steven behavior that deserves documentation.",
  },
  {
    page: "basics.html",
    pageLabel: "Basics",
    anchor: "basics-age",
    title: "Age",
    content: "Add age.",
  },
  {
    page: "basics.html",
    pageLabel: "Basics",
    anchor: "basics-height",
    title: "Height",
    content: "Add height.",
  },
  {
    page: "basics.html",
    pageLabel: "Basics",
    anchor: "basics-weight",
    title: "Weight",
    content: "Add weight.",
  },
  {
    page: "basics.html",
    pageLabel: "Basics",
    anchor: "basics-location",
    title: "Location",
    content: "Add city or area.",
  },
  {
    page: "basics.html",
    pageLabel: "Basics",
    anchor: "basics-birthday",
    title: "Birthday",
    content: "Add birthday.",
  },
  {
    page: "basics.html",
    pageLabel: "Basics",
    anchor: "basics-known-for",
    title: "Known For",
    content: "Add a short title.",
  },
  {
    page: "relationships.html",
    pageLabel: "Relationships",
    anchor: "relationships-best-friend",
    title: "Best Friend",
    content: "The name of someone who knows Steven best and has seen his funniest decisions up close.",
  },
  {
    page: "relationships.html",
    pageLabel: "Relationships",
    anchor: "relationships-frequent-victim",
    title: "Frequent Victim",
    content: "The friend, sibling, or cousin who constantly gets dragged into Steven-related nonsense.",
  },
  {
    page: "relationships.html",
    pageLabel: "Relationships",
    anchor: "relationships-main-rival",
    title: "Main Rival",
    content: "Playful enemies, trash-talk targets, or anyone who claims they can outdo Steven.",
  },
  {
    page: "relationships.html",
    pageLabel: "Relationships",
    anchor: "relationships-person-name",
    title: "Relationship Name",
    content: "Add person.",
  },
  {
    page: "relationships.html",
    pageLabel: "Relationships",
    anchor: "relationships-person-connection",
    title: "How They Know Steven",
    content: "Friend.",
  },
  {
    page: "relationships.html",
    pageLabel: "Relationships",
    anchor: "relationships-person-rating",
    title: "Steven Rating",
    content: "Tolerates him.",
  },
  {
    page: "more-info.html",
    pageLabel: "More Info",
    anchor: "more-info-details",
    title: "More Information",
    content: "Social links, favorite quotes, achievements, future goals, inside jokes, fake awards, or anything else visitors should know.",
  },
];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(text, query) {
  if (!query) {
    return escapeHtml(text);
  }

  const pattern = new RegExp(`(${escapeRegExp(query)})`, "ig");
  return escapeHtml(text).replace(pattern, '<strong class="search-highlight">$1</strong>');
}

function buildResultSnippet(text, query) {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return highlightMatch(text.slice(0, 120), query);
  }

  const start = Math.max(0, matchIndex - 38);
  const end = Math.min(text.length, matchIndex + query.length + 60);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  return `${prefix}${highlightMatch(text.slice(start, end), query)}${suffix}`;
}

function scoreResult(entry, query) {
  const q = query.toLowerCase();
  const haystack = `${entry.title} ${entry.content} ${entry.pageLabel}`.toLowerCase();

  if (entry.title.toLowerCase().includes(q)) {
    return 3;
  }

  if (haystack.includes(q)) {
    return 2;
  }

  return 0;
}

function getResults(query) {
  if (!query) {
    return [];
  }

  return siteIndex
    .map((entry) => ({ ...entry, score: scoreResult(entry, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function hideDropdown(dropdown) {
  dropdown.hidden = true;
  dropdown.innerHTML = "";
}

function navigateToResult(result) {
  window.location.href = `${result.page}#${result.anchor}`;
}

function renderDropdown(dropdown, query, results, selectedIndex = -1) {
  if (!query) {
    hideDropdown(dropdown);
    return;
  }

  if (!results.length) {
    dropdown.hidden = false;
    dropdown.innerHTML = `
      <div class="search-dropdown-empty">
        <span class="search-result-title">No results found</span>
        <span class="search-result-snippet">Nothing matched "${escapeHtml(query)}". Press Enter to open the full results page.</span>
      </div>
    `;
    return;
  }

  dropdown.hidden = false;
  dropdown.innerHTML = results
    .slice(0, 6)
    .map(
      (result, index) => `
        <button class="search-dropdown-item ${index === selectedIndex ? "is-selected" : ""}" type="button" data-result-index="${index}">
          <span class="search-result-title">${highlightMatch(result.title, query)}</span>
          <span class="search-result-meta">${result.pageLabel}</span>
          <span class="search-result-snippet">${buildResultSnippet(result.content, query)}</span>
        </button>
      `
    )
    .join("");
}

function renderSearchResultsPage(query) {
  if (!resultsHeading || !resultsList) {
    return;
  }

  const safeQuery = query.trim();
  const results = getResults(safeQuery);

  resultsHeading.innerHTML = safeQuery
    ? `Results for "<span class="search-highlight">${escapeHtml(safeQuery)}</span>"`
    : "Results for your search";

  if (!safeQuery || !results.length) {
    resultsList.innerHTML = `
      <article class="search-results-empty">
        <h3>No results found</h3>
        <p>${safeQuery ? `Nothing matched "${escapeHtml(safeQuery)}". Try a broader word like <strong class="search-highlight">Steven</strong>, <strong class="search-highlight">friends</strong>, or <strong class="search-highlight">photos</strong>.` : "Type something into the search bar above to explore the site."}</p>
      </article>
    `;
    return;
  }

  resultsList.innerHTML = results
    .map(
      (result) => `
        <a class="search-results-card" href="${result.page}#${result.anchor}">
          <h3>${highlightMatch(result.title, safeQuery)}</h3>
          <p>${result.pageLabel}</p>
          <p>${buildResultSnippet(result.content, safeQuery)}</p>
        </a>
      `
    )
    .join("");
}

navLinks.forEach((link) => {
  if (link.dataset.nav === pageName) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

searchForms.forEach((form) => {
  const input = form.querySelector('input[name="query"]');
  const dropdown = form.querySelector("[data-search-dropdown]");
  let activeResults = [];
  let selectedIndex = -1;

  const updateDropdown = () => {
    const query = input.value.trim();
    activeResults = getResults(query);
    selectedIndex = -1;
    renderDropdown(dropdown, query, activeResults, selectedIndex);
  };

  input.addEventListener("input", updateDropdown);

  input.addEventListener("focus", () => {
    if (input.value.trim()) {
      updateDropdown();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (dropdown.hidden || !activeResults.length) {
      if (event.key === "Enter") {
        return;
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % Math.min(activeResults.length, 6);
      renderDropdown(dropdown, input.value.trim(), activeResults, selectedIndex);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      selectedIndex = selectedIndex <= 0 ? Math.min(activeResults.length, 6) - 1 : selectedIndex - 1;
      renderDropdown(dropdown, input.value.trim(), activeResults, selectedIndex);
    }

    if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      navigateToResult(activeResults[selectedIndex]);
    }

    if (event.key === "Escape") {
      hideDropdown(dropdown);
    }
  });

  dropdown.addEventListener("click", (event) => {
    const button = event.target.closest("[data-result-index]");

    if (!button) {
      return;
    }

    const result = activeResults[Number(button.dataset.resultIndex)];
    if (result) {
      navigateToResult(result);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawQuery = input.value.trim();
    if (!rawQuery) {
      renderDropdown(dropdown, rawQuery, []);
      return;
    }

    hideDropdown(dropdown);
    window.location.href = `search.html?q=${encodeURIComponent(rawQuery)}`;
  });
});

document.addEventListener("click", (event) => {
  searchForms.forEach((form) => {
    const dropdown = form.querySelector("[data-search-dropdown]");
    if (!form.contains(event.target)) {
      hideDropdown(dropdown);
    }
  });
});

if (pageName === "search") {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  const searchInput = document.querySelector('input[name="query"]');
  const searchSection = document.querySelector(".search-results-section");

  if (searchInput) {
    searchInput.value = query;
  }

  if (searchSection) {
    searchSection.classList.add("is-visible");
  }

  renderSearchResultsPage(query);
}

if (siteHeader) {
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 12) {
        siteHeader.classList.remove("is-hidden");
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 8) {
        siteHeader.classList.add("is-hidden");
      } else if (currentScrollY < lastScrollY - 8) {
        siteHeader.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
}

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
