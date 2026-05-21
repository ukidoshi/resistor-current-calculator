class ResistorUrls {
  constructor() {
    this.baseUrl = "";
  }

  getResistors() {
    return `${this.baseUrl}/resistors`;
  }

  getResistorById(id) {
    return `${this.baseUrl}/resistors/${id}`;
  }

  createResistor() {
    return `${this.baseUrl}/resistors`;
  }

  updateResistorById(id) {
    return `${this.baseUrl}/resistors/${id}`;
  }

  deleteResistorById(id) {
    return `${this.baseUrl}/resistors/${id}`;
  }
}

export const resistorUrls = new ResistorUrls();
