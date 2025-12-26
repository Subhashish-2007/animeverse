/* ================= WATCHLIST SYNC ================= */
/*
  Responsibility:
  - Sync watchlist buttons (cards + popup)
  - Show toast with action button
  - React ONLY to watchlist changes
*/

document.addEventListener("watchlist:changed", e => {
  const { type, anime, mal_id } = e.detail;

  /* ================= SYNC CARD BUTTONS ================= */

  document.querySelectorAll(".watchlist-btn").forEach(btn => {
    const id = Number(btn.dataset.malid);
    if (!id) return;

    if (isInWatchlist(id)) {
      btn.textContent = "Remove";
      btn.classList.remove("bg-orange-600");
      btn.classList.add("bg-red-600");
    } else {
      btn.textContent = "+ Watchlist";
      btn.classList.remove("bg-red-600");
      btn.classList.add("bg-orange-600");
    }
  });

  /* ================= SYNC POPUP BUTTON ================= */

  const popupBtn = document.getElementById("addWatchlistBtn");
  if (popupBtn && popupBtn.dataset.malid) {
    const id = Number(popupBtn.dataset.malid);

    if (isInWatchlist(id)) {
      popupBtn.textContent = "Remove from Watchlist";
      popupBtn.classList.remove("bg-orange-600");
      popupBtn.classList.add("bg-red-600");
    } else {
      popupBtn.textContent = "Add to Watchlist";
      popupBtn.classList.remove("bg-red-600");
      popupBtn.classList.add("bg-orange-600");
    }
  }

  /* ================= TOAST ================= */

  if (window.showCardToast) {
    showCardToast(
      type === "add"
        ? "Added to watchlist"
        : "Removed from watchlist",
      {
        actionText: "See your watchlist",
        onAction: () => {
          document.getElementById("tabWatchlist")?.click();
        }
      }
    );
  }
});
