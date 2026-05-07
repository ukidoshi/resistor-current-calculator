import { BackButtonComponent } from "../../components/back-button/index.js";
import { RequestCardComponent } from "../../components/request-card/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = Number(id);
  }

  getData() {
    const list = [
      {
        id: 1,
        model: "Yageo CFR-25JR-52-220R",
        connection: "последовательно",
        requestResistors: [220, 330, 470]
      },
      {
        id: 2,
        model: "Vishay MRS25 10K",
        connection: "параллельно",
        requestResistors: [10000, 10000, 4700]
      },
      {
        id: 3,
        model: "KOA Speer MF1/4DCT52R1000F",
        connection: "последовательно",
        requestResistors: [1000, 2200, 3300]
      },
      {
        id: 4,
        model: "Bourns CR0805-FX-1K0ELF",
        connection: "параллельно",
        requestResistors: [1000, 1000, 1000]
      }
    ];

    return list.find((item) => item.id === this.id);
  }

  getHTML() {
    return `
      <div class="container py-4 calc-layout">
        <div class="calc-head mb-4">
          <h1 class="mb-2">Заявка по электротехнике</h1>
          <p class="mb-0">Расчет силы тока для списка резисторов.</p>
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

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));

    const data = this.getData();
    const requestCard = new RequestCardComponent(this.pageRoot);
    requestCard.render(data);
  }
}
