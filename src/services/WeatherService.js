import axios from 'axios';

const API_KEY = 'cc4acf2edbdf4117bc7105137241306';
const BASE_URL = 'http://api.weatherapi.com/v1';

export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=6`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
