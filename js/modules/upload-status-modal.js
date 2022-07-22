import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const successButton = successMessageElement.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessageElement.querySelector('.error__button');
const elementBody = document.querySelector('body');

//открытие(закрытие) сообщения об успешной отправке
const onPopupSuccessClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successModalClose();
  }
};

//проверка на нажатие в область
const successModalAreaClick = (evt) => {
  if (evt.target.matches('.success')) {
    successModalClose();
  }
};

// Открытие и закрытие сообщения о неудачной отправке
const onPopupErrorClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorModalClose();
  }
};

const errorModalAreaClick = (evt) => {
  if (evt.target.matches('.error')) {
    errorModalClose();
  }
};

//отображение сообщения успешной отправки
function successModalOpen() {
  elementBody.append(successMessageElement);
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupSuccessClose);
  document.addEventListener('click', successModalAreaClick);
  successButton.addEventListener('click', successModalClose);
}

//скрытие сообщения успешной отправки
function successModalClose() {
  successMessageElement.remove();
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupSuccessClose);
}

//отображение сообщения с ошибкой отправки
function errorModalOpen () {
  errorMessageElement.style.zIndex = '99';
  elementBody.append(errorMessageElement);
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupErrorClose);
  document.addEventListener('click', errorModalAreaClick);
  errorButton.addEventListener('click', errorModalClose);
}

//скрытие сообщения об ошибке отправки
function errorModalClose () {
  errorMessageElement.remove();
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupErrorClose);
}

export {successModalOpen, errorModalOpen};
