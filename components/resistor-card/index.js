export class ResistorCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="col">
        <div class="card h-100 shadow-sm service-card">
          <div class="card-body d-flex flex-column">
            <div class="small text-uppercase text-secondary mb-2">Resistor Model</div>
            <h5 class="card-title">${data.model}</h5>
            <p class="card-text mb-1">R: ${data.resistance} Ом</p>
            <p class="card-text mb-2">P: ${data.power}</p>
            <span class="badge text-bg-warning mb-3">Допуск ${data.tolerance}</span>
            <button id="open-request-${data.id}" data-id="${data.id}" class="btn btn-outline-light mt-auto">Открыть заявку</button>
          </div>
        </div>
      </div>
    `;
  }

  addListeners(data, listener) {
    document
      .getElementById(`open-request-${data.id}`)
      .addEventListener("click", listener);
  }

  render(data, listener) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data, listener);
  }
}
