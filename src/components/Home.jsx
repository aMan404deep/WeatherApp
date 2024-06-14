import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import AQIComponent from './AQIComponent';
import BarGraph from './BarGraph';

function Home({ city }) {
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = 'cc4acf2edbdf4117bc7105137241306';

    const getWeatherEmoji = (condition) => {
        switch (condition) {
            case 'Sunny':
            case 'Clear':
                return '☀️';
            case 'Partly cloudy':
                return '⛅';
            case 'Cloudy':
            case 'Overcast':
                return '☁️';
            case 'Mist':
            case 'Fog':
                return '🌫️';
            case 'Patchy rain possible':
            case 'Patchy light drizzle':
            case 'Light rain':
                return '🌦️';
            case 'Heavy rain':
            case 'Rain':
                return '🌧️';
            case 'Thunderstorm':
                return '⛈️';
            case 'Snow':
            case 'Light snow':
                return '🌨️';
            default:
                return '🌤️';
        }
    };

    const getBackgroundClass = (condition) => {
        switch (condition) {
            case 'Sunny':
            case 'Clear':
                return 'gradient-sunny';
            case 'Partly cloudy':
                return 'gradient-cloudy';
            case 'Cloudy':
            case 'Overcast':
                return 'gradient-cloudy';
            case 'Mist':
            case 'Fog':
                return 'gradient-cloudy';
            case 'Patchy rain possible':
            case 'Patchy light drizzle':
            case 'Light rain':
                return 'gradient-rainy';
            case 'Heavy rain':
            case 'Rain':
                return 'gradient-rainy';
            case 'Thunderstorm':
                return 'gradient-rainy';
            case 'Snow':
            case 'Light snow':
                return 'gradient-cloudy';
            default:
                return 'gradient-sunny';
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (city) {
                    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`);
                    if (response.status === 200) {
                        setWeatherData(response.data);
                    } else {
                        console.error('Failed to fetch weather data');
                    }
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [API_KEY, city]);

    if (!weatherData) {
        return (
            <div className='px-[5rem] home-container flex flex-row gap-5 rounded-lg'>
                <div className='flex flex-col w-[70%] gap-7'>
                    <div className='flex'>
                        <div className='flex text-white text-xl'>
                            <h3 className='text-white text-xl'>Weather Forecast</h3>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex bg-gradient-to-r from-[#111015] via-[#1E1E1E] to-[#201a35] background-animate p-2 flex flex-col justify-center rounded-lg w-[10rem] h-[10rem]'>
                            <div className='flex justify-between'>
                                <h3 className='font-bold'></h3>
                            </div>
                            <div className='flex justify-between gap-1'>
                                <h1 className='text-3xl'></h1>
                                <div className='weather-emoji text-3xl'></div>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className=''></h2>
                            </div>
                            <div className='flex justify-between'>
                                <h3 className=' font-semibold'></h3>
                                <h2 className=' font-semibold'></h2>
                            </div>
                        </div>
                        <div className=' bg-gradient-to-r from-[#111015] via-[#1E1E1E] to-[#201a35] background-animate p-1 w-full flex flex-col gap-5 rounded-lg justify-center items-center h-[10rem]'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-white font-bold text-sm'></h3>
                            </div>
                            <div>
                                <div className='weather-emoji text-4xl'></div>
                            </div>
                            <div className='flex justify-between'>
                                <h1 className='text-xl text-white'></h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                        <h4 className='text-white text-xl'>Global map</h4>
                        <div className='h-[12rem] flex bg-gradient-to-r from-[#111015] via-[#1E1E1E] to-[#201a35] background-animate rounded-lg'></div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-7'>
                    <div className='flex flex-col gap-7 '>
                        <h3 className='text-white text-xl'>Chance of Rain</h3>
                        <div className='flex bg-gradient-to-r from-[#111015] via-[#1E1E1E] to-[#201a35] background-animate rounded-lg h-[10rem]'></div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-white text-xl'>Air Quality Index</h3>
                        <div className='flex bg-gradient-to-r from-[#111015] via-[#1E1E1E] to-[#201a35] background-animate rounded-lg h-[12rem]'></div>
                    </div>
                </div>
            </div>
        );
    }

    const { current, forecast } = weatherData;
    const weatherEmoji = getWeatherEmoji(current.condition.text);
    const backgroundClass = getBackgroundClass(current.condition.text);

    return (
        <div className='flex px-[5rem] xl:flex-row lg:flex:row md:flex-col sm:flex-col gap-5 rounded-lg h-auto w-auto'>
            <div className='flex flex-col w-[70%] gap-8'>
                <div className='flex'>
                    <div className='flex text-white text-xl'>
                        <h3 className='text-white text-xl'>Weather Forecast</h3>
                    </div>
                </div>
                <div className='flex gap-4 w-auto'>
                    {current && (
                        <div className={`${backgroundClass} w-[100rem] text-black p-2 flex shadow-lg flex-col justify-center rounded-lg max-w-[15rem] h-[10rem]`}>
                            <div className='flex justify-between'>
                                <h3 className='font-bold'>Today</h3>
                            </div>
                            <div className='flex justify-between gap-1'>
                                <h1 className='text-3xl'>{current.temp_c}°C</h1>
                                <div className='weather-emoji text-3xl'>{weatherEmoji}</div>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className=''>Feels like {current.feelslike_c}°C</h2>
                            </div>
                            <div className='flex justify-between '>
                                <h3 className=' font-semibold'>💨 {current.wind_mph} km/h</h3>
                                <h2 className=' font-semibold'>{current.humidity}% 💧</h2>
                            </div>
                        </div>
                    )}
                    {forecast.forecastday.slice(1, 7).map((day, index) => (
                        <div key={index} className='bg-[#1E1E1E] shadow-lg p-1 w-full flex flex-col gap-5 rounded-lg justify-center items-center h-[10rem]'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-white font-bold text-sm'>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                            </div>
                            <div>
                                <div className='weather-emoji text-4xl'>{getWeatherEmoji(day.day.condition.text)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <h1 className='text-xl text-white'>{day.day.maxtemp_c}°C</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-4 w-full'>
                    <h4 className='text-white text-xl'>Global map</h4>
                    <div className='h-[12rem] w-full shadow-lg bg-[#1E1E1E] rounded-lg'>
                        <iframe className='w-full h-full rounded-lg' src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=6&overlay=temp&product=ecmwf&level=surface&lat=31.26&lon=78.135&message=true" frameBorder="0"></iframe>
                    </div>
                </div>
            </div>
            <div className=' flex flex-col w-[30%] gap-4'>
                <div className='flex flex-col gap-7 '>
                    <h3 className='text-white text-xl'>Chance of Rain</h3>
                    <div className='bg-[#1E1E1E] shadow-lg py-2 flex items-center justify-center rounded-lg px-3'>
                        <BarGraph city={city} />
                    </div>
                </div>
                <div className='flex flex-col gap-4 '>
                    <h3 className='text-white text-xl'>Air Quality Index</h3>
                    <div className='bg-[#1E1E1E] shadow-lg rounded-lg h-[5rem]'>
                        <AQIComponent city={city} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
