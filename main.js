import { MainPage } from "./pages/main/index.js";

const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();

const headerHomeBtn = document.getElementById("header-home-btn");
if (headerHomeBtn) {
  headerHomeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    mainPage.render();
  });
}
