import axios from 'axios';
import catchAsync from '../utils/catchAsync.js';
import config from '../configurations/config.js';

const getCityWeather = catchAsync((city) => {
    const url = `${config.weather.base_url}?city${encodeURIComponent(city.trim())}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${config.weather.api_key}`
        }
    }),
    
})