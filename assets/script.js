var historyOutput = $("#history-display")
var searchBtn = $("#submit-button");
var searchInput = $('#search-input');
var cityNameOutput = $('#city-name-text')
var weatherData = $('#weather-data')
var fiveDayData = $('#five-day-output')
var apiKey = '711591ebf940ef8fe2730bd1f7f8e0a1'

if (localStorage.getItem('cities')) {
    displayHistory();
}

function getLocalStorage() {
    var rawData = localStorage.getItem('cities');
    var parsed = JSON.parse(rawData);
    return parsed || [];
}

function getForecast(cityName) {
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(URL).then(function (response){
        return response.json()
    }).then(function (currentData){
        console.log(currentData)
        cityNameOutput.html(`${currentData.name} ${dayjs.unix(currentData.dt).format("MM/DD/YYYY")}<img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png">`)
        weatherData.html(`<p><span class = "is-bold">Temp: </span> ${currentData.main.temp}</p>
        <p><span class = "is-bold">Wind: </span> ${currentData.wind.speed}</p>
        <p><span class = "is-bold">Humidity: </span> ${currentData.main.humidity}</p>`)
    })
    var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(fiveDayURL).then(function (res){
        return res.json()
    }).then(function (forecastData){
        console.log(forecastData)
        fiveDayData.empty()
        for (var i=4; i< forecastData.list.length; i+=8){
            console.log(forecastData.list[i])
            fiveDayData.append(`<div class ="card col weather-card p-2 mx-1">
            <h4>${dayjs.unix(forecastData.list[i].dt).format("MM/DD/YYYY")}</h4>
            <img src="https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png">
            <p>Temp: ${forecastData.list[i].main.temp}</p>
            <p>Wind: ${forecastData.list[i].wind.speed}</p>
            <p>Humidity: ${forecastData.list[i].main.humidity}</p>
        </div>`)
        }
    })
}

function saveSearch() {
    var searchHistory = getLocalStorage();
    if (searchInput.val()) {
        var city = searchInput.val();
        searchHistory.push(city)
        localStorage.setItem('cities', JSON.stringify(searchHistory));
        getForecast(city);
        displayHistory();
    }
    else {

    }
}

function fetchWeather(event){
    var clicked = event.target
    getForecast(clicked.innerText)
}

function displayHistory() {
    var parsed = JSON.parse(localStorage.getItem('cities'));
    historyOutput.text('')
    for (var items of parsed) {
        historyOutput.prepend(`<button class ="btn btn-light my-1">${items}</button>`);
    }
    historyOutput.on('click', fetchWeather)
}

searchBtn.on("click", saveSearch);