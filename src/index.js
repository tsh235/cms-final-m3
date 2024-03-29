import './css/normalize.min.css';
import './css/index.css';

import {formChange, formControl} from './script/control.js';
import {renderGoods} from './script/render.js';
import elems from './script/const.js';
import {getData} from './script/serviceAPI.js';
import {showError} from './script/helpers.js';
import {search} from './script/search.js';

const {
  API_URL,
  modalForm,
  tableBody,
  cmsTotalPrice,
} = elems;

const init = async () => {
  cmsTotalPrice.textContent = `$ 0`;

  const data = await getData(`${API_URL}/api/goods?page=2`, showError);

  if (data) {
    renderGoods(tableBody, data);
    formControl();
    formChange(modalForm);
    search();
  }
};

init();

