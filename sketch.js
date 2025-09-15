function getWeather() {
    const apiKey = '106652c6de8f5266d3fb293470f11426';
    const city = document.getElementById('city').value.trim();
    const loading = document.getElementById("loading");
    //clear weather icon to ensure it is unaffected by previous errors
if (!city) {
    alert('Please enter a city');
    return;
}
    const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    loading.classList.remove("hidden");
//need to disable the button once called or until the user goes back to input
fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
})
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please recheck city name.');
}
    .finally(() => {
    loading.classList.add("hidden");
  });
    
);
    
fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data); 
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
}       
    .finally(() => {
    loading.classList.add("hidden");
  });
    
);
}
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
// Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML ='';
    tempDivInfo.innerHTML = '';
}

if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    //need to cancel the second api call
} else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp -273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
const temperatureHTML = `
    <p>${temperature}°C</p>
`;
const weatherHtml = `
    <p>${cityName}</p>
    <p>${description}</p>
`;
tempDivInfo.innerHTML = temperatureHTML;
weatherInfoDiv.innerHTML = weatherHtml;
weatherIcon.src = iconUrl;
weatherIcon.alt = description;
showImage();
}
}


function displayHourlyForecast (hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);
    next24Hours.forEach(item =>  { 
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp-273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const hourlyItemHtml = `
<div class="hourly-item">
    <span>${hour}:00</span>
    <img src="${iconUrl}" alt="Hourly Weather Icon">
    <span>${temperature}°C</span>
</div>
`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
});
}
function showImage() {
const weatherIcon = document.getElementById('weather-icon'); weatherIcon.style.display = 'block';
}



