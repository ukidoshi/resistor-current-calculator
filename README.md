# Лабораторная работа 6 (фронтенд)

Тема: электротехника. Услуги — модели резисторов. Заявки — расчет тока.

## Что сделано

- Запросы через **fetch** и **async/await** (`modules/fetch.js`)
- Относительные URL API (`/resistors`) — один домен с бэкендом после сборки
- Кнопка **Сохранить** на странице добавления/редактирования (POST / PATCH)
- Сборка фронта через **Vite** (`npm run build` → папка `public/`)

## Разработка (два процесса)

**1. Бэкенд:**

```bash
cd /Users/nacynsaryglar/PSP/backend
npm run dev
```

**2. Фронт (Vite):**

```bash
cd /Users/nacynsaryglar/PSP/lab1
npm install
npm run dev
```

Адрес: `http://localhost:5173` (прокси `/resistors` → `localhost:3000`)

## Продакшен (защита ЛР6)

**1. Собрать фронт:**

```bash
cd /Users/nacynsaryglar/PSP/lab1
npm run build
```

**2. Скопировать сборку в бэкенд (ветка lab_4):**

```bash
rm -rf /Users/nacynsaryglar/PSP/backend/public
cp -r /Users/nacynsaryglar/PSP/lab1/public /Users/nacynsaryglar/PSP/backend/public
```

**3. Запустить только бэкенд:**

```bash
cd /Users/nacynsaryglar/PSP/backend
npm run dev
```

Открыть `http://localhost:3000` — CORS не нужен, в Network тип **fetch**.

## Ветки git

- **lab_6** — исходники, без папки `public/` (в `.gitignore`)
- **lab_4** (backend) — папка `public/` со сборкой

## Структура

```bash
lab1/
├── modules/          # fetch.js + resistorUrls.js
├── pages/
├── components/
├── static/           # about.html для Vite
├── vite.config.js
├── package.json
└── index.html

backend/
├── public/           # bundle после сборки (ветка lab_4)
└── src/
```
