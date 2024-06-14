import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const AQIComponent = ({ city }) => {
  const [aqi, setAqi] = useState(null);
  const [aqiLabel, setAqiLabel] = useState('');

  useEffect(() => {
    if (city) {
      const fetchAQI = async () => {
        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=cc4acf2edbdf4117bc7105137241306&q=${city}&aqi=yes`);
          const aqiData = response.data.current.air_quality['us-epa-index'];
          setAqi(aqiData);
          setAqiLabel(getAqiLabel(aqiData));
        } catch (error) {
          console.error('Error fetching AQI data:', error);
        }
      };
      fetchAQI();
    }
  }, [city]);

  const getAqiLabel = (aqi) => {
    if (aqi === 1) return 'Good';
    if (aqi === 2) return 'Moderate';
    if (aqi === 3) return 'Unhealthy for Sensitive Groups';
    if (aqi === 4) return 'Unhealthy';
    if (aqi === 5) return 'Very Unhealthy';
    if (aqi === 6) return 'Hazardous';
    return 'Unknown';
  };

  const data = {
    labels: false,
    datasets: [
      {
        data: [aqi, 6 - aqi],
        backgroundColor: ['#FF6384', '#E0E0E0'],
        hoverBackgroundColor: ['#FF3399', '#ffff'],
      },
    ],
  };

  const options = {
    cutout: '70%',
    rotation: -90,
    circumference: 180,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.label === 'AQI') {
              return `AQI: ${context.raw}`;
            } else {
              return null;
            }
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#1E1E1E] text-white p-4 rounded-lg">
      {aqi !== null ? (
        <div className='flex items-center'>
          <div style={{ width: '10rem', height: '10rem', margin: '0 auto' }}>
            <Doughnut data={data} options={options} />
          </div>
          <div className='pl-8 flex flex-col gap-2'>
            <p className=''>AQI Status: </p>
            <span className='text-2xl font-semibold'>{aqiLabel}</span>
          </div>
        </div>
      ) : (
        <p>Loading AQI data...</p>
      )}
    </div>
  );
};

export default AQIComponent;
