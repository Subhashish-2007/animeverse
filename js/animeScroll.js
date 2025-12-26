/* ===== Vertical Scroll → Horizontal Scroll (ONLY IF SCROLLABLE) ===== */
document.addEventListener(
  "wheel",
  e => {
    const row = e.target.closest(".horizontal-scroll");
    if (!row) return;

    if (row.scrollWidth <= row.clientWidth) return;

    e.preventDefault();
    row.scrollLeft += e.deltaY;
  },
  { passive: false }
);
