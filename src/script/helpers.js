import {deleteModal} from './createElements.js';

export const counter = (rows) => {
  let counter = 1;

  rows.forEach(row => {
    row.dataset.index = counter;
    row.querySelector('.number').textContent = counter;
    counter++;
  });
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
