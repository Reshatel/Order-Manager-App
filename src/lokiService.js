import Loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
import { v4 as uuidv4 } from 'uuid';

let db;
let orders;


export const toggleOrderPaid = (id) => {
  const order = orders.findOne({ id });
  if (order) {
    order.paid = !order.paid;
    orders.update(order);
    db.saveDatabase();
  }
};
export const resetAndInsertOrders = (orderArray) => {
  orders.clear();

  orderArray.forEach((order) => {
    const cleanOrder = {
       id: order.id || uuidv4(),
      name: order.name,
      device: order.device,
      netProfit: order.netProfit || '',
      price: order.price,
      issue: order.issue,
      comment: order.comment || '',
      createdAt: order.createdAt || new Date().toISOString(),
      completed: !!order.completed,
    };

    orders.insert(cleanOrder);
  });

  db.saveDatabase();
};


export const initDB = () => {
  return new Promise((resolve) => {
    const adapter = new LokiIndexedAdapter('orderDB');
    db = new Loki('orderDB', {
      adapter,
      autosave: true,
      autosaveInterval: 4000,
      persistenceMethod: 'adapter',
      autoload: true,
      autoloadCallback: () => {
        orders = db.getCollection('orders') || db.addCollection('orders', { indices: ['id'] });
        resolve();
      },
    });
  });
};

export const getOrders = () => orders.chain().simplesort('createdAt', true).data();

export const addOrder = (order) => {
  orders.insert(order);
  db.saveDatabase();
};

export const updateOrder = (order) => {
  orders.update(order);
  db.saveDatabase();
};

export const deleteOrder = (id) => {
  const item = orders.findOne({ id });
  if (item) {
    orders.remove(item);
    db.saveDatabase();
  }
};

export const toggleOrderComplete = (id) => {
  const item = orders.findOne({ id });
  if (item) {
    item.completed = !item.completed;
    orders.update(item);
    db.saveDatabase();
  }
};
