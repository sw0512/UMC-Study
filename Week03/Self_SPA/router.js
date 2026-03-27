import { Home } from "./pages/Home.js";
import { About } from "./pages/About.js";
import { Contact } from "./pages/Contact.js";

const routes = {
  "/": Home,
  "/about": About,
  "/contact": Contact,
};

export function render(path) {
  const app = document.getElementById("app");

  if (!app) {
    console.error("app element not found");
    return;
  }

  const page = routes[path] || (() => "<h1>404 Not Found</h1>");

  app.innerHTML = page();
}