const resistorsService = require("../services/resistorsService");

const allowedUpdateFields = [
  "src",
  "model",
  "resistance",
  "power",
  "tolerance",
  "text"
];

const isValidUrl = (value) => typeof value === "string" && value.trim().length > 0;
const isValidText = (value) => typeof value === "string" && value.trim().length > 0;
const isValidResistance = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const getAllResistors = (req, res) => {
  const { model } = req.query;
  if (model !== undefined && typeof model !== "string") {
    return res.status(400).json({ error: "Параметр model должен быть строкой" });
  }
  const resistors = resistorsService.findAll(model);
  res.json(resistors);
};

const getResistorById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный id" });
  }

  const resistor = resistorsService.findOne(id);
  if (!resistor) {
    return res.status(404).json({ error: "Карточка резистора не найдена" });
  }
  res.json(resistor);
};

const createResistor = (req, res) => {
  const { src, model, resistance, power, tolerance, text } = req.body;

  if (!src || !model || !resistance || !power || !tolerance || !text) {
    return res.status(400).json({ error: "Не все поля заполнены" });
  }

  if (!isValidUrl(src)) {
    return res.status(400).json({ error: "Поле src должно быть непустой строкой" });
  }
  if (!isValidText(model)) {
    return res.status(400).json({ error: "Поле model должно быть непустой строкой" });
  }
  if (!isValidResistance(resistance)) {
    return res
      .status(400)
      .json({ error: "Поле resistance должно быть числом больше 0" });
  }
  if (!isValidText(power)) {
    return res.status(400).json({ error: "Поле power должно быть непустой строкой" });
  }
  if (!isValidText(tolerance)) {
    return res
      .status(400)
      .json({ error: "Поле tolerance должно быть непустой строкой" });
  }
  if (!isValidText(text)) {
    return res.status(400).json({ error: "Поле text должно быть непустой строкой" });
  }

  const newResistor = resistorsService.create({
    src,
    model,
    resistance,
    power,
    tolerance,
    text
  });
  res.status(201).json(newResistor);
};

const updateResistor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный id" });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Пустое тело запроса. Передайте JSON и Content-Type: application/json"
    });
  }

  const keys = Object.keys(req.body);
  const unknownFields = keys.filter((key) => !allowedUpdateFields.includes(key));
  if (unknownFields.length > 0) {
    return res.status(400).json({
      error: `Нельзя обновлять поля: ${unknownFields.join(", ")}`
    });
  }

  if (req.body.src !== undefined && !isValidUrl(req.body.src)) {
    return res.status(400).json({ error: "Поле src должно быть непустой строкой" });
  }
  if (req.body.model !== undefined && !isValidText(req.body.model)) {
    return res.status(400).json({ error: "Поле model должно быть непустой строкой" });
  }
  if (
    req.body.resistance !== undefined &&
    !isValidResistance(req.body.resistance)
  ) {
    return res
      .status(400)
      .json({ error: "Поле resistance должно быть числом больше 0" });
  }
  if (req.body.power !== undefined && !isValidText(req.body.power)) {
    return res.status(400).json({ error: "Поле power должно быть непустой строкой" });
  }
  if (req.body.tolerance !== undefined && !isValidText(req.body.tolerance)) {
    return res
      .status(400)
      .json({ error: "Поле tolerance должно быть непустой строкой" });
  }
  if (req.body.text !== undefined && !isValidText(req.body.text)) {
    return res.status(400).json({ error: "Поле text должно быть непустой строкой" });
  }

  const updated = resistorsService.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Карточка резистора не найдена" });
  }
  res.json(updated);
};

const deleteResistor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Некорректный id" });
  }

  const success = resistorsService.remove(id);
  if (!success) {
    return res.status(404).json({ error: "Карточка резистора не найдена" });
  }
  res.status(204).send();
};

module.exports = {
  getAllResistors,
  getResistorById,
  createResistor,
  updateResistor,
  deleteResistor
};
