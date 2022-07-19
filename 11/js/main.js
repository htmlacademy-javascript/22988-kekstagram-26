import {generateRandomPublication} from './modules/data.js';

import {renderingPhotoPublication} from './modules/rendering-publications.js';

import './modules/popup-photo.js';

import './modules/validation-form.js';

import './modules/filters.js';

//генерируемые публикации в main
const publications = generateRandomPublication(25);
renderingPhotoPublication(publications);
