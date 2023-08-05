
// API KEY: 8a1eef5ee7f9bf0ec404673fdde28868

const formEl = $('#search-form');
const buttonEl = $('#search-button');
const historyEl = $('#search-history');
const forecastEl = $('#forecast');


function fetchForecast(city) {

    // Fetch coordinates for given city
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8a1eef5ee7f9bf0ec404673fdde28868`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            lat = (response[0].lat);
            lon = (response[0].lon);

            // Fetch weather data for given coordinates
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8a1eef5ee7f9bf0ec404673fdde28868`)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    forecastEl.empty();

                    // For each day in the forecast, build a card
                    for (var i = 0; i < response.list.length; i += 8) {
                        forecastEl.append(`
                            <div class="card col-2">
                                <div class="card-body">
                                    <h5 class="card-title">${response.list[i].dt_txt}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${response.list[i].weather[0].icon}</h6>
                                    <p class="card-text">Temp: ${response.list[i].main.temp}</p>
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
        historyEl.prepend(`<button type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        localStorage.setItem(storageKey, `<button type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        storageKey++;
        fetchForecast(formEl.val());
    });
});