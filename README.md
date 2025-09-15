# ForCSA
ABOUT:
This is a WeEatHer app=

The site opens a mordern looking background, an input box( to enter area name), A button to call the functions-
This layout works both in phone and desktop, potrait and landscape- 
The data displayed is the temperature, location as listed in the api(city's official or local name), current weather condition, 24-hour forecast from current time at 3 hour intervals-
Images are called according to data collected from the OpenWeather images-
Two Data formats are employed: Current in form of a 'card', Forecast in form of a horizontal list-
The site will throw the user a message if city input is empty, the data collected from the OpenWeather is empty, or not as expected, network eror, or any other expected bug-
The user can simply re-input in case of any error, unless there is an issue at the server. The user can try refreshing-
----Quench Your Weather Curosity, with ClimaX----


EXPLAINING THE CODE:
sketch.js-
getWeather(): 
async function so we can use await function to call off the function in case an error occurs-
API key is obtained from OpenWeather- ask city name, current weather and forecast in the specified location, according to the weather the image/icon for current and hourly forecast, if loading state-
-The loading spinner- (hidden) is added at the start of this function but removed when data is being fetched- which is to show loading... when calling data.
-Handling cases: empty input or no network or non-existent city found- return the function- 
Reponse.ok: API returning status code other than normal, !Data:null json, Data.main and Data.list and Data.weather:checks icon, array and description exists, >Data.listlength ===0 check empty array was not returned, -prevent calling display function to prevent runtime error

displayWeather() and displayHourlyForecast():
Slice to extract current time from recieved data to get forecast of next few hours,Displaying city name, weather description, temperature (convert K to degree C)called from API and stored in getWeather(), appropriate image in forecast and current conditions by calling showImage()
--x--

TIMELINE:
Commit 1
feat: Basic UI 
      add a search button
Used a background template
Implemented device compatilbity by adjusting background according to device
Implemented 'empty text' alert for no input while search button was pressed
test error for empty reference in API found
Commit ?
bugfix API error was fixed after a bracket problem in getWeather()
This means forecastUrl works
error for current weather found
Commit 15-16
refactor and style: locating possible edge cases and possible solutions
Commit 17-20
Handling no internet network, empty json response, bad data, and other edge cases
Commit 20-current
Style changes and documentation

--x--
----x----
