import React, { useState } from 'react';

const ClientList = ({ clients, onUpdateClient, onDeleteClient }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  const startEdit = (client) => {
    setEditingId(client.id);
    setEditedName(client.name);
    setEditedPhone(client.phone);
  };

  const saveEdit = () => {
    onUpdateClient({
      id: editingId,
      name: editedName,
      phone: editedPhone,
    });
    setEditingId(null);
  };

  return (
    <div>
      <h3>Список клієнтів</h3>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {editingId === client.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
                <button onClick={saveEdit}>💾 Зберегти</button>
                <button onClick={() => setEditingId(null)}>❌ Скасувати</button>
              </>
            ) : (
              <>
                {client.name} — {client.phone}
                <button onClick={() => startEdit(client)}>✏️ Редагувати</button>
                <button onClick={() => onDeleteClient(client.id)}>🗑 Видалити</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
