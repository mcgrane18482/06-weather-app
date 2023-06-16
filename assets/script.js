var searchBtn = $("#submit-button");

var apiKey = '711591ebf940ef8fe2730bd1f7f8e0a1'
var baseURL = 'https://api.openweathermap.org/data/2.5'
var currentWeatherURL = baseURL + `/weather?q=Boston,US&appid=${apiKey}&units=imperial`
console.log(currentWeatherURL)

searchBtn.on("click", saveSearch);
    
function saveSearch(){
    console.log('clicked');
}
