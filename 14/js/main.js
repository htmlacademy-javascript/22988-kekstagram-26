import './modules/popup-photo.js';

import './modules/validation-form.js';

import './modules/filters.js';

import './modules/upload-status-modal.js';

import './modules/sorting-filters.js';

import './modules/upload-image.js';

import {renderUserPhotos} from './modules/rendering-publications.js';

import { setPublicationFormSubmit, closeModalUploaded} from './modules/validation-form.js';

import { getData } from './modules/api.js';

import {setFilters} from './modules/sorting-filters.js';

//отрисовка публикаций с сервера
getData((publications) => {
  renderUserPhotos(publications);
  setFilters(publications);
});

setPublicationFormSubmit(closeModalUploaded);
