import { ResistorCardComponent } from "../../components/resistor-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return [
      {
        id: 1,
        model: "Yageo CFR-25JR-52-220R",
        resistance: 220,
        power: "0.25W",
        tolerance: "5%"
      },
      {
        id: 2,
        model: "Vishay MRS25 10K",
        resistance: 10000,
        power: "0.6W",
        tolerance: "1%"
      },
      {
        id: 3,
        model: "KOA Speer MF1/4DCT52R1000F",
        resistance: 1000,
        power: "0.25W",
        tolerance: "1%"
      },
      {
        id: 4,
        model: "Bourns CR0805-FX-1K0ELF",
        resistance: 1000,
        power: "0.125W",
        tolerance: "1%"
      }
    ];
  }

  getHTML() {
    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">Расчет по закону Ома</h1>
          <p class="mb-0">Услуги: реальные модели резисторов для учебных задач.</p>
        </div>
        <div class="calc-note mb-4">
          Нажми на модель, дальше откроется простая форма заявки для расчета силы тока.
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
