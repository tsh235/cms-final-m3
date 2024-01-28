// ! удалить этот импорт перед build
// import './index.html';
// ---

// здесь прописываются файлы из папки со стилями css
import './css/normalize.min.css';
import './css/index.css';

import {formChange, modalControl} from './script/control.js';
import {renderGoods} from './script/render.js';
import {openImage} from './script/handlers.js';
import elems from './script/const.js';
import {getData} from './script/serviceAPI.js';
import {showError} from './script/helpers.js';
import {search} from './script/search.js';

const {
  API_URL,
  overlay,
  modalForm,
  tableBody,
  cmsTotalPrice,
} = elems;

const init = async () => {
  overlay.classList.remove('active');
  cmsTotalPrice.textContent = `$ 0`;

  const data = await getData(`${API_URL}/api/goods?page=2`, showError);

  if (data) {
    modalControl(modalForm);
    renderGoods(tableBody, data);
    formChange(modalForm);
    openImage(tableBody);
    search();
  }
};

init();

