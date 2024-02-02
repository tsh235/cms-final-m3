import {addProduct, changeProduct} from './serviceAPI.js';
import elems from './const.js';
import {getData} from './serviceAPI.js';

const {
  API_URL,
  overlay,
  btnAddGoods,
  modalTitle,
  modalVendorIdWrapper,
  modalForm,
  categoryList,
  fileImage,
  noImage,
} = elems;

overlay.classList.remove('active');

const modalLabelFile = document.querySelector('.modal__label_file');
const modalSubmit = document.querySelector('.modal__submit');
const errorText = document.createElement('p');
const imageGoods = document.createElement('img');
errorText.textContent = '';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

export const closeModal = () => {
  imageGoods.remove();
  if (modalForm.querySelector('.error-modal')) {
    modalForm.querySelector('.error-modal').remove();
  }
  overlay.classList.remove('active');
};

const fillingProduct = (data) => {
  const {
    id,
    title,
    count,
    category,
    description,
    image,
    price,
    units,
    discount,
  } = data;

  let priceDiscount = price;
  discount === 0 ? priceDiscount :
    priceDiscount -= Math.round(price * (discount / 100));

  modalVendorIdWrapper.innerHTML =
    `id: <span class="vendor-code__id">${id}</span>`;
  modalForm.title.value = title;
  modalForm.category.value = category;
  modalForm.description.value = description;
  modalForm.units.value = units;
  modalForm.count.value = +count;
  modalForm.price.value = +price;
  modalForm.total.value = `$${count * priceDiscount}`;

  if (discount !== 0) {
    modalForm.discount.value = discount;
    modalForm.discount_check.checked = true;
    modalForm.discount.disabled = false;
  } else {
    modalForm.discount.value = '';
    modalForm.discount_check.checked = false;
    modalForm.discount.disabled = true;
  }

  if (image !== noImage) {
    imageGoods.style.cssText = `
      width: 200px;
      height: 200px;
      object-fit: contain;
      object-position: center;
      grid-column: 1/-1;
      justify-self: center;
    `;
    imageGoods.src = `${API_URL}/${image}`;
    modalLabelFile.insertAdjacentElement('afterend', imageGoods);
  }
};

export const openModal = async (data = {}) => {
  const categories = await getData(`${API_URL}/api/categories`);

  categories.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    categoryList.append(option);
  });

  let modalTitleText = '';
  let modalSubmitText = '';
  if (Object.entries(data).length !== 0) {
    fillingProduct(data);
    modalTitleText = 'Изменение товара';
    modalSubmitText = 'Изменить товар';
  } else {
    modalForm.discount_check.checked = false;
    modalForm.discount.disabled = true;
    modalVendorIdWrapper.textContent = '';
    modalTitleText = 'Добавление товара';
    modalSubmitText = 'Добавить товар';
  }

  overlay.classList.add('active');
  modalTitle.textContent = modalTitleText;
  modalSubmit.textContent = modalSubmitText;

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay || target.closest('.modal__close')) {
      closeModal();
      modalForm.total.textContent = `$ 0`;
      modalForm.reset();
    }
  });
};

btnAddGoods.addEventListener('click', () => {
  modalForm.total.textContent = `$ 0`;
  openModal();
});

let priceDiscount = 0;

export const formChange = (form) => {
  form.discount_check.addEventListener('change', () => {
    if (form.discount.disabled === true) {
      form.discount.disabled = false;
    } else {
      form.discount.disabled = true;
      form.discount.value = '';
    }
  });

  form.count.addEventListener('change', () => {
    if (form.count.value < 0) form.count.value = 0;

    form.discount.value > 0 ?
      priceDiscount = form.price.value -
        form.price.value * form.discount.value / 100 :
      priceDiscount = form.price.value;

    modalForm.total.textContent = `$ ${form.count.value * priceDiscount}`;
  });

  form.price.addEventListener('change', () => {
    if (form.price.value < 0) form.price.value = 0;

    form.discount.value > 0 ?
      priceDiscount = form.price.value -
        form.price.value * form.discount.value / 100 :
      priceDiscount = form.price.value;

    modalForm.total.textContent = `$ ${form.count.value * priceDiscount}`;
  });

  form.discount.addEventListener('change', () => {
    if (form.discount.value < 0) form.discount.value = 0;

    priceDiscount =
      form.price.value - form.price.value * form.discount.value / 100;

    modalForm.total.textContent = `$ ${form.count.value * priceDiscount}`;
  });

  fileImage.addEventListener('change', () => {
    if (fileImage.files.length > 0) {
      const src = URL.createObjectURL(fileImage.files[0]);

      if (fileImage.files[0].size > 1048576) {
        imageGoods.remove();
        errorText.style.cssText = `
          grid-area: .;
          color: #D80101;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        `;
        errorText.textContent = 'Изображение не должно превышать размер 1 Мб';
        modalLabelFile.insertAdjacentElement('beforebegin', errorText);
      } else {
        errorText.textContent = '';
        imageGoods.style.cssText = `
          width: 200px;
          height: 200px;
          object-fit: contain;
          object-position: center;
          grid-column: 1/-1;
          justify-self: center;
        `;
        imageGoods.src = src;
        modalLabelFile.insertAdjacentElement('afterend', imageGoods);
      }
    }
  });
};

export const formControl = () => {
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    let id = 0;
    if (modalVendorIdWrapper.textContent !== '') {
      id = parseInt(
          modalVendorIdWrapper.querySelector('.vendor-code__id').textContent);
    }

    data.image = await toBase64(data.image);

    if (+id !== 0) {
      await changeProduct(data, id);
    } else {
      await addProduct(data);
    }
  });
};
