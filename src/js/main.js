//= _scripts.js

document.addEventListener("DOMContentLoaded", () => {
    //////////////Lazyloading GoogleMapsAPI
    let contactsBlockParrent = document.querySelector(".gallery-contacts-bg");
    let mapOffsetY = false;
    let mapApiLoaded = true;
    let mapContainer = document.querySelector(".contacts__map");
    let documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
    console.log(window.pageYOffset);
    console.log(documentHeight - contactsBlockParrent.offsetWidth);
    if (window.pageYOffset >= documentHeight - contactsBlockParrent.offsetWidth) {
        setTimeout(() => {
            console.log("ascsac");
            initMap();
            mapContainer.classList.add("contacts__map_isShown");
        }, 1000);
    }

    document.addEventListener("scroll", () => {
        if (!mapOffsetY) {
            if (window.pageYOffset >= contactsBlockParrent.offsetTop - 500) {
                let script = document.createElement("script");
                script.src =
                    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzfsLqx8cz3AeQGc8q64HHZz2KC400uR8&callback";
                document.querySelector("script:last-of-type").before(script);
                mapOffsetY = true;
                mapApiLoaded = false;
            }
        }
        if (!mapApiLoaded && !mapContainer.classList.contains("contacts__map_isShown")) {
            if (typeof google === "object" && typeof google.maps === "object") {
                initMap();
                console.log("second");

                mapContainer.classList.add("contacts__map_isShown");
                mapApiLoaded = true;
            }
        }
    });

    function initMap() {
        var map;
        var center = { lat: 50.443274, lng: 30.516684 };
        map = new google.maps.Map(document.getElementById("map"), {
            center: center,

            zoom: 14,
            disableDefaultUI: true,
            styles: [
                {
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#f5f5f5",
                        },
                    ],
                },
                {
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#616161",
                        },
                    ],
                },
                {
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            color: "#f5f5f5",
                        },
                    ],
                },
                {
                    featureType: "administrative.land_parcel",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#bdbdbd",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#eeeeee",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#e5e5e5",
                        },
                    ],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#9e9e9e",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#ffffff",
                        },
                    ],
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#dadada",
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#616161",
                        },
                    ],
                },
                {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#9e9e9e",
                        },
                    ],
                },
                {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#e5e5e5",
                        },
                    ],
                },
                {
                    featureType: "transit.station",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#eeeeee",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#c9c9c9",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#9e9e9e",
                        },
                    ],
                },
            ],
        });
        var marker = new google.maps.Marker({
            position: center,
            map: map,
            icon: {
                url: "../img/contacts/map_marker.svg",
                scaledSize: new google.maps.Size(64, 64),
            },
        });
    }

    //////////////LAZYLOAD BG_IMGS
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
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
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
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }

    console.log("document loaded");

    ///////////////////////////LAZYLOAD IMGS
    var bLazy = new Blazy({
        offset: 100,
        loadInvisible: true,
    });

    let telLink = document.querySelector(".header__telephone-arrow-link");
    let telDropdown = document.querySelector(".header__telephone-dropdown");
    let telNumbers = document.querySelectorAll(".header__number");
    let headTelephone = document.querySelector(".header__telephone");

    let langDropdown = document.querySelector(".header__lang-dropdown");
    let langArrow = document.querySelector(".header__lang-arrow-link");
    let langItems = document.querySelectorAll(".header__flag");
    let langContainer = document.querySelector(".header__lang");
    ///////////// TELEPHONE DROPDOWN

    telLink.addEventListener("click", () => {
        telDropdown.classList.toggle("header__telephone-dropdown_active");
        if (langDropdown.classList.contains("header__lang-dropdown_active")) {
            langDropdown.classList.remove("header__lang-dropdown_active");
        }
    });

    telNumbers.forEach((number) => {
        number.addEventListener("click", function () {
            telDropdown.classList.toggle("header__telephone-dropdown_active");
            let visibleNumber = document.querySelector(".header__number_active");
            telDropdown.append(visibleNumber);
            headTelephone.prepend(this);
            this.classList.add("header__number_active");
            visibleNumber.classList.remove("header__number_active");
        });
    });
    ///////////// LANGUAGE DROPDOWN

    langArrow.addEventListener("click", () => {
        langDropdown.classList.toggle("header__lang-dropdown_active");
        if (telDropdown.classList.contains("header__telephone-dropdown_active")) {
            telDropdown.classList.remove("header__telephone-dropdown_active");
        }
    });

    langItems.forEach((language) => {
        language.addEventListener("click", function () {
            let visibleLang = document.querySelector("svg[data-state=active]");
            langDropdown.append(visibleLang);
            langContainer.prepend(this);
            visibleLang.dataset.state = "inActive";
            this.dataset.state = "active";
            langDropdown.classList.remove("header__lang-dropdown_active");
        });
    });
    ///////////////BURGER
    let burger = document.querySelector(".burger");
    let navList = document.querySelector(".nav__list");
    let navListHeight = document.querySelector(".nav__list").getBoundingClientRect().height;
    var nav = document.querySelector("#nav");
    var navLinks = document.querySelectorAll(".nav__item-link");

    burger.addEventListener("click", () => {
        burger.classList.toggle("burger_closed");
        burger.classList.toggle("burger_open");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
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
    });
    //////////////LEVELS_CARDS
    let levels = [...document.querySelectorAll(".money-levels__item")];

    for (let i = 0; i < levels.length; i++) {
        levels[i].addEventListener("click", function () {
            this.classList.add("money-levels__item_active");
            levels.forEach((level) => {
                if (level != this) {
                    level.classList.remove("money-levels__item_active");
                }
            });
        });
    }
    ///////////////MONEY AGE TABS
    let ages = [...document.querySelectorAll(".money__age-item")];

    ages.forEach((age) => {
        age.addEventListener("click", function () {
            this.classList.add("money__age-item_active");
            ages.forEach((oldAge) => {
                if (oldAge != this) {
                    oldAge.classList.remove("money__age-item_active");
                }
            });
        });
    });

    ////////////CALLBACK POPAP
    let callbackOverlay = document.querySelector(".callback-overlay");
    let callbackPopap = document.querySelector(".callback");
    let closeCallback = document.querySelector(".callback__close-link");
    let callbackBtns = document.querySelectorAll(".callbackBtn");
    let callbackSubmit = document.querySelector("#callbackSubmit");
    let callbackForm = document.querySelector(".callback__form");
    let callbackInputs = document.querySelectorAll(".callback__input");
    let callbackComment = document.querySelector("#userComment");
    let callbackLabels = document.querySelectorAll(".callback__inValid");

    callbackBtns.forEach((btn) => {
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
        setTimeout(() => {
            callbackPopap.classList.remove("callback_active");
            callbackPopap.classList.remove("callback_inactive");
            callbackPopap.classList.remove("callback__response");
        }, 500);
    }

    function closeOverlay() {
        callbackOverlay.classList.add("callback-overlay_inactive");
        setTimeout(() => {
            callbackOverlay.classList.remove("callback-overlay_active");
            callbackOverlay.classList.remove("callback-overlay_inactive");
        }, 500);
    }

    function callbackSucces() {
        callbackPopap.querySelector("h2").textContent = "Спасибо";
        callbackPopap.querySelector(".callback__subtitle").textContent =
            "Наш менеджер свяжется с Вами в ближайшее время";
        callbackPopap.classList.add("callback__response");
    }
    function callbackError() {
        callbackPopap.querySelector("h2").textContent = "Ошибка!";
        callbackPopap.querySelector(".callback__subtitle").textContent =
            "К сожалению, нам не удалось отправить Вашу заявку! Попробуйте позже.";
        callbackPopap.classList.add("callback__response");
    }

    closeCallback.addEventListener("click", function (e) {
        e.preventDefault();
        closePopap();
        closeOverlay();
        setTimeout(() => {
            document.querySelector(".callback__title").innerHTML =
                "Остались вопросы?<br> Оставьте заявку и наш менеджер свяжется с Вами";
            document.querySelector(".callback__subtitle").innerHTML = "";
            callbackPopap.classList.remove("callback__response");
        }, 500);
    });
    //////////VALIDATE INPUTS
    function validateName() {
        if (callbackForm.userName.value == "") {
            let label = document.querySelector(`[for="${callbackForm.userName.id}"]`);
            label.classList.add("callback__inValid_active");
            callbackForm.userName.classList.add("callback__input_danger");
        } else {
            return true;
        }
    }

    function validateMail() {
        if (!callbackForm.userMail.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)) {
            let label = document.querySelector(`[for="${callbackForm.userMail.id}"]`);
            label.classList.add("callback__inValid_active");
            callbackForm.userMail.classList.add("callback__input_danger");
        } else {
            return true;
        }
    }
    function validateTel() {
        if (
            !callbackForm.userTel.value.match(/^\d[\d\(\)\ -]{4,14}\d$/) ||
            callbackForm.userTel.value == ""
        ) {
            let label = document.querySelector(`[for="${callbackForm.userTel.id}"]`);
            label.classList.add("callback__inValid_active");
            callbackForm.userTel.classList.add("callback__input_danger");
        } else {
            return true;
        }
    }
    ////////////SUBMIT FORM

    function sendForm(how, url, succes, error) {
        let method = how || "POST";
        let action = url || "#";

        let request = new XMLHttpRequest();
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
        let data = new FormData(callbackForm);
        for (var pair of data.entries()) {
            console.log(pair[0] + ", " + "<br>" + pair[1]);
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
            callbackInputs.forEach((input) => {
                input.addEventListener("focus", function () {
                    for (let i = 0; i < callbackLabels.length; i++) {
                        if (input.id == callbackLabels[i].getAttribute("for")) {
                            callbackLabels[i].classList.remove("callback__inValid_active");
                            input.classList.remove("callback__input_danger");
                        }
                    }
                });
            });
        }
    });

    ///////////////////SLIDER
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
                centeredSlidesBounds: false,
            },
            1050: {
                slidesPerView: 3,
                centeredSlides: true,
                centeredSlidesBounds: true,
                roundLengths: true,
                spaceBetween: 5,
            },
        },
        on: {
            slideNextTransitionEnd: function () {
                console.log("slideNextTransitionEnd");

                bLazy.revalidate();
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
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
                centeredSlidesBounds: false,
            },
            1050: {
                slidesPerView: 3,
                centeredSlides: true,
                centeredSlidesBounds: true,
                roundLengths: true,
                spaceBetween: 20,
            },
        },
        on: {
            slideNextTransitionEnd: function () {
                console.log("slideNextTransitionEnd");

                bLazy.revalidate();
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    //////////////ANCHORS SCROLL

    // собираем все якоря; устанавливаем время анимации и количество кадров
    const anchors = [].slice.call(document.querySelectorAll('.nav__list a[href*="#"]')),
        animationTime = 300,
        framesCount = 20;

    anchors.forEach(function (item) {
        // каждому якорю присваиваем обработчик события
        item.addEventListener("click", function (e) {
            let location = window.location.href;
            let pageName = location.slice(location.lastIndexOf("/"));
            if (pageName.indexOf("index") !== -1) {
                console.log(location);
                console.log(pageName);

                // убираем стандартное поведение
                e.preventDefault();

                // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
                let coordY =
                    document.querySelector(item.getAttribute("href")).getBoundingClientRect().top +
                    window.pageYOffset;

                // запускаем интервал, в котором
                let scroller = setInterval(function () {
                    // считаем на сколько скроллить за 1 такт
                    let scrollBy = coordY / framesCount;

                    // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
                    // и дно страницы не достигнуто
                    if (
                        scrollBy > window.pageYOffset - coordY &&
                        window.innerHeight + window.pageYOffset < document.body.offsetHeight
                    ) {
                        // то скроллим на к-во пикселей, которое соответствует одному такту
                        window.scrollBy(0, scrollBy);
                    } else {
                        // иначе добираемся до элемента и выходим из интервала
                        window.scrollTo(0, coordY);
                        clearInterval(scroller);
                    }
                    // время интервала равняется частному от времени анимации и к-ва кадров
                }, animationTime / framesCount);
            } else {
                let startHref = window.location.href.slice(
                    0,
                    window.location.href.lastIndexOf("/") + 1
                );

                document.location.href = `${startHref}index.html${item.getAttribute("href")}`;
            }
        });
    });
});
