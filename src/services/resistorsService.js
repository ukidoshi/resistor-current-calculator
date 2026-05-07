const fileService = require("./fileService");

let dataFilePath;

const init = (filePath) => {
  dataFilePath = filePath;
};

const findAll = (model) => {
  const resistors = fileService.readData(dataFilePath);
  if (model) {
    return resistors.filter((item) =>
      item.model.toLowerCase().includes(model.toLowerCase())
    );
  }
  return resistors;
};

const findOne = (id) => {
  const resistors = fileService.readData(dataFilePath);
  return resistors.find((item) => item.id === id);
};

const create = (resistorData) => {
  const resistors = fileService.readData(dataFilePath);
  const newId =
    resistors.length > 0 ? Math.max(...resistors.map((item) => item.id)) + 1 : 1;

  const newResistor = { id: newId, ...resistorData };
  resistors.push(newResistor);
  fileService.writeData(dataFilePath, resistors);
  return newResistor;
};

const update = (id, resistorData) => {
  const resistors = fileService.readData(dataFilePath);
  const index = resistors.findIndex((item) => item.id === id);
  if (index === -1) return null;

  resistors[index] = { ...resistors[index], ...resistorData };
  fileService.writeData(dataFilePath, resistors);
  return resistors[index];
};

const remove = (id) => {
  const resistors = fileService.readData(dataFilePath);
  const filtered = resistors.filter((item) => item.id !== id);
  if (filtered.length === resistors.length) return false;

  fileService.writeData(dataFilePath, filtered);
  return true;
};

module.exports = {
  init,
  findAll,
  findOne,
  create,
  update,
  remove
};
