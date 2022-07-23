
import {renderUserPhotos} from './modules/rendering-publications.js';

import { setPublicationFormSubmit, closeModalUploaded} from './modules/validation-form.js';

import { getData } from './modules/api.js';

import './modules/popup-photo.js';

import './modules/validation-form.js';

import './modules/filters.js';

import './modules/upload-status-modal.js';

//отрисовка публикаций с сервера
getData((publications) => {
  renderUserPhotos(publications);
});

setPublicationFormSubmit(closeModalUploaded);
