window.showCardToast = function (message) {
  let toast = document.getElementById("cardToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cardToast";
    toast.className =
      "fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 opacity-0 transition z-50";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  setTimeout(() => (toast.style.opacity = "0"), 2000);
};
