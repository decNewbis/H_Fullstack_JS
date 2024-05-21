function setElementContent(elementId, content) {
    document.getElementById(elementId).textContent = content;
}

function setElementSrc(elementId, content) {
    document.getElementById(elementId).src = content;
}

export function setBackground(response) {
    const body = document.body;
    const results = response.results;
    const randomNumberBackgroundImage = Math.floor(Math.random() * results.length);
    const randomImage = results[randomNumberBackgroundImage];
    const {regular: link} = randomImage.urls;
    body.style.backgroundImage = `url(${link})`;
}

function getLocalTime24(timeInSeconds, timezoneInSeconds) {
    const timeInMilliseconds = timeInSeconds * 1000;
    const timezoneInMilliseconds = timezoneInSeconds * 1000;
    const date = new Date(timeInMilliseconds);
    const localTime = new Date(date.getTime() + timezoneInMilliseconds);
    const options = {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    }
    return localTime.toLocaleTimeString('en-US', options);
}

function fillLocation(name, coord) {
    const { lon, lat } = coord

    setElementContent('city-name', name)
    setElementContent('longitude', lon)
    setElementContent('latitude', lat)
}

function fillTemperature(weather, main) {
    const { main: weatherTitle, description, icon } = weather[0]
    const { temp, feels_like } = main

    setElementSrc('weather-icon', `https://openweathermap.org/img/wn/${icon}@2x.png`)
    setElementContent('weather-main', weatherTitle);
    setElementContent('weather-description', description);
    setElementContent('temp-current', temp);
    setElementContent('temp-current-feelings', feels_like);
}

function fillWindAndHumidity(main, wind) {
    const { humidity } = main;
    const { speed } = wind

    setElementContent('wind-speed', speed);
    setElementContent('humidity', humidity);
}

function fillModal(data) {
    const { main, visibility, timezone, sys } = data;
    const { pressure, temp_max, temp_min } = main;
    const { sunrise, sunset } = sys;

    setElementContent('pressure', pressure);
    setElementContent('visibility', visibility);
    setElementContent('temp-max', temp_max);
    setElementContent('temp-min', temp_min);
    setElementContent('sunrise', getLocalTime24(sunrise, timezone));
    setElementContent('sunset', getLocalTime24(sunset, timezone));
}

export function showDetails() {
    const info = document.querySelector('.weather-info');
    info.classList.remove('hidden');
}

export function fillDetails(response) {
    const {
        cod,
        message,
        name,
        coord,
        weather,
        main,
        wind,
        timezone,
        visibility,
        sys,
    } = response

    if (cod === "404") {
        alert(`please enter existing city: ${message}`);
        return false
    }

    const modalData = {
        main,
        visibility,
        timezone,
        sys
    };

    fillLocation(name, coord);
    fillTemperature(weather, main);
    fillWindAndHumidity(main, wind);
    fillModal(modalData);
    showDetails();
}

