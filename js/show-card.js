'use strict';

/**
 * Модуль для обработки событий показа и скрытия карточки
 */

(function () {
  var utils = window.utils;
  var card = window.card;

  var mapPinActive;

  var escKeydownPopupHandler = function (evt) {
    utils.isEscEvent(evt, hideCard);
  };

  var clickPopupCloseHandler = function () {
    hideCard();
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  var showCard = function (elem, mapPins) {
    var data = elem.dataset;
    if (mapPinActive) {
      var popupElem = document.querySelector('.popup');
      popupElem.classList.remove('hidden');
      card.update(popupElem, mapPins[data.uid]);
      mapPinActive.classList.remove('map__pin--active');
    } else {
      card.render(mapPins[data.uid]);
    }
    elem.classList.add('map__pin--active');
    mapPinActive = elem;

    var popupCloseElem = document.querySelector('.popup__close');

    document.addEventListener('keydown', escKeydownPopupHandler);
    popupCloseElem.addEventListener('click', clickPopupCloseHandler);
  };

  var hideCard = function () {
    if (mapPinActive) {
      var popupElem = document.querySelector('.popup');
      var popupCloseElem = popupElem.querySelector('.popup__close');

      popupElem.classList.add('hidden');
      mapPinActive.classList.remove('map__pin--active');

      document.removeEventListener('keydown', escKeydownPopupHandler);
      popupCloseElem.removeEventListener('click', clickPopupCloseHandler);
    }
  };

  window.displayCard = {
    show: showCard,
    hide: hideCard
  };
})();
