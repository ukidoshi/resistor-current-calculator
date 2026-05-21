class ResistorUrls {
  constructor() {
    this.baseUrl = "http://localhost:3000";
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
