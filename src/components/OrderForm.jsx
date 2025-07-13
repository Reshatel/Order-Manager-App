import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OrderForm = ({ onAddOrder, editingOrder }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    device: '',
    price: '',
    netProfit: '',
    issue: '',
    comment: '',
    completed: false,
    createdAt: '',
  });

  useEffect(() => {
    if (editingOrder) {
      setFormData(editingOrder);
    } else {
      resetForm();
    }
  }, [editingOrder]);

  const resetForm = () => {
    setFormData({
      id: uuidv4(),
      name: '',
      device: '',
      price: '',
      netProfit: '',
      issue: '',
      comment: '',
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrder(formData);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'flex-start',
        background: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        maxWidth: '100%',
      }}
    >
      <input
        name="name"
        placeholder="Ім'я клієнта"
        value={formData.name || ''}
        onChange={handleChange}
        required
        style={{ flex: '1 1 140px', minWidth: '120px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="device"
        placeholder="Пристрій"
        value={formData.device || ''}
        onChange={handleChange}
        required
        style={{ flex: '1 1 140px', minWidth: '120px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="price"
        placeholder="Ціна"
        type="number"
        value={formData.price || ''}
        onChange={handleChange}
        required
        style={{ flex: '1 1 100px', minWidth: '100px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="netProfit"
        placeholder="Чистий дохід"
        type="number"
        value={formData.netProfit || ''}
        onChange={handleChange}
        style={{ flex: '1 1 100px', minWidth: '100px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="issue"
        placeholder="Поломка"
        value={formData.issue || ''}
        onChange={handleChange}
        required
        style={{ flex: '2 1 160px', minWidth: '140px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="comment"
        placeholder="Коментар"
        value={formData.comment || ''}
        onChange={handleChange}
        style={{ flex: '2 1 160px', minWidth: '140px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '4px',
        }}
      >
        {editingOrder ? 'Оновити' : 'Додати'} замовлення
      </button>
    </form>
  );
};

export default OrderForm;
