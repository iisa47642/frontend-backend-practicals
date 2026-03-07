import { useState, useEffect } from 'react';
import { productsApi } from '../../api';
import './ProductsPage.scss';

function ProductsPage({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', description: '', price: '' });

  const loadProducts = async () => {
    const data = await productsApi.getAll();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: '', category: '', description: '', price: '' });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };

    if (editingId) {
      await productsApi.update(editingId, payload);
    } else {
      await productsApi.create(payload);
    }

    resetForm();
    loadProducts();
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      category: product.category,
      description: product.description || '',
      price: String(product.price),
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить товар?')) {
      await productsApi.delete(id);
      loadProducts();
    }
  };

  return (
    <div className="products-page">
      <header className="header">
        <h1>Товары</h1>
        <div className="header-right">
          <span className="user-info">{user.first_name} {user.last_name}</span>
          <button className="btn-logout" onClick={onLogout}>Выйти</button>
        </div>
      </header>

      <div className="content">
        <button className="btn-add" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? 'Отмена' : 'Добавить товар'}
        </button>

        {showForm && (
          <form className="product-form" onSubmit={handleSubmit}>
            <input name="title" placeholder="Название" value={form.title} onChange={handleChange} required />
            <input name="category" placeholder="Категория" value={form.category} onChange={handleChange} required />
            <input name="description" placeholder="Описание" value={form.description} onChange={handleChange} />
            <input name="price" type="number" placeholder="Цена" value={form.price} onChange={handleChange} required />
            <button type="submit">{editingId ? 'Сохранить' : 'Создать'}</button>
          </form>
        )}

        <div className="products-list">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-info">
                <h3>{p.title}</h3>
                <span className="category">{p.category}</span>
                {p.description && <p className="description">{p.description}</p>}
                <span className="price">{p.price.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="product-actions">
                <button className="btn-edit" onClick={() => handleEdit(p)}>Изменить</button>
                <button className="btn-delete" onClick={() => handleDelete(p.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
