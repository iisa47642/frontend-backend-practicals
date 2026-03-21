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

### Practical 7–8 — JWT-авторизация

Приложение с регистрацией и авторизацией пользователей через JWT. Сервер выдает access-токен при логине, клиент отправляет его в заголовке `Authorization: Bearer <token>`. Реализованы страницы логина, регистрации, а также страница с товарами (CRUD). Swagger-документация на `/api-docs`.

**Запуск сервера:** `cd practical-7-8-auth && npm install && npm start`

**Запуск клиента:** `cd practical-7-8-auth/client && npm install && npm start`

### Practical 9–10 — Refresh-токены и хранение на фронтенде

Доработка приложения из практики 7–8. Добавлена генерация refresh-токенов при логине, а также маршрут `POST /api/auth/refresh` для обновления пары токенов. На клиенте оба токена хранятся в `localStorage`, настроен axios interceptor, который при получении 401-ошибки автоматически пытается обновить access-токен через refresh и повторить запрос. Если refresh тоже истёк — перенаправляет на логин.

Маршруты API:

| Маршрут | Метод | Описание |
|---|---|---|
| /api/auth/register | POST | Регистрация пользователя |
| /api/auth/login | POST | Вход, возвращает accessToken + refreshToken |
| /api/auth/refresh | POST | Обновление пары токенов |
| /api/auth/me | GET | Данные текущего пользователя |
| /api/products | GET | Список товаров |
| /api/products/:id | GET | Товар по id |
| /api/products | POST | Создать товар |
| /api/products/:id | PUT | Обновить товар |
| /api/products/:id | DELETE | Удалить товар |

**Запуск сервера:** `cd practical-9-10-tokens && npm install && npm start`

**Запуск клиента:** `cd practical-9-10-tokens/client && npm install && npm start`

Сервер — порт 3000, клиент — порт 3001.

### Practical 11–12 — RBAC (ролевой доступ)

Финальная версия приложения с системой ролей. При регистрации можно выбрать роль: пользователь, продавец или администратор. На сервере реализованы два middleware — `authMiddleware` (проверка JWT) и `roleMiddleware` (проверка роли). В зависимости от роли ограничивается доступ к маршрутам.

Роли и права:
- **Пользователь** — просмотр товаров
- **Продавец** — просмотр + создание и редактирование товаров
- **Администратор** — все права продавца + удаление товаров + управление пользователями (просмотр, редактирование, блокировка)

Маршруты API:

| Маршрут | Метод | Доступ | Описание |
|---|---|---|---|
| /api/auth/register | POST | Гость | Регистрация |
| /api/auth/login | POST | Гость | Вход в систему |
| /api/auth/refresh | POST | Гость | Обновление токенов |
| /api/auth/me | GET | Авторизованный | Текущий пользователь |
| /api/users | GET | Администратор | Список пользователей |
| /api/users/:id | GET | Администратор | Пользователь по id |
| /api/users/:id | PUT | Администратор | Обновить пользователя |
| /api/users/:id | DELETE | Администратор | Заблокировать пользователя |
| /api/products | GET | Пользователь | Список товаров |
| /api/products/:id | GET | Пользователь | Товар по id |
| /api/products | POST | Продавец | Создать товар |
| /api/products/:id | PUT | Продавец | Обновить товар |
| /api/products/:id | DELETE | Администратор | Удалить товар |

На фронтенде интерфейс адаптируется под роль: пользователь видит только список товаров, продавец может добавлять и редактировать, администратор — всё плюс вкладка «Пользователи» для управления аккаунтами.

**Запуск сервера:** `cd practical-11-12-rbac && npm install && npm start`

**Запуск клиента:** `cd practical-11-12-rbac/client && npm install && npm start`

Сервер — порт 3000, клиент — порт 3001.

## Технологии

- **Frontend:** React 18, SCSS, Axios (с interceptors)
- **Backend:** Node.js, Express, JWT (access + refresh), bcrypt
- **Авторизация:** JWT Bearer-токены, refresh-ротация, RBAC
- **Документация:** Swagger / OpenAPI 3.0
