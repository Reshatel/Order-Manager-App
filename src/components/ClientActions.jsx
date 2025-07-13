import React, { useRef } from 'react';
import { exportToJson } from '../utils/exportToJson';

const ClientActions = ({ clients, onImport }) => {
  const fileInputRef = useRef();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (Array.isArray(parsed)) {
          onImport(parsed);
        } else {
          alert('Формат файлу некоректний');
        }
      } catch (err) {
        alert('Не вдалося прочитати файл');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={() => exportToJson(clients)}>📤 Зберегти у файл</button>
      <button onClick={() => fileInputRef.current.click()}>📥 Завантажити з файлу</button>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
    </div>
  );
};

export default ClientActions;
