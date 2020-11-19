const BASE_URL = 'http://localhost:7000';

const getStocks = async () => {
  try {
    return (await axios.get(`${BASE_URL}/api/stocks`))?.data;
  } catch (e) {
    console.error(e);
  }
};
const createRow = (item) => {
  const tr = document.createElement('tr');
  for (let [key, value] of Object.entries(item)) {
    const td1 = document.createElement('td');
    if (key === 'date') {
      td1.appendChild(
        document.createTextNode(new Intl.DateTimeFormat('es-AR').format(new Date(item[key]))),
      );
    } else {
      td1.appendChild(document.createTextNode(item[key]));
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
      //Remove some values, to avoid show them on the table
      delete stock.createdAt;
      delete stock.updatedAt;
      delete stock.deletedAt;
      tableBody.appendChild(createRow(stock));
    });
  }
};

const main = async () => {
  addStocksToRecord(await getStocks());
};

main();
