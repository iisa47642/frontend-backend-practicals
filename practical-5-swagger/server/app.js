const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      console.log('Body:', req.body);
    }
  });
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API интернет-магазина',
      version: '1.0.0',
      description: 'Простое API для управления товарами в интернет-магазине',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *       example:
 *         id: "abc123"
 *         name: "Ноутбук ASUS"
 *         category: "Электроника"
 *         description: "Мощный ноутбук для работы и игр"
 *         price: 89990
 *         stock: 5
 */

let products = [
  { id: nanoid(6), name: 'MacBook Pro 16', category: 'Ноутбуки', description: 'Мощный ноутбук для работы и игр', price: 249990, stock: 5 },
  { id: nanoid(6), name: 'iPhone 15 Pro', category: 'Смартфоны', description: 'Флагманский смартфон Apple с титановым корпусом', price: 129990, stock: 12 },
  { id: nanoid(6), name: 'AirPods Pro 2', category: 'Аксессуары', description: 'Беспроводные наушники с активным шумоподавлением', price: 24990, stock: 20 },
  { id: nanoid(6), name: 'iPad Air', category: 'Планшеты', description: 'Легкий и производительный планшет', price: 79990, stock: 8 },
  { id: nanoid(6), name: 'Apple Watch Ultra 2', category: 'Умные часы', description: 'Часы для экстремальных условий', price: 89990, stock: 6 },
  { id: nanoid(6), name: 'Samsung Galaxy S24 Ultra', category: 'Смартфоны', description: 'Флагман Samsung с AI-функциями', price: 109990, stock: 10 },
  { id: nanoid(6), name: 'Sony WH-1000XM5', category: 'Аксессуары', description: 'Полноразмерные наушники с лучшим шумоподавлением', price: 34990, stock: 15 },
  { id: nanoid(6), name: 'Nintendo Switch OLED', category: 'Игровые консоли', description: 'Портативная игровая консоль с OLED-экраном', price: 29990, stock: 7 },
  { id: nanoid(6), name: 'PlayStation 5', category: 'Игровые консоли', description: 'Игровая консоль нового поколения от Sony', price: 54990, stock: 4 },
  { id: nanoid(6), name: 'Keychron K2', category: 'Аксессуары', description: 'Механическая клавиатура с беспроводным подключением', price: 8990, stock: 25 },
  { id: nanoid(6), name: 'Dell U2723QE', category: 'Мониторы', description: '27-дюймовый 4K USB-C монитор', price: 49990, stock: 3 },
  { id: nanoid(6), name: 'Logitech MX Master 3S', category: 'Аксессуары', description: 'Эргономичная беспроводная мышь для продуктивности', price: 7990, stock: 18 },
];

function findProductOr404(id, res) {
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return null;
  }
  return product;
}

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: 'Name, category and price are required' });
  }
  const newProduct = {
    id: nanoid(6),
    name: name.trim(),
    category: category.trim(),
    description: (description || '').trim(),
    price: Number(price),
    stock: Number(stock) || 0,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/api/products', (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get('/api/products/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;
  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
app.patch('/api/products/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;

  const { name, category, description, price, stock } = req.body;
  if (name === undefined && category === undefined && description === undefined && price === undefined && stock === undefined) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category.trim();
  if (description !== undefined) product.description = description.trim();
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);

  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален (нет тела ответа)
 *       404:
 *         description: Товар не найден
 */
app.delete('/api/products/:id', (req, res) => {
  const exists = products.some(p => p.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'Product not found' });
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});
