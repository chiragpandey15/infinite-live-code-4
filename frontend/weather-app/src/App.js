import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar';
import WeatherDisplay from './components/weatherDisplay';
import ErrorDisplay from './components/errorDisplay';
import './App.css';

const App = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (city) => {
        try {
            const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
            
            setWeather(response.data);
            setError(null);
        } catch (err) {
          // console.log(err.response.data.error);
          if(err && err.response && err.response.data && err.response.data.error){
            setError(err.response.data.error);
          }else{
            setError("Failed to fetch weather data.");
          }
            
            setWeather(null);
        }
    };

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <SearchBar onSearch={handleSearch} />
            <ErrorDisplay error={error} />
            <WeatherDisplay weather={weather} />
        </div>
    );
};

export default App;
