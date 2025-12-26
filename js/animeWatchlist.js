/* ================= WATCHLIST UI ================= */

document.addEventListener("DOMContentLoaded", () => {
  if (window.PAGE_CONTEXT !== "ANIME") return;

  const watchlistSection = document.getElementById("watchlistSection");
  const animeSection = document.getElementById("animeSection");
  const grid = document.getElementById("watchlistGrid");
  const emptyText = document.getElementById("watchlistEmpty");

  const tabAnime = document.getElementById("tabAnime");
  const tabWatchlist = document.getElementById("tabWatchlist");

  if (!watchlistSection || !grid) return;

  /* ---------- TAB SWITCH ---------- */
  tabWatchlist?.addEventListener("click", () => {
    animeSection.classList.add("hidden");
    watchlistSection.classList.remove("hidden");

    tabAnime.classList.remove("bg-red-600");
    tabAnime.classList.add("bg-gray-600");

    tabWatchlist.classList.remove("bg-gray-600");
    tabWatchlist.classList.add("bg-red-600");

    renderWatchlist();
  });

  tabAnime?.addEventListener("click", () => {
    watchlistSection.classList.add("hidden");
    animeSection.classList.remove("hidden");

    tabWatchlist.classList.remove("bg-red-600");
    tabWatchlist.classList.add("bg-gray-600");

    tabAnime.classList.remove("bg-gray-600");
    tabAnime.classList.add("bg-red-600");
  });

  /* ---------- RENDER WATCHLIST ---------- */
  function renderWatchlist() {
    const list = getWatchlist();
    grid.innerHTML = "";

    if (!list.length) {
      emptyText.classList.remove("hidden");
      return;
    }

    emptyText.classList.add("hidden");

    list.forEach(anime => {
      grid.appendChild(createWatchlistCard(anime));
    });
  }

  /* ---------- CARD (CATALOG-LIKE) ---------- */
  function createWatchlistCard(anime) {
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
        <img src="${anime.image}"
             class="w-full h-full object-cover">
      </div>

      <h3 class="text-sm font-semibold line-clamp-2 mb-1">
        ${anime.title}
      </h3>

      <div class="flex gap-2 mt-auto">
        <button
          class="watchlist-btn flex-1 bg-red-600 text-white py-1 text-xs"
          data-malid="${anime.mal_id}">
          Remove
        </button>
      </div>
    `;

    /* ---- OPEN SAME POPUP ---- */
card.querySelector(".card-body").onclick = async () => {
  if (typeof openAnimePopup !== "function") return;

  try {
    // show loading state (optional but recommended)
    openAnimePopup({
      title: "Loading...",
      images: { jpg: { image_url: anime.image } }
    });

    const res = await fetch(
      `https://api.jikan.moe/v4/anime/${anime.mal_id}/full`
    );
    const data = await res.json();

    if (data?.data) {
      openAnimePopup(data.data);
    }
  } catch (err) {
    console.error("Failed to load anime details", err);
  }
};

    /* ---- REMOVE FROM WATCHLIST ---- */
    card.querySelector(".watchlist-btn").onclick = e => {
      e.stopPropagation();
      removeFromWatchlist(anime.mal_id);
    };

    return card;
  }

  /* ---------- GLOBAL SYNC ---------- */
  document.addEventListener("watchlist:changed", () => {
    if (!watchlistSection.classList.contains("hidden")) {
      renderWatchlist();
    }
  });
});
