var historyOutput = $("#searched-city")
var searchBtn = $("#submit-button");
var searchInput = $('#search-input');

var apiKey = '711591ebf940ef8fe2730bd1f7f8e0a1'
var baseCurrentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial'
var baseGeoURL = 'http://api.openweathermap.org/geo/1.0/zip?'
var lat;
var lon;


if (localStorage.getItem('cities')) {
    displayHistory();
}

function getLocalStorage() {
    var rawData = localStorage.getItem('cities');
    var parsed = JSON.parse(rawData);
    return parsed || [];
}

searchBtn.on("click", saveSearch);

function getCity() {
    var zipCode = searchInput.val();
    searchInput.val('')
    var geoURL = baseGeoURL + `zip=${zipCode},US&limit=4&appid=${apiKey}`
    console.log(geoURL)
}

function saveSearch() {
    var searchHistory = getLocalStorage();
    if (searchInput.val()) {
        var city = searchInput.val();
        searchHistory.push(city)
        localStorage.setItem('cities', JSON.stringify(searchHistory));
        getCity();
        displayHistory();
    }
    else {

    }
}

// function fetchWeather(){

// }

function displayHistory() {
    var parsed = JSON.parse(localStorage.getItem('cities'));
    historyOutput.text('')
    for (var items of parsed) {
        historyOutput.prepend(`<li class ="list-group-item">${items}</li>`);
    }
    $("historyOutput:last-child").attr('id', 'last-search-item');
}

