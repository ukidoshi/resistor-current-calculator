const KEY = "calc_resistors";

export function getCalcResistors() {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw);
}

export function addCalcResistor(item) {
  const list = getCalcResistors();
  list.push({
    model: item.model,
    resistance: item.resistance
  });
  sessionStorage.setItem(KEY, JSON.stringify(list));
}

export function clearCalcResistors() {
  sessionStorage.removeItem(KEY);
}
