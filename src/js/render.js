import { getStocks } from './api.js';

const createRow = (item) => {
  const tr = document.createElement('tr');
  for (let [key, value] of Object.entries(item)) {
    const td1 = document.createElement('td');
    if (key === 'date') {
      td1.appendChild(
        document.createTextNode(
          item[key] ? new Intl.DateTimeFormat('es-AR').format(new Date(item[key])) : 'Sin registro',
        ),
      );
    } else {
      td1.appendChild(document.createTextNode(item[key] ?? 'Sin registro'));
    }

    tr.appendChild(td1);
    console.log(key, value);
  }
  return tr;
};

const addStocksToRecord = (stocks) => {
  const tableBody = document.querySelector('tbody');
  if (Array.isArray(stocks.rows) && stocks.rows.length > 0) {
    stocks.rows.map((stock) => {
      tableBody.appendChild(createRow(stock));
    });
  }
};

const main = async () => {
  addStocksToRecord(await getStocks(0, 20, 'id,min,vol,max'));
};

main();
