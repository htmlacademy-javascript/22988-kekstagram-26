// Функция возвращающая случайное целое число из переданного диапазона включительно
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
getRandomPositiveInteger();

//возврат случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//проверка длины строки
const checkStringLength = (string, length) => string.length <= length;

//закрытие по ESC
const isEscapeKey = (evt) => (evt.key === 'Escape');

export {getRandomPositiveInteger, getRandomArrayElement, isEscapeKey, checkStringLength};
