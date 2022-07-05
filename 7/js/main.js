import {generateRandomPublication} from './modules/data.js';

import {renderingPhotoPublication} from './modules/rendering-publications.js';

//генерируемые публикации в main
const publications = generateRandomPublication(25);

renderingPhotoPublication(publications);
