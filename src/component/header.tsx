import  { useEffect } from 'react';
import WeatherIcon from '../assets/weathericon.png';
import { useAppContext } from '../context/contextProvider';
import axios from 'axios';
import  Input from './Input';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Header = () => {
  const {
    city,
    setCity,
    setWeatherData,
    weatherData,
    setlightTheme,
    lightTheme,
    setNow,
    setLoading,
  } = useAppContext();

  useEffect(() => {
    console.log(weatherData);
    console.log(lightTheme);
  }, [weatherData, lightTheme]);

  const getWeatherData = async () => {
    try {
      setLoading(true);
      setNow(true);
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      const newWeatherData = response.data;

      localStorage.setItem('weatherData', JSON.stringify(newWeatherData));

      // Update state
      setWeatherData(newWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setCity(value);
  };

  const toggleTheme = () => {
    setlightTheme(!lightTheme);
    console.log('theme');
  };

  return (
    <div className={`flex md:flex-row lg:flex-row flex-col justify-between items-center w-full ${lightTheme ? 'light-theme' : 'dark-theme'}`}>
      <div className="flex w-1/4 flex-row">
        <div className="flex">
          <img src={WeatherIcon} alt="icon" className="rounded-[100%] w-[70px] h-[50px]" />
        </div>
        <div className="flex justify-center items-center">
          <h1 className={`text-lg font-semibold ${lightTheme ? 'text-black' : 'text-white'}`}>WEATHERY</h1>
        </div>
      </div>
      <div className="flex w-1/3 items-center justify-center my-2 md:my-0 lg:my-0">
        <Input placeholder="Enter city name 🔎" onInputChange={handleInputChange} />
        <button className={`flex bg-blue justify-center items-center p-2 border mx-2 ${lightTheme ? 'text-black' : 'text-white'}`} onClick={getWeatherData}>
          GET
        </button>
      </div>
      <div className="flex w-1/4 items-center justify-center md:justify-end lg:justify-end px-2 my-2 md:my-0 lg:my-0">
        <DarkModeSwitch checked={!lightTheme} onChange={toggleTheme} size={40} />
      </div>
    </div>
  );
};

export default Header;
