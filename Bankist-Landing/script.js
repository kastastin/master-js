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
