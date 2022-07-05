//отрисовка миниатюр
const containerImages = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderingPhotoPublication = (publications) => {
  const templateFragment = document.createDocumentFragment();
  publications.forEach((Photo) => {
    const newPublication = photoTemplate.cloneNode(true);
    newPublication.querySelector('.picture__img').src = Photo.publicationUrl;
    newPublication.querySelector('.picture__likes').textContent = Photo.likesNumber;
    newPublication.querySelector('.picture__comments').textContent = Photo.commentsPublication.message.length;

    templateFragment.append(newPublication);
    containerImages.append(templateFragment);
  });
};

export {renderingPhotoPublication};
