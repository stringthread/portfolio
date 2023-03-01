import "../sass/index.scss";
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const titleDOM = document.getElementById("title");
    if (titleDOM) titleDOM.innerText = "Modified title";
  });
});
