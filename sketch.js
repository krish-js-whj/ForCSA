async function getWeather() {
    const apiKey = '106652c6de8f5266d3fb293470f11426';
    const city = document.getElementById('city').value.trim();
    const loading = document.getElementById("loading");
    //handling errors like empty text and no internet
if (!city) {
    alert('Please enter a city');
    return;
}
if (!navigator.onLine) {
        alert('You are currently offline. Please check your internet connection.');
        loading.classList.add("hidden");
        return;
}
    const currentWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    loading.classList.remove("hidden");
//need to disable the button once called or until the user goes back to input
try {
        //Using await instead of directly fetching
        //If error in api is found, the other function is not called
        const weatherResponse = await fetch(currentWeatherUrl);
        const weatherData = await weatherResponse.json();

        //Checking for errors: 1) non-existent city, 2) bad response/invalid data and breaking out of function
        if (weatherData.cod === '404') {
            alert('Error: City not found. Please recheck the city name.');
            return;
        }
        if (!weatherResponse.ok || !weatherData || !weatherData.main || !weatherData.weather) {
            throw new Error('Invalid current weather data received.');
        }
        displayWeather(weatherData);

        //if error did not cancel function this code executes
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error('Network response for forecast was not ok');
        }
        const forecastData = await forecastResponse.json();

        //Check for invalid forecast data
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            throw new Error('Invalid forecast data received.');
        }
        displayHourlyForecast(forecastData.list);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    } finally {
        loading.classList.add("hidden");
    }
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
if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    //need to cancel the second api call
} else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp -273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://in.pinterest.com/pin/1149966086124381491/`;
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










