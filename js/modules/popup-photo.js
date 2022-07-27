import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

const elementBody = document.querySelector('body');
const fullScreenPublication = document.querySelector('.big-picture');

const photoAddress = fullScreenPublication.querySelector('.big-picture img');
const photoLikes = fullScreenPublication.querySelector('.big-picture__social').querySelector('.likes-count');
const photoDescription = fullScreenPublication.querySelector('.big-picture__social').querySelector('.social__caption');
const buttonCloseModalHandler = fullScreenPublication.querySelector('.big-picture__cancel');

const formComments = fullScreenPublication.querySelector('.social__comments');
const commentTemplate = formComments.querySelector('.social__comment');
const photoComments = fullScreenPublication.querySelector('.social__comment-count').querySelector('.comments-count');

const commentsLoaderHandler = fullScreenPublication.querySelector('.comments-loader');
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
const uploadPublicationComments = () => {
  createComment(commentsOnPublication.slice(commentIndex, commentIndex + COMMENTS_TO_SHOW));
  commentIndex += COMMENTS_TO_SHOW;

  if (commentsOnPublication.length > commentIndex) {
    commentsLoaderHandler.classList.remove('hidden');
  } else {
    commentsLoaderHandler.classList.add('hidden');
    commentIndex = commentsOnPublication.length;
  }
  uploadedComments.textContent = commentIndex;
};

//наполнение информационной части публикации
const createModalPhoto = (photo) => {
  commentIndex = 0;
  commentsLoaderHandler.addEventListener('click', uploadPublicationComments);
  photoAddress.src = photo.url;
  photoLikes.textContent = photo.likes;
  photoComments.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;
  commentsOnPublication = photo.comments;

  formComments.innerHTML = '';
  uploadPublicationComments();
};

//закрытие модального окна публикации
const closefullPublication = () => {
  fullScreenPublication.classList.add('hidden');
  elementBody.classList.remove('modal-open');

  document.removeEventListener('keydown', escButton);
  commentsLoaderHandler.removeEventListener('click', uploadPublicationComments);
  formComments.innerHTML = '';
};

//открытие полного размера модального окна публикации
const openModalPhoto = (photo) => {
  fullScreenPublication.classList.remove('hidden');
  elementBody.classList.add('modal-open');

  buttonCloseModalHandler.addEventListener('click', closefullPublication);
  document.addEventListener('keydown', escButton);


  commentsLoaderHandler.addEventListener('click', uploadPublicationComments);
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
