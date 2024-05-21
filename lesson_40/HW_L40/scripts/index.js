import { WEATHER_API_DOMAIN, BACKGROUND_API_DOMAIN } from './constants.js';
import { fillDetails, setBackground } from './showElements.js';

function logError(error) {
    console.log(error);
    console.error(error.message);
    alert('something went wrong, please return to us in few minutes');
}

function getWeatherDetails(weatherUrl) {
    fetch(weatherUrl)
        .then((data) => data.json())
        .then(fillDetails)
        .catch(logError);
}

function getBackgroundImages(backgroundUrl) {
    fetch(backgroundUrl)
        .then((data) => data.json())
        .then(setBackground)
        .catch(logError);
}

function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city?.length >= 1) {
        getWeatherDetails(`${WEATHER_API_DOMAIN}&q=${city}`);
        getBackgroundImages(`${BACKGROUND_API_DOMAIN}&query=${city}`);
    }
}

function weatherApp() {
    const form = document.getElementById('city-form');
    form.addEventListener('submit', handleSubmit)
}

weatherApp()
