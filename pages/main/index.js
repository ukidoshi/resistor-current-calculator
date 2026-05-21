import { ResistorCardComponent } from "../../components/resistor-card/index.js";
import { ProductPage } from "../product/index.js";
import { EditResistorPage } from "../edit/index.js";
import { CalculatorPage } from "../calculator/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { get } from "../../modules/fetch.js";
import { resistorUrls } from "../../modules/resistorUrls.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">Расчет по закону Ома</h1>
          <p class="mb-0">Каталог моделей резисторов (данные с API).</p>
        </div>

        <div class="calc-note mb-3 d-flex flex-wrap gap-2 align-items-end">
          <div class="flex-grow-1">
            <label class="form-label mb-1">Фильтр по модели</label>
            <input id="filter-model" class="form-control calc-input" placeholder="Например: Yageo">
          </div>
          <button id="filter-btn" type="button" class="btn btn-warning">Найти</button>
          <button id="open-calc-btn" type="button" class="btn btn-outline-light">Калькулятор</button>
          <button id="add-resistor-btn" type="button" class="btn btn-outline-light">Добавить</button>
        </div>

        <div id="main-page" class="row row-cols-1 row-cols-md-2 g-3"></div>
      </div>
    `;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  clickDetail(e) {
    const cardId = e.currentTarget.dataset.id;
    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
  }

  renderData(items) {
    this.pageRoot.innerHTML = "";

    if (!items || items.length === 0) {
      this.pageRoot.innerHTML = '<p class="text-muted">Ничего не найдено</p>';
      return;
    }

    const self = this;
    items.forEach(function (item) {
      const card = new ResistorCardComponent(self.pageRoot);
      card.render(item, self.clickDetail.bind(self));
    });
  }

  async getData() {
    const modelInput = document.getElementById("filter-model");
    const model = modelInput ? modelInput.value.trim() : "";

    let url = resistorUrls.getResistors();
    if (model) {
      url = url + "?model=" + encodeURIComponent(model);
    }

    try {
      const result = await get(url);
      if (result.status === 200 && Array.isArray(result.data)) {
        this.renderData(result.data);
      } else {
        this.pageRoot.innerHTML = "<p>Ошибка загрузки данных</p>";
      }
    } catch (e) {
      console.error(e);
      this.pageRoot.innerHTML = "<p>Ошибка загрузки данных</p>";
    }
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const layout = document.querySelector(".calc-layout");
    const homeButton = new HomeButtonComponent(layout, this.parent);
    homeButton.render();

    const self = this;

    document.getElementById("filter-btn").addEventListener("click", function () {
      self.getData();
    });

    document.getElementById("add-resistor-btn").addEventListener("click", function () {
      const editPage = new EditResistorPage(self.parent, null);
      editPage.render();
    });

    document.getElementById("open-calc-btn").addEventListener("click", function () {
      const calcPage = new CalculatorPage(self.parent);
      calcPage.render();
    });

    this.getData();
  }
}
