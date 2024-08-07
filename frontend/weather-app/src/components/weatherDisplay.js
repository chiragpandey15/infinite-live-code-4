import React from 'react';

const WeatherDisplay = ({ weather }) => {
    if (!weather) {
        return <div></div>;
    }

    const handleDescription =(description)=>{
        return description.charAt(0).toUpperCase() + description.slice(1);
    }


    return (
        <div>
            <h3>Weather in {weather.city}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Weather: {handleDescription(weather.description)}</p>
        </div>
    );
};

export default WeatherDisplay;