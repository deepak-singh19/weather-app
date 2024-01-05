import { useEffect, useState } from "react";
import WeatherIcon from "../assets/weathericon.png";
import { useAppContext } from "../context/contextProvider";
import axios, { isAxiosError } from "axios";
import Input from "./Input";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Modal from "./modal";

const Header = () => {

  const [isModal, setIsModal] = useState(false);
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const foreCastKey= import.meta.env.VITE_FORECAST_API_KEY;


  const onOkay=()=>{
    setIsModal(false);
  };


  const {
    city,
    setCity,
    setWeatherData,
    weatherData,
    setlightTheme,
    lightTheme,
    setNow,
    setLoading,
    setMessage,
    setForeCast
  } = useAppContext();


  useEffect(() => {
    console.log('weatherdata ',weatherData);
    console.log(lightTheme);
    console.log(city);
    // response();
    
  }, [weatherData, lightTheme]);

  const getWeatherData = async () => {
    try {
      setLoading(true);
      setNow(true);
      //https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}`;//https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no
      const response = await axios.get(apiUrl);
      const newWeatherData = response.data;
      const dailyResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${foreCastKey}&q=${city}&days=5&aqi=no&alerts=no`);
      localStorage.setItem("forecast", JSON.stringify(dailyResponse.data));
      console.log(dailyResponse.data);
      setForeCast(dailyResponse.data);
      console.log(newWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(newWeatherData));
      setWeatherData(newWeatherData);
      console.log('heyyyyyyyy');
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        setMessage(error.response?.data?.message);
        setIsModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    // console.log(value);
    // console.log('city', city);
    setCity(value);
  };

  const toggleTheme = () => {
    setlightTheme(!lightTheme);
    console.log("theme");
  };

  return (
    <div
      className={`flex md:flex-row lg:flex-row flex-col cursor-pointer justify-between items-center w-full ${
        lightTheme ? "light-theme" : "dark-theme"
      }`}
    >
      <div className="flex w-1/4 flex-row">
        <div className="flex">
          <img
            src={WeatherIcon}
            alt="icon"
            className="rounded-[100%] md:w-[70px] md:h-[50px] lg:w-[70px] lg:h-[50px] hidden md:inline-block lg:inline-block"
          />
        </div>
        <div className="flex justify-center items-center">
          <h1
            className={`text-lg font-semibold ${
              lightTheme ? "text-black" : "text-white"
            }`}
          >
            WEATHERY
          </h1>
        </div>
      </div>
      <div className="flex w-1/3 items-center justify-center my-2 md:my-0 lg:my-0">
        <Input
          placeholder="Get Weather Data"
          onInputChange={handleInputChange}
          onEnter={getWeatherData}
        />
        <button
          className={`flex justify-center items-center p-2 rounded-md bg-rose-500 border mx-1 ${
            lightTheme ? "text-black" : "text-white"
          }`}
          onClick={getWeatherData}
        >
          🔎
        </button>
      </div>
      <div className="flex w-1/4 items-center justify-center md:justify-end lg:justify-end px-2 my-2 md:my-0 lg:my-0">
        <DarkModeSwitch
          checked={!lightTheme}
          onChange={toggleTheme}
          size={40}
        />
      </div>
      {
        isModal?<Modal onOkay={onOkay} message="City not found"/>:""
      }

    </div>
  );
};

export default Header;
