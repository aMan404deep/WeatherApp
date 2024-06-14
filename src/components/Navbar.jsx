import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo-dark.png';
import '../App.css'

function Navbar({ onSearch, city, setCity }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=cc4acf2edbdf4117bc7105137241306&q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      onSearch(search);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    onSearch(suggestion.name);
    setSuggestions([]);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=cc4acf2edbdf4117bc7105137241306&q=${latitude},${longitude}`);
          const cityName = response.data.location.name;
          setCity(cityName);
          onSearch(cityName);
        } catch (error) {
          console.error('Error fetching current location:', error);
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='bg-[#111015] px-[5rem] w-full flex justify-between items-center m-0 py-4'>
      <div>
        <img src={logo} width="100px" alt="Logo" />
      </div>

      <div className='currButton'>
        <div className='flex text-white font-bold gap-1'>
          <svg fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
          </svg>
          <h4>{city}</h4>
        </div>
      </div>
      <div className="relative flex items-center w-[45%]">
        <div className='bg-[#1E1E1E] py-3 px-3 rounded-l-full'>
          <svg className="text-white w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search City..."
          className="rounded-r-full w-full py-2 px-2 bg-[#1E1E1E] text-white focus:outline-none focus:none"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
        {suggestions.length > 0 && (
          <div className="absolute mt-2 top-full left-0 right-0 bg-[#1E1E1E] text-white rounded-lg shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="py-2 px-4 hover:bg-[#333] cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='currButton'>
        <div className=' flex gap-10'>
          <div
            className=" bg-[#1E1E1E] hover:bg-[#a120ec] h-10 rounded-full cursor-pointer flex flex-row p-3 items-center justify-center"
            onClick={handleGetCurrentLocation}
          >
            <div className='flex flex-row gap-1 items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill='white' width="15" viewBox="0 0 24 24">
                <path d="M24 11h-2.051c-.469-4.725-4.224-8.48-8.949-8.95v-2.05h-2v2.05c-4.725.47-8.48 4.225-8.949 8.95h-2.051v2h2.051c.469 4.725 4.224 8.48 8.949 8.95v2.05h2v-2.05c4.725-.469 8.48-4.225 8.949-8.95h2.051v-2zm-11 8.931v-3.931h-2v3.931c-3.611-.454-6.478-3.32-6.931-6.931h3.931v-2h-3.931c.453-3.611 3.32-6.477 6.931-6.931v3.931h2v-3.931c3.611.454 6.478 3.319 6.931 6.931h-3.931v2h3.931c-.453 3.611-3.32 6.477-6.931 6.931zm1-7.931c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z"/>
              </svg>
              <p className='text-white text-sm font-semibold'>Current Location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
