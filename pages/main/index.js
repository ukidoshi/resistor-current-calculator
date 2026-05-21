import { ResistorCardComponent } from "../../components/resistor-card/index.js";
import { ProductPage } from "../product/index.js";
import { resistors } from "../../data/resistors.js";
import {
  getAverageResistance,
  getSumOfSquaresOfResistance
} from "../../homework.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return resistors;
  }

  getHTML() {
    const resistors = this.getData();
    const avg = getAverageResistance(resistors).toFixed(2);
    const sumSq = getSumOfSquaresOfResistance(resistors);

    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">Расчет по закону Ома</h1>
          <p class="mb-0">Услуги: реальные модели резисторов для учебных задач.</p>
        </div>
        <div class="calc-note mb-4">
          Нажми на модель, дальше откроется простая форма заявки для расчета силы тока.
        </div>
        <div class="calc-note mb-4">
          Среднее сопротивление в каталоге: <b>${avg}</b> Ом.
          Сумма квадратов сопротивлений: <b>${sumSq}</b>.
        </div>
        <div id="main-page" class="row row-cols-1 row-cols-md-2 g-3"></div>
      </div>
    `;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;
    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const data = this.getData();
    data.forEach((item) => {
      const resistorCard = new ResistorCardComponent(this.pageRoot);
      resistorCard.render(item, this.clickCard.bind(this));
    });
  }
}
