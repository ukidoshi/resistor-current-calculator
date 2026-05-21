export class ResistorCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="col">
        <div class="card h-100 shadow-sm service-card">
          <div class="resistor-preview">${data.resistance} Ом</div>
          <div class="card-body d-flex flex-column">
            <div class="small text-uppercase text-secondary mb-2">Модель резистора</div>
            <h5 class="card-title">${data.model}</h5>
            <p class="card-text mb-1">R: ${data.resistance} Ом</p>
            <p class="card-text mb-2">P: ${data.power}</p>
            <span class="badge text-bg-warning mb-3">Допуск ${data.tolerance}</span>
            <button
              type="button"
              id="open-detail-${data.id}"
              data-id="${data.id}"
              class="btn btn-outline-light mt-auto"
            >Подробнее</button>
          </div>
        </div>
      </div>
    `;
  }

  addListeners(data, onDetail) {
    document.getElementById(`open-detail-${data.id}`).addEventListener("click", onDetail);
  }

  render(data, onDetail) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
    this.addListeners(data, onDetail);
  }
}
