import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Loader from './components/Loader';
import Login from './components/Login';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  const handleSearch = (cityName) => {
    setCity(cityName);
    console.log(`Selected city: ${cityName}`);
  };

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Login onAuthenticate={handleAuthentication} />;
  }

  return (
    <>
      <Navbar onSearch={handleSearch} setCity={setCity} city={city} />
      <Home city={city} />
    </>
  );
}

export default App;
