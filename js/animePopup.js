/* ================= ANIME POPUP (ANIME PAGE ONLY) ================= */

const IS_ANIME_PAGE = window.PAGE_CONTEXT === "ANIME";
if (!IS_ANIME_PAGE) {
  console.log("animePopup.js disabled (not anime page)");
}

/* ================= POPUP ROOT ================= */

let popupRoot = null;

if (IS_ANIME_PAGE) {
  popupRoot = document.getElementById("animePopup");

  if (!popupRoot) {
    popupRoot = document.createElement("div");
    popupRoot.id = "animePopup";
    popupRoot.className =
      "fixed inset-0 z-50 hidden bg-black/70 flex items-center justify-center";
    document.body.appendChild(popupRoot);
  }
}

/* ================= OPEN POPUP ================= */

function openAnimePopup(anime) {
  if (!IS_ANIME_PAGE || !popupRoot) return;

  popupRoot.innerHTML = `
    <div class="relative bg-white dark:bg-gray-900
                max-w-6xl w-[95%] max-h-[90vh]
                overflow-y-auto shadow-2xl">

      <!-- HEADER -->
      <div class="flex items-center justify-between h-14
                  bg-gray-800 text-white px-4">
        <span class="font-semibold text-lg">${anime.title}</span>
        <button id="closePopupBtn"
          class="h-10 w-10 bg-red-600 hover:bg-red-700 text-xl">✕</button>
      </div>

      <!-- BODY -->
      <div class="p-6 flex flex-col md:flex-row gap-8">

        <!-- POSTER -->
        <div class="w-full md:w-1/3">
          <img
            src="${anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}"
            alt="${anime.title}"
            class="w-full object-cover">
        </div>

        <!-- CONTENT -->
        <div class="flex-1">

          <!-- TAB BUTTONS -->
          <div class="flex gap-4 mb-6">
            <button id="tabAnime"
              class="px-4 py-2 bg-red-600 text-white">
              Anime Details
            </button>
            <button id="tabCharacters"
              class="px-4 py-2 bg-gray-500 text-white">
              Main Characters
            </button>
          </div>

          <!-- TAB CONTENT -->
          <div id="animeTabContent"></div>
          <div id="characterTabContent" class="hidden"></div>

          <!-- ACTION BUTTONS -->
          <div class="flex gap-4 mt-8">
            <button id="moreInfoBtn"
              class="flex-1 bg-blue-600 text-white py-2 hover:bg-blue-700">
              More Info
            </button>

            <button id="watchBtn"
              class="flex-1 bg-gray-600 text-white py-2 hover:bg-gray-700">
              Watch
            </button>

            <button id="addWatchlistBtn"
              class="flex-1 bg-orange-600 text-white py-2 hover:bg-orange-700">
              + Add to Watchlist
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- TOAST -->
    <div id="popupToast"
      class="fixed bottom-10 left-1/2 -translate-x-1/2
             bg-black text-white px-6 py-3
             opacity-0 transition-opacity duration-300">
    </div>
  `;

  popupRoot.classList.remove("hidden");

  /* ================= ANIME DETAILS ================= */

  const animeTab = document.getElementById("animeTabContent");
  const characterTab = document.getElementById("characterTabContent");

  animeTab.innerHTML = `
    <h2 class="text-2xl font-bold mb-1">${anime.title}</h2>
    <p class="text-sm text-gray-500 mb-4">${anime.title_japanese || ""}</p>

    <div class="grid grid-cols-2 gap-4 text-sm mb-6">
      <div><b>Type:</b> ${anime.type || "N/A"}</div>
      <div><b>Episodes:</b> ${anime.episodes || "N/A"}</div>
      <div><b>Status:</b> ${anime.status || "N/A"}</div>
      <div><b>Duration:</b> ${anime.duration || "N/A"}</div>
      <div><b>Rating:</b> ${anime.rating || "N/A"}</div>
      <div><b>Source:</b> ${anime.source || "N/A"}</div>
      <div><b>Season:</b> ${anime.season || "N/A"} ${anime.year || ""}</div>
      <div><b>Studios:</b> ${anime.studios?.map(s => s.name).join(", ") || "N/A"}</div>
    </div>

    <div class="flex flex-wrap gap-2 mb-6">
      ${anime.genres?.map(g => `
        <span class="px-3 py-1 bg-orange-600 text-white text-xs">
          ${g.name}
        </span>
      `).join("")}
    </div>

    <h3 class="text-lg font-bold mb-2">Synopsis</h3>
    <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      ${anime.synopsis || "No synopsis available."}
    </p>
  `;

  characterTab.innerHTML =
    "<p class='text-sm text-gray-500'>Click to load main characters.</p>";

  /* ================= TAB SWITCH ================= */

  document.getElementById("tabAnime").onclick = () => {
    animeTab.classList.remove("hidden");
    characterTab.classList.add("hidden");
  };

  document.getElementById("tabCharacters").onclick = () => {
    animeTab.classList.add("hidden");
    characterTab.classList.remove("hidden");
    loadMainCharacters(anime.mal_id, characterTab);
  };

  /* ================= ACTION EVENTS ================= */

  document.getElementById("closePopupBtn").onclick = closeAnimePopup;

  document.getElementById("moreInfoBtn").onclick = () => {
    if (anime.url) window.open(anime.url, "_blank");
  };

  document.getElementById("watchBtn").onclick = () => {
    showToast("Currently unavailable, available soon");
  };

  document.getElementById("addWatchlistBtn").onclick = () => {
    if (typeof addToWatchlist === "function") {
      addToWatchlist(anime);
      showToast("Added to watchlist");
    } else {
      showToast("Watchlist not available");
    }
  };
}

/* ================= LOAD MAIN CHARACTERS ================= */

function loadMainCharacters(animeId, container) {
  container.innerHTML = "<p class='text-sm text-gray-500'>Loading characters...</p>";

  fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
    .then(res => res.json())
    .then(data => {
      const mains = data.data.filter(c => c.role === "Main");

      if (!mains.length) {
        container.innerHTML = "<p>No main characters found.</p>";
        return;
      }

      container.innerHTML = `
        <div class="space-y-6 max-h-[55vh] overflow-y-auto pr-2">
          ${mains.map(c => `
            <div class="flex gap-4 bg-gray-100 dark:bg-gray-800 p-4">
              <img src="${c.character.images.jpg.image_url}"
                   class="w-20 h-28 object-cover">
              <div>
                <h4 class="font-bold">${c.character.name}</h4>
                <p class="text-sm">
                  ${c.character.about
                    ? c.character.about.slice(0, 400) + "..."
                    : "No description available."}
                </p>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    })
    .catch(() => {
      container.innerHTML = "<p>Failed to load characters.</p>";
    });
}

/* ================= TOAST ================= */

function showToast(msg) {
  const toast = document.getElementById("popupToast");
  if (!toast) return;

  toast.textContent = msg;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}

/* ================= CLOSE ================= */

function closeAnimePopup() {
  popupRoot.classList.add("hidden");
  popupRoot.innerHTML = "";
}

if (IS_ANIME_PAGE && popupRoot) {
  popupRoot.addEventListener("click", e => {
    if (e.target === popupRoot) closeAnimePopup();
  });
}

/* ================= EXPORT ================= */

window.openAnimePopup = openAnimePopup;
