/* ================= ANIME SHOWCASE ================= */
const animeGrid = document.getElementById("animeGrid");
const animeTrack = document.getElementById("animeTrack");
const modal = document.getElementById("animeModal");

let animeList = [];

// Fetch Top Anime (9 = 3 rows × 3 columns)
fetch("https://api.jikan.moe/v4/top/anime?limit=8")
  .then(res => res.json())
  .then(data => {
    animeList = data.data;

    // Mobile & Tablet (normal grid)
    animeGrid.innerHTML = animeList.map(renderAnimeCard).join("");

    // Desktop (vertical moving grid, duplicated)
    animeTrack.innerHTML = [...animeList, ...animeList]
      .map(renderAnimeCard)
      .join("");

    attachAnimeClickHandlers();
  })
  .catch(err => {
    console.error("Anime API error:", err);
    animeGrid.innerHTML = "<p>Failed to load anime.</p>";
  });

function renderAnimeCard(anime, index) {
  return `
    <div
  class="anime-card relative bg-gray-500 dark:bg-gray-800
         min-w-[16rem] max-w-[16rem]
         h-[26rem]
         border-4 border-orange-600
         p-4
         transition-all duration-300
         hover:scale-105 cursor-pointer mb-[16px]
         flex flex-col"

      data-index="${index}">
<span class="absolute top-0 left-0 mb-1 w-fit
                     bg-orange-600 border-4 border-orange-300
                     px-4 py-[2px] text-[20px] ">
           #${anime.rank}
        </span>
      <!-- IMAGE -->
      <div class="aspect-[3/4] overflow-hidden">
        <img src="${anime.images.jpg.image_url}"
             class="w-full h-full object-cover transition-transform duration-500">
      </div>

      <!-- CONTENT -->
      <div class="flex flex-col text-left">
        

        <h3 class="text-[18px] font-semibold leading-snug line-clamp-2">
          ${anime.title}
        </h3>

        <p class="text-[13px] opacity-80">
          ⭐ ${anime.score ?? "N/A"}
        </p>
      </div>
    </div>
  `;
}




function attachAnimeClickHandlers() {
  document.querySelectorAll(".anime-card").forEach(card => {
    card.addEventListener("click", () => {
      const index = card.dataset.index;
      openAnimeModal(animeList[index]);
    });
  });
}

