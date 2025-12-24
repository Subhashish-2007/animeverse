/* ================= THEME TOGGLE ================= */
const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;
const gridBg = document.getElementById("gridBg");

toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark");

  // change icon
  toggleBtn.textContent = html.classList.contains("dark") ? "☀️" : "🌙";

  // change grid background image
  gridBg.style.backgroundImage = html.classList.contains("dark")
    ? "url('assets/grid-bg-dark.jpg')"
    : "url('assets/grid-bg-light.jpg')";
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
        class="anime-card cursor-pointer mx-10 flex gap-6 bg-yellow-500/35 dark:bg-gray-800 
               rounded-xl p-4
               transition-all duration-300
               hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)]
               hover:-translate-y-1"
        data-index="${index}">

        <!-- LEFT IMAGE -->
        <div class="w-32 shrink-0">
          <div class="aspect-2/3 overflow-hidden rounded-lg">
            <img src="${anime.images.jpg.image_url}"
                 class="w-full h-full object-cover">
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class= "flex flex-col">
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
            <div class="relative bg-yellow-500/35 dark:bg-gray-800
                        min-w-[16rem] max-w-[16rem]
                        border-2 border-orange-300
                        rounded-xl p-4
                        transition-all duration-300
                        hover:scale-105">

              <!-- RANK BADGE -->
              <span class="absolute top-2 left-2
                           bg-red-600 text-white
                           text-sm font-bold
                           px-3 py-1 rounded-full">
                #${rank}
              </span>

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
        characterTrack.innerHTML =
          "<p class='text-white'>Characters temporarily unavailable.</p>";
      });
  }, 1200);

});


const images = [
  "assets/bg1.jpg",
  "assets/bg2.jpg",
  "assets/bg3.png"
];

let index = 0;
let showingA = true;

const bgA = document.getElementById("bgA");
const bgB = document.getElementById("bgB");

bgA.style.backgroundImage = `url(${images[0]})`;

setInterval(() => {
  const next = images[(index + 1) % images.length];

  if (showingA) {
    bgB.style.backgroundImage = `url(${next})`;
    bgB.classList.remove("opacity-0");
    bgA.classList.add("opacity-0");
  } else {
    bgA.style.backgroundImage = `url(${next})`;
    bgA.classList.remove("opacity-0");
    bgB.classList.add("opacity-0");
  }

  showingA = !showingA;
  index++;
}, 6000);


document.getElementById("heroExploreBtn").addEventListener("click", () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth"
  });
});


/* ================= MOBILE MENU TOGGLE ================= */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
