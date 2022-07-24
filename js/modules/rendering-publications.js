import {openModalPhoto} from './popup-photo.js';

const containerImages = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const templateFragment = document.createDocumentFragment();
const publicationFilterContainer = document.querySelector('.img-filters');

// рендер одной публикации
function renderingPhotoPublication(photo) {
  const newPublication = photoTemplate.cloneNode(true);
  newPublication.querySelector('img').src = photo.url;
  newPublication.querySelector('.picture__likes').textContent = photo.likes;
  newPublication.querySelector('.picture__comments').textContent = photo.comments.length;

  newPublication.addEventListener('click', () => openModalPhoto(photo));
  templateFragment.appendChild(newPublication);
}

//рендер всех публикаций с сервера
const renderUserPhotos = (publications) => {
  publications.forEach((photo) => {
    renderingPhotoPublication(photo);
  });
  return containerImages.appendChild(templateFragment);
};

//показ фильтров после загрузки публикаций с сервера
publicationFilterContainer.classList.remove('img-filters--inactive');

containerImages.querySelectorAll('.picture').forEach((element) => {element.remove();});


export {renderUserPhotos, renderingPhotoPublication};
