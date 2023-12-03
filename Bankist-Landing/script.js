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
message.innerHTML =
  'We use cookies for impoved functionality and analytics.<button class="btn btn--close-cookie" > Got it!</ > ';
header.prepend(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.parentElement.removeChild(message);
});
