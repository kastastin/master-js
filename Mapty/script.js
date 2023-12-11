'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude: lat } = position.coords;
    const { longitude: lng } = position.coords;
    const coords = [lat, lng];
    const map = L.map('map').setView(coords, 13);

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
    ).addTo(map);

    map.on('click', (mapEvent) => {
      const { lat, lng } = mapEvent.latlng;
      const clickedCoords = [lat, lng];

      L.marker(clickedCoords)
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
          })
        )
        .setPopupContent('Workout')
        .openPopup();
    });
  },
  () => {
    alert('Could not get your position');
  }
);
