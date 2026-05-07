# Лабораторная работа: Express.js API

## Тема
Задачи по электротехнике.

- Услуги: список реальных моделей резисторов.
- Заявки: расчет силы тока для списка резисторов (последовательное или параллельное соединение).

## Что сделано по методичке

- Инициализирован npm-проект.
- Подключены зависимости: `express`, `nodemon`.
- Сделана слоистая архитектура:
  - `routes`
  - `controllers`
  - `services`
  - `data`
- Реализован CRUD REST API для карточек резисторов.
- Данные хранятся в JSON-файле (`src/data/resistors.json`).
- Добавлены middleware:
  - `express.json()`
  - логирование запросов
  - `cors` (для фронтенда)
  - `helmet` (security headers)
  - `express-rate-limit` (защита API от злоупотреблений и DDoS)
- Добавлены обработчики 404 и 500.

## Структура проекта

```bash
lab1/
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── resistors.js
│   ├── controllers/
│   │   └── resistorsController.js
│   ├── services/
│   │   ├── fileService.js
│   │   └── resistorsService.js
│   └── data/
│       └── resistors.json
├── package.json
└── package-lock.json
```

## Запуск

```bash
npm install
npm run dev
```

Сервер: `http://localhost:3000`
