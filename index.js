const openWeatherKey ='d5b8808f5c8d447dee90e73a25974b6f';

document.querySelector('#findLocation').addEventListener('click', geoLookup);
let lon, lat;

function geoLookup() {

    const status = document.querySelector('#status');

    function success(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        status.textContent = `lat: ${lat}, lon: ${lon}`;
        fetchData();
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

const p = document.querySelector('#weatherbug p');

const fetchData = async() => {
    
    const postApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=imperial`;
    const response = await fetch(postApi);
    const dataWeather = await response.json();
    // console.log(response);
    // console.log(dataWeather);
    // console.log(dataWeather.name);
    let name = dataWeather.name;
    let wind = dataWeather.wind.speed;
    let temp = Math.round((dataWeather.main.temp - 32) / 1.8);
    let time = new Date(dataWeather.dt * 1000);
    let hours = time.getHours();
    let mins = time.getMinutes();

    let string = `Locaton: ${name}<br/>Wind: ${wind}<br/>Temperature: ${temp}<br/>${hours}:${mins}`;
    p.innerHTML = string;
    return dataWeather;
}
