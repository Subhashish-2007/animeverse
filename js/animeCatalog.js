/* ================= ANIME CATALOG (ANIME PAGE ONLY) ================= */
/* Responsibility:
   - Fetch top anime
   - Build category rows
   - Create anime cards
   - Delegate watchlist state to global sync
*/

document.addEventListener("DOMContentLoaded", () => {
  if (window.PAGE_CONTEXT !== "ANIME") return;

  const rowsContainer = document.getElementById("animeRows");
  if (!rowsContainer) return;

  /* ===== GLOBAL STORE (used by search file) ===== */
  window.animeList = [];

  /* ================= FETCH TOP ANIME ================= */

  fetch("https://api.jikan.moe/v4/top/anime?limit=25")
    .then(res => res.json())
    .then(data => {
      window.animeList = data.data || [];
      renderRows(window.animeList);
    })
    .catch(() => {
      rowsContainer.innerHTML =
        "<p class='text-center'>Failed to load anime.</p>";
    });

  /* ================= CATEGORY DEFINITIONS ================= */

  const categories = [
    {
      title: "New Arrivals",
      filter: anime =>
        anime.aired?.from &&
        new Date(anime.aired.from) > new Date("2023-01-01")
    },
    {
      title: "Trending This Week",
      filter: anime => anime.popularity && anime.popularity < 500
    },
    {
      title: "Action",
      filter: anime => hasGenre(anime, "Action")
    },
    {
      title: "Romance",
      filter: anime => hasGenre(anime, "Romance")
    },
    {
      title: "Sci-Fi",
      filter: anime => hasGenre(anime, "Sci-Fi")
    }
  ];

  /* ================= RENDER ROWS ================= */

  function renderRows(animes) {
    rowsContainer.innerHTML = "";

    categories.forEach(cat => {
      const items = animes.filter(cat.filter).slice(0, 12);
      if (!items.length) return;

      rowsContainer.appendChild(createRow(cat.title, items));
    });
  }

  /* ================= SEARCH RESULTS RENDER ================= */
  /* Used by animeSearch.js */
  window.renderSearchResults = function (results) {
    rowsContainer.innerHTML = "";

    if (!results.length) {
      rowsContainer.innerHTML =
        "<p class='text-center'>No results found.</p>";
      return;
    }

    rowsContainer.appendChild(
      createRow("Search Results", results)
    );
  };

  /* ================= ROW COMPONENT ================= */

  function createRow(title, animes) {
    const section = document.createElement("section");

    section.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-xl font-bold">${title}</h2>
      </div>

      <div class="
        flex gap-4
        overflow-x-auto overflow-y-hidden
        pb-4 horizontal-scroll
      "></div>
    `;

    const track = section.querySelector(".horizontal-scroll");

    animes.forEach(anime => {
      track.appendChild(createAnimeCard(anime));
    });

    return section;
  }

  /* ================= CARD COMPONENT ================= */

  function createAnimeCard(anime) {
    const card = document.createElement("div");
    card.className = `
      min-w-[180px] max-w-[180px] h-[360px]
      bg-gray-500 dark:bg-gray-800
      border-2 border-orange-700
      p-3 transition hover:scale-105
      flex flex-col
    `;

    card.innerHTML = `
      <div class="h-[220px] overflow-hidden mb-2 cursor-pointer card-body">
        <img src="${anime.images?.jpg?.image_url || ""}"
             class="w-full h-full object-cover">
      </div>

      <h3 class="text-sm font-semibold line-clamp-2 mb-1">
        ${anime.title}
      </h3>

      <p class="text-xs opacity-80 mb-2">
        ⭐ ${anime.score ?? "N/A"}
      </p>

      <div class="flex gap-2 mt-auto">
        <button
          class="watch-btn flex-1 bg-gray-700 text-white py-1 text-xs">
          Watch
        </button>

        <button
          class="watchlist-btn flex-1 bg-orange-600 text-white py-1 text-xs"
          data-malid="${anime.mal_id}">
          + Watchlist
        </button>
      </div>
    `;

    /* ---- Card body → popup ---- */
    card.querySelector(".card-body").onclick = () => {
      if (typeof openAnimePopup === "function") {
        openAnimePopup(anime);
      }
    };

    /* ---- Watch button ---- */
    card.querySelector(".watch-btn").onclick = e => {
      e.stopPropagation();
      if (window.showCardToast) {
        showCardToast("Currently unavailable, available soon");
      }
    };

   /* ---- Watchlist button (NO UI LOGIC HERE) ---- */
const watchlistBtn = card.querySelector(".watchlist-btn");

/* ✅ ADD THIS BLOCK — INITIAL UI SYNC */
if (isInWatchlist(anime.mal_id)) {
  watchlistBtn.textContent = "Remove";
  watchlistBtn.classList.remove("bg-orange-600");
  watchlistBtn.classList.add("bg-red-600");
}
/* ✅ END ADD */

watchlistBtn.onclick = e => {
  e.stopPropagation();

  if (!anime || !anime.mal_id) {
    console.error("Invalid anime object passed from card", anime);
    return;
  }

  if (isInWatchlist(anime.mal_id)) {
    removeFromWatchlist(anime.mal_id);
  } else {
    addToWatchlist({
      mal_id: anime.mal_id,
      title: anime.title,
      images: anime.images,
      score: anime.score
    });
  }
};



    return card;
  }

  /* ================= HELPERS ================= */

  function hasGenre(anime, genreName) {
    return anime.genres?.some(g => g.name === genreName);
  }

  /* ================= EXPOSE CORE ================= */
  window.renderRows = renderRows;
});
