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
  'Это лучшее, что могло произойти с нами за всё время'
];

const MESSAGE_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];

// Функция возвращающая случайное целое число из переданного диапазона включительно
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random + доработка

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
getRandomPositiveInteger();

//проверка длины строки
const checkStringLength = (string, length) => string.length <= length;
checkStringLength('');

//возврат случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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

// функция для настройки генерирующих публикаций
const getObjectPublications = () => {
  const getNumberLikes = getRandomPositiveInteger(15, 200);

  return {
    generationIdPublication: getRandomPositiveInteger(1, 25),
    publicationIndex: getRandomPositiveInteger(1, 25),
    publicationUrl: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    publicationDescription: getRandomArrayElement(DESCRIPTION_LIST),
    likesNumber: getNumberLikes,
    commentsPublication: getCommentsPublications(),
  };
};

//генерация публикаций
const generationRandomPublication = Array.from({length: 25}, getObjectPublications);
console.log(generationRandomPublication);


