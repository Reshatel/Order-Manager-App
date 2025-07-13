export const exportToJson = (data, filename = 'orders_backup.json') => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
};

export const importFromJson = (file, onSuccess, onError) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (!Array.isArray(data)) {
        throw new Error('Файл не є масивом');
      }

      if (!data.every((o) => o.id && o.name)) {
        throw new Error('Файл не містить коректні дані замовлень');
      }

      onSuccess(data);
    } catch (error) {
      onError('❌ Помилка: ' + error.message);
    }
  };
  reader.readAsText(file);
};
