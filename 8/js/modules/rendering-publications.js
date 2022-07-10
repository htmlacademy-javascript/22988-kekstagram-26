import {openModalPhoto} from './popup-photo.js';

//отрисовка миниатюр
const containerImages = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderingPhotoPublication = (publications) => {
  const templateFragment = document.createDocumentFragment();
  publications.forEach((photo) => {
    const newPublication = photoTemplate.cloneNode(true);
    newPublication.querySelector('.picture__img').src = photo.publicationUrl;
    newPublication.querySelector('.picture__likes').textContent = photo.likesNumber;
    newPublication.querySelector('.picture__comments').textContent = photo.commentsPublication.length;

    newPublication.addEventListener('click', () => openModalPhoto(photo));

    templateFragment.append(newPublication);
    containerImages.append(templateFragment);
  });
};

export {renderingPhotoPublication};
