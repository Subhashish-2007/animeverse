const heroBg = document.getElementById("heroBg");

/* LOAD ALL IMAGES */
const allImages = [];
for (let i = 1; i <= 25; i++) {
  allImages.push(`assets/anime/anime-${i}.jpg`);
}

/* SPLIT IMAGES INTO 3 UNIQUE GROUPS */
const rowGroups = [
  allImages.slice(0, 9),   // Row 1
  allImages.slice(9, 17),  // Row 2
  allImages.slice(17)      // Row 3
];

/* Reset container */
heroBg.innerHTML = "";
heroBg.className = "absolute inset-0 z-0 flex flex-col";

/* CREATE 3 ROWS */
rowGroups.forEach((group, index) => {
  const rowDiv = document.createElement("div");

  rowDiv.className = `
    relative w-full overflow-hidden
    h-[33.333vh]
    ${index === 0 ? "pt-16" : ""}
  `;

  const track = document.createElement("div");
  track.className = `
    absolute inset-0
    flex w-max
    animate-scroll
  `;

  /* Duplicate only within the same row */
  [...group, ...group].forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.className = `
      h-full w-auto
      object-cover
      shrink-0
      border-2
      border-orange-700
      dark:border-gray-700
    `;
    track.appendChild(img);
  });

  rowDiv.appendChild(track);
  heroBg.appendChild(rowDiv);
});

