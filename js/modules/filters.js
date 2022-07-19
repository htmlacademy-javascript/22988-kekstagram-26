import { mathClamp } from './util.js';

//натсройки фильтра публикации
const PUBLICATION_SCALE_STEP = 25;
const PREVIEW_MIN_VALUE = 25;
const PREVIEW_MAX_VALUE = 100;
const PREVIEW_DEFAULT_VALUE = 100;

//масштаб публикаций
const innerBlockScale = document.querySelector('.scale');
const ScaleInput = document.querySelector('.scale__control--value');
const previewPublication = document.querySelector('.img-upload__preview img');
const publicationEffectFieldset = document.querySelector('.img-upload__effects');
const effectSliderInput = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level__slider');
let effectValueSlider = null;

//настройки фильтров
const filtersSettings = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    }
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    }
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    format: {
      to(value) { return `${value}%`; },
      from(value) { return parseFloat(value); }
    }
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to(value) { return `${value.toFixed(1)}px`; },
      from(value) { return parseFloat(value); }
    }
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    }
  }
};

//доступные эффекты
const effectFilterPublication = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

//отображение слайдера при переключении эффектов публикации
const showEffectSlider = () => {
  effectSliderContainer.removeAttribute('hidden', true);
};

//скрытие слайдера (для отображения оригинала публикации)
const hideEffectSlider = () => {
  effectSliderContainer.setAttribute('hidden', true);
};

//выбор определённого эффекта
const updatePublicationClassName = (filterName) => {
  previewPublication.className = (filterName) ? `effects__preview--${filterName}` : '';
};

//применение определённого фильтра для публикации
const updatePublicationEffect = (effectName, effectValue) => {
  previewPublication.style.filter = (effectName) ? `${effectFilterPublication[effectName]}(${effectValue})` : '';
};

//при выборе фильтра реализация сброса его интенсивности по дефолту
function onFilterChange(evt) {
  const filterName = evt.target.value;
  hideEffectSlider();//скрытие слайдера
  updatePublicationClassName(filterName);
  updatePublicationEffect();
  const sliderSettings = filtersSettings[filterName];
  if (sliderSettings) {
    effectValueSlider.updateOptions(sliderSettings);
    effectValueSlider.set(sliderSettings.max);
    showEffectSlider();
  }
}

//включение фильтров
function enableFilters() {
  effectSliderInput.value = 1;
  hideEffectSlider();
  effectValueSlider = noUiSlider.create(
    effectSliderContainer,
    {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to(value) { return value.toFixed(1); },
        from(value) { return parseFloat(value); }
      }
    }
  );

  effectValueSlider.on('update', () => {
    const effectValue = effectValueSlider.get();
    const effectName = document.querySelector('.img-upload__form').effect.value;
    effectSliderInput.value = effectValue;
    if (document.querySelector('.img-upload__form').effect.value === 'none') {
      return;
    }
    updatePublicationEffect(effectName, effectValue);
  });
  publicationEffectFieldset.addEventListener('change', onFilterChange);
}

//отключение фильтров
function disableFilters() {
  publicationEffectFieldset.removeEventListener('change', onFilterChange);
  updatePublicationClassName();
  updatePublicationEffect();
  document.querySelector('.img-upload__form').effect.value = 'none';
  effectValueSlider.destroy();
}

//текущее значение поля масштабирования
function getCurrentScale() {
  return parseFloat(ScaleInput.value);
}

//масштабирование публикации
function setPreviewScale(scale) {
  scale = mathClamp(scale, PREVIEW_MIN_VALUE, PREVIEW_MAX_VALUE);
  ScaleInput.value = `${scale}%`;
  previewPublication.style.transform = `scale(${scale}%)`;
}

//нажатие кнопок масштабирование публикаций
function buttonScaleClick(evt) {
  const currentScale = getCurrentScale();
  if (evt.target.classList.contains('scale__control--smaller')) {
    return setPreviewScale(currentScale - (PUBLICATION_SCALE_STEP));
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    return setPreviewScale(currentScale + (PUBLICATION_SCALE_STEP));
  }
}

function makeScalable() {
  setPreviewScale(PREVIEW_DEFAULT_VALUE);
  innerBlockScale.addEventListener('click', buttonScaleClick);
}

function makeUnScalable() {
  setPreviewScale(PREVIEW_DEFAULT_VALUE);
  innerBlockScale.removeEventListener('click', buttonScaleClick);
}

export {makeScalable, makeUnScalable, enableFilters, disableFilters};
