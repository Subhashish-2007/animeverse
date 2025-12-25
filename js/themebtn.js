/* ================= THEME TOGGLE ================= */
const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;
const gridBg = document.getElementById("gridBg");

/* ---------- APPLY SAVED THEME ON LOAD ---------- */
const savedTheme = localStorage.getItem("theme") || "light";
const isDark = savedTheme === "dark";

// apply class
html.classList.toggle("dark", isDark);

// update toggle icon
if (toggleBtn) {
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
}

// ✅ APPLY BACKGROUND IMAGE ON LOAD (THIS WAS MISSING)
if (gridBg) {
  gridBg.style.backgroundImage = isDark
    ? "url('assets/grid-bg-dark.jpg')"
    : "url('assets/grid-bg-light.jpg')";
}

/* ---------- TOGGLE ON CLICK ---------- */
if (toggleBtn) {
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
}



