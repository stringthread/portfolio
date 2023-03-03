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
  const page = document.getElementById("page4");
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
        if (
          clientRect.top > 0 &&
          clientRect.top < sectionLeft.clientHeight / 2
        ) {
          const syncElement =
            sectionRightItemsMap.get(k) ?? sectionRightItemsMap.get("empty");
          syncElement?.scrollIntoView();
        }
      }
    },
    false
  );
  page?.addEventListener(
    "scroll",
    () => {
      for (const [k, e] of sectionLeftItems) {
        const clientRect = e.getBoundingClientRect();
        if (clientRect.top > 0 && clientRect.top < page?.clientHeight / 2) {
          const syncElement =
            sectionRightItemsMap.get(k) ?? sectionRightItemsMap.get("empty");
          syncElement?.scrollIntoView();
          break;
        }
      }
    },
    false
  );
};

const setOpenWorkImage = () => {
  if (document.body.clientWidth > 960) return;
  const right = document.getElementById("section-works-right");
  const tab = right?.querySelector("h2");
  const overlay = document.getElementById("modal-overlay");
  if (!right || !tab || !overlay) {
    console.error("要素が見つかりませんでした : setOpenWorkImage");
    return;
  }
  const close = () => {
    right.classList.remove("open");
    overlay.classList.remove("open");
  };
  const open = (e: MouseEvent) => {
    if (
      (e.target instanceof Node && tab.contains(e.target)) || // tab子孫クリック
      right.classList.contains("open") // すでにopen
    ) {
      return;
    }
    right.classList.add("open");
    overlay.classList.add("open");
  };
  right.addEventListener("click", open, false);
  tab.addEventListener("click", close, false);
  overlay.addEventListener("click", close, false);
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
  setOpenWorkImage();
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
});
