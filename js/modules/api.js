import { showAlert } from './util.js';

const GET_FROM = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_TO = 'https://26.javascript.pages.academ/kekstagram';

//получение данных с сервера
const getData = (onSuccess) => {
  fetch(GET_FROM)
    .then((response) => response.json())
    .then((photo) => onSuccess(photo))
    .catch(() => {
      showAlert('Произошла ошибка. Попробуйте обновить страницу!');
    });
};

//отправка данных на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_TO,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
