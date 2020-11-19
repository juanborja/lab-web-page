const BASE_URL = 'http://localhost:7000';

const getStocks = async () => {
  try {
    return (await axios.get(`${BASE_URL}/api/stocks`))?.data;
  } catch (e) {
    console.error(e);
  }
};
const createLi = (item) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  return li;
};

const addStocksToRecord = (todos) => {
  const ul = document.querySelector('ul');
  if (Array.isArray(todos.rows) && todos.rows.length > 0) {
    todos.rows.map((todo) => {
      ul.appendChild(createLi(todo.id));
    });
  } else if (todos) {
    ul.appendChild(createLi(todos));
  }
};

const main = async () => {
  addStocksToRecord(await getStocks());
};

main();
