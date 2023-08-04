const formEl = $('#search-form');
const buttonEl = $('#search-button');
const historyEl = $('#search-history');


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