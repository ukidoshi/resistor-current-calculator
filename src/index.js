const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const resistorsRouter = require("./routes/resistors");
const resistorsService = require("./services/resistorsService");

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, "data/resistors.json");

resistorsService.init(DATA_FILE_PATH);

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Слишком много запросов, попробуйте позже" }
  })
);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Express сервер работает! API: /resistors");
});

app.use("/resistors", resistorsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
