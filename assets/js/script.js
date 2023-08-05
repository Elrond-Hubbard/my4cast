const formEl = $('#search-form');
const buttonEl = $('#search-button');
const historyEl = $('#search-history');
const appId = '8a1eef5ee7f9bf0ec404673fdde28868';

fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={8a1eef5ee7f9bf0ec404673fdde28868}')
    .then(response => {
        return response.json();
    })


$(document).ready(function () {
    
    // Save search entries to history
    storageKey = 0;
    buttonEl.on('click', function() {
        historyEl.prepend(`<button type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        localStorage.setItem(storageKey, `<button type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        storageKey++;
    });
    // Get history from storage
    for (i=0; i<localStorage.length; i++) {
        storageItem = localStorage.getItem(i);
        historyEl.prepend(storageItem);
    }
});