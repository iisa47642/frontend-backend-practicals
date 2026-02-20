const express = require('express');
const app = express();
const port = 3000;

let products = [
    { id: 1, name: 'Ноутбук', price: 75000 },
    { id: 2, name: 'Смартфон', price: 45000 },
    { id: 3, name: 'Наушники', price: 5000 },
];

// Middleware для парсинга JSON
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
    res.send('API магазина товаров');
});

// Получить все товары
app.get('/products', (req, res) => {
    res.json(products);
});

// Получить товар по id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
});

// Добавить новый товар
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: Date.now(),
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Редактировать товар по id
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    const { name, price } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    res.json(product);
});

// Удалить товар по id
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: 'Товар удалён' });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
