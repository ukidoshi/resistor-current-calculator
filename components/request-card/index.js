export class RequestCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    let resistorsText = "";
    data.requestResistors.forEach((value, index) => {
      resistorsText += `<li class="list-group-item calc-list-item">R${index + 1}: ${value} Ом</li>`;
    });

    return `
      <div class="card shadow-sm request-card">
        <div class="card-body">
          <h5 class="card-title mb-3">Калькулятор тока (I = U / R)</h5>
          <div class="calc-grid">
            <div>
              <p class="mb-1"><b>Модель:</b> ${data.model}</p>
              <p class="mb-1"><b>Тип:</b> ${data.connection}</p>
              <p class="mb-2"><b>Резисторы:</b></p>
              <ul class="list-group mb-3">${resistorsText}</ul>
            </div>
            <div>
              <label for="voltage-input" class="form-label">Напряжение (В)</label>
              <input id="voltage-input" type="number" class="form-control mb-3 calc-input" value="12" min="0" step="0.1">
              <button id="calc-current-btn" class="btn btn-warning w-100">Посчитать ток</button>
              <div id="calc-result" class="calc-result mt-3">Результат появится тут</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  addListeners(data) {
    const button = document.getElementById("calc-current-btn");
    button.addEventListener("click", function () {
      const voltage = Number(document.getElementById("voltage-input").value);
      let totalResistance = 0;

      if (data.connection === "последовательно") {
        data.requestResistors.forEach(function (value) {
          totalResistance += value;
        });
      } else {
        let inverse = 0;
        data.requestResistors.forEach(function (value) {
          inverse += 1 / value;
        });
        totalResistance = 1 / inverse;
      }

      let current = 0;
      if (totalResistance > 0) {
        current = voltage / totalResistance;
      }

      document.getElementById("calc-result").innerText =
        "Эквивалентное сопротивление: " +
        totalResistance.toFixed(2) +
        " Ом. Сила тока: " +
        current.toFixed(2) +
        " А";
    });
  }

  render(data) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
    this.addListeners(data);
  }
}
