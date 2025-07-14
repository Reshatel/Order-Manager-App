import React, { useState } from 'react';

const OrderList = ({ orders, onToggleComplete, onDelete, onEdit }) => {
  const [expandedFields, setExpandedFields] = useState({});

const [marked, setMarked] = useState(() => {
  const saved = localStorage.getItem('marked');
  return saved ? JSON.parse(saved) : {};
});

const toggleMark = (id) => {
  setMarked((prev) => {
    const updated = { ...prev, [id]: !prev[id] };
    localStorage.setItem('marked', JSON.stringify(updated));
    return updated;
  });
};

  const toggleExpand = (orderId, field) => {
    setExpandedFields((prev) => ({
      ...prev,
      [`${orderId}-${field}`]: !prev[`${orderId}-${field}`],
    }));
  };

  const isExpanded = (orderId, field) => expandedFields[`${orderId}-${field}`];

  const cellStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '160px',
    cursor: 'pointer',
  };

  const expandedCellStyle = {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    maxWidth: '160px',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {orders.map((order, index) => (
        <div
          key={order.id}
          className="order-row"
          style={{
            borderLeft: order.completed ? '4px solid #28a745' : '4px solid #dc3545',
          }}
        >
          <div
            style={isExpanded(order.id, 'name') ? expandedCellStyle : cellStyle}
            onClick={() => toggleExpand(order.id, 'name')}
            title="Натисни, щоб розгорнути"
          >
            №{1 + (orders.length - 1 - index)} 👤 {order.name}
          </div>

          <div
            style={isExpanded(order.id, 'device') ? expandedCellStyle : cellStyle}
            onClick={() => toggleExpand(order.id, 'device')}
            title="Натисни, щоб розгорнути"
          >
            📱 {order.device}
          </div>

          <div
            style={isExpanded(order.id, 'price') ? expandedCellStyle : cellStyle}
            onClick={() => toggleExpand(order.id, 'price')}
            title="Натисни, щоб розгорнути"
          >
            $ {order.price} грн
          </div>

          <div
            style={isExpanded(order.id, 'netProfit') ? expandedCellStyle : cellStyle}
            onClick={() => toggleExpand(order.id, 'netProfit')}
            title="Натисни, щоб розгорнути"
          >
            💼 {order.netProfit} грн
          </div>


          <div
            style={isExpanded(order.id, 'issue') ? expandedCellStyle : cellStyle}
            onClick={() => toggleExpand(order.id, 'issue')}
            title="Натисни, щоб розгорнути"
          >
            🛠 {order.issue}
          </div>
          

          <div
            style={isExpanded(order.id, 'comment') ? expandedCellStyle : cellStyle}
            onClick={() => toggleExpand(order.id, 'comment')}
            title="Натисни, щоб розгорнути"
          >
            🗒 {order.comment || '-'}
          </div>
          <div title={new Date(order.createdAt).toLocaleString()}>
            📅 {new Date(order.createdAt).toLocaleDateString()}
          </div>


          <button
            onClick={() => onToggleComplete(order.id)}
            style={{
              backgroundColor: order.completed ? '#28a745' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              minWidth: '100px',
              textAlign: 'center',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {order.completed ? ' Виконано' : ' Не виконано'}
          </button>

          <button className='paid-button'
            onClick={() => toggleMark(order.id)}
            style={{
              backgroundColor: marked[order.id] ? '#28a745' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '3px 6px',
              fontSize: '13px',
              minWidth: '30px',
              cursor: 'pointer',
              marginLeft: '6px',
            }}
            title="Оплачено"
          >
            {marked[order.id] ? 'Оплачено' : 'Не оплачено '}
          </button>

          
          <div style={{ position: 'relative' }}>
            <button
              onClick={() =>
                setExpandedFields((prev) => ({
                  ...prev,
                  [`menu-${order.id}`]: !prev[`menu-${order.id}`],
                }))
              }
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              title="Меню"
            >
              ⚙
            </button>

            {expandedFields[`menu-${order.id}`] && (
              <div className="gear-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  zIndex: 100,
                }}
              >
                <button
                  onClick={() => {
                    onEdit(order);
                    setExpandedFields((prev) => ({ ...prev, [`menu-${order.id}`]: false }));
                  }}
                  style={{
                    display: 'block',
                    padding: '6px 12px',
                    border: 'none',
                    background: 'transparent',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Редагувати
                </button>
                <button
                  onClick={() => {
                    onDelete(order.id);
                    setExpandedFields((prev) => ({ ...prev, [`menu-${order.id}`]: false }));
                  }}
                  style={{
                    display: 'block',
                    padding: '6px 12px',
                    border: 'none',
                    background: 'transparent',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#dc3545',
                  }}
                >
                  🗑️ Видалити
                </button>
              </div>
            )}
          </div>
        </div>
        
      ))}
      
    </div>
    
  );
  
};

export default OrderList;
