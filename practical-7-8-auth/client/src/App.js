import { useState, useEffect } from 'react';
import { authApi } from './api';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
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

  return (
    <div className="App">
      <ProductsPage user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
