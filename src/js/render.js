import { getStocks } from './api.js';

let page = 0;
let size = 10;
let pages = 0;
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
  }
  return tr;
};

const addStocksToRecord = (stocks) => {
  const tableBody = document.getElementById('tableRecordBody');
  tableBody.textContent = '';
  if (Array.isArray(stocks.rows) && stocks.rows.length > 0) {
    stocks.rows.map((stock) => {
      tableBody.appendChild(createRow(stock));
    });
  }
};

const createPagination = (count) => {
  const paginator = document.getElementById('paginator');
  paginator.textContent = '';
  pages = Math.ceil(count / 10);
  for (let i = 0; i < pages; i++) {
    const li = document.createElement('li');
    li.setAttribute('class', 'page-item');
    const a = document.createElement('a');
    if (page === i) {
      a.setAttribute('class', 'page-link activePag');
    } else {
      a.setAttribute('class', 'page-link');
    }

    a.setAttribute('href', '#');
    a.setAttribute('id', (i + 1).toString());
    a.appendChild(document.createTextNode((i + 1).toString()));
    li.appendChild(a);
    paginator.appendChild(li);
  }
};
const apiWrapper = async (page, size) => {
  const result = await getStocks(page, size, 'id,min,vol,max');
  createPagination(result?.data.count);
  addStocksToRecord(result?.data);
};
const shouldBlockPreviousNext = (page) => {
  const previous = document.getElementById('previousLi');
  if (page === 0) {
    previous.setAttribute('class', 'page-item disabled');
    previous.disabled = true;
  } else {
    previous.setAttribute('class', 'page-item');
    previous.disabled = false;
  }
  const next = document.getElementById('NextLi');
  if (page === pages - 1) {
    next.setAttribute('class', 'page-item disabled');
    next.disabled = true;
  } else {
    next.setAttribute('class', 'page-item');
    next.disabled = false;
  }
};
const main = async () => {
  apiWrapper(page, size);
  shouldBlockPreviousNext(page);
  window.addEventListener('click', (event) => {
    if (event.target.disabled) {
      // or this.disabled
      return;
    }
    var elements = document.getElementsByClassName('page-link');

    switch (event.target.id) {
      case 'next':
        page = page + 1;
        shouldBlockPreviousNext(page);
        break;
      case 'previous':
        page = page - 1;
        shouldBlockPreviousNext(page);
        break;
      default:
        const pageAux = Number(event.target.id);
        console.log(pageAux);
        page = pageAux - 1;
        shouldBlockPreviousNext(page);
        break;
    }

    apiWrapper(page, size);
  });
};

main();
