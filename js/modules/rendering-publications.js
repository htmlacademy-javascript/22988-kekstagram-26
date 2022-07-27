import {openModalPhoto} from './popup-photo.js';

const containerImages = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const templateFragment = document.createDocumentFragment();

// рендер одной публикации
function renderingPhotoPublication(photo) {
  const newPublicationHandler = photoTemplate.cloneNode(true);
  newPublicationHandler.querySelector('img').src = photo.url;
  newPublicationHandler.querySelector('.picture__likes').textContent = photo.likes;
  newPublicationHandler.querySelector('.picture__comments').textContent = photo.comments.length;

  newPublicationHandler.addEventListener('click', () => openModalPhoto(photo));
  templateFragment.appendChild(newPublicationHandler);
}

//рендер всех публикаций с сервера
const renderUserPhotos = (publications) => {
  publications.forEach((photo) => {
    renderingPhotoPublication(photo);
  });
  return containerImages.appendChild(templateFragment);
};

export {renderUserPhotos, renderingPhotoPublication};
