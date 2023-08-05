
// API KEY: 8a1eef5ee7f9bf0ec404673fdde28868

const formEl = $('#search-form');
const buttonEl = $('#search-button');
const historyEl = $('#search-history');

function fetchForecast(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8a1eef5ee7f9bf0ec404673fdde28868`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                lat = (response[0].lat);
                lon = (response[0].lon);

                // Fetch weather data
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8a1eef5ee7f9bf0ec404673fdde28868`)
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        console.log(response)
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