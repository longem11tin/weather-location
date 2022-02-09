const openWeatherKey ='d5b8808f5c8d447dee90e73a25974b6f';

document.querySelector('#findLocation').addEventListener('click', geoLookup, false);

function geoLookup() {

    const status = document.querySelector('#status');

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        status.textContent = `lat: ${lat}, lon: ${lon}`;
        fecthWeatherData(lat, lon);
    }

    function error(err) {
        status.textContent = `Unable to retrieve your location. Error: ${err.code}, ${err.message}`
    }

    if (!navigator.geolocation) {
        status.textContent = 'Your position dont have in your browser';
    }
    else {
        status.textContent = 'Đợi tí đê ...';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

let dataWeather = {};
const p = document.querySelector('#weatherbug p');

function fecthWeatherData(lat , lon) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`);
    xhr.responseText = 'text';
    console.log(xhr);
    xhr.addEventListener('load', function () {
        
        if (xhr.status === 200) {
            // p.textContent = 'Đợi đi thằng nhóc ...';
            dataWeather = JSON.parse(xhr.responseText);
            showWeatherData();
        }
        else {
            p.textContent = 'Error ' + xhr.status;
        }
    }, false);

    xhr.send();
}

function showWeatherData() {
    let name = dataWeather.name;
    let wind = dataWeather.wind.speed;
    let temp = Math.round((dataWeather.main.temp - 32) / 1.8);
    let time = new Date(dataWeather.dt * 1000);
    let hours = time.getHours();
    let mins = time.getMinutes();

    console.log(name);
    let string = `Locaton: ${name}<br/>Wind: ${wind}<br/>Temperature: ${temp}<br/>${hours}:${mins}`;
    p.innerHTML = string;
}
