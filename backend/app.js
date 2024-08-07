require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();


app.use(cors("*"));

app.get("/",(req,res)=>{
    res.send("Hi There");
});


app.get('/weather',async (req,res)=>{
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ error: "City name is required" });
    }
    console.log("API KEY: ", process.env.API_KEY)

    try {
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: cityName,
                appid: process.env.API_KEY,
                units: 'metric'
            }
        });

        const weatherData = weatherResponse.data;
        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        });
    }catch (error) {
        if (error.response) {
            // External API responded with different status code
            
            res.status(error.response.status).json({ error: error.response.data.message });
        } else if (error.request) {
            // External API did not respond
            res.status(500).json({ error: "No response from the weather service" });
        } else {
            // Something went wrong
            console.log("Error: ",error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});