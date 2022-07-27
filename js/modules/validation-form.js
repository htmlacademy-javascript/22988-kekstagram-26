import {elementBody} from './popup-photo.js';
import {checkStringLength, isEscapeKey} from './util.js';
import {makeScalable, makeUnScalable, enableFilters, disableFilters} from './filters.js';
import {sendData} from './api.js';
import {successModalOpen, errorModalOpen} from './upload-status-modal.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS_AMOUNT = 5;
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;

const uploadInputPublicationHandler = document.querySelector('#upload-file');
const overlayModalPublication = document.querySelector('.img-upload__overlay');
const uploadFormHandler = document.querySelector('.img-upload__form');
const onButtonCloseModalUpload = document.querySelector('#upload-cancel');
const hashtagInputHandler = document.querySelector('.text__hashtags');
const commentInputHandler = uploadFormHandler.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

//настройки Pristine для формы загрузки публикации
const pristine = new Pristine(uploadFormHandler, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-error'
});

//валидация хэштегов по пунктам
let validationErrorMessage;

const getErrorMessage = () => validationErrorMessage;

const validateHashtags = (hashtagInputValue) => {
  const hashtags = hashtagInputValue.split(' ');

  if(hashtagInputValue === '') {
    return true;
  }

  if(hashtagInputValue.endsWith(' ')) {
    validationErrorMessage = 'После хэштега должен отсутствовать пробел';
    return false;
  }

  if (hashtags.includes('')) {
    validationErrorMessage = 'Допускается лишь один пробел между хэштегами';
    return false;
  }

  if (!hashtags.every((hashtag) => hashtag.startsWith('#'))) {
    validationErrorMessage = 'Хэштег должен начинаться с #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag === '#')) {
    validationErrorMessage = 'Хэштег не может состоять только из #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag.length > MAX_LENGTH_HASHTAG)) {
    validationErrorMessage = `Максимальная длина хэштега - ${MAX_LENGTH_HASHTAG} символов`;
    return false;
  }

  if (!hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag))) {
    validationErrorMessage = 'Хэштег содержит запрещенные символы';
    return false;
  }

  if ((new Set(hashtags.map((hashtag) => hashtag.toLowerCase()))).size !== hashtags.length) {
    validationErrorMessage = 'Хэштеги не должны повторяться';
    return false;
  }

  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    validationErrorMessage = `Максимальное количество хэштегов - ${MAX_HASHTAGS_AMOUNT}`;
    return false;
  }

  return true;
};

//открытие модального окна публикации загрузки
const openModalUploaded = () => {
  overlayModalPublication.classList.remove('hidden');
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', pressingEsc);
  enableFilters();
  makeScalable();
  hashtagInputHandler.addEventListener('keydown', onKeydownEscape);
  commentInputHandler.addEventListener('keydown', onKeydownEscape);
};

function onKeydownEscape(evt) {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

//загрузка публикаций через upload-file
uploadInputPublicationHandler.addEventListener('change', openModalUploaded);

//закрытие модального окна
const closeModalUploaded = () => {
  overlayModalPublication.classList.add('hidden');
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', pressingEsc);
  hashtagInputHandler.removeEventListener('keydown', onKeydownEscape);
  commentInputHandler.removeEventListener('keydown', onKeydownEscape);

  disableFilters();
  makeUnScalable();
  uploadFormHandler.reset();
  pristine.reset();
};

//закрытие модального окна по Esc
function pressingEsc (evt) {
  if(isEscapeKey(evt)) {
    closeModalUploaded();
  }
}
//закрытие по клику на кнопку "крестик"
onButtonCloseModalUpload.addEventListener('click', () => {
  closeModalUploaded();
});

//валидация комментариев публикации
const validateDescription = (descriptionInputValue) => checkStringLength(descriptionInputValue, MAX_LENGTH_COMMENT);

//проверка валидации библиотекой Pristine
pristine.addValidator(hashtagInputHandler, validateHashtags, getErrorMessage);
pristine.addValidator(commentInputHandler, validateDescription, `Допустимое количество символов ${MAX_LENGTH_COMMENT}`);

//блокировка кнопки при отправке
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

//разблокировка кнопки
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать!';
};

const setPublicationFormSubmit = (onSuccess) => {
  uploadFormHandler.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          successModalOpen();
        },
        () => {
          unblockSubmitButton();
          errorModalOpen();
        },
        new FormData(evt.target),
      );
    }
  });
};

uploadInputPublicationHandler.addEventListener('change', openModalUploaded);

export {setPublicationFormSubmit, openModalUploaded, closeModalUploaded, pressingEsc};
