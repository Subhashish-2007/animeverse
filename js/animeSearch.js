document.addEventListener("DOMContentLoaded", () => {
  if (window.PAGE_CONTEXT !== "ANIME") return;

  const searchInput = document.getElementById("animeSearch");
  const clearBtn = document.getElementById("clearSearchBtn");

  if (!searchInput || !clearBtn) return;

  let searchTimeout;

  function resetToNormal() {
    searchInput.value = "";
    clearBtn.classList.add("hidden");

    if (window.animeList && window.renderRows) {
      window.renderRows(window.animeList);
    }
  }

  /* ================= INPUT SEARCH ================= */

searchInput.addEventListener("input", e => {
  const query = e.target.value.trim();

  clearTimeout(searchTimeout);

  // If input is empty → reset immediately
  if (query.length === 0) {
    resetToNormal();
    return;
  }

  // Show ❌
  clearBtn.classList.remove("hidden");

  // Debounced API search
  searchTimeout = setTimeout(() => {
    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=25`)
      .then(res => res.json())
      .then(data => {
        const results = data.data || [];
        if (window.renderSearchResults) {
          window.renderSearchResults(results);
        }
      })
      .catch(() => {
        console.error("Search failed");
      });
  }, 400);
});

  /* ================= CLEAR BUTTON ================= */

  clearBtn.addEventListener("click", () => {
    resetToNormal();
  });
});
