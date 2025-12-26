/* ================= ANIME ACTIONS (WATCHLIST) ================= */

/*
  Storage key
*/
const WATCHLIST_KEY = "anime_watchlist";

/*
  Get watchlist
*/
function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

/*
  Save watchlist
*/
function saveWatchlist(list) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

/*
  Check if anime is in watchlist
*/
window.isInWatchlist = function (mal_id) {
  return getWatchlist().some(item => item.mal_id === mal_id);
};

/*
  Add to watchlist
*/
window.addToWatchlist = function (anime) {
  if (!anime || !anime.mal_id) return;

  const list = getWatchlist();
  if (list.some(item => item.mal_id === anime.mal_id)) return;

  list.push({
    mal_id: anime.mal_id,
    title: anime.title,
    image: anime.images?.jpg?.image_url || "",
    score: anime.score
  });

  saveWatchlist(list);

  // 🔔 notify app
  document.dispatchEvent(
    new CustomEvent("watchlist:changed", {
      detail: { type: "add", anime }
    })
  );
};

/*
  Remove from watchlist
*/
window.removeFromWatchlist = function (mal_id) {
  saveWatchlist(
    getWatchlist().filter(item => item.mal_id !== mal_id)
  );

  // 🔔 notify app
  document.dispatchEvent(
    new CustomEvent("watchlist:changed", {
      detail: { type: "remove", mal_id }
    })
  );
};

/*
  Expose getter
*/
window.getWatchlist = getWatchlist;
