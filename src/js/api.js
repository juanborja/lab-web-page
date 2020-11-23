const BASE_URL = 'http://localhost:8888';

export const getStocks = async (page, size, fields) => {
  try {
    return await axios.get(`${BASE_URL}/api/stocks?page=${page}&size=${size}&fields=${fields}`);
  } catch (e) {
    console.error(e);
  }
};
