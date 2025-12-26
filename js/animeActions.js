/* ================= ANIME ACTIONS (WATCHLIST) ================= */

/*
  Watchlist storage key
*/
const WATCHLIST_KEY = "anime_watchlist";

/*
  Get watchlist from localStorage
*/
function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

/*
  Save watchlist to localStorage
*/
function saveWatchlist(list) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

/*
  Add anime to watchlist
*/
window.addToWatchlist = function (anime) {
  if (!anime || !anime.mal_id) return;

  const watchlist = getWatchlist();

  const exists = watchlist.some(item => item.mal_id === anime.mal_id);
  if (exists) {
    if (window.showCardToast) {
      showCardToast("Already in watchlist");
    }
    return;
  }

  watchlist.push({
    mal_id: anime.mal_id,
    title: anime.title,
    image: anime.images?.jpg?.image_url || "",
    score: anime.score
  });

  saveWatchlist(watchlist);

  if (window.showCardToast) {
    showCardToast("Added to watchlist");
  }
};

/*
  Remove anime from watchlist
*/
window.removeFromWatchlist = function (mal_id) {
  const watchlist = getWatchlist().filter(
    anime => anime.mal_id !== mal_id
  );

  saveWatchlist(watchlist);

  if (window.showCardToast) {
    showCardToast("Removed from watchlist");
  }
};

/*
  Get watchlist (for Watchlist page later)
*/
window.getWatchlist = getWatchlist;
