import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

const elementBody = document.querySelector('body');
const fullScreenPublication = document.querySelector('.big-picture');

const photoAddress = fullScreenPublication.querySelector('.big-picture img');
const photoLikes = fullScreenPublication.querySelector('.big-picture__social').querySelector('.likes-count');
const photoDescription = fullScreenPublication.querySelector('.big-picture__social').querySelector('.social__caption');
const buttonCloseModal = fullScreenPublication.querySelector('.big-picture__cancel');

const formComments = fullScreenPublication.querySelector('.social__comments');
const commentTemplate = formComments.querySelector('.social__comment');
const photoComments = fullScreenPublication.querySelector('.social__comment-count').querySelector('.comments-count');

const commentsLoader = fullScreenPublication.querySelector('.comments-loader');
const uploadedComments = document.querySelector('.comments-uploaded');
let commentIndex = 0;
let commentsOnPublication = [];

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

//реализация показа новых комментариев по кнопке "загрузить еще"
const uploadingPublicationComments = () => {
  createComment(commentsOnPublication.slice(commentIndex, commentIndex + COMMENTS_TO_SHOW));
  commentIndex += COMMENTS_TO_SHOW;

  if (commentsOnPublication.length > commentIndex) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
    commentIndex = commentsOnPublication.length;
  }
  uploadedComments.textContent = commentIndex;
};

//наполнение информационной части публикации
const createModalPhoto = (photo) => {
  commentIndex = 0;
  commentsLoader.addEventListener('click', uploadingPublicationComments);
  photoAddress.src = photo.url;
  photoLikes.textContent = photo.likes;
  photoComments.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;
  commentsOnPublication = photo.comments;

  formComments.innerHTML = '';
  uploadingPublicationComments();
};

//закрытие модального окна публикации
const closefullPublication = () => {
  fullScreenPublication.classList.add('hidden');
  elementBody.classList.remove('modal-open');

  document.removeEventListener('keydown', escButton);
  commentsLoader.removeEventListener('click', uploadingPublicationComments);
  formComments.innerHTML = '';
};

//открытие полного размера модального окна публикации
const openModalPhoto = (photo) => {
  fullScreenPublication.classList.remove('hidden');
  elementBody.classList.add('modal-open');

  buttonCloseModal.addEventListener('click', closefullPublication);
  document.addEventListener('keydown', escButton);


  commentsLoader.addEventListener('click', uploadingPublicationComments);
  formComments.innerHTML = '';
  createModalPhoto(photo);
};

//закрытие модального окна по Esc
function escButton (evt) {
  if(isEscapeKey(evt)) {
    closefullPublication();
  }
}

export {openModalPhoto, createComment, elementBody};
