const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let todaysDate = new Date();
let todaysDayName = todaysDate.getDay();
let todaysDayNumber = todaysDate.getDate();
let todaysMonth = todaysDate.getMonth();
let todaysYear = todaysDate.getFullYear();
let searchInput = document.getElementById('search');
let searchButton = document.getElementById('searchButton');
let myForecast;

async function getUserLocation() {
    return new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (p) {
                    resolve(fetchWeather(`${p.coords.latitude},${p.coords.longitude}`));
                },
                function () {
                    resolve();
                }
            );
        } else {
            reject(`Browser Doesn't Support location`);
        }
    });
};

async function fetchWeather(userCity = 'madrid') {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7a38c9f9a90c41a481902219233112&q=${userCity}&days=3`);
    myForecast = await response.json();
    displayForecast();
}

getUserLocation();
fetchWeather();

function displayForecast() {

    document.getElementById('todaysCard').innerHTML = `
                    <div
                    class="bg-secondary bg-opacity-25 text-light text-opacity-75 d-flex justify-content-between py-2 px-4">
                    <span>${days[todaysDayName]}</span>
                    <span>${todaysDayNumber} ${months[todaysMonth]}</span>
                </div>

                <div class="bg-secondary bg-opacity-50 text-light text-opacity-75 py-4 px-4">
                    <p>${myForecast.location.name}</p>
                    <p class="display-2 fw-bolder text-white">${myForecast.current.temp_c}<sup> o </sup>C</p>
                    <div class="d-inline-block w-25">
                        <img class="w-100" src="${myForecast.current.condition.icon}">
                    </div>
                    <div class="text-info">${myForecast.current.condition.text}</div>
                    
                </div>
    `;

    document.getElementById('tomorrowsCard').innerHTML = `
                    <div class="bg-secondary bg-opacity-50 text-light text-opacity-75 text-center py-2 px-4">
                    <span>${days[todaysDayName + 1]}</span>
                </div>

                <div class="bg-secondary bg-opacity-75 text-center text-light text-opacity-75 py-4 px-4 h-100">
                    <div class="d-inline-block w-25">
                        <img src="${myForecast.forecast.forecastday[1].day.condition.icon}" class="w-100">
                    </div>
                    <p class="fs-5 fw-bolder text-white">${myForecast.forecast.forecastday[1].day.maxtemp_c}<sup> o </sup>C</p>
                    <p class="fs-6 fw-bolder text-white">${myForecast.forecast.forecastday[1].day.mintemp_c}<sup> o </sup>C</p>
                    <div class="text-info">${myForecast.forecast.forecastday[1].day.condition.text}</div>
                </div>
    `;

    document.getElementById('dayAfterTomorrowsCard').innerHTML = `
                <div class="bg-secondary bg-opacity-50 text-light text-opacity-75 text-center py-2 px-4">
                    <span>${days[todaysDayName + 2]}</span>
                </div>

                <div class="bg-secondary bg-opacity-75 text-center text-light text-opacity-75 py-4 px-4 h-100">
                    <div class="d-inline-block w-25">
                        <img src="${myForecast.forecast.forecastday[1].day.condition.icon}" class="w-100">
                    </div>
                    <p class="fs-5 fw-bolder text-white">${myForecast.forecast.forecastday[2].day.maxtemp_c}<sup> o </sup>C</p>
                    <p class="fs-6 fw-bolder text-white">${myForecast.forecast.forecastday[2].day.mintemp_c}<sup> o </sup>C</p>
                    <div class="text-info">${myForecast.forecast.forecastday[2].day.condition.text}</div>
                </div>
    `;
}

searchInput.addEventListener('keyup',function(e){
    fetchWeather(searchInput.value)
});

searchButton.addEventListener('click', function(){
    fetchWeather(searchInput.value);
});