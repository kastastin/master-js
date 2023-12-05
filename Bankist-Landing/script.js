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
  headerEl = document.querySelector('.header');

// <-- Modal window -->
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

// <-- Cookies message -->
const message = document.createElement('div');

message.classList.add('cookie-message');
message.style.backgroundColor = '#37383d';
message.innerHTML =
  'We use cookies for impoved functionality and analytics.<button class="btn btn--close-cookie" > Got it!</ > ';
headerEl.prepend(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.parentElement.removeChild(message);
});
