import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { User } from "./pages/User.js";

// 선언적 라우팅 구조
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/user/:id", component: User },
];

// 경로 매칭 함수
function matchRoute(pathname) {
  for (const route of routes) {
    const paramNames = [];
    
    const regexPath = route.path.replace(/:([^/]+)/g, (_, key) => {
      paramNames.push(key);
      return "([^/]+)";
    });

    const match = pathname.match(new RegExp(`^${regexPath}$`));
    
    if (match) {
      const params = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });

      return { component: route.component, params };
    }
  }

  return null;
}

// 렌더 함수
export function render(pathname) {
  const app = document.getElementById("app");

  const route = matchRoute(pathname);

  if (!route) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  app.innerHTML = route.component(route.params || {});
}