import { useState, useEffect } from 'react';
import { authApi } from './api';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import UsersPage from './pages/UsersPage/UsersPage';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      authApi.me()
        .then(setUser)
        .catch(() => {
          authApi.logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    setPage('login');
    setActiveTab('products');
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="App">
        {page === 'login' ? (
          <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setPage('register')} />
        ) : (
          <RegisterPage onRegistered={() => setPage('login')} onSwitchToLogin={() => setPage('login')} />
        )}
      </div>
    );
  }

  const roleLabel = { user: 'Пользователь', seller: 'Продавец', admin: 'Администратор' };

  return (
    <div className="App">
      <header className="main-header">
        <div className="header-left">
          <h1>TechStore</h1>
          <nav className="tabs">
            <button
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Товары
            </button>
            {user.role === 'admin' && (
              <button
                className={activeTab === 'users' ? 'active' : ''}
                onClick={() => setActiveTab('users')}
              >
                Пользователи
              </button>
            )}
          </nav>
        </div>
        <div className="header-right">
          <span className="user-info">
            {user.first_name} {user.last_name}
            <span className="role-badge">{roleLabel[user.role] || user.role}</span>
          </span>
          <button className="btn-logout" onClick={handleLogout}>Выйти</button>
        </div>
      </header>

      {activeTab === 'products' && <ProductsPage user={user} />}
      {activeTab === 'users' && user.role === 'admin' && <UsersPage />}
    </div>
  );
}

export default App;
