function displayForecast (response) {
  let forecast = response.data.daily;
}

function getForecast (coordinates) {
  let apiKey = 'c95d60a1e3adbeb286133f1ebebc2579';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemp (response) {
  document.querySelector('h2').innerHTML = response.data.name;
  document.querySelector('.main_info_degrees').innerHTML = `${Math.round(response.data.main.temp)}°`;
  getForecast(response.data.coord);
}

function search (city) {
  let apiKey = 'c95d60a1e3adbeb286133f1ebebc2579';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function handleSubmit (e) {
  e.preventDefault();
  let cityInput = document.querySelector('.input_search');
  search(cityInput.value);
}

search('Lviv');

let searchBtn = document.querySelector('.search_btn');
searchBtn.addEventListener('click', handleSubmit);

//Display the temperature of the current location
function searchCurrent (position) {
  let apiKey = 'c95d60a1e3adbeb286133f1ebebc2579';
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp)
}

function currentLocation (e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}

let currentBtn = document.querySelector('.current_btn');
currentBtn.addEventListener('click', currentLocation);