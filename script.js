/* ================= THEME TOGGLE ================= */
const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;

toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark");
  toggleBtn.textContent = html.classList.contains("dark") ? "☀️" : "🌙";
});


/* ================= ANIME SHOWCASE ================= */
const animeGrid = document.getElementById("animeGrid");
const characterGrid = document.getElementById("characterGrid");
const modal = document.getElementById("animeModal");

let animeList = [];

// Fetch Top Anime
fetch("https://api.jikan.moe/v4/top/anime?limit=3")
  .then(res => res.json())
  .then(data => {
    animeList = data.data;

    animeGrid.innerHTML = animeList.map((anime, index) => `
      <div 
        class="anime-card cursor-pointer flex gap-6 bg-yellow-500/35 dark:bg-gray-800 
               rounded-xl p-4
               transition-all duration-300
               hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)]
               hover:-translate-y-1"
        data-index="${index}">

        <!-- LEFT IMAGE -->
        <div class="w-32 shrink-0">
          <div class="aspect-[2/3] overflow-hidden rounded-lg">
            <img src="${anime.images.jpg.image_url}"
                 class="w-full h-full object-cover">
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div>
          <span class="inline-block mb-2 border px-3 py-1 text-xs">
            Rank #${anime.rank}
          </span>

          <h3 class="text-2xl font-bold mb-1">${anime.title}</h3>

          <p class="text-sm mb-2">
            ⭐ Rating: ${anime.score ?? "N/A"}
          </p>

          <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            ${anime.synopsis ?? "No description available."}
          </p>
        </div>
      </div>
    `).join("");

    attachAnimeClickHandlers();
  })
  .catch(err => {
    console.error("Anime API error:", err);
    animeGrid.innerHTML = "<p>Failed to load anime.</p>";
  });


function attachAnimeClickHandlers() {
  document.querySelectorAll(".anime-card").forEach(card => {
    card.addEventListener("click", () => {
      const index = card.dataset.index;
      openAnimeModal(animeList[index]);
    });
  });
}


/* ================= ANIME MODAL (POPUP WINDOW) ================= */
function openAnimeModal(anime) {
  modal.classList.remove("hidden");

  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">

      <!-- CLOSE BUTTON -->
      <button class="absolute top-4 right-4 text-3xl"
        onclick="document.getElementById('animeModal').classList.add('hidden')">
        ✕
      </button>

      <div class="flex flex-col md:flex-row gap-8 p-8">

        <!-- LEFT POSTER -->
        <div class="w-full md:w-1/3">
          <img src="${anime.images.jpg.large_image_url || anime.images.jpg.image_url}"
               class="w-full rounded-lg object-cover">
        </div>

        <!-- RIGHT DETAILS -->
        <div class="flex-1">
          <h1 class="text-4xl font-extrabold mb-1">
            ${anime.title}
          </h1>

          <p class="text-indigo-600 mb-4">
            ${anime.title_japanese ?? ""}
          </p>

          <!-- GENRES -->
          <div class="flex flex-wrap gap-2 mb-6">
            ${anime.genres.map(g => `
              <span class="border px-4 py-1 text-sm">${g.name}</span>
            `).join("")}
          </div>

          <!-- META INFO -->
          <div class="flex gap-10 border-t border-b py-4 mb-6 text-sm">
            <div>
              <p class="font-semibold">Episodes</p>
              <p>${anime.episodes ?? "N/A"}</p>
            </div>
            <div>
              <p class="font-semibold">Status</p>
              <p>${anime.status ?? "N/A"}</p>
            </div>
            <div>
              <p class="font-semibold">Rating</p>
              <p>${anime.rating ?? "N/A"}</p>
            </div>
          </div>

          <!-- SYNOPSIS -->
          <h3 class="text-xl font-bold mb-2">Synopsis</h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            ${anime.synopsis ?? "No synopsis available."}
          </p>
        </div>
      </div>
    </div>
  `;
}

// Close modal on background click
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});


/* ================= CHARACTER SECTION (UNCHANGED CSS) ================= */
setTimeout(() => {
  fetch("https://api.jikan.moe/v4/top/characters?limit=9")
    .then(res => res.json())
    .then(data => {
      characterGrid.innerHTML = "";
      data.data.forEach(character => {
        characterGrid.innerHTML += `
          <div class="bg-yellow-500/35 dark:bg-gray-800 h-full w-full max-w-[16rem] mx-auto border-2
                      border-orange-300 rounded-xl p-4
                      transition-all duration-300
                      hover:shadow-2xl hover:-translate-y-1">

            <div class="aspect-[2/3] overflow-hidden rounded-lg mb-4">
              <img src="${character.images.jpg.image_url}"
                   class="w-full h-full object-cover">
            </div>

            <h4 class="text-xl font-semibold">${character.name}</h4>

            <p class="text-sm text-gray-600 dark:text-gray-400">
              ❤️ Favorites: ${character.favorites.toLocaleString()}
            </p>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Character API error:", err);
      characterGrid.innerHTML = "<p>Characters temporarily unavailable.</p>";
    });
}, 1200);
