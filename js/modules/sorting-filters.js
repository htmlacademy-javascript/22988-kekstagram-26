import {getRandomUniqueElements, debounce} from './util.js';
import {renderUserPhotos} from './rendering-publications.js';

const PUBLICATION_FILTER_NUMBER = 10;

const publicationFiltersContainer = document.querySelector('.img-filters');
const defaultFilterButtonHundler = publicationFiltersContainer.querySelector('#filter-default');
const randomFilterButtonHandler = publicationFiltersContainer.querySelector('#filter-random');
const discussedFilterButtonHandler = publicationFiltersContainer.querySelector('#filter-discussed');

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

const renderPublicationsFilter = (publications) => {
  clearPublicationsContainer();
  renderUserPhotos(publications);
};

//создание и работа фильтров с использование debounce
const setFilters = (publications) => {
  publicationFiltersContainer.classList.remove('img-filters--inactive');
  const debouncedChangeFilter = debounce(changeFilter);
  defaultFilterButtonHundler.addEventListener('click', (evt) => {
    debouncedChangeFilter(publications, evt);
  });
  randomFilterButtonHandler.addEventListener('click', (evt) => {
    debouncedChangeFilter(publications, evt);
  });
  discussedFilterButtonHandler.addEventListener('click', (evt) => {
    debouncedChangeFilter(publications, evt);
  });
};

function changeFilter(publications, evt) {
  removeActiveClass();
  if (evt.target === defaultFilterButtonHundler) {
    defaultFilterButtonHundler.classList.add('img-filters__button--active');
    renderPublicationsFilter(createDefaultFilter(publications));
  }
  if (evt.target === randomFilterButtonHandler) {
    randomFilterButtonHandler.classList.add('img-filters__button--active');
    renderPublicationsFilter(createRandomFilter(publications));
  }
  if (evt.target === discussedFilterButtonHandler) {
    discussedFilterButtonHandler.classList.add('img-filters__button--active');
    renderPublicationsFilter(createDiscussedFilter(publications));
  }
}

export {setFilters};
