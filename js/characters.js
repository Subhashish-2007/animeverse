/* ================= CHARACTER SECTION (UNCHANGED CSS) ================= */
document.addEventListener("DOMContentLoaded", () => {

  const characterTrack = document.getElementById("characterTrack");

  if (!characterTrack) {
    console.error("characterTrack not found in DOM");
    return;
  }

  setTimeout(() => {
    fetch("https://api.jikan.moe/v4/top/characters?limit=5")
      .then(res => res.json())
      .then(data => {
        characterTrack.innerHTML = "";

        const characters = data.data.slice(0, 5);

        // duplicate for infinite loop
        [...characters, ...characters].forEach((character, index) => {
          const rank = (index % 5) + 1; // 1–5 repeating

          characterTrack.innerHTML += `
            <div class="relative bg-gray-500 dark:bg-gray-800
                        min-w-[16rem] max-w-[16rem]
                        border-4 border-orange-700
                         p-4
                        transition-all duration-300
                        hover:scale-105">

              <!-- RANK BADGE -->
              <span class="absolute top-2 left-2
                           bg-red-600 text-white
                           text-sm font-bold
                           px-3 py-1 ">
                #${rank}
              </span>

              <div class="aspect-[2/3] overflow-hidden  mb-4">
                <img src="${character.images.jpg.image_url}"
                     class="w-full h-full object-cover">
              </div>

              <h4 class="text-xl font-semibold">${character.name}</h4>

              <p class="text-[16px] text-black dark:text-gray-400">
                ❤️ Favorites: ${character.favorites.toLocaleString()}
              </p>
            </div>
          `;
        });
      })
      .catch(err => {
        console.error("Character API error:", err);
        characterTrack.innerHTML =
          "<p class='text-white'>Characters temporarily unavailable.</p>";
      });
  }, 1200);

});