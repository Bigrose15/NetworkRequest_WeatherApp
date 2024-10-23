//WEATHER APP THAT FETCHES LOCATION, TEMPERATURE, HUMIDITY, AND WEATHER DESCRIPTION FROM THE OPENWEATHERMAP API

//QUERYING THE DOM, //querying the DOM for the button, input, and weatherData element created in the index.html file
const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const weatherDataDiv = document.getElementById("weather-data");

//API KEY
const apikey = "f7739894c5684ef55c2e3410b56a04d3"; //

//FETCH WEATHER DATA FUNCTION
const fetchWeatherHandler = async () => {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );
    const weatherData = await response.json();

    console.log(weatherData); // this line logs the weatherData object to the console

    //The expressions below access properties from the weatherData object and insert their values into the HTML string. The weather data object can be seen from the console under object main, object weather, and object name
    const weatherHTML = `
      <h2>${weatherData.name}</h2>
      <p>Temperature: ${weatherData.main.temp}°C</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Weather: ${weatherData.weather[0].description}</p>
    `;

    weatherDataDiv.innerHTML = weatherHTML; //This line sets the innerHTML of the weatherDataDiv element to the weatherHTML string. By updating the innerHTML property, we've dynamically changed the content of the weatherDataDiv element, reflecting the new weather data.
  } catch (error) {
    console.error(error);
    weatherDataDiv.innerHTML = "<p>Error fetching weather data</p>";
  }
};

searchButton.addEventListener("click", fetchWeatherHandler); //This line listens for a click event on the searchButton and calls the fetchWeatherHandler function
