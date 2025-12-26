/* ================= THEME TOGGLE ================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const html = document.documentElement;
  const gridBg = document.getElementById("gridBg");

  if (!toggleBtn) return;

  /* ---------- APPLY SAVED THEME ON LOAD ---------- */
  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";

  // apply theme
  html.classList.toggle("dark", isDark);

  // update icon
  toggleBtn.textContent = isDark ? "☀️" : "🌙";

  // apply background ONLY if gridBg exists (index page)
  if (gridBg) {
    gridBg.style.backgroundImage = isDark
      ? "url('assets/grid-bg-dark.jpg')"
      : "url('assets/grid-bg-light.jpg')";
  }

  /* ---------- TOGGLE ON CLICK ---------- */
  toggleBtn.addEventListener("click", () => {
    const nowDark = html.classList.toggle("dark");

    localStorage.setItem("theme", nowDark ? "dark" : "light");
    toggleBtn.textContent = nowDark ? "☀️" : "🌙";

    if (gridBg) {
      gridBg.style.backgroundImage = nowDark
        ? "url('assets/grid-bg-dark.jpg')"
        : "url('assets/grid-bg-light.jpg')";
    }
  });
});
