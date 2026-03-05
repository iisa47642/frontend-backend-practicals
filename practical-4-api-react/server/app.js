const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

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

let products = [
  {
    id: nanoid(6),
    name: "iPhone 15",
    category: "Смартфоны",
    description: "Современный смартфон Apple",
    price: 99990,
    stock: 12,
    rating: 5,
    url: "https://avatars.mds.yandex.net/i?id=328f980bbf070b7a916e3d51ce26310bf82e2ca6-8273295-images-thumbs&n=13"
  },
  {
    id: nanoid(6),
    name: "Samsung Galaxy S24",
    category: "Смартфоны",
    description: "Флагман Samsung",
    price: 89990,
    stock: 8,
    rating: 4,
    url: "https://basket-14.wbbasket.ru/vol2089/part208914/208914727/images/big/1.webp"
  },
  {
    id: nanoid(6),
    name: "MacBook Air M3",
    category: "Ноутбуки",
    description: "Лёгкий и мощный ноутбук",
    price: 149990,
    stock: 5,
    rating: 5,
    url: "https://avatars.mds.yandex.net/i?id=fa861d8c38c1c2e19f0bbb8292ddf1d4_l-5873744-images-thumbs&n=13"
  },
  {
    id: nanoid(6),
    name: "ASUS ROG",
    category: "Ноутбуки",
    description: "Игровой ноутбук",
    price: 179990,
    stock: 3,
    rating: 4,
    url: "https://avatars.mds.yandex.net/i?id=32af6fa7351279a9bf9d5f61fc6a2e43f55f195b-12505840-images-thumbs&n=13"
  },
  {
    id: nanoid(6),
    name: "AirPods Pro",
    category: "Наушники",
    description: "Беспроводные наушники",
    price: 24990,
    stock: 20,
    rating: 5,
    url: "https://basket-17.wbbasket.ru/vol2672/part267271/267271273/images/big/1.webp"
  },
  {
    id: nanoid(6),
    name: "Sony WH-1000XM5",
    category: "Наушники",
    description: "Шумоподавляющие наушники",
    price: 32990,
    stock: 10,
    rating: 4,
    url: "https://img.mvideo.ru/Pdb/400309914b1.jpg"
  },
  {
    id: nanoid(6),
    name: "iPad Air",
    category: "Планшеты",
    description: "Планшет Apple",
    price: 69990,
    stock: 6,
    rating: 4,
    url: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-11/449/882/664/251/412/100074266827b1.jpg"
  },
  {
    id: nanoid(6),
    name: "Xiaomi Pad 6",
    category: "Планшеты",
    description: "Доступный планшет",
    price: 39990,
    stock: 15,
    rating: 4,
    url: "https://basket-12.wbbasket.ru/vol1770/part177093/177093338/images/c246x328/1.webp"
  },
  {
    id: nanoid(6),
    name: "PlayStation 5",
    category: "Игровые консоли",
    description: "Игровая приставка Sony",
    price: 59990,
    stock: 7,
    rating: 5,
    url: "https://basket-10.wbbasket.ru/vol1364/part136436/136436256/images/big/1.webp"
  },
  {
    id: nanoid(6),
    name: "Xbox Series X",
    category: "Игровые консоли",
    description: "Игровая приставка Microsoft",
    price: 57990,
    stock: 9,
    rating: 5,
    url: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-49/435/753/829/146/100052020847b0.jpg"
  }
];


function findProductOr404(id, res) {
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return null;
  }
  return product;
}

app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock, url } = req.body;
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
    url: url.trim()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;
  res.json(product);
});

app.patch('/api/products/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;

  const { name, category, description, price, stock, url } = req.body;
  if (name === undefined && category === undefined && description === undefined && price === undefined && stock === undefined) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category.trim();
  if (description !== undefined) product.description = description.trim();
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (url !== undefined) product.url = url.trim();

  res.json(product);
});

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
});
