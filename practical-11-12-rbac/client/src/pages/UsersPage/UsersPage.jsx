import { useState, useEffect } from 'react';
import { usersApi } from '../../api';
import './UsersPage.scss';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: '', last_name: '', role: '' });

  const loadUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    });
  };

  const handleSave = async () => {
    await usersApi.update(editingId, editForm);
    setEditingId(null);
    loadUsers();
  };

  const handleBlock = async (id) => {
    if (window.confirm('Заблокировать пользователя?')) {
      await usersApi.block(id);
      loadUsers();
    }
  };

  const roleLabel = { user: 'Пользователь', seller: 'Продавец', admin: 'Администратор' };

  return (
    <div className="users-page">
      <div className="users-list">
        {users.map((u) => (
          <div key={u.id} className={`user-card ${u.blocked ? 'blocked' : ''}`}>
            {editingId === u.id ? (
              <div className="user-edit-form">
                <input
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                  placeholder="Имя"
                />
                <input
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                  placeholder="Фамилия"
                />
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                >
                  <option value="user">Пользователь</option>
                  <option value="seller">Продавец</option>
                  <option value="admin">Администратор</option>
                </select>
                <button className="btn-save" onClick={handleSave}>Сохранить</button>
                <button className="btn-cancel" onClick={() => setEditingId(null)}>Отмена</button>
              </div>
            ) : (
              <>
                <div className="user-info">
                  <span className="user-name">{u.first_name} {u.last_name}</span>
                  <span className="user-email">{u.email}</span>
                  <span className={`role-badge role-${u.role}`}>{roleLabel[u.role] || u.role}</span>
                  {u.blocked && <span className="blocked-badge">Заблокирован</span>}
                </div>
                <div className="user-actions">
                  {!u.blocked && (
                    <>
                      <button className="btn-edit" onClick={() => handleEdit(u)}>Изменить</button>
                      <button className="btn-block" onClick={() => handleBlock(u.id)}>Заблокировать</button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
        {users.length === 0 && <p className="empty">Пользователей пока нет</p>}
      </div>
    </div>
  );
}

export default UsersPage;
