import elems from './const.js';
import {deleteProduct} from './serviceAPI.js';
import {confirmDelete, disableForm, enableForm} from './helpers.js';
import {getData} from './serviceAPI.js';
import {openModal} from './control.js';

const {
  API_URL,
  noImage,
  modalForm,
} = elems;

export const createRow = (
    {id, count, title, category, units, price, image, discount},
    rowCount,
) => {
  rowCount += 1;

  discount === 0 ? price : price -= Math.round(price * (discount / 100));

  const tr = document.createElement('tr');
  tr.classList.add('table__body-row');
  tr.dataset.count = rowCount;
  tr.innerHTML = `
    <td class="table__cell">${rowCount}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
      <span class="table__cell-id">id: ${id}</span>
      ${title}</td>
    <td class="table__cell table__cell_left">${category}</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell table__cell_total" data-total="${price * count}">
      $${price * count}
    </td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"
        data-pic="${image}"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  `;

  const imgBtn = tr.querySelector('.table__btn_pic');
  if (imgBtn.dataset.pic === noImage) {
    imgBtn.classList.remove('table__btn_pic');
    imgBtn.classList.add('table__btn_nopic');
    imgBtn.title = 'Картинка отсутствует';
  }

  imgBtn.addEventListener('click', () => {
    const imageUrl = imgBtn.dataset.pic;
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
  });

  const btnEdit = tr.querySelector('.table__btn_edit');
  const btnDelete = tr.querySelector('.table__btn_del');

  btnEdit.addEventListener('click', async () => {
    const data = await getData(`${API_URL}/api/goods/${id}`);
    openModal(data);
  });

  btnDelete.addEventListener('click', () => {
    confirmDelete(tr, id);
  });

  return tr;
};

export const deleteModal = (row, id) => {
  const deleteModalOverlay = document.createElement('div');
  deleteModalOverlay.style.cssText = `
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    background: rgba(255, 255, 255, 0.8);
  `;

  deleteModalOverlay.addEventListener('click', ({target}) => {
    if (target === deleteModalOverlay || target.closest('.modal__close')) {
      deleteModalOverlay.remove();
    }
  });

  const deleteModalWindow = document.createElement('div');
  deleteModalWindow.classList.add('overlay__modal', 'modal');

  deleteModalWindow.insertAdjacentHTML('beforeend', `
    <button class="modal__close">
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
    </button>

    <div class="modal_top">
      <h2 class="modal__title">Вы действительно хотите удалить товар?</h2>
    </div>
  `);

  const confirmBtns = document.createElement('div');

  confirmBtns.style.cssText = `
    margin-top: 40px;
    display: flex;
    gap: 20px;
  `;

  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('modal__submit');
  confirmBtn.textContent = 'Удалить';

  confirmBtn.addEventListener('click', () => {
    deleteModalOverlay.remove();
    deleteProduct(row, id);
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('modal__submit');
  cancelBtn.style.cssText = `
    background-color: #fff;
    border: 1px solid #6D5BD0;
    color: #6D5BD0;
  `;
  cancelBtn.textContent = 'Отмена';

  cancelBtn.addEventListener('click', () => {
    deleteModalOverlay.remove();
  });

  confirmBtns.append(confirmBtn, cancelBtn);
  deleteModalWindow.insertAdjacentElement('beforeend', confirmBtns);
  deleteModalOverlay.append(deleteModalWindow);
  document.body.append(deleteModalOverlay);
};

export const errorModal = err => {
  disableForm(modalForm);

  const modal = document.createElement('div');
  modal.style.cssText = `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 350px;
    height: 350px;
    display: flex;
    background-color: #F2F0F9;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  `;

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 30px;
    background-color: transparent;
    border: none;
    color: #6E6893;
  `;

  closeBtn.innerHTML = `
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
  `;

  closeBtn.addEventListener('click', () => {
    modal.remove();
    enableForm(modalForm);
  });

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 33px;
    color:#6E6893;
    font-family: Inter;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-align: center;
    text-transform: uppercase;
  `;
  modalContent.innerHTML = `
    <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;

  const modalText = document.createElement('p');

  if (err.status >= 400 && err.status <= 499 || err.status >= 500) {
    modalText.textContent = `Ошибка сохранения данных. Попробуйте позже.`;
  } else {
    modalText.textContent = 'Что-то пошло не так';
  }

  modalContent.insertAdjacentElement('beforeend', modalText);
  modal.append(modalContent, closeBtn);
  modalForm.insertAdjacentElement('beforeend', modal);
};
