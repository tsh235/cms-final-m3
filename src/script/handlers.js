import elems from './const.js';
import {updateTotalPrice} from './helpers.js';
import {renderGoods} from './render.js';
import {getData} from './serviceAPI.js';

const {tableBody, API_URL} = elems;

export const addProduct = async (product, id) => {
  let url;
  const options = {
    method: '',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  };

  if (+id === 0) {
    url = `${API_URL}/api/goods`;
    options.method = 'POST';
  } else {
    url = `${API_URL}/api/goods/${id}`;
    options.method = 'PATCH';
  }

  return await fetch(url, options);
};

const deleteProduct = async (id) => await fetch(`${API_URL}/api/goods/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deleteRow = async (row, id) => {
  const response = await deleteProduct(id);

  if (response.ok) {
    row.remove();
    const data = await getData(`${API_URL}/api/goods?page=2`);
    renderGoods(tableBody, data);
    updateTotalPrice(data);
  } else {
    console.error(response.statusText);
  }
};

export const openImage = (listRows) => {
  listRows.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_pic')) {
      const imageUrl = target.dataset.pic;
      const windowWidth = 800;
      const windowHeight = 600;
      const windowFeatures = `width=${windowWidth}, height=${windowHeight}`;

      const newWindow = window.open('about:blank', '', windowFeatures);
      newWindow.moveTo(screen.width / 2 - windowWidth / 2,
          screen.height / 2 - windowHeight / 2);

      newWindow.focus();

      newWindow.document.write(`
        <img src="${API_URL}/${imageUrl}" alt="Изображение"/>
      `);
    }
  });
};
