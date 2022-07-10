import {isEscapeKey} from './util.js';

const elementBody = document.querySelector('body');
const fullScreenPublication = document.querySelector('.big-picture');

const photoAddress = fullScreenPublication.querySelector('.big-picture img');
const photoLikes = fullScreenPublication.querySelector('.big-picture__social').querySelector('.likes-count');
const photoDescription = fullScreenPublication.querySelector('.big-picture__social').querySelector('.social__caption');
const buttonCloseModal = fullScreenPublication.querySelector('.big-picture__cancel');

const formComments = fullScreenPublication.querySelector('.social__comments');
const commentTemplate = formComments.querySelector('.social__comment');
const photoComments = fullScreenPublication.querySelector('.social__comment-count').querySelector('.comments-count');


//временное скрытие счетчиков
const commentsCount = fullScreenPublication.querySelector('.social__comment-count');
const commentsLoader = fullScreenPublication.querySelector('.comments-loader');

commentsCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

//наполнение комментарий для каждой публикации
const createComment = (commentList) => {
  const commentsFragment = document.createDocumentFragment();
  commentList.forEach((comment) => {
    const commentItem = commentTemplate.cloneNode(true);
    const authorComment = commentItem.querySelector('.social__picture');
    authorComment.src = comment.avatar;
    authorComment.alt = comment.userName;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentItem);
  });
  formComments.append(commentsFragment);
};

//наполнение информационной части публикации
const createModalPhoto = (photo) => {
  photoAddress.src = photo.publicationUrl;
  photoLikes.textContent = photo.likesNumber;
  photoComments.textContent = photo.commentsPublication.length;
  photoDescription.textContent = photo.publicationDescription;

  createComment(photo.commentsPublication);
};

//закрытие модального окна публикации
const closefullPublication = () => {
  fullScreenPublication.classList.add('hidden');
  elementBody.classList.remove('modal-open');
  document.removeEventListener('keydown', escButton);

  formComments.innerHTML = '';
};

//открытие полного размера модального окна публикации
const openModalPhoto = (photo) => {
  fullScreenPublication.classList.remove('hidden');
  elementBody.classList.add('modal-open');

  buttonCloseModal.addEventListener('click', closefullPublication);
  document.addEventListener('keydown', escButton);
  formComments.innerHTML = '';

  createModalPhoto(photo);
};

//закрытие модального окна по Esc
function escButton (evt) {
  if(isEscapeKey(evt)) {
    closefullPublication();
  }
}

export {openModalPhoto, createComment};
// console.log();
