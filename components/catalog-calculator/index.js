export class CatalogCalculatorComponent {
  constructor(parent) {
    this.parent = parent;
    this.catalog = [];
    this.selected = [];
    this.connection = "последовательно";
    this.voltage = 12;
  }

  getHTML() {
    return `
      <div class="card shadow-sm request-card">
        <div class="card-body">
          <h5 class="card-title mb-3">Калькулятор тока (I = U / R)</h5>

          <div class="calc-grid mt-3">
            <div>
              <label class="form-label">Тип соединения</label>
              <select id="connection-select" class="form-control calc-input mb-3">
                <option value="последовательно">последовательно</option>
                <option value="параллельно">параллельно</option>
              </select>

              <label class="form-label">Добавить из каталога</label>
              <div class="d-flex gap-2 mb-3">
                <select id="catalog-select" class="form-control calc-input">
                  <option value="">Выберите резистор</option>
                </select>
                <button id="add-from-catalog-btn" type="button" class="btn btn-warning">Добавить</button>
              </div>

              <label class="form-label">В расчете</label>
              <div id="selected-list" class="mb-2"></div>
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

  fillCatalogSelect() {
    const select = document.getElementById("catalog-select");
    let html = '<option value="">Выберите резистор</option>';

    this.catalog.forEach(function (item) {
      html +=
        '<option value="' +
        item.id +
        '">' +
        item.model +
        " — " +
        item.resistance +
        " Ом</option>";
    });

    select.innerHTML = html;
  }

  renderSelectedList() {
    const container = document.getElementById("selected-list");

    if (this.selected.length === 0) {
      container.innerHTML = '<p class="text-muted small mb-0">Пока нет резисторов</p>';
      return;
    }

    let html = "";
    const self = this;

    this.selected.forEach(function (item, index) {
      html +=
        '<div class="calc-list-item d-flex justify-content-between align-items-center p-2 mb-2 rounded">' +
        "<span>" +
        item.model +
        " — " +
        item.resistance +
        " Ом</span>" +
        '<button type="button" class="btn btn-outline-danger btn-sm remove-selected-btn" data-index="' +
        index +
        '">✕</button>' +
        "</div>";
    });

    container.innerHTML = html;

    container.querySelectorAll(".remove-selected-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const idx = Number(e.currentTarget.dataset.index);
        self.selected.splice(idx, 1);
        self.renderSelectedList();
        self.calculate();
      });
    });
  }

  calculate() {
    const values = [];
    this.selected.forEach(function (item) {
      values.push(item.resistance);
    });

    let totalResistance = 0;

    if (this.connection === "последовательно") {
      values.forEach(function (value) {
        totalResistance += value;
      });
    } else {
      let inverse = 0;
      values.forEach(function (value) {
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
    if (values.length === 0) {
      resultEl.innerText = "Добавь хотя бы один резистор из каталога";
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

  addFromCatalog() {
    const select = document.getElementById("catalog-select");
    const id = Number(select.value);

    if (!id) {
      return;
    }

    const item = this.catalog.find(function (r) {
      return r.id === id;
    });

    if (!item) {
      return;
    }

    this.selected.push({
      id: item.id,
      model: item.model,
      resistance: item.resistance
    });

    select.value = "";
    this.renderSelectedList();
    this.calculate();
  }

  render(catalog) {
    this.catalog = catalog;
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.fillCatalogSelect();
    this.renderSelectedList();
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

    document.getElementById("add-from-catalog-btn").addEventListener("click", function () {
      self.addFromCatalog();
    });
  }
}
