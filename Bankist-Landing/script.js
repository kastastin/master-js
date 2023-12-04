'use strict';

// <-- Modal window -->
const modalEl = document.querySelector('.modal'),
  overlayEl = document.querySelector('.overlay');

document.addEventListener('click', (e) => {
  e.preventDefault();

  const clickedElClass = e.target.className,
    classesToCheck = ['btn--show-modal', 'btn--close-modal', 'overlay'];

  if (classesToCheck.some((className) => clickedElClass.includes(className))) {
    modalEl.classList.toggle('hidden');
    overlayEl.classList.toggle('hidden');
  }
});

// <-- Smooth scrolling -->
const section1El = document.querySelector('#section--1');

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

// <-- Tabbed component -->
const tabContainerEl = document.querySelector('.operations__tab-container'),
  tabContentElems = document.querySelectorAll('.operations__content'),
  tabElems = document.querySelectorAll('.operations__tab');

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

// <-- Menu fade animation -->
const navEl = document.querySelector('.nav'),
  logoEl = document.querySelector('#logo'),
  navLinkElems = document.querySelectorAll('.nav__link');

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

// <-- Sticky navigation -->
const section1Coords = section1El.getBoundingClientRect(),
  navCoords = navEl.getBoundingClientRect();

window.addEventListener('scroll', () => {
  window.scrollY > section1Coords.top - navCoords.height
    ? navEl.classList.add('sticky')
    : navEl.classList.remove('sticky');
});

// <-- Cookies message -->
const header = document.querySelector('.header'),
  message = document.createElement('div');

message.classList.add('cookie-message');
message.style.backgroundColor = '#37383d';
message.innerHTML =
  'We use cookies for impoved functionality and analytics.<button class="btn btn--close-cookie" > Got it!</ > ';
header.prepend(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.parentElement.removeChild(message);
});
