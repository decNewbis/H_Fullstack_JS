function fillLocation(name, coord) {
    const { lon, lat } = coord

    document.getElementById('city-name').textContent = name
    document.getElementById('longitude').textContent = lon
    document.getElementById('latitude').textContent = lat
}

function fillTemperature(weather, main) {
    const { main: weatherTitle, description, icon } = weather[0]
    const { temp, feels_like } = main

    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    document.getElementById('weather-main').textContent = weatherTitle;
    document.getElementById('weather-description').textContent = description;
    document.getElementById('temp-current').textContent = temp;
    document.getElementById('temp-current-feelings').textContent = feels_like;   
}

function fillWindAndHumidity(main, wind) {
    const { humidity } = main;
    const { speed } = wind

    document.getElementById('wind-speed').textContent = speed;
    document.getElementById('humidity').textContent = humidity;
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
    } = response

    if (cod === "404") {
        alert('please enter existing city', message)
        return false
    }

    fillLocation(name, coord);
    fillTemperature(weather, main);
    fillWindAndHumidity(main, wind);
    showDetails()
}

