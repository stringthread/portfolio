import "../sass/reset.scss";
import "../sass/main.scss";
import "../sass/card.scss";
import "../sass/works.scss";
import "../sass/frames.scss";
import "../sass/swiper.scss";
import type {} from "typed-query-selector";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const setScrollSync = () => {
  const sectionLeft = document.getElementById("main-works");
  const sectionRight = document.getElementById("main-works-right");
  if (!sectionLeft || !sectionRight) {
    console.error("スクロール同期対象の要素がありません");
    return;
  }
  const sectionLeftItems = Array.from(
    sectionLeft.querySelectorAll(".wrap-card-works"),
    (e) =>
      [e.getAttribute("data-id"), e] as const satisfies readonly [
        string | null,
        HTMLElement
      ]
  ).filter((v): v is readonly [string, HTMLElement] => !!v[0]);
  const sectionRightItemsMap = new Map<string, HTMLElement>(
    Array.from(
      sectionRight.querySelectorAll(".images-card"),
      (e) =>
        [e.getAttribute("data-id"), e] as const satisfies readonly [
          string | null,
          HTMLElement
        ]
    ).filter((v): v is readonly [string, HTMLElement] => !!v[0])
  );
  sectionLeft.addEventListener(
    "scroll",
    () => {
      for (const [k, e] of sectionLeftItems) {
        const clientRect = e.getBoundingClientRect();
        if (clientRect.top > 0 && clientRect.top < sectionLeft.clientHeight) {
          const syncElement =
            sectionRightItemsMap.get(k) ?? sectionRightItemsMap.get("empty");
          syncElement?.scrollIntoView();
        }
      }
    },
    false
  );
};

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
  setScrollSync();
});
