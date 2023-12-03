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

// <-- Creating and inserting elements -->
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

// <-- Smooth scrolling -->
const scrollToBtn = document.querySelector('.btn--scroll-to'),
  section1 = document.querySelector('#section--1');

scrollToBtn.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// <-- Event propagation -->
console.log(getRndColor());

function getRndColor() {
  const [r, g, b] = Array.from({ length: 3 }, () => getRndInt(0, 255));

  return `rgb(${r}, ${g}, ${b})`;
}

function getRndInt(min, max) {
  let rnd = min + Math.random() * (max + 1 - min);
  return Math.floor(rnd);
}
