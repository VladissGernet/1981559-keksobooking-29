import {housingType, priceSliderContainer} from './variables.js';
import {MinPriceValues, PRICE_MAX} from './constants.js';
import {addPristine, pristine} from './validation.js';

const updateOptions = (place) => {
  pristine.destroy();
  addPristine(place);
  priceSliderContainer.noUiSlider.updateOptions({
    range: {
      'min': place,
      'max': PRICE_MAX
    },
    start: place,
  });
};

const onHousingTypeChange = () => {
  const {bungalow, flat, hotel, house, palace} = MinPriceValues;
  switch (housingType.value) {
    case 'bungalow':
      updateOptions(bungalow);
      break;
    case 'hotel':
      updateOptions(hotel);
      break;
    case 'house':
      updateOptions(house);
      break;
    case 'palace':
      updateOptions(palace);
      break;
    default:
      updateOptions(flat);
      break;
  }
};

export {onHousingTypeChange};
