# Контрольная работа 3 — PWA-приложение «Заметки»

## Описание проекта

Проект представляет собой Progressive Web Application (PWA) для управления заметками, разработанное поэтапно в рамках практических занятий 13–17. Приложение работает офлайн, поддерживает push-уведомления, WebSocket-соединения и HTTPS.

---

## Структура проекта (по практикам)

### Практика 13–14: Service Worker и PWA

**Директория:** `practical-13-14-service-worker-pwa/`

Создано базовое PWA-приложение заметок с возможностью работы офлайн:

- **index.html** — одностраничное приложение с формой добавления и списком заметок. Используется CSS-фреймворк Chota.
- **app.js** — логика работы с заметками через `localStorage` (добавление, удаление, отображение). Регистрация Service Worker.
- **sw.js** — Service Worker с кэшированием статических ресурсов (стратегия Cache First). Обеспечивает офлайн-доступ.
- **manifest.json** — манифест PWA с иконками, темой и настройками для установки.
- **icons/** — набор иконок приложения разных размеров (16x16 — 512x512).

**Технологии:** HTML, JavaScript, Service Worker API, Cache API, localStorage, Web App Manifest.

---

### Практика 15–16: HTTPS, WebSocket и Push-уведомления

**Директория:** `practical-15-16-https-websocket-push/`

Расширение приложения: добавлены HTTPS-сервер, WebSocket для real-time коммуникации и Web Push уведомления:

- **server.js** — HTTPS-сервер на Express с поддержкой Socket.IO и Web Push (библиотека `web-push`). Генерация VAPID-ключей, эндпоинты `/subscribe` и `/unsubscribe`.
- **app.js** — клиентская логика расширена: подключение к серверу через Socket.IO, подписка/отписка на push-уведомления, динамическая загрузка страниц.
- **sw.js** — обновлённый Service Worker: двойная стратегия кэширования (Cache First для статики, Network First для контента), обработка push-событий.
- **index.html** — обновлён: добавлены кнопки включения/отключения уведомлений, навигация (вкладки «Главная» / «О приложении»).
- **content/home.html** — шаблон главной страницы с формой заметок.
- **content/about.html** — страница «О приложении».
- **localhost+2.pem / localhost+2-key.pem** — SSL-сертификаты для локального HTTPS (сгенерированы через mkcert).

**Технологии:** Node.js, Express, HTTPS, Socket.IO, Web Push API, VAPID.

---

### Практика 17: Детализация Push — напоминания и Snooze

**Директория:** `practical-17-push-reminders/`

Добавлен функционал напоминаний с планированием push-уведомлений и возможностью откладывания:

- **content/home.html** — добавлена вторая форма для создания заметки с напоминанием (текст + выбор даты/времени через `datetime-local`).
- **app.js** — обновлена функция `initNotes()`:
  - Структура заметок изменена: каждая заметка содержит `id`, `text` и `reminder` (timestamp).
  - При наличии напоминания отправляется событие `newReminder` на сервер через WebSocket.
  - Отображение времени напоминания в списке заметок.
- **sw.js** — добавлены:
  - Обработчик `notificationclick` для действия «Отложить на 5 минут» (snooze). Отправляет POST-запрос на `/snooze`.
  - В push-обработчике: кнопка действия и передача `reminderId` в данных уведомления.
- **server.js** — добавлены:
  - `Map` для хранения активных напоминаний с таймерами.
  - Обработка события `newReminder`: планирование push через `setTimeout`.
  - Эндпоинт `POST /snooze` — отмена текущего таймера и перенос напоминания на 5 минут.

**Технологии:** setTimeout-планирование, Notification Actions API, Service Worker fetch из notificationclick.

---

## Запуск проекта

### Практика 13–14 (без сервера)
Открыть `index.html` через любой локальный HTTP-сервер (например, `npx serve`).

### Практики 15–17 (с HTTPS-сервером)
```bash
cd practical-17-push-reminders  # или practical-15-16-https-websocket-push
npm install
node server.js
```
Приложение доступно по адресу: `https://localhost:3001`

> Для работы HTTPS локально необходим [mkcert](https://github.com/FiloSottile/mkcert) для генерации сертификатов.

---

## Общий стек технологий

| Технология | Назначение |
|---|---|
| HTML / CSS (Chota) | Интерфейс приложения |
| JavaScript (ES6+) | Клиентская логика |
| Service Worker | Офлайн-доступ, кэширование, push-обработка |
| Web App Manifest | PWA-установка |
| Node.js / Express | Серверная часть |
| HTTPS (mkcert) | Безопасное соединение |
| Socket.IO | WebSocket real-time коммуникация |
| Web Push (VAPID) | Push-уведомления |
| localStorage | Хранение заметок на клиенте |нап
