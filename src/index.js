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
let minutes = now.getMinutes();
    if (minutes < 10) {
     minutes = `0${minutes}`;
    }
let hours = now.getHours();
    if (hours < 10) {
     hours = `0${hours}`;
    }
    if (hours > 11) {
     fullDate.innerHTML = `${day} ${month} ${date}, ${year} ${hours}:${minutes} PM`;
    } else {
    fullDate.innerHTML = `${day} ${month} ${date}, ${year} ${hours}:${minutes} AM`;
    }
}

function updatePage(response) {
    fahrenheitTemp = (response.data.main.temp);
    let temperature = document.querySelector("#current-temp")
    temperature.innerHTML = Math.round(fahrenheitTemp);
    let city = document.querySelector("#city-search-result");
    city.innerHTML = (response.data.name);
    let weatherCondition = document.querySelector("#weather-condition");
    weatherCondition.innerHTML = (response.data.weather[0].description);
    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    let highTemp = document.querySelector("#high-temp");
    highTemp.innerHTML = Math.round(response.data.main.temp_max);
    let lowTemp = document.querySelector("#low-temp");
    lowTemp.innerHTML = Math.round(response.data.main.temp_min);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = (response.data.main.humidity);
    windSpeed = (response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(windSpeed);
    updateDate();
}

function identifyCity(city) {
let apiKey = "2c596f2ffa75a1e706f3d5b23375abfb"; 
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(updatePage);
}

function searchCityInput (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    identifyCity(searchInput.value);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityInput);

function convertToMetric (event) {
    event.preventDefault();
    fahrenheit.classList.remove("active");
    celcius.classList.add("active");
    let celciusConversion = (fahrenheitTemp - 32) * 5 / 9; 
    let celciusTemp = document.querySelector("#current-temp");
    celciusTemp.innerHTML = Math.round(celciusConversion);
    mph.classList.remove("active");
    kph.classList.add("active");
    let kmetersConversion = windSpeed * 1.609;
    let kmetersPerHour = document.querySelector("#wind");
    kmetersPerHour.innerHTML = Math.round(kmetersConversion);
}

function revertToImperial(event) {
    event.preventDefault();
    celcius.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahrenheitConversion = document.querySelector("#current-temp");
    fahrenheitConversion.innerHTML = Math.round(fahrenheitTemp);
    mph.classList.add("active");
    kph.classList.remove("active");
    let mphConversion = document.querySelector("#wind");
    mphConversion.innerHTML = Math.round(windSpeed);
}

let fahrenheitTemp = null; 
let windSpeed = null;

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToMetric);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", revertToImperial);

let kph = document.querySelector("#kph");
kph.addEventListener("click", convertToMetric);

let mph = document.querySelector("#mph");
mph.addEventListener("click", revertToImperial);



identifyCity(`Seattle`);