const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;

toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark");

  toggleBtn.textContent = html.classList.contains("dark")
    ? "☀️"
    : "🌙";
});
