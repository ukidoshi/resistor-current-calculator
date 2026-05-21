import { CatalogCalculatorComponent } from "../../components/catalog-calculator/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { MainPage } from "../main/index.js";
import { get } from "../../modules/fetch.js";
import { resistorUrls } from "../../modules/resistorUrls.js";

export class CalculatorPage {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">Калькулятор тока</h1>
        </div>
        <div id="calculator-page"></div>
      </div>
    `;
  }

  get pageRoot() {
    return document.getElementById("calculator-page");
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const homeButton = new HomeButtonComponent(this.pageRoot, this.parent);
    homeButton.render();

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(function () {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    }.bind(this));

    this.loadCatalog();
  }

  async loadCatalog() {
    try {
      const result = await get(resistorUrls.getResistors());
      if (result.status === 200 && Array.isArray(result.data)) {
        const calc = new CatalogCalculatorComponent(this.pageRoot);
        calc.render(result.data);
      } else {
        this.pageRoot.innerHTML = "<p>Не удалось загрузить каталог</p>";
      }
    } catch (e) {
      console.error(e);
      this.pageRoot.innerHTML = "<p>Не удалось загрузить каталог</p>";
    }
  }
}
