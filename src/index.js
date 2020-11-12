let apiKey = "2c596f2ffa75a1e706f3d5b23375abfb"; 
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${apiKey}&units=imperial`;

function updateDate() {
let fullDate = document.querySelector("#full-date");
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let weekDays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];
let day = weekDays[now.getDay()];
let monthsOfYear = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];
let month = monthsOfYear[now.getMonth()];
let hours = now.getHours();
    if (hours < 10) {
     hours = `0${hours}`;
    }
let minutes = now.getMinutes();
    if (minutes < 10) {
     minutes = `0${minutes}`;
    }
fullDate.innerHTML = `${day} ${month} ${date}, ${year} ${hours}:${minutes}`;
}

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
    updateDate();
}
axios.get(apiUrl).then(updatePage);