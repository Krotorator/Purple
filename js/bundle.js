(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//= _scripts.js
document.addEventListener("DOMContentLoaded", function () {
  //////////////Lazyloading GoogleMapsAPI
  var contactsBlockParrent = document.querySelector(".gallery-contacts-bg");
  var mapOffsetY = false;
  var mapApiLoaded = true;
  var mapContainer = document.querySelector(".contacts__map");
  var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  console.log(window.pageYOffset);
  console.log(documentHeight - contactsBlockParrent.offsetWidth);

  if (window.pageYOffset >= documentHeight - contactsBlockParrent.offsetWidth) {
    setTimeout(function () {
      console.log("ascsac");
      initMap();
      mapContainer.classList.add("contacts__map_isShown");
    }, 1000);
  }

  document.addEventListener("scroll", function () {
    if (!mapOffsetY) {
      if (window.pageYOffset >= contactsBlockParrent.offsetTop - 500) {
        var script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzfsLqx8cz3AeQGc8q64HHZz2KC400uR8&callback";
        document.querySelector("script:last-of-type").before(script);
        mapOffsetY = true;
        mapApiLoaded = false;
      }
    }

    if (!mapApiLoaded && !mapContainer.classList.contains("contacts__map_isShown")) {
      if ((typeof google === "undefined" ? "undefined" : _typeof(google)) === "object" && _typeof(google.maps) === "object") {
        initMap();
        console.log("second");
        mapContainer.classList.add("contacts__map_isShown");
        mapApiLoaded = true;
      }
    }
  });

  function initMap() {
    var map;
    var center = {
      lat: 50.443274,
      lng: 30.516684
    };
    map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 14,
      disableDefaultUI: true,
      styles: [{
        elementType: "geometry",
        stylers: [{
          color: "#f5f5f5"
        }]
      }, {
        elementType: "labels.icon",
        stylers: [{
          visibility: "off"
        }]
      }, {
        elementType: "labels.text.fill",
        stylers: [{
          color: "#616161"
        }]
      }, {
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#f5f5f5"
        }]
      }, {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#bdbdbd"
        }]
      }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          color: "#eeeeee"
        }]
      }, {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#757575"
        }]
      }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
          color: "#e5e5e5"
        }]
      }, {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#9e9e9e"
        }]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
          color: "#ffffff"
        }]
      }, {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#757575"
        }]
      }, {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{
          color: "#dadada"
        }]
      }, {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#616161"
        }]
      }, {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#9e9e9e"
        }]
      }, {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{
          color: "#e5e5e5"
        }]
      }, {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{
          color: "#eeeeee"
        }]
      }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
          color: "#c9c9c9"
        }]
      }, {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#9e9e9e"
        }]
      }]
    });
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      icon: {
        url: "../img/contacts/map_marker.svg",
        scaledSize: new google.maps.Size(64, 64)
      }
    });
  } //////////////LAZYLOAD BG_IMGS


  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });
    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyload = function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });

        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    };

    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }

  console.log("document loaded"); ///////////////////////////LAZYLOAD IMGS

  var bLazy = new Blazy({
    offset: 100,
    loadInvisible: true
  });
  var telLink = document.querySelector(".header__telephone-arrow-link");
  var telDropdown = document.querySelector(".header__telephone-dropdown");
  var telNumbers = document.querySelectorAll(".header__number");
  var headTelephone = document.querySelector(".header__telephone");
  var langDropdown = document.querySelector(".header__lang-dropdown");
  var langArrow = document.querySelector(".header__lang-arrow-link");
  var langItems = document.querySelectorAll(".header__flag");
  var langContainer = document.querySelector(".header__lang"); ///////////// TELEPHONE DROPDOWN

  telLink.addEventListener("click", function () {
    telDropdown.classList.toggle("header__telephone-dropdown_active");

    if (langDropdown.classList.contains("header__lang-dropdown_active")) {
      langDropdown.classList.remove("header__lang-dropdown_active");
    }
  });
  telNumbers.forEach(function (number) {
    number.addEventListener("click", function () {
      telDropdown.classList.toggle("header__telephone-dropdown_active");
      var visibleNumber = document.querySelector(".header__number_active");
      telDropdown.append(visibleNumber);
      headTelephone.prepend(this);
      this.classList.add("header__number_active");
      visibleNumber.classList.remove("header__number_active");
    });
  }); ///////////// LANGUAGE DROPDOWN

  langArrow.addEventListener("click", function () {
    langDropdown.classList.toggle("header__lang-dropdown_active");

    if (telDropdown.classList.contains("header__telephone-dropdown_active")) {
      telDropdown.classList.remove("header__telephone-dropdown_active");
    }
  });
  langItems.forEach(function (language) {
    language.addEventListener("click", function () {
      var visibleLang = document.querySelector("svg[data-state=active]");
      langDropdown.append(visibleLang);
      langContainer.prepend(this);
      visibleLang.dataset.state = "inActive";
      this.dataset.state = "active";
      langDropdown.classList.remove("header__lang-dropdown_active");
    });
  }); ///////////////BURGER

  var burger = document.querySelector(".burger");
  var navList = document.querySelector(".nav__list");
  var navListHeight = document.querySelector(".nav__list").getBoundingClientRect().height;
  var nav = document.querySelector("#nav");
  var navLinks = document.querySelectorAll(".nav__item-link");
  burger.addEventListener("click", function () {
    burger.classList.toggle("burger_closed");
    burger.classList.toggle("burger_open");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        burger.classList.add("burger_closed");
        burger.classList.remove("burger_open");
        navList.classList.remove("nav__list_active-up");
        navList.classList.remove("nav__list_active-down");
      });
    });

    if (navListHeight < nav.getBoundingClientRect().top) {
      navList.classList.toggle("nav__list_active-up");
    } else {
      navList.classList.toggle("nav__list_active-down");
    }
  }); //////////////LEVELS_CARDS

  var levels = _toConsumableArray(document.querySelectorAll(".money-levels__item"));

  for (var i = 0; i < levels.length; i++) {
    levels[i].addEventListener("click", function () {
      var _this = this;

      this.classList.add("money-levels__item_active");
      levels.forEach(function (level) {
        if (level != _this) {
          level.classList.remove("money-levels__item_active");
        }
      });
    });
  } ///////////////MONEY AGE TABS


  var ages = _toConsumableArray(document.querySelectorAll(".money__age-item"));

  ages.forEach(function (age) {
    age.addEventListener("click", function () {
      var _this2 = this;

      this.classList.add("money__age-item_active");
      ages.forEach(function (oldAge) {
        if (oldAge != _this2) {
          oldAge.classList.remove("money__age-item_active");
        }
      });
    });
  }); ////////////CALLBACK POPAP

  var callbackOverlay = document.querySelector(".callback-overlay");
  var callbackPopap = document.querySelector(".callback");
  var closeCallback = document.querySelector(".callback__close-link");
  var callbackBtns = document.querySelectorAll(".callbackBtn");
  var callbackSubmit = document.querySelector("#callbackSubmit");
  var callbackForm = document.querySelector(".callback__form");
  var callbackInputs = document.querySelectorAll(".callback__input");
  var callbackComment = document.querySelector("#userComment");
  var callbackLabels = document.querySelectorAll(".callback__inValid");
  callbackBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      callbackPopap.style.display = "block";
      callbackPopap.classList.add("callback_active");
      callbackOverlay.style.display = "block";
      callbackOverlay.classList.add("callback-overlay_active");
    });
  });

  function closePopap() {
    callbackPopap.classList.add("callback_inactive");
    setTimeout(function () {
      callbackPopap.classList.remove("callback_active");
      callbackPopap.classList.remove("callback_inactive");
      callbackPopap.classList.remove("callback__response");
    }, 500);
  }

  function closeOverlay() {
    callbackOverlay.classList.add("callback-overlay_inactive");
    setTimeout(function () {
      callbackOverlay.classList.remove("callback-overlay_active");
      callbackOverlay.classList.remove("callback-overlay_inactive");
    }, 500);
  }

  function callbackSucces() {
    callbackPopap.querySelector("h2").textContent = "Спасибо";
    callbackPopap.querySelector(".callback__subtitle").textContent = "Наш менеджер свяжется с Вами в ближайшее время";
    callbackPopap.classList.add("callback__response");
  }

  function callbackError() {
    callbackPopap.querySelector("h2").textContent = "Ошибка!";
    callbackPopap.querySelector(".callback__subtitle").textContent = "К сожалению, нам не удалось отправить Вашу заявку! Попробуйте позже.";
    callbackPopap.classList.add("callback__response");
  }

  closeCallback.addEventListener("click", function (e) {
    e.preventDefault();
    closePopap();
    closeOverlay();
    setTimeout(function () {
      document.querySelector(".callback__title").innerHTML = "Остались вопросы?<br> Оставьте заявку и наш менеджер свяжется с Вами";
      document.querySelector(".callback__subtitle").innerHTML = "";
      callbackPopap.classList.remove("callback__response");
    }, 500);
  }); //////////VALIDATE INPUTS

  function validateName() {
    if (callbackForm.userName.value == "") {
      var label = document.querySelector("[for=\"".concat(callbackForm.userName.id, "\"]"));
      label.classList.add("callback__inValid_active");
      callbackForm.userName.classList.add("callback__input_danger");
    } else {
      return true;
    }
  }

  function validateMail() {
    if (!callbackForm.userMail.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)) {
      var label = document.querySelector("[for=\"".concat(callbackForm.userMail.id, "\"]"));
      label.classList.add("callback__inValid_active");
      callbackForm.userMail.classList.add("callback__input_danger");
    } else {
      return true;
    }
  }

  function validateTel() {
    if (!callbackForm.userTel.value.match(/^\d[\d\(\)\ -]{4,14}\d$/) || callbackForm.userTel.value == "") {
      var label = document.querySelector("[for=\"".concat(callbackForm.userTel.id, "\"]"));
      label.classList.add("callback__inValid_active");
      callbackForm.userTel.classList.add("callback__input_danger");
    } else {
      return true;
    }
  } ////////////SUBMIT FORM


  function sendForm(how, url, succes, error) {
    var method = how || "POST";
    var action = url || "#";
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        succes();
        console.log(request.responseText);
        console.log(request.status);
        console.log("succes");
      } else if (request.status > 400) {
        error();
        console.log("error");
        console.log(request.status);
        console.log(request.responseText);
      }
    };

    request.open(method, action);
    var data = new FormData(callbackForm);

    var _iterator = _createForOfIteratorHelper(data.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var pair = _step.value;
        console.log(pair[0] + ", " + "<br>" + pair[1]);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    request.send(data);
  }

  callbackSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    validateName();
    validateTel();
    validateMail();

    if (validateName() && validateTel() && validateMail()) {
      sendForm("POST", "mail.php", callbackSucces, callbackError);
      callbackForm.userName.value = "";
      callbackForm.userMail.value = "";
      callbackForm.userTel.value = "";
      callbackComment.value = "";
    } else {
      callbackInputs.forEach(function (input) {
        input.addEventListener("focus", function () {
          for (var _i = 0; _i < callbackLabels.length; _i++) {
            if (input.id == callbackLabels[_i].getAttribute("for")) {
              callbackLabels[_i].classList.remove("callback__inValid_active");

              input.classList.remove("callback__input_danger");
            }
          }
        });
      });
    }
  }); ///////////////////SLIDER

  var mySwiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    roundLengths: true,
    breakpoints: {
      // when window width is >= 320px
      776: {
        autoHeight: false,
        slidesPerView: 2,
        centeredSlides: false,
        centeredSlidesBounds: false
      },
      1050: {
        slidesPerView: 3,
        centeredSlides: true,
        centeredSlidesBounds: true,
        roundLengths: true,
        spaceBetween: 5
      }
    },
    on: {
      slideNextTransitionEnd: function slideNextTransitionEnd() {
        console.log("slideNextTransitionEnd");
        bLazy.revalidate();
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
  var mySwiper = new Swiper(".swiper-container_2", {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    roundLengths: true,
    slidesOffsetAfter: 5,
    breakpoints: {
      // when window width is >= 320px
      776: {
        autoHeight: false,
        slidesPerView: 2,
        centeredSlides: false,
        centeredSlidesBounds: false
      },
      1050: {
        slidesPerView: 3,
        centeredSlides: true,
        centeredSlidesBounds: true,
        roundLengths: true,
        spaceBetween: 20
      }
    },
    on: {
      slideNextTransitionEnd: function slideNextTransitionEnd() {
        console.log("slideNextTransitionEnd");
        bLazy.revalidate();
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  }); //////////////ANCHORS SCROLL
  // собираем все якоря; устанавливаем время анимации и количество кадров

  var anchors = [].slice.call(document.querySelectorAll('.nav__list a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;
  anchors.forEach(function (item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener("click", function (e) {
      var location = window.location.href;
      var pageName = location.slice(location.lastIndexOf("/"));

      if (pageName.indexOf("index") !== -1) {
        console.log(location);
        console.log(pageName); // убираем стандартное поведение

        e.preventDefault(); // для каждого якоря берем соответствующий ему элемент и определяем его координату Y

        var coordY = document.querySelector(item.getAttribute("href")).getBoundingClientRect().top + window.pageYOffset; // запускаем интервал, в котором

        var scroller = setInterval(function () {
          // считаем на сколько скроллить за 1 такт
          var scrollBy = coordY / framesCount; // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
          // и дно страницы не достигнуто

          if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            // то скроллим на к-во пикселей, которое соответствует одному такту
            window.scrollBy(0, scrollBy);
          } else {
            // иначе добираемся до элемента и выходим из интервала
            window.scrollTo(0, coordY);
            clearInterval(scroller);
          } // время интервала равняется частному от времени анимации и к-ва кадров

        }, animationTime / framesCount);
      } else {
        var startHref = window.location.href.slice(0, window.location.href.lastIndexOf("/") + 1);
        document.location.href = "".concat(startHref, "index.html").concat(item.getAttribute("href"));
      }
    });
  });
});

},{}]},{},[1]);
