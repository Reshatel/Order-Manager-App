import React, { useState } from 'react';

const ClientForm = ({ onAddClient }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: Date.now().toString(),
      name,
      phone,
      orders: [],
    };

    onAddClient(newClient);
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Додати нового клієнта</h3>
      <input
        type="text"
        placeholder="Ім’я клієнта"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Зберегти</button>
    </form>
  );
};

export default ClientForm;
