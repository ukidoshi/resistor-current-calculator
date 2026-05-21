export class RequestCardComponent {
  constructor(parent) {
    this.parent = parent;
    this.resistors = [];
    this.connection = "последовательно";
    this.voltage = 12;
  }

  getHTML(data) {
    const modelText = data.model ? `<p class="mb-2"><b>Модель:</b> ${data.model}</p>` : "";

    return `
      <div class="card shadow-sm request-card">
        <div class="card-body">
          <h5 class="card-title mb-3">Калькулятор тока (I = U / R)</h5>
          ${modelText}

          <div class="calc-grid mt-3">
            <div>
              <label class="form-label">Тип соединения</label>
              <select id="connection-select" class="form-control calc-input mb-3">
                <option value="последовательно">последовательно</option>
                <option value="параллельно">параллельно</option>
              </select>

              <label class="form-label">Резисторы (Ом)</label>
              <div id="resistors-list" class="mb-2"></div>
              <button id="add-resistor-btn" type="button" class="btn btn-outline-light btn-sm w-100">
                + Добавить резистор
              </button>
            </div>

            <div>
              <label for="voltage-input" class="form-label">Напряжение (В)</label>
              <input
                id="voltage-input"
                type="number"
                class="form-control mb-3 calc-input"
                value="${this.voltage}"
                min="0"
                step="0.1"
              >

              <div id="calc-result" class="calc-result">Результат появится тут</div>
              <div id="calc-formula" class="text-muted small mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderResistorsList() {
    const container = document.getElementById("resistors-list");
    let html = "";

    this.resistors.forEach(function (value, index) {
      html += `
        <div class="resistor-row d-flex align-items-center mb-2">
          <span class="resistor-label me-2">R${index + 1}</span>
          <input
            type="number"
            class="form-control calc-input resistor-input"
            data-index="${index}"
            value="${value}"
            min="0"
            step="1"
          >
          <button
            type="button"
            class="btn btn-outline-danger btn-sm ms-2 remove-resistor-btn"
            data-index="${index}"
          >✕</button>
        </div>
      `;
    });

    container.innerHTML = html;

    const self = this;

    container.querySelectorAll(".resistor-input").forEach(function (input) {
      input.addEventListener("input", function (e) {
        const idx = Number(e.target.dataset.index);
        self.resistors[idx] = Number(e.target.value);
        self.calculate();
      });
    });

    container.querySelectorAll(".remove-resistor-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const idx = Number(e.currentTarget.dataset.index);
        self.resistors.splice(idx, 1);
        self.renderResistorsList();
        self.calculate();
      });
    });
  }

  calculate() {
    let totalResistance = 0;

    if (this.connection === "последовательно") {
      this.resistors.forEach(function (value) {
        totalResistance += value;
      });
    } else {
      let inverse = 0;
      this.resistors.forEach(function (value) {
        if (value > 0) {
          inverse += 1 / value;
        }
      });
      totalResistance = inverse > 0 ? 1 / inverse : 0;
    }

    let current = 0;
    if (totalResistance > 0) {
      current = this.voltage / totalResistance;
    }

    const resultEl = document.getElementById("calc-result");
    if (this.resistors.length === 0) {
      resultEl.innerText = "Добавь хотя бы один резистор";
    } else {
      resultEl.innerText =
        "R = " + totalResistance.toFixed(2) + " Ом, I = " + current.toFixed(3) + " А";
    }

    const formulaEl = document.getElementById("calc-formula");
    formulaEl.innerText =
      this.connection === "последовательно"
        ? "R = R1 + R2 + ... ; I = U / R"
        : "1/R = 1/R1 + 1/R2 + ... ; I = U / R";
  }

  render(data) {
    this.resistors = [...data.requestResistors];
    this.connection = data.connection || "последовательно";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

    document.getElementById("connection-select").value = this.connection;
    this.renderResistorsList();
    this.calculate();

    const self = this;

    document.getElementById("connection-select").addEventListener("change", function (e) {
      self.connection = e.target.value;
      self.calculate();
    });

    document.getElementById("voltage-input").addEventListener("input", function (e) {
      self.voltage = Number(e.target.value);
      self.calculate();
    });

    document.getElementById("add-resistor-btn").addEventListener("click", function () {
      self.resistors.push(1000);
      self.renderResistorsList();
      self.calculate();
    });
  }
}
