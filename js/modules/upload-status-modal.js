import {isEscapeKey} from './util.js';
import {pressingEsc} from './validation-form.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const successButtonHandler = successMessageElement.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorButtonHandler = errorMessageElement.querySelector('.error__button');
const elementBody = document.querySelector('body');

//открытие(закрытие) сообщения об успешной отправке
const onPopupSuccessClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successModalClose();
  }
};

successMessageElement.addEventListener('click', (evt) => {
  if (evt.target.matches('.success')) {
    successModalClose();
  }
  if (evt.target.matches('.error')) {
    errorModalClose();
  }
});

// Открытие и закрытие сообщения о неудачной отправке
const onPopupErrorClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorModalClose();
  }
};

//отображение сообщения успешной отправки
function successModalOpen() {
  elementBody.append(successMessageElement);
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupSuccessClose);
  successButtonHandler.addEventListener('click', successModalClose);
}

//скрытие сообщения успешной отправки
function successModalClose() {
  successMessageElement.remove();
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupSuccessClose);
}

//отображение сообщения с ошибкой отправки
function errorModalOpen () {
  errorMessageElement.style.zIndex = '50';
  elementBody.append(errorMessageElement);
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupErrorClose);
  document.removeEventListener('keydown', pressingEsc);
  errorButtonHandler.addEventListener('click', errorModalClose);
}

//скрытие сообщения об ошибке отправки
function errorModalClose () {
  errorMessageElement.remove();
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupErrorClose);
  document.addEventListener('keydown', pressingEsc);
}

export {successModalOpen, errorModalOpen};
