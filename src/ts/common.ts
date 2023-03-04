import "../sass/reset.scss";
import "../sass/main.scss";
import "../sass/frames.scss";

const setOpenExplorer = () => {
  const explorer = document.getElementById("explorer");
  const toggleExplorer = document.getElementById("toggle-explorer");
  if (explorer && toggleExplorer) {
    toggleExplorer.addEventListener("click", () => {
      explorer.classList.toggle("open");
      toggleExplorer.classList.toggle("open");
    });
    const explorerItems = document.querySelectorAll(".explorer-item");
    explorerItems.forEach((e) => {
      e.addEventListener("click", () => {
        explorer.classList.remove("open");
        toggleExplorer.classList.remove("open");
      });
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  setOpenExplorer();
});
