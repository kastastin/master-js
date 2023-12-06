'use strict';

const modalEl = document.querySelector('.modal'),
  overlayEl = document.querySelector('.overlay'),
  section1El = document.querySelector('#section--1'),
  tabContainerEl = document.querySelector('.operations__tab-container'),
  tabContentElems = document.querySelectorAll('.operations__content'),
  tabElems = document.querySelectorAll('.operations__tab'),
  navEl = document.querySelector('.nav'),
  logoEl = document.querySelector('#logo'),
  navLinkElems = document.querySelectorAll('.nav__link'),
  headerEl = document.querySelector('.header'),
  allSectionElems = document.querySelectorAll('.section'),
  lazyImgElems = document.querySelectorAll('img[data-src]'),
  sliderEl = document.querySelector('.slider'),
  slideElems = document.querySelectorAll('.slide'),
  btnLeftEl = document.querySelector('.slider__btn--left'),
  btnRightEl = document.querySelector('.slider__btn--right'),
  dotsContainerEl = document.querySelector('.dots');

modalWindow();
smoothScrolling();
tabbedComponent();
menuFade();
stickyNavigation();
revealSections();
lazyLoadingImages();
slider();
cookiesMessage();

// <-- Modal window -->
function modalWindow() {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    const clickedElClass = e.target.className,
      classesToCheck = ['btn--show-modal', 'btn--close-modal', 'overlay'];

    if (
      classesToCheck.some((className) => clickedElClass.includes(className))
    ) {
      modalEl.classList.toggle('hidden');
      overlayEl.classList.toggle('hidden');
    }
  });
}

// <-- Smooth scrolling -->
function smoothScrolling() {
  document.addEventListener('click', (e) => {
    const clickedElClass = e.target.classList;

    // Navigation links
    if (clickedElClass.contains('nav__link')) {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }

    // Learn more button
    if (clickedElClass.contains('btn--scroll-to')) {
      section1El.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// <-- Tabbed component -->
function tabbedComponent() {
  tabContainerEl.addEventListener('click', (e) => {
    const clickedTabEl = e.target.closest('.operations__tab');

    if (!clickedTabEl) return;

    // Remove all active classes
    tabElems.forEach((el) => el.classList.remove('operations__tab--active'));
    tabContentElems.forEach((el) =>
      el.classList.remove('operations__content--active')
    );

    // Activate tab
    clickedTabEl.classList.add('operations__tab--active');

    // Activate content area
    document
      .querySelector(`.operations__content--${clickedTabEl.dataset.tab}`)
      .classList.add('operations__content--active');
  });
}

// <-- Menu fade animation -->
function menuFade() {
  navEl.addEventListener('mouseover', changeOpacity.bind(0.5));
  navEl.addEventListener('mouseout', changeOpacity.bind(1));

  function changeOpacity(e) {
    const clickedEl = e.target;

    if (clickedEl.classList.contains('nav__link')) {
      [logoEl, ...navLinkElems].forEach((el) => {
        if (el !== clickedEl) el.style.opacity = this;
      });
    }
  }
}

// <-- Sticky navigation -->
function stickyNavigation() {
  const navElHeight = navEl.getBoundingClientRect().height,
    headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navElHeight}px`,
    });
  headerObserver.observe(headerEl);

  function stickyNav(entries) {
    const [entry] = entries;
    entry.isIntersecting
      ? navEl.classList.remove('sticky')
      : navEl.classList.add('sticky');
  }
}

// <-- Reveal sections -->
function revealSections() {
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSectionElems.forEach((sectionEl) => {
    // sectionEl.classList.add('section--hidden');
    sectionObserver.observe(sectionEl);
  });

  function revealSection(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}

// <-- Lazy loading images -->
function lazyLoadingImages() {
  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });

  lazyImgElems.forEach((imgEl) => imgObserver.observe(imgEl));

  function loadImg(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  }
}

// <-- Slider -->
function slider() {
  let currSlide = 0;
  const maxSlide = slideElems.length - 1;

  createDots();
  goToSlide(currSlide);
  activateDot(currSlide);

  btnRightEl.addEventListener('click', () => changeSlide('next'));
  btnLeftEl.addEventListener('click', () => changeSlide('prev'));

  document.addEventListener('keydown', (e) => {
    e.key === 'ArrowRight' && changeSlide('next');
    e.key === 'ArrowLeft' && changeSlide('prev');
  });

  dotsContainerEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      currSlide = e.target.dataset.slide;

      goToSlide(currSlide);
      activateDot(currSlide);
    }
  });

  function changeSlide(option) {
    if (option === 'next') {
      currSlide == maxSlide ? (currSlide = 0) : currSlide++;
    } else if (option === 'prev') {
      currSlide == 0 ? (currSlide = maxSlide) : currSlide--;
    } else {
      throw new Error('option argument error');
    }

    goToSlide(currSlide);
    activateDot(currSlide);
  }

  function goToSlide(slideNum) {
    slideElems.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNum)}%)`;
    });
  }

  function createDots() {
    slideElems.forEach((_, i) => {
      dotsContainerEl.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dotEl) => dotEl.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }
}

// <-- Cookies message -->
function cookiesMessage() {
  const message = document.createElement('div');

  message.classList.add('cookie-message');
  message.style.backgroundColor = '#37383d';
  message.innerHTML =
    'We use cookies for impoved functionality and analytics.<button class="btn btn--close-cookie" > Got it!</ > ';
  headerEl.prepend(message);

  document.querySelector('.btn--close-cookie').addEventListener('click', () => {
    message.parentElement.removeChild(message);
  });
}
