const modalEl = document.querySelector('.modal'),
  overlayEl = document.querySelector('.overlay');

document.addEventListener('click', (e) => {
  const clickedElClass = e.target.className;

  if (['show-modal', 'close-modal', 'overlay'].includes(clickedElClass)) {
    toggleHiddenClass();
  }
});

function toggleHiddenClass() {
  modalEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
}
