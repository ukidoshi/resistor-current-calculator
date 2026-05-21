import { BackButtonComponent } from "../../components/back-button/index.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { MainPage } from "../main/index.js";
import { EditResistorPage } from "../edit/index.js";
import { get, del } from "../../modules/fetch.js";
import { resistorUrls } from "../../modules/resistorUrls.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = Number(id);
  }

  getHTML() {
    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">Карточка резистора</h1>
          <p class="mb-0">Подробная информация о модели.</p>
        </div>
        <div id="product-page"></div>
      </div>
    `;
  }

  get pageRoot() {
    return document.getElementById("product-page");
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  async clickDelete() {
    try {
      const result = await del(resistorUrls.deleteResistorById(this.id));
      if (result.status === 204 || result.status === 200) {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
      } else {
        alert("Не удалось удалить");
      }
    } catch (e) {
      console.error(e);
      alert("Не удалось удалить");
    }
  }

  clickEdit() {
    const editPage = new EditResistorPage(this.parent, this.id);
    editPage.render();
  }

  renderInfo(data) {
    const infoHtml = `
      <div class="card shadow-sm request-card mb-3">
        <div class="card-body">
          <div class="resistor-preview mb-3">${data.resistance} Ом</div>
          <p class="mb-1"><b>Модель:</b> ${data.model}</p>
          <p class="mb-1"><b>R:</b> ${data.resistance} Ом</p>
          <p class="mb-1"><b>P:</b> ${data.power}</p>
          <p class="mb-2"><b>Допуск:</b> ${data.tolerance}</p>
          <p class="mb-3">${data.text}</p>
          <button id="edit-resistor-btn" type="button" class="btn btn-warning me-2">Редактировать</button>
          <button id="delete-resistor-btn" type="button" class="btn btn-outline-danger">Удалить</button>
        </div>
      </div>
    `;

    this.pageRoot.insertAdjacentHTML("beforeend", infoHtml);

    const self = this;
    document.getElementById("edit-resistor-btn").addEventListener("click", function () {
      self.clickEdit();
    });
    document.getElementById("delete-resistor-btn").addEventListener("click", function () {
      self.clickDelete();
    });
  }

  async getData() {
    try {
      const result = await get(resistorUrls.getResistorById(this.id));
      if (result.status === 200) {
        this.renderInfo(result.data);
      } else {
        this.pageRoot.innerHTML = "<p>Резистор не найден</p>";
      }
    } catch (e) {
      console.error(e);
      this.pageRoot.innerHTML = "<p>Резистор не найден</p>";
    }
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const homeButton = new HomeButtonComponent(this.pageRoot, this.parent);
    homeButton.render();

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));

    this.getData();
  }
}
