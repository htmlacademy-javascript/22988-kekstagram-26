import {getRandomArrayElement} from './util.js';
import {getRandomPositiveInteger} from './util.js';

const NAME_LIST = [
  'Арсений',
  'Егор',
  'Алексей',
  'Евгений',
  'Анастасия',
  'Татьяна',
  'Людмила',
  'Павел',
  'Максим',
  'Владимир',
];

const DESCRIPTION_LIST = [
  'Отлично проведённое время',
  'Путь, который мы выбрали',
  'Вот так встречают закаты и рассветы',
  'Это лучшее, что могло произойти с нами за всё время',
  'Лучший день!'
];

const MESSAGE_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Супер!',
  'Об этом можно лишь мечтать'
];

// количество генерируемых миниатюр
const numberGeneratedPublications = 25;

// генерация комментариев
const getCommentsPublications = () => {
  const randomNames = getRandomArrayElement(NAME_LIST);

  return {
    id: getRandomPositiveInteger(1, 350),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE_LIST),
    userName: randomNames
  };
};
const generateRandomComments = () => Array.from({length:getRandomPositiveInteger(1, 25)}, getCommentsPublications);

// функция для настройки генерирующих публикаций
const getObjectPublications = () => {
  const getNumberLikes = getRandomPositiveInteger(15, 200);

  return {
    generationIdPublication: getRandomPositiveInteger(1, 25),
    publicationIndex: getRandomPositiveInteger(1, 25),
    publicationUrl: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    publicationDescription: getRandomArrayElement(DESCRIPTION_LIST),
    likesNumber: getNumberLikes,
    commentsPublication: generateRandomComments()
  };
};

// генерация публикаций
const generateRandomPublication = () => Array.from({length: numberGeneratedPublications}, getObjectPublications);

export {generateRandomPublication};
