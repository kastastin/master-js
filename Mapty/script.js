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
    console.log(position);
    const { latitude: lat } = position.coords;
    const { longitude: lon } = position.coords;
    const coords = [lat, lon];

    const map = L.map('map').setView(coords, 13);

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
    ).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  },
  () => {
    alert('Could not get your position');
  }
);
