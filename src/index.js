let apiKey = "2c596f2ffa75a1e706f3d5b23375abfb"; 
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${apiKey}&units=imperial`;

function updatePage(response) {
    let temperature = document.querySelector("#current-temp")
    temperature.innerHTML = Math.round(response.data.main.temp);
    let city = document.querySelector("#city-search-result");
    city.innerHTML = (response.data.name);
    let weatherCondition = document.querySelector("#weather-condition");
    weatherCondition.innerHTML = (response.data.weather[0].description);
    let highTemp = document.querySelector("#high-temp");
    highTemp.innerHTML = Math.round(response.data.main.temp_max);
    let lowTemp = document.querySelector("#low-temp");
    lowTemp.innerHTML = Math.round(response.data.main.temp_min);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = (response.data.main.humidity);
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
}
axios.get(apiUrl).then(updatePage);