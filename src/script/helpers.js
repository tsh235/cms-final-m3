import {deleteModal} from './createElements.js';
import elems from './const.js';

const {
  modalSubmit,
  modalLabelFile,
} = elems;

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

export const disableForm = (form) => {
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
  modalSubmit.style.pointerEvents = 'none';
  modalLabelFile.style.pointerEvents = 'none';
};

export const enableForm = (form) => {
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
  modalSubmit.style.pointerEvents = '';
  modalLabelFile.style.pointerEvents = '';
};
