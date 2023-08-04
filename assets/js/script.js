const formEl = $('#search-form');
const buttonEl = $('#search-button');
const historyEl = $('#search-history');

function printHistory() {
    historyEl.append(`<button type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`)
}


$(document).ready(function () {
    
    // Save search entries to history
    storageKey = 0;
    buttonEl.on('click', function() {
        historyEl.append(`<button type="button" class="btn btn-secondary w-100 mb-3">${formEl.val()}</button>`);
        localStorage.setItem(storageKey, formEl.val());
        storageKey++;
    });

});