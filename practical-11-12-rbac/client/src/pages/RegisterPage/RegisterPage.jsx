import { useState } from 'react';
import { authApi } from '../../api';
import '../LoginPage/LoginPage.scss';

function RegisterPage({ onRegistered, onSwitchToLogin }) {
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await authApi.register(form);
      setSuccess('Регистрация успешна! Теперь войдите.');
      setTimeout(() => onRegistered(), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="first_name" type="text" placeholder="Имя" value={form.first_name} onChange={handleChange} required />
        <input name="last_name" type="text" placeholder="Фамилия" value={form.last_name} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">Пользователь</option>
          <option value="seller">Продавец</option>
          <option value="admin">Администратор</option>
        </select>
        <button type="submit">Зарегистрироваться</button>
        <p className="auth-switch">
          Уже есть аккаунт?{' '}
          <span onClick={onSwitchToLogin}>Войти</span>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
