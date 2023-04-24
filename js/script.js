'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var filterWrapper = document.querySelector('.filter');

  if (!filterWrapper) {
    return;
  }

  var openButton = filterWrapper.querySelector('.filter__toggle');
  var closeButton = filterWrapper.querySelector('.filter__btn-close');
  var inputFromELement = filterWrapper.querySelector('#from');
  var inputUpToElement = filterWrapper.querySelector('#up-to');
  var filterHint = filterWrapper.querySelector('.filter__hint');
  var overlay = filterWrapper.querySelector('.filter__overlay');
  var body = document.querySelector('body');

  if (!openButton || !closeButton || !overlay || !body) {
    return;
  }

  var openFilter = function openFilter() {
    if (!filterWrapper.classList.contains('filter--show')) {
      filterWrapper.classList.add('filter--show');
      body.classList.add('noscroll');
      body.classList.add('blur-catalog');
    }
  };

  var closeFilter = function closeFilter() {
    if (filterWrapper.classList.contains('filter--show')) {
      filterWrapper.classList.remove('filter--show');
      body.classList.remove('noscroll');
      body.classList.remove('blur-catalog');
      closeButton.removeEventListener('click', onButtonClick);
      overlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var isEscEvent = function isEscEvent(evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var onButtonClick = function onButtonClick(evt) {
    evt.preventDefault();
    closeFilter();
  };

  var onOverlayClick = function onOverlayClick(evt) {
    if (evt.target === overlay) {
      evt.preventDefault();
      closeFilter();
    }
  };

  var onPopupEscPress = function onPopupEscPress(evt) {
    if (isEscEvent(evt)) {
      closeFilter();
    }
  };

  var isInputCorrect = function isInputCorrect() {
    if (parseInt(inputFromELement.value, 10) <= parseInt(inputUpToElement.value, 10)) {
      return true;
    } else {
      return false;
    }
  };

  var onFilterWrapperInput = function onFilterWrapperInput() {
    if (isInputCorrect()) {
      filterHint.style.display = 'none';
    } else {
      filterHint.style.display = 'block';
    }
  };

  openButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openFilter();
    closeButton.addEventListener('click', onButtonClick);
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onPopupEscPress);
  });
  inputFromELement.addEventListener('change', onFilterWrapperInput);
  inputUpToElement.addEventListener('change', onFilterWrapperInput);
})();
'use strict';

(function () {
  var pageHeader = document.querySelector('.header');

  if (!pageHeader) {
    return;
  }

  var headerToggle = pageHeader.querySelector('.header__toggle');
  var headerLink = pageHeader.querySelectorAll('.nav__link');
  var body = document.querySelector('body');

  if (!headerToggle || !body) {
    return;
  }

  pageHeader.classList.remove('header--nojs');
  headerToggle.addEventListener('click', function () {
    if (pageHeader.classList.contains('header--closed')) {
      pageHeader.classList.remove('header--closed');
      pageHeader.classList.add('header--opened');
      body.classList.add('noscroll');
      headerToggle.setAttribute('aria-label', 'Закрыть меню');
    } else {
      pageHeader.classList.add('header--closed');
      pageHeader.classList.remove('header--opened');
      body.classList.remove('noscroll');
      headerToggle.setAttribute('aria-label', 'Открыть меню');
    }
  });

  if (!headerLink.length) {
    return;
  }

  Array.from(headerLink).forEach(function (link) {
    link.addEventListener('click', function () {
      if (pageHeader.classList.contains('header--opened')) {
        pageHeader.classList.remove('header--opened');
        body.classList.remove('noscroll');
        pageHeader.classList.add('header--closed');
        headerToggle.setAttribute('aria-label', 'Открыть меню');
      }
    });
  });
})();
'use strict';

(function () {
  var heightChange = function heightChange() {
    listContainerElement.style.height = listElement.offsetHeight + 'px';
  };

  var listContainerElement = document.querySelector('.reviews__list-container');
  var listElement = document.querySelector('.reviews__list');

  if (listContainerElement && listElement) {
    heightChange();
  }
})();
'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var onBookButtonElementClick = function onBookButtonElementClick(evt) {
    evt.preventDefault();
    overlayElement.classList.add('overlay--show');
    modalFormElement.classList.remove('modal--hide');
    modalFormElement.classList.add('modal--show');

    if (modalFormCloseElement) {
      modalFormCloseElement.addEventListener('click', onModalFormCloseElementClick);
    }

    overlayElement.addEventListener('click', onOverlayElementClick);
    documentElement.addEventListener('keydown', onDocumentElementClick);
    bodyElement.classList.add('noscroll');
    toggleBlur();
  };

  var fillFormInput = function fillFormInput() {
    if (inputNameElement && inputPetNameElement && inputTelElement && inputEmailElement && inputArrivalElement && inputDepartureElement) {
      if (typeof storage.name === 'undefined') {
        inputNameElement.value = '';
      } else {
        inputNameElement.value = storage.name;
      }

      if (typeof storage.petName === 'undefined') {
        inputPetNameElement.value = '';
      } else {
        inputPetNameElement.value = storage.petName;
      }

      if (typeof storage.tel === 'undefined') {
        inputTelElement.value = '';
      } else {
        inputTelElement.value = storage.tel;
      }

      if (typeof storage.email === 'undefined') {
        inputEmailElement.value = '';
      } else {
        inputEmailElement.value = storage.email;
      }

      if (typeof storage.arrival === 'undefined') {
        inputArrivalElement.value = '';
      } else {
        inputArrivalElement.value = storage.arrival;
      }

      if (typeof storage.departure === 'undefined') {
        inputDepartureElement.value = '';
      } else {
        inputDepartureElement.value = storage.departure;
      }
    }
  };

  var onBookFormElementSubmit = function onBookFormElementSubmit() {
    if (inputNameElement && inputPetNameElement && inputTelElement && inputEmailElement && inputArrivalElement && inputDepartureElement) {
      if (isStorageSupport) {
        localStorage.setItem('name', inputNameElement.value);
        localStorage.setItem('petName', inputPetNameElement.value);
        localStorage.setItem('tel', inputTelElement.value);
        localStorage.setItem('email', inputEmailElement.value);
        localStorage.setItem('arrival', inputArrivalElement.value);
        localStorage.setItem('departure', inputDepartureElement.value);
      }
    }

    modalFormClose();
    overlayElement.classList.add('overlay--show');
    modalAcceptElement.classList.remove('modal--hide');
    modalAcceptElement.classList.add('modal--show');
    modalAcceptCloseElement.addEventListener('click', onModalAcceptCloseElementClick);
    modalAcceptCloseXElement.addEventListener('click', onModalAcceptCloseElementClick);
  };

  var onOverlayElementClick = function onOverlayElementClick(evt) {
    if (evt.target === overlayElement) {
      modalFormClose();
      modalAcceptClose();
      toggleBlur();
    }
  };

  var onDocumentElementClick = function onDocumentElementClick(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      modalFormClose();
      modalAcceptClose();
      toggleBlur();
    }
  };

  var onModalFormCloseElementClick = function onModalFormCloseElementClick(evt) {
    evt.preventDefault();
    modalFormClose();
    toggleBlur();
  };

  var onModalAcceptCloseElementClick = function onModalAcceptCloseElementClick(evt) {
    evt.preventDefault();
    modalAcceptClose();
    toggleBlur();
  };

  var modalFormClose = function modalFormClose() {
    overlayElement.classList.remove('overlay--show');
    modalFormElement.classList.add('modal--hide');
    modalFormElement.classList.remove('modal--show');
    bodyElement.classList.remove('noscroll');
  };

  var modalAcceptClose = function modalAcceptClose() {
    overlayElement.classList.remove('overlay--show');
    modalAcceptElement.classList.add('modal--hide');
    modalAcceptElement.classList.remove('modal--show');
    bodyElement.classList.remove('noscroll');
  };

  var toggleBlur = function toggleBlur() {
    mainElement.classList.toggle('blur');
    headerElement.classList.toggle('blur');
    footerElement.classList.toggle('blur');
  };

  var documentElement = document.documentElement;
  var bodyElement = document.querySelector('body');
  var mainElement = document.querySelector('main');
  var headerElement = document.querySelector('header');
  var footerElement = document.querySelector('footer');
  var bookButtonElements = document.querySelectorAll('.book-button');
  var overlayElement = document.querySelector('.overlay');
  var modalFormElement = document.querySelector('.modal--book');
  var modalAcceptElement = document.querySelector('.modal--accept');
  var modalFormCloseElement = document.querySelector('#form-close-x');
  var modalAcceptCloseElement = document.querySelector('#accept-close');
  var modalAcceptCloseXElement = document.querySelector('#accept-close-x');
  var inputNameElement = document.querySelector('#name');
  var inputPetNameElement = document.querySelector('#pet-name');
  var inputEmailElement = document.querySelector('#email');
  var inputArrivalElement = document.querySelector('#arrival');
  var inputDepartureElement = document.querySelector('#departure');
  var inputTelElement = document.querySelector('input[type="tel"]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };
  var bookFormElement = document.querySelector('#book');
  var storage = {
    name: '',
    petName: '',
    tel: '',
    email: '',
    arrival: '',
    departure: ''
  };
  var isStorageSupport = true;

  try {
    storage = localStorage;
  } catch (err) {
    isStorageSupport = false;
  }

  if (inputTelElement) {
    var mask = IMask(inputTelElement, maskOptions);
  }

  if (bookFormElement) {
    bookFormElement.addEventListener('submit', onBookFormElementSubmit);
  }

  if (bookButtonElements.length > 0 && overlayElement && modalFormElement) {
    bookButtonElements.forEach(function (elem) {
      elem.addEventListener('click', onBookButtonElementClick);
    });
  }

  fillFormInput();
})();
'use strict';

(function () {
  var hintList = document.querySelectorAll('.offer__hint');

  if (!hintList.length) {
    return;
  }

  var firstHint = document.querySelector('.offer__hint');

  if (!firstHint) {
    return;
  } // вычисляет кооринаты всплывающей подсказки


  var moveHint = function moveHint(hint) {
    var hintParent = hint.parentNode; // родительский блок относительно которого идет позиционирование

    var icon = hint.previousElementSibling; // иконка, к которой относится подсказка

    if (!hintParent || !icon) {
      return;
    }

    var shiftIcon = icon.offsetLeft; // положение иконки относительно родительского блока

    var parentWidth = hintParent.offsetWidth; // ширина родительского блока
    // рассчет позиции подсказки в зависимости от того, в какой половине блока находится иконка

    if (shiftIcon >= parentWidth / 2) {
      if (hint.classList.contains('offer__hint--two-line')) {
        hint.classList.remove('offer__hint--two-line');
      }
    } else {
      if (!hint.classList.contains('offer__hint--two-line')) {
        hint.classList.add('offer__hint--two-line');
      }
    }
  };

  var moveAllHints = function moveAllHints() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      Array.from(hintList).forEach(function (hint) {
        moveHint(hint);
      });
    } else {
      Array.from(hintList).forEach(function (hint) {
        hint.style.right = '';
        hint.style.left = '';
        hint.style.top = '';
      });
    }
  };

  moveAllHints();
  window.addEventListener('resize', moveAllHints);
})();
'use strict';

(function () {
  var heightChange = function heightChange() {
    listContainerElement.style.height = listElement.offsetHeight + 'px';
  };

  var listContainerElement = document.querySelector('.reviews__list-container');
  var listElement = document.querySelector('.reviews__list');
  var reviewsSlider = document.querySelector('.reviews__list');

  if (!reviewsSlider) {
    return;
  }

  var reviewsSwiper = new Swiper('.reviews__list-container', {
    init: true,
    loop: true,
    speed: 400,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: '.slider-controls__review-button-next',
      prevEl: '.slider-controls__review-button-prev'
    },
    a11y: true,
    keyboardControl: true,
    grabCursor: true,
    pagination: {
      el: '.dots--review',
      type: 'bullets'
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });

  if (listContainerElement && listElement) {
    heightChange();
  }
})();
'use strict';

(function () {
  var roomsSlider = document.querySelector('.rooms__list');

  if (!roomsSlider) {
    return;
  }

  var roomsSwiper = new Swiper('.rooms__slider-container', {
    init: true,
    loop: true,
    speed: 400,
    spaceBetween: 128,
    slidesPerView: 1,
    navigation: {
      nextEl: '.slider-controls__button--next',
      prevEl: '.slider-controls__button--prev'
    },
    a11y: true,
    keyboardControl: true,
    grabCursor: true,
    pagination: {
      el: '.dots--room',
      type: 'bullets'
    }
  });
})();
'use strict';

(function () {
  var navLink = document.querySelectorAll('.nav__link');

  var scrollToAnchor = function scrollToAnchor(link) {
    var linkHref = link.href;
    var posId = linkHref.indexOf('#');

    if (posId !== -1) {
      var id = linkHref.slice(posId);
      var anchor = document.querySelector(id);
    }

    if (anchor) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        console.log(anchor);
        anchor.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      });
    }
  };

  if (navLink.length) {
    Array.from(navLink).forEach(function (link) {
      scrollToAnchor(link);
    });
  }
})();
'use strict';

(function () {
  var sortingWrapper = document.querySelector('.sorting');

  if (!sortingWrapper) {
    return;
  }

  var sortingToggle = sortingWrapper.querySelector('.sorting__toggle');
  var sortingLinkList = sortingWrapper.querySelectorAll('.sorting__link');
  var currentItem = sortingWrapper.querySelector('.sorting__item--current');

  if (!sortingToggle || !currentItem || !sortingLinkList.length) {
    return;
  }

  var openSorting = function openSorting() {
    sortingWrapper.classList.add('sorting--show');
    sortingToggle.ariaLabel = 'Cкрыть варианты сортировки';
  };

  var closeSorting = function closeSorting() {
    sortingWrapper.classList.remove('sorting--show');
    sortingToggle.ariaLabel = 'Показать варианты сортировки';
  };

  sortingToggle.addEventListener('click', function () {
    if (!sortingWrapper.classList.contains('sorting--show')) {
      openSorting();
    } else {
      closeSorting();
    }
  });
  Array.from(sortingLinkList).forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      var parent = item.parentNode;

      if (parent !== currentItem) {
        parent.classList.add('sorting__item--current');
        currentItem.classList.remove('sorting__item--current');
        currentItem = parent;
        closeSorting();
      } else {
        if (!sortingWrapper.classList.contains('sorting--show')) {
          openSorting();
        } else {
          closeSorting();
        }
      }
    });
  });
})();
'use strict'; // скрипт инициализации яндекс-карты

(function () {
  var COORDINATE_CENTER = [59.938631, 30.323055];
  var COORDINATE_MARKER = [59.938631, 30.323055];
  var ZOOM = 16; // Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19

  var map = document.querySelector('#map');
  var myPlacemark;

  var resizePin = function resizePin() {
    if (myPlacemark) {
      if (window.matchMedia('(min-width: 768px)').matches) {
        myPlacemark.options.set({
          iconLayout: 'default#image',
          iconImageHref: 'img/icon-pin.svg',
          iconImageSize: [62, 88],
          iconImageOffset: [-30, -60]
        });
      } else {
        myPlacemark.options.set({
          iconLayout: 'default#image',
          iconImageHref: 'img/icon-pin.svg',
          iconImageSize: [52, 76],
          iconImageOffset: [-30, -50]
        });
      }
    }
  };

  var init = function init() {
    // Создание карты.
    var myMap = new ymaps.Map(map, {
      // Координаты центра карты.
      center: COORDINATE_CENTER,
      zoom: ZOOM
    });
    myMap.behaviors.disable('scrollZoom'); // добавление метки на карту

    myPlacemark = new ymaps.Placemark(COORDINATE_MARKER, {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-pin.svg',
      // картинка иконки
      iconImageSize: [62, 88],
      // размеры картинки
      iconImageOffset: [-30, -60] // смещение картинки

    }); // Добавление метки на карту

    myMap.geoObjects.add(myPlacemark);
    resizePin();
  };

  ymaps.ready(init); //window.addEventListener('resize', resizePin);
})();