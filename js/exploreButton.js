const downExploreBtn = document.getElementById("downExploreBtn");

if (downExploreBtn) {
  downExploreBtn.addEventListener("click", () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });
}




const exploreBtn = document.getElementById("exploreAnime");

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    window.location.href = "anime.html";
  });
}




/* ================= THEME TOGGLE ================= */
