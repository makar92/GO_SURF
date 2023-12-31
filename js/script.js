import shores from "./shores.json" assert {type: 'json'};
import beaches from "./surf_beaches.json" assert {type: 'json'};
import airlines from "./airlines.json" assert {type: 'json'};
import boards from "./surfboard.json" assert {type: 'json'};

import {mapsMainBlock} from "./maps-svg.js";
import {mapsSurf} from "./maps-surf.js";

//console.log(maps[0]);

//Функция создания свайпера
const relizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
  let swiper;

  breakpoint = window.matchMedia(breakpoint);

  const enableSwiper = function(className, settings) {
    swiper  = new Swiper(className, settings);

    if (callback) {
      callback(swiper);
    }
  }

  const checker = function() {
    if (breakpoint.matches) {
      return enableSwiper(swiperClass, swiperSettings);
    } else {
      if (swiper !== undefined) swiper.destroy(true, true);
      return;
    }
  }

  breakpoint.addEventListener('change', checker);
  checker();
}

// Функции присвоения предыдущего и следующего номера элемента объекта
// Аргументы: получаемый номер и сам объект
function prevObj(pr, obj) {
  if (pr == 0) {
    return Object.keys(obj).length - 1
  } else {
    return pr - 1;
  }
}
function nextObj(nx, obj) {
  if (nx == Object.keys(obj).length - 1) {
    return 0;
  } else {
    return nx + 1;
  }
}

//Проверяем наличие класса
function containsClass(arr, cl) {
  let ch;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains(cl)) {
      ch = i;
    }
  }
  return ch;
}
// Удаляет класс у элементов массива:
function removeClass(arr, cl) {
  for (let j = 0; j < arr.length; j++) {
    arr[j].classList.remove(cl);
  }
}
// Добавляет класс элементу:
function addClass(el, cl) {
  el.classList.add(cl);
}


function changeElementClass(el, arr, cl) {
  removeClass(arr, cl);
  addClass(el, cl);
}


// Функция поиска активного класса (блок wrapper)
function findActiveSlide(arr) {
  let active;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains('swiper-slide-active')) {
      active = i;
    }
  }
  return active;
}

function addStyleDisplayForArr(arr,style) {
  for (let j = 0; j < arr.length; j++) {
    arr[j].style.display = style;
  }
}
function addStyleDisplayForEl(el, style) {
  el.style.display = style;
}



//----- main swiper -----------------------------

const mainSwiper = new Swiper('.wrapper', {
  mousewheel: {                            //Управление колесом мыши
    sensitivity: 1,                      //Чувствительность колеса
    eventsTarget: '.wrapper',  
  },
  direction: 'vertical', 
}); 


//Функция скрола главного слайдера над встроенными svg
setTimeout(() => {

 

  //Для листания колесиком мышью
  function scrolMainSlider1(event) {
    if (event.deltaY < 0) {
      mainSwiper.slidePrev(300, false);
    } else if (event.deltaY > 0) {
      mainSwiper.slideNext(300, false);
    }
    svg1.removeEventListener('wheel', scrolMainSlider1);
    setTimeout(() => {
      svg1.addEventListener('wheel', scrolMainSlider1);
    }, 500)
  }
  function scrolMainSlider2() {
    if (event.deltaY < 0) {
      mainSwiper.slidePrev(300, false);
    } else if (event.deltaY > 0) {
      mainSwiper.slideNext(300, false);
    }
    svg2.removeEventListener('wheel', scrolMainSlider2);
    setTimeout(() => {
      svg2.addEventListener('wheel', scrolMainSlider2);
    }, 500)
  }

  let xDown = null;                                                        
  let yDown = null;                                                        

  function handleTouchStart(evt) {    
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
  };                                                

  function handleTouchMove(evt) {

    if ( ! xDown || ! yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) < Math.abs( yDiff ) ) {
        if ( yDiff > 0 ) {
          mainSwiper.slideNext(300, false);
            console.log(1);
        } else { 
          mainSwiper.slidePrev(300, false);
          console.log(2);
        }                                                                 
    }

    xDown = null;
    yDown = null;                                             
  };

}, 100)





//----- main-block shore --------------------------

let chosenShore;

// Функция обновления данных main-block
function newChose(n) {

  // Подгрузка данных для main-block:
  btsShores[n].classList.add('item-main-block_shosen');
  titleMainBlock.innerHTML = shores[n].title;
  bgMainBlock.innerHTML = `<img src="img/main-block/bg/${shores[n].bg}" alt="">`

  mapBlock.innerHTML = mapsMainBlock[n];
  let map = document.querySelector('.map-block__map');
  if (n == 0) {
    map.classList.remove('map1');
    map.classList.remove('map2');
    map.classList.add('map0');
    bgMainBlock.classList.remove('positionBg1')
  }
  if (n == 1) {
    map.classList.remove('map0');
    map.classList.remove('map2');
    map.classList.add('map1');
    bgMainBlock.classList.add('positionBg1')
  }
  if (n == 2) {
    map.classList.remove('map1');
    map.classList.remove('map0');
    map.classList.add('map2');
    bgMainBlock.classList.remove('positionBg1')
  }

  updateMapDots();
}


setTimeout(function() {
  newChose(0);
  
}, 0);

let btsShores = document.querySelectorAll(".item-main-block");

let arrowDownLeft = document.querySelector('#arrow-down-left');
let arrowDounRight = document.querySelector('#arrow-down-right');

let titleMainBlock = document.querySelector('.main-block__title');
let mapBlock = document.querySelector(".map-block");
let bgMainBlock = document.querySelector(".main-block__bg");


for (let i = 0; i < btsShores.length; i++) {
  btsShores[i].addEventListener('click', function() {
    removeClass(btsShores, "item-main-block_shosen");
    newChose(i);
    
  })
}

arrowDownLeft.addEventListener('click', function() {
  let chosen = containsClass(btsShores, "item-main-block_shosen");
  removeClass(btsShores, "item-main-block_shosen");
  if (chosen == 0) {
    chosen = btsShores.length - 1;
  } else {
    chosen = chosen - 1;
  }
  newChose(chosen);
})

arrowDounRight.addEventListener('click', function() {
  let chosen = containsClass(btsShores, "item-main-block_shosen");
  removeClass(btsShores, "item-main-block_shosen");
  if (chosen == btsShores.length - 1) {
    chosen = 0;
  } else {
    chosen = chosen + 1;
  }
  newChose(chosen);
})



//----- main-block map ------------------------------------

let chosenDot;

let dotsMainBlockMap;
let bigdotsMainBlockMap;
let textMainBlockMap;

function updateContentMap(n) {
  removeClass(bigdotsMainBlockMap, "db");
  removeClass(textMainBlockMap, "db");
  addClass(bigdotsMainBlockMap[n], "db");
  addClass(textMainBlockMap[n], "db");
  chosenDot = n;
}

function updateMapDots() {
  dotsMainBlockMap = document.querySelectorAll('.svg-dot-main-block-map');
  bigdotsMainBlockMap = document.querySelectorAll('.svg-bigdot-main-block-map');
  textMainBlockMap = document.querySelectorAll('.svg-main-block-map-text');
  
  
  for (let i = 0; i < dotsMainBlockMap.length; i++) {
    dotsMainBlockMap[i].addEventListener('click', function() {
      updateContentMap(i);
    })
  }

  chosenDot = containsClass(bigdotsMainBlockMap, "db");
}


let arrowUpLeft = document.querySelector('#arrow-up-left');
let arrowUpRight = document.querySelector('#arrow-up-right');

arrowUpLeft.addEventListener('click', function() {
  if (chosenDot == bigdotsMainBlockMap.length - 1) {
    chosenDot = 0;
  } else {
    chosenDot = chosenDot + 1;
  }
  updateContentMap(chosenDot);
})

arrowUpRight.addEventListener('click', function() {
  if (chosenDot == 0) {
    chosenDot = bigdotsMainBlockMap.length - 1;
  } else {
    chosenDot = chosenDot - 1;
  }
  updateContentMap(chosenDot);
})







//---- surf map -----------------------------------------


let surfMapBlock = document.querySelector('.surf__map-block');

const addSurfMap = (breakpoint, parentBlock, map0, map1) => {
  
  breakpoint = window.matchMedia(breakpoint);

  const changeMap = function(showMap) {
    if (breakpoint.matches) {
      parentBlock.innerHTML = map0;
      
    } else {
      parentBlock.innerHTML = map1;
    }

  }

  breakpoint.addEventListener('change', changeMap);

  changeMap();
}

addSurfMap("(min-width: 767px)", surfMapBlock, mapsSurf[0], mapsSurf[1]);

let surfDots = document.querySelectorAll('.surfDot');
let surfMobileWindows = document.querySelectorAll('.surMobWindow');
let surfActiveDots = document.querySelectorAll('.oval-active');



function addListenerForSurfDots() {

  for (let i = 0; i < surfDots.length; i++) {

    surfDots[i].addEventListener('click', function() {

      changeElementClass(surfActiveDots[i], surfActiveDots, "db");
      changeElementClass(surfMobileWindows[i], surfMobileWindows, "db");
  
      setTimeout(() => {
        window.addEventListener('click', function (event) {
  
          if (
            (event.target == surfDots[0]) ||
            (event.target == surfDots[1]) ||
            (event.target == surfDots[2]) ||
            (event.target == surfDots[3]) ||
            (event.target == surfDots[4]) ||
            (event.target == surfDots[5]) ||
            (event.target == surfDots[6]) ||
            (event.target == surfDots[7]) ) {
          } else {
            removeClass(surfMobileWindows, "db");
            removeClass(surfActiveDots, "db")
          }

        }, { once: true })

      }, 100)

    })
  }
}


addListenerForSurfDots();


//Слушатель изменения экрана для переназначения слушателей карты
window.matchMedia("(min-width: 767px)").addEventListener('change', function() {
  
  surfDots = document.querySelectorAll('.surfDot');
  surfMobileWindows = document.querySelectorAll('.surMobWindow');
  surfActiveDots = document.querySelectorAll('.oval-active');

  setTimeout(() => {
    addListenerForSurfDots();
  }, 300)

});


//Ховеры для точек на карте
let surfDotsHover = document.querySelectorAll(".oval-hover");

for (let i = 0; i < surfDots.length; i++) {
  surfDots[i].addEventListener('mouseover', function() {
    surfDotsHover[i].classList.add("db");
  })
  surfDots[i].addEventListener('mouseout', function() {
    surfDotsHover[i].classList.remove("db");
  })
}






//----- slider -----------

let arrSlider;
let cards = document.querySelector('.slider__cards');

for (let i = 0; i < Object.keys(beaches).length; i++) {
  cards.innerHTML += `
  <div class="slider__slide swiper-slide">
    <div class="slider__card card">
      <div class="card__title">${beaches[i].name}</div>
      <div class="card__location">${beaches[i].state} | ${beaches[i].country}</div>
      <div class="card__footer">
        <div class="card__two-words two-words">
          <div class="two-words__left">View</div>
          <div class="two-words__right">
            <div class="two-words__right-text">— Surf →</div>
            <div class="two-words__right-bg"></div>
          </div>
        </div>
      </div>
      <div class="card__bg">
        <img src="img/forBD/cards_bg/${beaches[i].imgBgCard}" alt="">
      </div>
    </div>
  </div>
  `
}

const slider = new Swiper('.slider__container', {

  navigation: {
    prevEl: '.slider-l', 
    nextEl: '.slider-r', 
  },

  slidesPerGroup: 1,
  
  centeredSlides: true,
  loop: true,
  loopedSlides: 3,

  

  slidesPerView: 1.2,
  breakpoints: {
    546: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    1090: {
      slidesPerView: 3,
    },
    1468: {
      slidesPerView: 4,
    },
    1920: {
      slidesPerView: 5,
    },
  },
});


let sliderSlides = document.querySelectorAll('.slider__slide');


//Поднимаем четные слайды 
for (let i = 0; i < sliderSlides.length; i++) {
  if (i % 2) {
    sliderSlides[i].classList.add('up-slide');
  }
}


let sliderActivSlide = slider.activeIndex;
changeBgActiveSlide();
changeActiveBtForSlider();


//Событие изменения слайда
slider.on('slideChange', function() {
  setTimeout(() => {
    sliderActivSlide = slider.activeIndex;
    changeBgActiveSlide();
    changeActiveBtForSlider();
  }, 100)
})


//Изменения фона для активного слайда
function changeBgActiveSlide() {
  let sliderBgSlide = document.querySelectorAll('.card__bg');
  sliderBgSlide.forEach(element => {
    element.classList.remove('slider-active-slide');
  });
  sliderBgSlide[sliderActivSlide].classList.add('slider-active-slide');
  
  
}
//Добавление ховера для кнопки активного слайда
function changeActiveBtForSlider() {
  let sliderSlides = document.querySelectorAll('.slider__slide');

  sliderSlides.forEach(element => {
    element.classList.remove("slider__slide_active");
  });
  sliderSlides[sliderActivSlide].classList.add("slider__slide_active");
}



//----- travel -----------------------------

let activeInfoTravel = 0;
let activeInfoAirline = 0;

let trName = document.querySelector('#tr-name');
let trAirline = document.querySelector('#airline');
let trDestination = document.querySelector('#destination');
let trDistance = document.querySelector('#distance');
let trTime = document.querySelector('#travel-time');
let trPrice = document.querySelector('#travel-price');
let trBG = document.querySelector('#travel-bg');
let trPlane = document.querySelector('#travel-plane');
let trAirlineLogo = document.querySelector('#travel-airline-logo');

let prevTr = document.querySelector('#prevTr');
let nextTr = document.querySelector('#nextTr');
let prevAirline = document.querySelector('#prevAirline');
let nextAirline = document.querySelector('#nextAirline');

let trDownBlock = document.querySelector('#tr-down-block');

// Функция изменения данных блока travel
function changeInfoTravel(n) {
  trName.innerHTML = `${beaches[n].name} | ${beaches[n].country}`;
  trAirline.innerHTML = beaches[n].airline[0].nameAirline;
  trDestination.innerHTML = `${beaches[n].state}<br>${beaches[n].country}`;
  trDistance.innerHTML = `${beaches[n].distance} MILES`;
  trTime.innerHTML = `${beaches[n].airline[0].travelTime.hours} HOURS<br>${beaches[n].airline[0].travelTime.minutes} MINUTES`;
  trPrice.innerHTML = beaches[n].airline[0].pricing;
  changeBg();
  activeInfoTravel = n;
  findAirline(activeInfoTravel, 0); 
  

  function changeBg() {
    trBG.classList.remove('block-show');
    trBG.classList.add('block-hide');
    setTimeout(() => {
      trBG.innerHTML = `<img src="img/forBD/travel_bg/${beaches[n].imgBgTravel}" alt="">`;
      trBG.classList.add('block-show');
      trBG.classList.remove('block-hide');
    }, 200)
  }
}

// Функция изменения данных авиакомпании
function changeInfoAirline(k) {
  trAirline.innerHTML = beaches[activeInfoTravel].airline[k].nameAirline;
  trTime.innerHTML = `${beaches[activeInfoTravel].airline[k].travelTime.hours} HOURS<br>${beaches[activeInfoTravel].airline[k].travelTime.minutes} MINUTES`;
  trPrice.innerHTML = beaches[activeInfoTravel].airline[k].pricing;
  activeInfoAirline = k;
  findAirline(activeInfoTravel, k);
}

// Функция скрытия нижнего блока тревел при отсутствии авиакомпании
function hideBlock(l) {
  if (l ==1) {
    trDownBlock.classList.add('dn');
  } else {
    trDownBlock.classList.remove('dn');
  }
}

//Функция изменения самолета и логотипа авивкомпании
function findAirline(r, t) {
  let nameAirline;

  if (r == 1) {
    trPlane.innerHTML = "";
    trAirlineLogo.innerHTML = "";
  } else {
      nameAirline = beaches[r].airline[t].nameAirline;
      changePlane();
      trAirlineLogo.innerHTML = `<img src="img/forBD/airlines/logo/${airlines[nameAirline].logo}" alt="">`;
  }

  hideBlock(r)

  function changePlane() {
    trPlane.classList.remove('plane-position-2')
    trPlane.classList.add('plane-position-3');
    setTimeout(() => trPlane.classList.remove('plane-position-3'), 1000);
    setTimeout(() => trPlane.classList.add('plane-position-1'), 1000);
    //setTimeout(() => trPlane.classList.remove('plane-position-1'), 1100);
    setTimeout(() => trPlane.innerHTML = `<img src="img/forBD/airlines/plane/${airlines[nameAirline].imgPlane}" alt="">`, 1100);
    setTimeout(() => trPlane.classList.add('plane-position-2'), 1100);
  }
}

changeInfoTravel(0);

// Переключение данных travel
prevTr.addEventListener('click', function() {
  activeInfoTravel = prevObj(activeInfoTravel, beaches)
  changeInfoTravel(activeInfoTravel);
  changeInfoResort(activeInfoTravel, activeInfoResolt)
  activeInfoAirline = 0;
})
nextTr.addEventListener('click', function() {
  activeInfoTravel = nextObj(activeInfoTravel, beaches)
  changeInfoResort(activeInfoTravel, activeInfoResolt)
  changeInfoTravel(activeInfoTravel);
  activeInfoAirline = 0;
})

// Переключение данных авиакомпании
prevAirline.addEventListener('click', function() {
  activeInfoAirline = prevObj(activeInfoAirline, beaches[activeInfoTravel].airline)
  changeInfoAirline(activeInfoAirline);
})
nextAirline.addEventListener('click', function() {
  activeInfoAirline = nextObj(activeInfoAirline, beaches[activeInfoTravel].airline)
  changeInfoAirline(activeInfoAirline);
})



//----- sleep-block ---------------------------

let resortPrev = document.querySelector('#resort-prev');
let resortNext = document.querySelector('#resort-next');
let resortTitle = document.querySelector('#resort-title');
let resortRatingName = document.querySelector('#resort-rating-name');
let resortRating = document.querySelector('#resort-rating');
let resortRetingBlock = document.querySelector('#resort-reting-block');
let resortName = document.querySelector('#resort-name');
let resortNights = document.querySelector('#resort-nights');
let resortNightsMinus = document.querySelector('#resort-nights-minus');
let resortNightsPlus = document.querySelector('#resort-nights-plus');
let resortGuests = document.querySelector('#resort-guests');
let resortGuestsMinus = document.querySelector('#resort-guests-minus');
let resortGuestsPlus = document.querySelector('#resort-guests-plus');
let resortPrice = document.querySelector('#resort-price');
let resortBg = document.querySelector('#resort-bg');

let retingName = [
  "Very Poor",
  "Poor",
  "Fair",
  "Good",
  "Excellent",
]

let activeInfoResolt = 0;
let nights = 5
let guest = 1;
let reting;

function changeNights() {
  if (nights == 1) {
    resortNights.innerHTML = nights + " Night";
  } else {
    resortNights.innerHTML = nights + " Nights";
  }
}

function changeGuests(m, n) {
  if (guest == 1) {
    resortGuests.innerHTML = guest + " Guest";
  } else {
    resortGuests.innerHTML = guest + " Guests";
  }
  resortPrice.innerHTML = beaches[m].resorts[n].pricePerNight[guest - 1];
}

function changeInfoResort(m, n) {
 
  resortTitle.innerHTML = beaches[m].resorts[n].name + " | " + beaches[m].country;
  changeRating()
  resortName.innerHTML = beaches[m].resorts[n].name + "<br>" + beaches[0].country;
  changeNights();
  changeGuests(m, n);
  changeBg();

  function changeRating() {

    reting = beaches[m].resorts[n].rating;

    if (reting == 0) {
      resortRetingBlock.classList.add('dn');
    } else {
      resortRetingBlock.classList.remove('dn');
    }
  
    resortRatingName.innerHTML = retingName[reting - 1];
    resortRating.innerHTML = "";
    
    for (let i = 0; i < reting; i++) {
      resortRating.innerHTML += `<img src="img/info-block_2/star.svg" alt="" class="hide r-star">`;
      
    }
    for (let i = 0; i < reting; i++) {
      let stars = document.querySelectorAll('.r-star');
      setTimeout(() => {
        stars[i].classList.remove('hide')
        stars[i].classList.add('show')
      }, i * 100) 
    }
  }

  function changeBg() {
    resortBg.classList.remove('block-show');
    resortBg.classList.add('block-hide');
    setTimeout(() => {
      resortBg.innerHTML = `<img src="img/forBD/resorts/${beaches[m].resorts[n].imgBgResort}" alt="">`;
      resortBg.classList.remove('block-hide');
      resortBg.classList.add('block-show');
    }, 200)
  }
}
 
changeInfoResort(activeInfoTravel, activeInfoResolt);

//Переключает предыдущий и следующий resolt
resortPrev.addEventListener('click', function() {
  activeInfoResolt = prevObj(activeInfoResolt, beaches[activeInfoTravel].resorts)
  changeInfoResort(activeInfoTravel, activeInfoResolt);
})
resortNext.addEventListener('click', function() {
  activeInfoResolt = nextObj(activeInfoResolt, beaches[activeInfoTravel].resorts)
  changeInfoResort(activeInfoTravel, activeInfoResolt);
})


//Увеличивает и уменьшает колличество ночей
resortNightsMinus.addEventListener('click', function() {
  if (nights > 1) {
    nights = nights - 1;
    //changeInfoResort(activeInfoTravel, activeInfoResolt);
    changeNights();
  } 
})
resortNightsPlus.addEventListener('click', function() {
  nights = nights + 1;
  //changeInfoResort(activeInfoTravel, activeInfoResolt);
  changeNights();
})

//Увеличивает и уменьшает колличество гостей
resortGuestsMinus.addEventListener('click', function() {
  if (guest > 1) {
    guest = guest - 1;
    //changeInfoResort(activeInfoTravel, activeInfoResolt);
    changeGuests(activeInfoTravel, activeInfoResolt);
  } 
})
resortGuestsPlus.addEventListener('click', function() {
  if (guest < 4) {
    guest = guest + 1;
    //changeInfoResort(activeInfoTravel, activeInfoResolt);
    changeGuests(activeInfoTravel, activeInfoResolt);
  }
})



//----- shop -----------------------

let boardName = document.querySelector('#board-name');
let boardRating = document.querySelector('#board-rating');
let boardPrice = document.querySelector('#bord-price');
let boardImages = document.querySelector('#board-images');


//создаем слайдер для досок
relizableSwiper(
  '(min-width: 0px)',
  '.shop__center-block',
  {
    navigation: {                   
      prevEl: '.board-prev', 
      nextEl: '.board-next', 
    },
    //spaceBetween: 30, 
    slidesPerView: 1,
  },
  boardSwiper
);


//добавляем изображения всех досок
for (let i = 0; i < Object.keys(boards).length; i++) {
  boardImages.innerHTML += `
  <div class="center-block__slide swiper-slide">
		<div class="center-block__board">
			<img src="img/forBD/SURFBOARD/${boards[i].img}" alt="">
      <div class="center-block__add-info add-info add-info_1">
        <div class="add-info__bt">
          <img src="img/shop/plus.svg" alt="">
        </div>
        <div class="add-info__line "></div>
        <div class="add-info__info ">${boards[i].material}</div>
      </div>
      <div class="center-block__add-info add-info add-info_2">
        <div class="add-info__bt">
          <img src="img/shop/plus.svg" alt="">
        </div>
        <div class="add-info__line "></div>
        <div class="add-info__info ">${boards[i].strengthening}</div>
      </div>
      <div class="center-block__add-info add-info add-info_3">
        <div class="add-info__bt">
          <img src="img/shop/plus.svg" alt="">
        </div>
        <div class="add-info__line "></div>
        <div class="add-info__info ">${boards[i].fins}</div>
      </div>
		</div>
	</div>
  `
}


//---------------
//находим номер активного слайда
let boardSlades = document.querySelectorAll('.center-block__slide');
let boardActiveSlide;

setTimeout(() => {
  boardActiveSlide = findActiveSlide(boardSlades);
  changeShopData()
}, 100)

//---------------
//Слушатель активного слайда
function boardSwiper(instance) {
  instance.on('slideChange', function (e) {
    setTimeout(() => {
      boardActiveSlide = findActiveSlide(boardSlades);
      changeShopData()
    }, 100)
  })
}

//Функция изменения данных SHOP
function changeShopData() {
  boardName.innerHTML = boards[boardActiveSlide].name;
  boardPrice.innerHTML = "$ " + boards[boardActiveSlide].price;
  changeBoardReting();


  
  function changeBoardReting() {

    let reting = boards[boardActiveSlide].rating;

    boardRating.innerHTML = "";
    
    for (let i = 0; i < reting; i++) {
      boardRating.innerHTML += `<img src="img/shop/Star.svg" alt="" class="hide shop-star">`;
    }
    
    for (let i = 0; i < reting; i++) {
      let stars = document.querySelectorAll('.shop-star');
      setTimeout(() => {
        stars[i].classList.remove('hide')
        stars[i].classList.add('show')
      }, i * 100) 
    }
  }
  
}


//слушатели на кнопки на доске
let bt = document.querySelectorAll('.add-info__bt');
let ln = document.querySelectorAll('.add-info__line');
let info = document.querySelectorAll('.add-info__info');


function addActiveShore() {

  for (let i = 0; i < bt.length; i++) {

    function addOpasity100() {

      event.stopPropagation();
      ln[i].style.opacity = "100%";
      info[i].style.opacity = "100%";
    }
    
    bt[i].addEventListener('click', addOpasity100)

    function addOpasity0() {
      for (let i = 0; i < bt.length; i++) {
        ln[i].style.opacity = "0%";
        info[i].style.opacity = "0%";
      }
    }
    
    window.addEventListener('click', addOpasity0)
    
  }
}

addActiveShore()












//------ Разные слушатели ------------------------------------------------

//Кнопки Header
let btHeaderSurf = document.querySelectorAll('.header__li')[0];
let btHeaderTravel = document.querySelectorAll('.header__li')[1];
let btHeaderSleep = document.querySelectorAll('.header__li')[2];
let btHeaderShop = document.querySelectorAll('.header__li')[3];

btHeaderSurf.addEventListener('click', function() {
  mainSwiper.slideTo(1, 300);
})
btHeaderTravel.addEventListener('click', function() {
  mainSwiper.slideTo(3, 900);
})
btHeaderSleep.addEventListener('click', function() {
  mainSwiper.slideTo(4, 1200);
})
btHeaderShop.addEventListener('click', function() {
  mainSwiper.slideTo(5, 1500);
})

//Стрелка на главном блоке
let btMainDownArrow = document.querySelector('.main-block__down-arrow');
btMainDownArrow.addEventListener('click', function() {
  mainSwiper.slideTo(1, 300);
})

//Кнопка футера
let btShopToMain = document.querySelector('.footer__two-words');
btShopToMain.addEventListener('click', function() {
  mainSwiper.slideTo(0, 1500);
})

//Кнопки карточек на слайдере

let btsCardOfSlider = document.querySelectorAll('.card__two-words');

for (let i = 0; i < btsCardOfSlider.length; i++) {
  btsCardOfSlider[i].addEventListener('click', function() {
    let k = i;
    k = k - 3;
    if (k == -1) k = btsCardOfSlider.length - 1;
    if (k == -2) k = btsCardOfSlider.length - 2;
    if (k == -3) k = btsCardOfSlider.length - 3;

    mainSwiper.slideTo(1, 300);
    showModWinMap();

    function showModWinMap() {
      removeClass(arrDotActive, 'db');
      removeClass(arrMobWindow, 'db');
      arrDotActive[k].classList.add('db');
      arrMobWindow[k].classList.add('db');
      coordinats.innerHTML = arrCoordinats[i];
    }
  })
}

















