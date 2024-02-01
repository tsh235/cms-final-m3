const API_URL = 'https://horn-succulent-tin.glitch.me';
const overlay = document.querySelector('.overlay');
const modalTitle = overlay.querySelector('.modal__title');
const modalVendorIdWrapper = overlay.querySelector('.vendor-code__wrapper');
const modalForm = overlay.querySelector('.modal__form');
const categoryList = modalForm.querySelector('#category-list');
const fileImage = modalForm.querySelector('#image');
const btnAddGoods = document.querySelector('.panel__add-goods');
const tableBody = document.querySelector('.table__body');
const cmsTotalPrice = document.querySelector('.cms__total-price');
const panelSearch = document.querySelector('.panel__input');
const noImage = 'image/notimage.jpg';

export default {
  API_URL,
  overlay,
  modalTitle,
  modalVendorIdWrapper,
  modalForm,
  categoryList,
  btnAddGoods,
  tableBody,
  cmsTotalPrice,
  fileImage,
  noImage,
  panelSearch,
};
