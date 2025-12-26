document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all
      items.forEach(i => {
        i.classList.remove("open");
        const a = i.querySelector(".faq-answer");
        a.style.maxHeight = "0px";
        a.style.opacity = "0";
        i.querySelector(".faq-icon").textContent = "+";
      });

      // Open clicked
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
        icon.textContent = "×";
      }
    });
  });
});
