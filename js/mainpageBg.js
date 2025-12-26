const heroBg = document.getElementById("heroBg");

/* LOAD ALL IMAGES */
const allImages = [];
for (let i = 1; i <= 25; i++) {
  allImages.push(`assets/anime/anime-${i}.jpg`);
}

/* SPLIT IMAGES INTO 3 UNIQUE GROUPS */
const rowGroups = [
  allImages.slice(0, 9),
  allImages.slice(9, 17),
  allImages.slice(17)
];

/* Reset container */
heroBg.innerHTML = "";
heroBg.className = "absolute inset-0 z-0 flex flex-col";

/* GLOBAL SPEED (pixels per second) */
const SPEED = 30;

/* CREATE 3 ROWS */
rowGroups.forEach((group, index) => {
  const rowDiv = document.createElement("div");
  rowDiv.className = `
    relative w-full overflow-hidden
    h-[33.333vh]
    ${index === 0 ? "pt-16" : ""}
  `;

  const track = document.createElement("div");
  track.className = "absolute inset-0 flex w-max";

  /* Duplicate images */
  const images = [...group, ...group];
  let loaded = 0;

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `
      h-full w-auto
      object-cover
      shrink-0
      border-2
      border-orange-700
      dark:border-gray-700
    `;

    img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        startScroll(track);
      }
    };

    track.appendChild(img);
  });

  rowDiv.appendChild(track);
  heroBg.appendChild(rowDiv);
});

/* ================= START SCROLL ================= */

function startScroll(track) {
  const width = track.scrollWidth / 2; // one set width
  const duration = width / SPEED;

  track.style.animation = `
    scrollRow ${duration}s linear infinite
  `;

  track.style.setProperty("--scroll-distance", `-${width}px`);
}

/* ================= KEYFRAMES ================= */

const style = document.createElement("style");
style.innerHTML = `
@keyframes scrollRow {
  from { transform: translateX(0); }
  to   { transform: translateX(var(--scroll-distance)); }
}
`;
document.head.appendChild(style);
