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
function getSortedLetters(word) {
  const letters = word.toLowerCase().split("");
  letters.sort();
  return letters.join("");
}

export function groupAnagrams(codes) {
  const groups = {};
  
  for (let i = 0; i < codes.length; i++) {
    const word = codes[i];
    const key = getSortedLetters(word);

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(word);
  }

  const result = [];
  const keys = Object.keys(groups);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const group = groups[key];

    if (group.length >= 2) {
      group.sort();
      result.push(group);
    }
  }

  result.sort(function (a, b) {
    return a[0].localeCompare(b[0]);
  });

  return result;
}
