import { MainPage } from "../../pages/main/index.js";

export class HomeButtonComponent {
  constructor(parent, appRoot) {
    this.parent = parent;
    this.appRoot = appRoot;
  }

  getHTML() {
    return `<button id="home-btn" type="button" class="btn btn-outline-light mb-3">Домой</button>`;
  }

  render() {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    const appRoot = this.appRoot;
    document.getElementById("home-btn").addEventListener("click", function () {
      const mainPage = new MainPage(appRoot);
      mainPage.render();
    });
  }
}
