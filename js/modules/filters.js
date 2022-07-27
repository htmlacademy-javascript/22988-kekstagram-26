import { mathNumericRange} from './util.js';

//натсройки фильтра публикации
const PUBLICATION_SCALE_STEP = 25;
const PREVIEW_MIN_VALUE = 25;
const PREVIEW_MAX_VALUE = 100;
const PREVIEW_DEFAULT_VALUE = 100;

//масштаб публикаций
const innerBlockScaleHandler = document.querySelector('.scale');
const ScaleInput = document.querySelector('.scale__control--value');
const rangeSlider = document.querySelector('.img-upload__effect-level'); // слайдер для эффектов
const form = document.querySelector ('.img-upload__form');
const previewPublication = document.querySelector('.img-upload__preview img');
const onPublicationEffectFieldset = document.querySelector('.img-upload__effects');
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
  effectSliderContainer.hidden = false;
  rangeSlider.classList.remove('hidden');
};

//скрытие слайдера (для отображения оригинала публикации)
const hideEffectSlider = () => {
  effectSliderContainer.hidden = true;
  rangeSlider.classList.add('hidden');
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
const onFilterChange = (evt) => {
  const filterName = evt.target.value;
  hideEffectSlider();
  updatePublicationClassName(filterName);
  updatePublicationEffect();
  const sliderSettings = filtersSettings[filterName];
  if (sliderSettings) {
    effectValueSlider.updateOptions(sliderSettings);
    effectValueSlider.set(sliderSettings.max);
    showEffectSlider();
  }
};

//включение фильтров
const enableFilters = () => {
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
    const effectName = form.effect.value;
    effectSliderInput.value = effectValue;
    if (effectName === 'none') {
      return;
    }
    updatePublicationEffect(effectName, effectValue);
  });
  onPublicationEffectFieldset.addEventListener('change', onFilterChange);
};

//отключение фильтров
const disableFilters = () => {
  onPublicationEffectFieldset.removeEventListener('change', onFilterChange);
  updatePublicationClassName();
  updatePublicationEffect();
  form.effect.value = 'none';
  effectValueSlider.destroy();
};

//текущее значение поля масштабирования
const getCurrentScale = () => parseFloat(ScaleInput.value);

//масштабирование публикации
const setPreviewScale = (scale) => {
  scale = mathNumericRange(scale, PREVIEW_MIN_VALUE, PREVIEW_MAX_VALUE);
  ScaleInput.value = `${scale}%`;
  previewPublication.style.transform = `scale(${scale}%)`;
};

//нажатие кнопок масштабирование публикаций
const buttonScaleClick = (evt) => {
  const currentScale = getCurrentScale();
  if (evt.target.classList.contains('scale__control--smaller')) {
    return setPreviewScale(currentScale - (PUBLICATION_SCALE_STEP));
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    return setPreviewScale(currentScale + (PUBLICATION_SCALE_STEP));
  }
};

const makeScalable = () => {
  setPreviewScale(PREVIEW_DEFAULT_VALUE);
  innerBlockScaleHandler.addEventListener('click', buttonScaleClick);
};

const makeUnScalable = () => {
  setPreviewScale(PREVIEW_DEFAULT_VALUE);
  innerBlockScaleHandler.removeEventListener('click', buttonScaleClick);
};

export {makeScalable, makeUnScalable, enableFilters, disableFilters};
