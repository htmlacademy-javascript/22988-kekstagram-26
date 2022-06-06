//Получение случайного целого числа из переданного диапазона
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
getRandomInt(0, 10);

//Проверка максимальной длины строки

function checkingMaxString(string, maxLength) {
  if (string.length <= maxLength) {
    console.log('Строка проходит по длине');
  } else {
    console.log('Строка выходит за пределы допустимой длины');
  }
  // string.length <= maxLength ? console.log('Строка проходит по длине') : console.log('Строка выходит за пределы допустимой длины');
}

checkingMaxString('hello World!', 140);
