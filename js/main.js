import {generateRandomPublication} from './modules/data.js';

import {renderingPhotoPublication} from './modules/rendering-publications.js';

import './modules/popup-photo.js';

//генерируемые публикации в main
const publications = generateRandomPublication(25);
renderingPhotoPublication(publications);
