import { render } from "./router.js";

// 🔥 링크 클릭 → 기본 동작 막기 + pushState
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault(); // 👉 전체 리로드 방지

    const url = e.target.getAttribute("href");

    history.pushState(null, "", url); // 👉 URL만 변경
    render(url); // 👉 화면 변경
  }
});

// 🔥 뒤로가기 / 앞으로가기
window.addEventListener("popstate", () => {
  render(location.pathname);
});

// 🔥 최초 실행
render(location.pathname);