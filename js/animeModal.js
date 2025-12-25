const animeModal = document.getElementById("animeModal");

function openAnimeModal(anime) {
  if (!animeModal) return;

  animeModal.classList.remove("hidden");

  animeModal.innerHTML = `
    <div class="flex flex-col bg-white dark:bg-gray-900
                max-w-5xl w-[95%]
                max-h-[90vh] overflow-y-auto
                relative
                animate-[fadeIn_0.3s_ease-out]
                shadow-2xl">

      <!-- HEADER -->
      <div class="flex justify-between items-center h-14 bg-gray-700 text-white">
        <span class="font-semibold text-lg ml-4">Anime Details</span>
        <button id="closeModalBtn"
                class="h-14 w-14 bg-orange-700 text-2xl hover:bg-orange-800">
          ✕
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-8 p-6">

        <div class="w-full md:w-1/3">
          <img src="${anime.images.jpg.large_image_url || anime.images.jpg.image_url}"
               class="w-full hover:scale-105 transition">
        </div>

        <div class="flex-1">
          <h1 class="text-4xl font-extrabold mb-1">${anime.title}</h1>
          <p class="text-indigo-500 mb-4">${anime.title_japanese ?? ""}</p>

          <div class="flex flex-wrap gap-2 mb-6">
            ${anime.genres.map(g => `
              <span class="px-4 py-1 text-sm bg-gray-200 dark:bg-gray-700">
                ${g.name}
              </span>
            `).join("")}
          </div>

          <div class="grid grid-cols-3 gap-4 border-y py-4 mb-6 text-sm">
            <div><p class="font-semibold">Episodes</p>${anime.episodes ?? "N/A"}</div>
            <div><p class="font-semibold">Status</p>${anime.status ?? "N/A"}</div>
            <div><p class="font-semibold">Rating</p>${anime.rating ?? "N/A"}</div>
          </div>

          <h3 class="text-xl font-bold mb-2">Synopsis</h3>
          <p class="text-gray-700 dark:text-gray-300">
            ${anime.synopsis ?? "No synopsis available."}
          </p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("closeModalBtn")
    ?.addEventListener("click", () => {
      animeModal.classList.add("hidden");
    });
}
