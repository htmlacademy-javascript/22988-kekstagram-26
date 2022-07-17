import {elementBody} from './popup-photo.js';
import {checkStringLength, isEscapeKey} from './util.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS_AMOUNT = 5;
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;

const uploadInputPublication = document.querySelector('#upload-file');
const overlayModalPublication = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const buttonCloseModalUpload = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

//открытие модального окна публикации загрузки
const openingModalUploaded = () => {
  overlayModalPublication.classList.remove('hidden');
  elementBody.classList.add('modal-open');
  document.addEventListener('keydown', pressingEsc);
};

//закрытие модального окна
const closeModalUploaded = () => {
  overlayModalPublication.classList.add('hidden');
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', pressingEsc);
  uploadForm.reset();
};

//закрытие модального окна по Esc
function pressingEsc (evt) {
  if(isEscapeKey(evt)) {
    closeModalUploaded();
  }
}
//закрытие по клику на кнопку "крестик"
buttonCloseModalUpload.addEventListener('click', () => {
  closeModalUploaded();
});

//загрузка публикаций через upload-file
uploadInputPublication.addEventListener('change', openingModalUploaded);

//отмена обработчика Esc при фокусе в поле хэштегов
hashtagInput.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

//отмена обработчика Esc при фокусе в поле комментариев
commentInput.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

//валидация хэштегов по пунктам
let validationErrorMessage;

const getErrorMessage = () => validationErrorMessage;

const hashtagsValidation = (hashtagInputValue) => {
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

//валидация комментариев публикации
const validationDescription = (descriptionInputValue) => checkStringLength(descriptionInputValue, MAX_LENGTH_COMMENT);

//настройки Pristine для формы загрузки публикации
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-error'
});

//проверка валидации библиотекой Pristine
pristine.addValidator(hashtagInput, hashtagsValidation, getErrorMessage);
pristine.addValidator(commentInput, validationDescription, `Допустимое количество символов ${MAX_LENGTH_COMMENT}`);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    uploadForm.submit();
  }
});
