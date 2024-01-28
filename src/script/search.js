import {debounce} from './helpers.js';
import elems from './const.js';
import {renderGoods} from './render.js';
import {getData} from './serviceAPI.js';

const {
  tableBody,
  panelSearch,
  API_URL,
} = elems;


const loadSearch = async (value) => {
  const data = await getData(`${API_URL}/api/goods?search=${value}`);

  renderGoods(tableBody, data);
};


export const search = () => {
  const valueSearch = () => {
    loadSearch(panelSearch.value);
  };
  panelSearch.addEventListener('keyup', debounce(valueSearch, 300));
};


