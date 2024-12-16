const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};

app.get('/weather', async (req, res) => {
    const city = req.query.city; 
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        if (response.ok) {
            const weatherData = await response.json();
            res.json(weatherData); 
        } else {
            res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});