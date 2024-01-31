import {updateTotalPrice} from './helpers.js';
import {renderGoods} from './render.js';

import elems from './const.js';
const {tableBody, API_URL} = elems;

export const getData = (url, error) => fetch(url)
    .then(response => {
      if (!response.ok) {
        throw error(new Error(response.status));
      }

      return response.json();
    }).catch(error);

export const addProduct = async (product) =>
  await fetch(`${API_URL}/api/goods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

export const changeProduct = async (product, id) =>
  await fetch(`${API_URL}/api/goods/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

export const deleteProduct = async (row, id) => {
  const response = await fetch(`${API_URL}/api/goods/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    row.remove();
    const data = await getData(`${API_URL}/api/goods?page=2`);
    renderGoods(tableBody, data);
    updateTotalPrice(data);
  } else {
    console.error(response.statusText);
  }
};
