# Frontend & Backend Practicals

Практические работы по дисциплине «Фронтенд и бэкенд разработка».

## Структура проекта

### Practical 1 — CSS-препроцессоры (SCSS)

Верстка карточек товаров с использованием SCSS: переменные, миксины (`button`, `card-shadow`, `responsive`), вложенность, BEM-нотация.

### Practical 2 — Node.js + Express CRUD API

REST API интернет-магазина на Express. Эндпоинты для работы с товарами:
- `GET /products` — список товаров
- `GET /products/:id` — товар по ID
- `POST /products` — создание
- `PATCH /products/:id` — обновление
- `DELETE /products/:id` — удаление

**Запуск:** `cd practical-2-nodejs-express && npm install && node app.js`

### Practical 3 — Тестирование API

Сервер с расширенным набором HTTP-методов (GET, POST, PUT, PATCH, DELETE) для тестирования через Postman/Insomnia.

**Запуск:** `cd practical-3-api-testing && npm install && node server.js`

### Practical 4 — React + Express (TechStore)

Полноценное веб-приложение: React-клиент + Express-сервер. Каталог товаров с CRUD-операциями, модальные окна, SCSS-стилизация в тёмной теме.

**Запуск сервера:** `cd practical-4-api-react/server && npm install && npm start`

**Запуск клиента:** `cd practical-4-api-react/client && npm install && npm start`

Сервер — порт 3000, клиент — порт 3001.

### Practical 5 — Swagger

API с автогенерируемой документацией через Swagger UI (`swagger-jsdoc` + `swagger-ui-express`). Доступна по адресу `/api-docs`.

**Запуск:** `cd practical-5-swagger/server && npm install && npm start`

## Технологии

- **Frontend:** React 18, SCSS, Axios
- **Backend:** Node.js, Express
- **Документация:** Swagger / OpenAPI 3.0
