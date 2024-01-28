import elems from './const.js';
import {deleteModal} from './createElements.js';

const {
  cmsTotalPrice,
} = elems;

export const counter = (rows) => {
  let counter = 1;

  rows.forEach(row => {
    row.dataset.index = counter;
    row.querySelector('.number').textContent = counter;
    counter++;
  });
};

export const updateCounter = (list, index) => {
  const rows = Array.from(list.querySelectorAll('tr'));

  rows.forEach((row, i) => {
    if (i >= index) {
      row.dataset.index -= 1;
      row.querySelector('.number').textContent = row.dataset.index;
    }
  });
};

export const updateTotalPrice = async ({goods}) => {
  let totalPrice = 0;
  goods.forEach(obj => {
    totalPrice += obj.count * obj.price;
  });

  cmsTotalPrice.textContent = `$ ${totalPrice}`;
};

export const debounce = (callback, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

export const showError = () => {
  const goods = document.querySelector('.goods');
  goods.textContent = '';
  const errorText = document.createElement('h2');
  errorText.textContent = 'Что-то пошло не так, попробуйте позже...';
  goods.append(errorText);
};

export const confirmDelete = (row, id) => {
  deleteModal(row, id);
};
