import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getWeatherForecast } from '../services/WeatherService';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarGraph = ({ city }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherForecast(city);
        const forecast = data.forecast.forecastday;

        const labels = forecast.map(day => formatDate(day.date));
        const chancesOfRain = forecast.map(day => day.day.daily_chance_of_rain);

        setChartData({
          labels,
          datasets: [
            {
              data: chancesOfRain,
              backgroundColor: '#D6E8F8', 
              borderColor: '#D6E8F8', 
              borderWidth: 1,
              barThickness: 10, 
              borderRadius: 5,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const year = date.getFullYear();
    return `${day}/${month}`;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          color: '#fff', 
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false, 
        },
        ticks: {
          color: '#fff', 
          font: {
            size: 12,
          },
          stepSize: 10,
          min: 0,
          max: 100,
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarGraph;
