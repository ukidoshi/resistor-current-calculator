window.onload = function () {
  // Первое число, второе число, результат и выбранная операция
  let a = "";
  let b = "";
  let expressionResult = "";
  let selectedOperation = null;

  // Получаем элементы из HTML
  const outputElement = document.getElementById("result");
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
  const operationButtons = {
    x: document.getElementById("btn_op_mult"),
    "+": document.getElementById("btn_op_plus"),
    "-": document.getElementById("btn_op_minus"),
    "/": document.getElementById("btn_op_div")
  };

  // Запись результата операции в окошко
  function updateOutput(value) {
    outputElement.innerHTML = value === "" ? "0" : value;
  }

  // Приводим и Округляем число
  function formatNumber(value) {
    const roundedValue = parseFloat(Number(value).toFixed(10));
    return roundedValue.toString();
  }

  // Обработка нажатых клавиш в калькуляторе
  function buildNumber(currentValue, digit) {
    if (digit === "." && currentValue === "") {
      return "0.";
    }

    if (digit === "." && currentValue.includes(".")) {
      return currentValue;
    }

    if (currentValue === "0" && digit !== ".") {
      return digit;
    }

    if (currentValue === "-0" && digit !== ".") {
      return "-" + digit;
    }

    return currentValue + digit;
  }

  // Полный сброс (Кнопка С)
  function clearAll() {
    a = "";
    b = "";
    expressionResult = "";
    selectedOperation = null;
    updateOperationButtons();
    updateOutput("0");
  }

  // Подсветить нажатую операцию и сбросить ее при вводе второго числа 
  function updateOperationButtons() {
    Object.keys(operationButtons).forEach(function (operationKey) {
      operationButtons[operationKey].classList.toggle(
        "selected",
        selectedOperation === operationKey && b === ""
      );
    });
  }

  // Куда записывать вводимое число: в первое или второе 
  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      a = buildNumber(a, digit);
      updateOutput(a);
      return;
    }

    b = buildNumber(b, digit);
    updateOperationButtons();
    updateOutput(b);
  }

  // Подменить активное число новым значением (+/- или %)
  function setCurrentValue(nextValue) {
    if (!selectedOperation) {
      a = nextValue;
      updateOperationButtons();
      updateOutput(a);
      return;
    }

    b = nextValue;
    updateOperationButtons();
    updateOutput(b);
  }

  // Обработка выбора операции
  function selectOperation(operationValue) {
    if (a === "") return;

    if (selectedOperation && b !== "") {
      const isCalculated = calculate();
      if (!isCalculated) return;
    }

    selectedOperation = operationValue;
    updateOperationButtons();
  }

  // Нажатие на "="
  function calculate() {
    if (a === "" || b === "" || !selectedOperation) {
      return false;
    }

    switch (selectedOperation) {
      case "x":
        expressionResult = (+a) * (+b);
        break;
      case "+":
        expressionResult = (+a) + (+b);
        break;
      case "-":
        expressionResult = (+a) - (+b);
        break;
      case "/":
        if (+b === 0) {
          a = "";
          b = "";
          expressionResult = "";
          selectedOperation = null;
          updateOperationButtons();
          updateOutput("Error");
          return false;
        }
        expressionResult = (+a) / (+b);
        break;
      default:
        return false;
    }

    a = formatNumber(expressionResult);
    b = "";
    selectedOperation = null;
    updateOperationButtons();
    updateOutput(a);
    return true;
  }

  // Ставим ивенты на все кнопки с цифрами
  digitButtons.forEach(function (button) {
    button.onclick = function () {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    };
  });

  // Операции:
  document.getElementById("btn_op_mult").onclick = function () {
    selectOperation("x");
  };

  document.getElementById("btn_op_plus").onclick = function () {
    selectOperation("+");
  };

  document.getElementById("btn_op_minus").onclick = function () {
    selectOperation("-");
  };

  document.getElementById("btn_op_div").onclick = function () {
    selectOperation("/");
  };

  // Clear button returns calculator to its initial state
  document.getElementById("btn_op_clear").onclick = function () {
    clearAll();
  };

  // "+/-" поменять знак числа
  document.getElementById("btn_op_sign").onclick = function () {
    if (!selectedOperation) {
      if (a === "") return;
      setCurrentValue(formatNumber(-Number(a)));
      return;
    }

    if (b === "") return;
    setCurrentValue(formatNumber(-Number(b)));
  };

  // "%" ковертация в процентах
  document.getElementById("btn_op_percent").onclick = function () {
    if (!selectedOperation) {
      if (a === "") return;
      setCurrentValue(formatNumber(Number(a) / 100));
      return;
    }

    if (b === "") return;
    setCurrentValue(formatNumber(Number(b) / 100));
  };

  // Ивент на нажатие "="
  document.getElementById("btn_op_equal").onclick = function () {
    calculate();
  };

  // Инит
  updateOperationButtons();
  updateOutput("0");
};
