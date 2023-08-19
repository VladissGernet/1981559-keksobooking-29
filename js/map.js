import {activateForms} from './form-load-status.js';
import {TILE_LAYER, COPYRIGHT, ZOOM, iconConfig, startCoordinates} from './constants.js';
import {coordinatesOfAddress, cardTemplate} from './variables.js';
import {getData} from './load-data.js';

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForms();
    })
    .setView(startCoordinates, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: iconConfig.main.url,
    iconSize: [iconConfig.main.width, iconConfig.main.height],
    iconAnchor: [iconConfig.main.anchorX, iconConfig.main.anchorY],
  });

  const icon = L.icon({
    iconUrl: iconConfig.default.url,
    iconSize: [iconConfig.default.width, iconConfig.default.height],
    iconAnchor: [iconConfig.default.anchorX, iconConfig.default.anchorY],
  });

  const mainPinMarker = L.marker(startCoordinates, {
    draggable: true,
    icon: mainPinIcon,
  });

  mainPinMarker.addTo(map);

  const createCustomPopup = (element) => {
    const popupElement = cardTemplate.cloneNode(true);
    const popupAvatar = popupElement.querySelector('.popup__avatar');
    const popupTitle = popupElement.querySelector('.popup__title');
    const popupAddress = popupElement.querySelector('.popup__text--address');
    const popupPrice = popupElement.querySelector('.popup__text--price');
    const popupPriceSpan = popupPrice.querySelector('span').cloneNode(true);
    const {author, offer} = element;
    const {address, checkin, checkout, description, guests, price, rooms, title, type} = offer;
    popupAvatar.src = author.avatar;
    popupTitle.textContent = title;
    popupAddress.textContent = address;
    popupPrice.textContent = `${price.toLocaleString('ru-RU')} `;
    popupPrice.appendChild(popupPriceSpan);
    // there is an undefined in description
    return popupElement;
  };

  mainPinMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    coordinatesOfAddress.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
  });

  getData()
    .then((someArr) => {
      someArr.forEach((card) => {
        const {location} = card;
        const {lat, lng} = location;
        const marker = L.marker({
          lat,
          lng,
        },
        {
          icon,
        },
        );

        marker
          .addTo(map)
          .bindPopup(createCustomPopup(card));
      });
    });
};

export {initMap};
