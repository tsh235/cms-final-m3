import {createRow} from './createElements.js';
import elems from './const.js';
import {getData} from './serviceAPI.js';

const {
  API_URL,
  cmsTotalPrice,
  tableBody,
} = elems;

export const renderGoods = async (elem, {goods}) => {
  cmsTotalPrice.textContent = `$ 0`;
  tableBody.textContent = '';
  const rows = await goods.map(createRow);
  elem.append(...rows);
  const totalPrice = await getData(`${API_URL}/api/total`);
  cmsTotalPrice.textContent = `$ ${totalPrice}`;
};
