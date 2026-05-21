# Лабораторная работа 5 (фронтенд)

Тема: электротехника. Услуги — модели резисторов. Заявки — расчет тока.

## Что сделано

- Подключение к API бэкенда через **XMLHttpRequest** (`modules/ajax.js`)
- URL API в `modules/resistorUrls.js`
- Главная: список резисторов с API + фильтр по `model` (query-параметр)
- Страница заявки: данные по `id` + кнопка **Удалить** (DELETE)
- Страница добавления/редактирования: поля для ввода, без кнопки «Сохранить» (как в методичке для ЛР5)
- Кнопка **Домой** в шапке и на страницах

## Запуск (два сервера)

**1. Бэкенд (лабораторная 4):**

```bash
cd /Users/nacynsaryglar/PSP/backend
npm run dev
```

Адрес: `http://localhost:3000`

**2. Фронтенд (эта папка):**

```bash
cd /Users/nacynsaryglar/PSP/lab1
python3 -m http.server 5500
```

Адрес: `http://localhost:5500`

## CORS

Для защиты включи расширение **CORS Unblock** в Chrome (как в методичке).
Сначала покажи ошибку в Network, потом включи расширение и повтори фильтрацию.

## Структура

```bash
lab1/
├── modules/          # ajax + urls
├── pages/
│   ├── main/
│   ├── product/
│   └── edit/
├── components/
├── index.html
└── main.js

backend/              # отдельная папка, не в этой ветке
└── src/...
```
