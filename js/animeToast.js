/* ================= ANIME TOAST ================= */

/**
 * showCardToast(message, options?)
 *
 * options = {
 *   actionText: "See your watchlist",
 *   onAction: () => {}
 * }
 */

window.showCardToast = function (message, options = {}) {
  let toast = document.getElementById("cardToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cardToast";
    toast.className = `
      fixed bottom-8 left-1/2 -translate-x-1/2 z-50
      bg-black text-white
      px-6 py-3
      flex items-center gap-4
      opacity-0 transition
    `;
    document.body.appendChild(toast);
  }

  // build content
  toast.innerHTML = `
    <span class="text-sm">${message}</span>
    ${
      options.actionText
        ? `<button
            id="toastActionBtn"
            class="text-orange-400 hover:underline text-sm">
            ${options.actionText}
          </button>`
        : ""
    }
  `;

  // action button
  if (options.actionText && typeof options.onAction === "function") {
    document
      .getElementById("toastActionBtn")
      .addEventListener("click", () => {
        options.onAction();
        hideToast();
      });
  }

  // show
  toast.style.opacity = "1";

  // auto hide
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(hideToast, 2500);

  function hideToast() {
    toast.style.opacity = "0";
  }
};
