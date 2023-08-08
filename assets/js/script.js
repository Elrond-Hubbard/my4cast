
// API KEY: 8a1eef5ee7f9bf0ec404673fdde28868

const formEl = $('#search-form');
const buttonEl = $('#search-button');
const historyEl = $('#search-history');
const forecastEl = $('#forecast');
const currentEl = $('#current');


function fetchForecast(city) {

    // Fetch coordinates for given city
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8a1eef5ee7f9bf0ec404673fdde28868`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            lat = (response[0].lat);
            lon = (response[0].lon);

            // Fetch current weather for given coordinates
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a1eef5ee7f9bf0ec404673fdde28868&units=imperial`)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    currentEl.empty();

                    // Build card for current weather
                    currentEl.append(`
                        <div class="card-body">
                            <h5 class="card-title">${response.name} ${response.dt}</h5>
                            <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"</img>
                            <p class="card-text">Temp: ${response.main.temp} F</p>
                            <p class="card-text">Wind: ${response.wind.speed} mph</p>
                            <p class="card-text">Humidity: ${response.main.humidity}%</p>
                        </div>
                    `)
                })

            // Fetch 5 day forecast for given coordinates
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8a1eef5ee7f9bf0ec404673fdde28868&units=imperial`)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    forecastEl.empty();

                    // For each day in the forecast, build a card
                    for (var i = 1; i < response.list.length; i += 8) {
                        forecastEl.append(`
                            <div class="card col-12 col-xl-2 mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${response.list[i].dt_txt}</h5>
                                    <img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png"</img>
                                    <p class="card-text">Temp: ${response.list[i].main.temp} F</p>
                                    <p class="card-text">Wind: ${response.list[i].wind.speed} mph</p>
                                    <p class="card-text">Humidity: ${response.list[i].main.humidity}%</p>
                                </div>
                            </div>`);
                    }
                })
        })
};


$(document).ready(function () {


    // Get history from storage
    for (i = 0; i < localStorage.length; i++) {
        storageItem = localStorage.getItem(i);
        historyEl.prepend(storageItem);
    }

    // Save search entries to history
    storageKey = (localStorage.length);
    buttonEl.on('click', function () {
        historyEl.prepend(`<button id="history-button" type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        localStorage.setItem(storageKey, `<button id="history-button" type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        storageKey++;

        // Return forecast for search input
        fetchForecast(formEl.val());
    });

    // Return forecast for history buttons
    historyEl.on('click', 'button', function() {
        fetchForecast($(this).text())
    })
});