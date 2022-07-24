import {getRandomUniqueElements, debounce} from './util.js';
import {renderUserPhotos} from './rendering-publications.js';

const PUBLICATION_FILTER_NUMBER = 10;

const publicationFiltersContainer = document.querySelector('.img-filters');
const defaultFilterButton = publicationFiltersContainer.querySelector('#filter-default');
const randomFilterButton = publicationFiltersContainer.querySelector('#filter-random');
const discussedFilterButton = publicationFiltersContainer.querySelector('#filter-discussed');

//сортировка по убыванию
const compareComments = (publicationA, publicationB) => {
  const rankA = publicationA.comments.length;
  const rankB = publicationB.comments.length;
  return rankB - rankA;
};

//копия массива фильтра по умолчанию
const createDefaultFilter = (publications) => publications.slice();

//реализация рандома для фильтра "случайные"
const createRandomFilter = (publications) => {
  const publicationsArray = publications.slice();
  return getRandomUniqueElements(publicationsArray).slice(0, PUBLICATION_FILTER_NUMBER);
};

//сортировка для фильтра "обсуждаемые"
const createDiscussedFilter = (publications) => {
  const publicationsArray = publications.slice();
  return publicationsArray.sort(compareComments);
};

//переключение активности кнопок фильтров
const removeActiveClass = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

const clearPublicationsContainer = () => {
  const publicationsAll = document.querySelectorAll('.picture');
  publicationsAll.forEach((picture) => {
    picture.remove();
  });
};

const renderpublicationsFilter = (publications) => {
  clearPublicationsContainer();
  renderUserPhotos(publications);
};

//создание и работа фильтров с использование debounce
const setFilters = (publications) => {
  publicationFiltersContainer.classList.remove('img-filters--inactive');
  defaultFilterButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === defaultFilterButton) {
      defaultFilterButton.classList.add('img-filters__button--active');
    }
    renderpublicationsFilter(createDefaultFilter(publications));
  }));
  randomFilterButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === randomFilterButton) {
      randomFilterButton.classList.add('img-filters__button--active');
    }
    renderpublicationsFilter(createRandomFilter(publications));
  }));
  discussedFilterButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === discussedFilterButton) {
      discussedFilterButton.classList.add('img-filters__button--active');
    }
    renderpublicationsFilter(createDiscussedFilter(publications));
  }));
};

export {setFilters};
