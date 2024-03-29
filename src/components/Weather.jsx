import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling
import Marquee from 'react-fast-marquee'; // Import Marquee component

// Define your API key as a constant
// u can use my API Key =XFXyFO6PhxoNZ7Q5GW9aplmrRfeolgff
//2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU
const API_KEY = 'XFXyFO6PhxoNZ7Q5GW9aplmrRfeolgff';

function App() {
  const defaultCities = ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Pune'];
  const [cities, setCities] = useState(defaultCities);
  const [weatherData, setWeatherData] = useState({});
  const [inputCity, setInputCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(defaultCities[0]); // Initialize with the first city in defaultCities array
  const [loading, setLoading] = useState(false); // Track loading state

  const fetchWeatherData = async (cityName) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(cityName)}&apikey=${API_KEY}`);
      setWeatherData((prevData) => ({ ...prevData, [cityName]: response.data }));
    } catch (error) {
      console.error('Error fetching weather data for', cityName, ':', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    // Fetch weather data for default cities
    defaultCities.forEach((city) => fetchWeatherData(city));

    // Fetch weather data for the selected city initially
    fetchWeatherData(selectedCity);
  }, []);

  const handleCityChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the selected city
    setSelectedCity(inputCity);
    // Fetch weather data for the input city
    fetchWeatherData(inputCity);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Weather App</h1>
        <p>Real-Time Weather Information</p>
      </header>
      <div className="input-city">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={inputCity}
            onChange={handleCityChange}
          />
          <button type="submit">Get Weather</button>
        </form>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          {loading ? (
            <p className='loading' style={{ color: "white" }}>Loading...</p>
          ) : (
            <>
              {weatherData[selectedCity] && (
                <div className="weather-input1">
                  <h3 style={{color:"black"}}>{selectedCity}</h3>
                  <div className='input-items'>
                    <img style={{ width: "40px" }} src="https://static.vecteezy.com/system/resources/previews/021/349/645/original/humidity-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg" alt="" />
                    <p>Humidity: {weatherData[selectedCity].data.values.humidity}%</p>
                  </div>
                  <div className='input-items'>
                    <img style={{ width: "40px" }} src="https://e7.pngegg.com/pngimages/862/655/png-clipart-round-black-logo-computer-icons-temperature-measurement-temperature-save-miscellaneous-text-thumbnail.png" alt="" />
                    <p>Temperature: {weatherData[selectedCity].data.values.temperature}°C</p>
                  </div>
                  <div className='input-items'>
                    <img style={{ width: "40px" }} src="https://w7.pngwing.com/pngs/676/835/png-transparent-wind-speed-weather-forecasting-wind-text-number-anemometer-thumbnail.png" alt="" />
                    <p>Wind Speed: {weatherData[selectedCity].data.values.windSpeed} m/s</p>
                  </div>
                  <div className='input-items'>
                    <img style={{ width: "50px" }} src="https://www.kindpng.com/picc/m/283-2834515_rain-sun-and-clipart-free-best-on-transparent.png" alt="" />
                    <p>Cloud Cover: {weatherData[selectedCity].data.values.cloudCover}%</p>
                  </div>
                  <div className='input-items'>
                    <img style={{ width: "40px" }} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/uv-index-3506177-2932488.png" alt="" />
                    <p>Cloud Cover: {weatherData[selectedCity].data.values.cloudCover}%</p>
                  </div>
                  <div className='input-items'>
                    <img style={{ width: "40px" }} src="https://cdn-icons-png.flaticon.com/512/5263/5263154.png" alt="" />
                    <p>Visibility: {weatherData[selectedCity].data.values.visibility} km</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="default-cities">
        <Marquee gradient={false} speed={100}>
          <div className="weather-container">
            {defaultCities.map((city, index) => (
              <div key={index} className="weather-card">
                <h3>{city}</h3>
                {weatherData[city] ? (
                  <div className='info'>
                    <div className='info-items'>
                      <img style={{ width: "40px"}} src="https://w7.pngwing.com/pngs/691/248/png-transparent-black-and-blue-high-temperature-illustration-temperature-thermometer-computer-icons-icon-drawing-temperature-miscellaneous-text-logo-thumbnail.png" alt="" />
                      <p>Temperature: {weatherData[city].data.values.temperature}°C</p>
                    </div>
                    <div className='info-items'>
                      <img style={{ width: "40px" }} src="https://static.vecteezy.com/system/resources/previews/021/349/645/original/humidity-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg" alt="" />
                      <p>Humidity: {weatherData[city].data.values.humidity}%</p>
                    </div>
                    <div className='info-items'>
                      <img style={{ width: "40px" }} src="https://w7.pngwing.com/pngs/676/835/png-transparent-wind-speed-weather-forecasting-wind-text-number-anemometer-thumbnail.png" alt="" />
                      <p>Wind Speed: {weatherData[city].data.values.windSpeed} m/s</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default App;
