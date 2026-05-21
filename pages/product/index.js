import { BackButtonComponent } from "../../components/back-button/index.js";
import { RequestCardComponent } from "../../components/request-card/index.js";
import { HomeworkCardComponent } from "../../components/homework-card/index.js";
import { ThreeViewerComponent } from "../../components/three-viewer/index.js";
import { MainPage } from "../main/index.js";
import { resistors } from "../../data/resistors.js";

export class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = Number(id);
  }

  getData() {
    return resistors.find((item) => item.id === this.id);
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

    const threeViewer = new ThreeViewerComponent(this.pageRoot);
    threeViewer.render(data.model3d);

    const requestCard = new RequestCardComponent(this.pageRoot);
    requestCard.render(data);

    const homeworkCard = new HomeworkCardComponent(this.pageRoot);
    homeworkCard.render(data);
  }
}
