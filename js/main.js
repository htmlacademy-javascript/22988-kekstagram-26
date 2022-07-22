import {generateRandomPublication} from './modules/data.js';

import {renderingPhotoPublication} from './modules/rendering-publications.js';

import { setPublicationFormSubmit, closeModalUploaded } from './modules/validation-form.js';

import { getData } from './modules/api.js';

import './modules/popup-photo.js';

import './modules/validation-form.js';

import './modules/filters.js';

import './modules/upload-status-modal.js';

//генерируемые публикации в main
const publications = generateRandomPublication(25);
renderingPhotoPublication(publications);

//отрисовка публикаций с сервера
getData(renderingPhotoPublication);

setPublicationFormSubmit(closeModalUploaded);
