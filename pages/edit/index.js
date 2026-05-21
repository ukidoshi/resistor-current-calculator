import { get, post, patch } from "../../modules/fetch.js";
import { resistorUrls } from "../../modules/resistorUrls.js";
import { HomeButtonComponent } from "../../components/home-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductPage } from "../product/index.js";

export class EditResistorPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id ? Number(id) : null;
  }

  getHTML() {
    const title = this.id ? "Редактирование резистора" : "Добавление резистора";
    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">${title}</h1>
          <p class="mb-0">Заполните поля и нажмите «Сохранить».</p>
        </div>
        <div id="edit-page"></div>
      </div>
    `;
  }

  get pageRoot() {
    return document.getElementById("edit-page");
  }

  getFormHTML(data) {
    const src = data ? data.src : "";
    const model = data ? data.model : "";
    const resistance = data ? data.resistance : "";
    const power = data ? data.power : "";
    const tolerance = data ? data.tolerance : "";
    const text = data ? data.text : "";

    return `
      <div class="card shadow-sm request-card">
        <div class="card-body">
          <label class="form-label">Картинка (URL)</label>
          <input id="field-src" class="form-control calc-input mb-2" value="${src}">

          <label class="form-label">Модель</label>
          <input id="field-model" class="form-control calc-input mb-2" value="${model}">

          <label class="form-label">Сопротивление (Ом)</label>
          <input id="field-resistance" type="number" class="form-control calc-input mb-2" value="${resistance}">

          <label class="form-label">Мощность</label>
          <input id="field-power" class="form-control calc-input mb-2" value="${power}">

          <label class="form-label">Допуск</label>
          <input id="field-tolerance" class="form-control calc-input mb-2" value="${tolerance}">

          <label class="form-label">Описание услуги</label>
          <textarea id="field-text" class="form-control calc-input mb-3" rows="3">${text}</textarea>

          <button id="save-resistor-btn" type="button" class="btn btn-warning me-2">Сохранить</button>
          <button id="back-from-edit" type="button" class="btn btn-secondary">Назад</button>
        </div>
      </div>
    `;
  }

  getFormData() {
    return {
      src: document.getElementById("field-src").value.trim(),
      model: document.getElementById("field-model").value.trim(),
      resistance: Number(document.getElementById("field-resistance").value),
      power: document.getElementById("field-power").value.trim(),
      tolerance: document.getElementById("field-tolerance").value.trim(),
      text: document.getElementById("field-text").value.trim()
    };
  }

  renderForm(data) {
    this.pageRoot.insertAdjacentHTML("beforeend", this.getFormHTML(data));

    const self = this;

    document.getElementById("save-resistor-btn").addEventListener("click", function () {
      self.clickSave();
    });

    document.getElementById("back-from-edit").addEventListener("click", function () {
      if (self.id) {
        const page = new ProductPage(self.parent, self.id);
        page.render();
        return;
      }
      const mainPage = new MainPage(self.parent);
      mainPage.render();
    });
  }

  async clickSave() {
    const body = this.getFormData();

    try {
      if (this.id) {
        const result = await patch(resistorUrls.updateResistorById(this.id), body);
        if (result.status === 200) {
          const page = new ProductPage(this.parent, this.id);
          page.render();
        } else {
          alert("Не удалось сохранить");
        }
        return;
      }

      const result = await post(resistorUrls.createResistor(), body);
      if (result.status === 201 && result.data && result.data.id) {
        const page = new ProductPage(this.parent, result.data.id);
        page.render();
      } else if (result.status === 201) {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
      } else {
        alert("Не удалось сохранить");
      }
    } catch (e) {
      console.error(e);
      alert("Не удалось сохранить");
    }
  }

  async loadData() {
    if (!this.id) {
      this.renderForm(null);
      return;
    }

    try {
      const result = await get(resistorUrls.getResistorById(this.id));
      if (result.status === 200) {
        this.renderForm(result.data);
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

    this.loadData();
  }
}
