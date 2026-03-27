import { render } from "./router.js";

// 링크 클릭 가로채기
document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches("[data-link]")) {
    e.preventDefault();

    const url = target.getAttribute("href");

    history.pushState(null, "", url);
    render(url);
  }
});

// 뒤로가기 / 앞으로가기 처리
window.addEventListener("popstate", () => {
  render(location.pathname);
});

// 최초 렌더링 (중요)
render(location.pathname);