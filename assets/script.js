var historyOutput = $("#searched-city")
var searchBtn = $("#submit-button");
var searchInput = $('#search-input');

var apiKey = '711591ebf940ef8fe2730bd1f7f8e0a1'
var baseURL = 'https://api.openweathermap.org/data/2.5'
var currentWeatherURL = baseURL + `/weather?q=Boston,US&appid=${apiKey}&units=imperial`
console.log(currentWeatherURL)

if(localStorage.getItem('cities')){
    displayHistory();
}

function getLocalStorage(){
    var rawData = localStorage.getItem('cities');
    var parsed = JSON.parse(rawData);
    return parsed ||[];
}

searchBtn.on("click", saveSearch);
    
function saveSearch(){
    var searchHistory = getLocalStorage();
    if(searchInput.val()){
    var city = searchInput.val();
    searchHistory.push(city)
    localStorage.setItem('cities', JSON.stringify(searchHistory));
    console.log(searchHistory);
    searchInput.val('')
    displayHistory();
    }
    else{

    }
}

function displayHistory(){
    var parsed = JSON.parse(localStorage.getItem('cities'));
    historyOutput.text('')
    for(var items of parsed){
        historyOutput.prepend(`<li class ="list-group-item">${items}</li>`);
    }
    $("historyOutput:last-child").attr('id','last-search-item');
}