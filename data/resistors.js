export const resistors = [
  {
    id: 1,
    model: "Yageo CFR-25JR-52-220R",
    resistance: 220,
    power: "0.25W",
    tolerance: "5%",
    connection: "последовательно",
    requestResistors: [220, 330, 470],
    model3d: "green.glb"
  },
  {
    id: 2,
    model: "Vishay MRS25 10K",
    resistance: 10000,
    power: "0.6W",
    tolerance: "1%",
    connection: "параллельно",
    requestResistors: [10000, 10000, 4700],
    model3d: "orange.glb"
  },
  {
    id: 3,
    model: "KOA Speer MF1/4DCT52R1000F",
    resistance: 1000,
    power: "0.25W",
    tolerance: "1%",
    connection: "последовательно",
    requestResistors: [1000, 2200, 3300],
    model3d: "with_rod.glb"
  },
  {
    id: 4,
    model: "Bourns CR0805-FX-1K0ELF",
    resistance: 1000,
    power: "0.125W",
    tolerance: "1%",
    connection: "параллельно",
    requestResistors: [1000, 1000, 1000],
    model3d: "yellow.glb"
  }
];
