// Задача 1.8: среднее арифметическое сопротивлений
export function getAverageResistance(resistors) {
  if (resistors.length === 0) return 0;

  let sum = 0;
  resistors.forEach(function (item) {
    sum += item.resistance;
  });

  return sum / resistors.length;
}

// Задача 1.3: сумма квадратов сопротивлений
export function getSumOfSquaresOfResistance(resistors) {
  let total = 0;
  resistors.forEach(function (item) {
    total += item.resistance * item.resistance;
  });
  return total;
}

// Задача 2.10: количество слов-префиксов в строке модели
// Используется цикл с постусловием (do...while) и НЕ по счётчику —
// идём по очереди, пока в ней есть слова
export function countModelPrefixes(words, modelStr) {
  const model = modelStr.toLowerCase();
  const queue = [...words];
  let count = 0;

  if (queue.length === 0) return 0;

  do {
    const word = queue.shift().toLowerCase();
    if (model.startsWith(word)) {
      count += 1;
    }
  } while (queue.length > 0);

  return count;
}

// Задача 3.5: группировка слов-анаграмм
export function groupAnagrams(codes) {
  const groups = {};

  codes.forEach(function (code) {
    const key = code.toLowerCase().split("").sort().join("");
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(code);
  });

  const result = [];
  Object.keys(groups).forEach(function (key) {
    if (groups[key].length >= 2) {
      groups[key].sort();
      result.push(groups[key]);
    }
  });

  result.sort(function (a, b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  return result;
}
