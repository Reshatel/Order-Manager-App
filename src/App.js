import React, { useEffect, useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { toggleOrderPaid } from './lokiService';

import {
  initDB,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  toggleOrderComplete,
  resetAndInsertOrders,
} from './lokiService';
import { exportToJson, importFromJson } from './utils/jsonIO';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    initDB().then(() => {
      setOrders(getOrders());
    });
  }, []);


  const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const [netProfit, setNetProfit] = useState(() => {
  return localStorage.getItem('netProfit') || '';
});

const handleNetProfitChange = (e) => {
  const value = e.target.value;
  setNetProfit(value);
  localStorage.setItem('netProfit', value);
};


  const refresh = () => {
    setOrders(getOrders());
  };

  const handleAddOrder = (order) => {
    if (editingOrder) {
      updateOrder(order);
    } else {
      addOrder(order);
    }
    refresh();
    setEditingOrder(null);
  };

  const handleDelete = (id) => {
    deleteOrder(id);
    refresh();
  };

  const handleToggleComplete = (id) => {
    toggleOrderComplete(id);
    refresh();
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const filteredOrders = orders.filter((order) => {
    const text = `${order.name} ${order.device} ${order.issue} ${order.comment} ${order.price}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && order.completed) ||
      (statusFilter === 'not_completed' && !order.completed);

    return matchesSearch && matchesStatus;
  });

  const totalSum = filteredOrders.reduce((sum, o) => sum + Number(o.price || 0), 0);
const handleTogglePaid = (id) => {
  toggleOrderPaid(id);
  refresh();
};
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5' }}>
  <header className="app-header">
  <div className="header-left">
    <h1> Система замовлень</h1>
  </div>
  <div className="header-right">
   <div className="header-right">
  <div>{currentTime.toLocaleDateString()}</div>
  <div> {currentTime.toLocaleTimeString()}</div>
</div>
  </div>
</header>

      <div className="control-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="🔍 Пошук"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '220px',
            fontSize: '14px',
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '14px',
            backgroundColor: '#fff',
          }}
        >
          <option value="all">🔁 Усі</option>
          <option value="completed">✅ Виконано</option>
          <option value="not_completed">❌ Не виконано</option>
        </select>

        <input
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          id="importFile"
          onChange={(e) =>
            importFromJson(
              e.target.files[0],
              (data) => {
                resetAndInsertOrders(data);
                refresh();
              },
              (err) => {
                console.error(err);
                alert(err);
              }
            )
          }
        />

        <button
          onClick={() => exportToJson(orders)}
          style={{
            padding: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            background: '#f0f0f0',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          📤 Зберегти
        </button>

        <label
          htmlFor="importFile"
          style={{
            padding: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            background: '#f0f0f0',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          📥 Завантажити
        </label>
<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
 
{/* 
  <div>
    <label style={{ fontWeight: 'bold', marginRight: '4px' }}>💼 Чистий дохід:</label>
    <input
      type="text"
      value={netProfit}
      onChange={handleNetProfitChange}
      placeholder="введіть суму"
      style={{
        padding: '4px 6px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100px',
        fontSize: '13px',
      }}
    />
  </div> */}
</div>
      </div>

      <OrderForm onAddOrder={handleAddOrder} editingOrder={editingOrder} />
      <OrderList
        orders={filteredOrders}
        onToggleComplete={handleToggleComplete}
        onTogglePaid={handleTogglePaid}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
