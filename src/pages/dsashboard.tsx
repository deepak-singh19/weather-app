import React, { useState, useEffect } from 'react';
import BGIM from "../assets/bg1.jpg"
import WeatherCard from '../component/weatherCard';
import Header from '../component/header';
import { useAppContext } from '../context/contextProvider';
import {
  kelToCel,
  convertTimestampToReadableTime,
} from "../utils/utilityFunction";
import LoadingSpinner from '../component/loadingSpinner';

const Dashboard: React.FC = () => {
  const [sunRise, setSunRise] = useState<String>("");
  const [sunSet, setSunSet] = useState<String>('');
  const [temp, setTemp] = useState<number>();

  const {
   
    setWeatherData,
    weatherData,
    lightTheme,
    setNow,
    loading,
  } = useAppContext();

  useEffect(() => {
    let rise = convertTimestampToReadableTime(weatherData?.sys?.sunrise);
    let set = convertTimestampToReadableTime(weatherData?.sys?.sunset);
    setSunRise(rise);
    setSunSet(set);
    let tempInCel = kelToCel(weatherData?.main?.temp);
    setTemp(tempInCel);
  }, [weatherData]);

  useEffect(() => {
    const storedWeatherData = localStorage.getItem('weatherData');
    if (!weatherData && storedWeatherData) {
      try {
        setNow(false);
        setWeatherData(JSON.parse(storedWeatherData));
      } catch (error) {
        console.error('Error parsing stored weatherData:', error);
      }
    }
  }, [weatherData]);

  return (
    <div className={`flex flex-col w-full h-[100vh] items-center mx-2 mt-3 ${lightTheme ? 'light-theme' : 'dark-theme'}`}>
      <Header />
      {
        loading?<LoadingSpinner/>:(
          weatherData?<>
          <>
        <div className={`flex flex-col w-full my-4 ${lightTheme ? 'light-theme' : 'dark-theme'}`}>
        <div className='relative flex w-full justify-center items-center'>
          <img src={BGIM} alt="img" className="w-full h-[300px] rounded-md object-cover" />
          <h1 className={`absolute top-[16px] left-[20px] p-4 text-[80px] ${lightTheme ? 'text-white' : 'text-white'}`}>{temp} °C</h1>
          <h1 className={`absolute top-[176px] left-[20px] p-4 text-3xl ${lightTheme ? 'text-white' : 'text-white'}`}>{weatherData?.weather[0]?.main}</h1>
          <h1 className={`absolute top-[210px] left-[20px] text-3xl p-4 ${lightTheme ? 'text-white' : 'text-white'}`}>{`${weatherData?.name} , ${weatherData?.sys?.country}`}</h1>
          {/* <h1 className={`absolute top-[5px] right-[20px] text-[50px] p-4 ${lightTheme ? 'text-white' : 'text-white'}`}>{`${now?"NOW":"PREVIOUS"}`}</h1> */}
        </div>
        <div className={`flex flex-col md:flex-row lg:flex-row w-full justify-between my-2 border p-4 rounded-md ${lightTheme ? 'light-theme' : 'dark-theme'}`}>
          <div className='w-full md:w-1/6 lg:w-1/6 mb-4 md:mb-0 lg:mb-0'>
            <WeatherCard title='Sunrise' icon='sunrise' value={sunRise} />
          </div>
          <div className='w-full md:w-1/6 lg:w-1/6 mb-4 md:mb-0 lg:mb-0'>
            <WeatherCard title='Sunset' icon='sunset' value={sunSet} />
          </div>
          <div className='w-full md:w-1/6 lg:w-1/6 mb-4 md:mb-0 lg:mb-0'>
            <WeatherCard title='Wind' icon='wind' value={`${weatherData?.wind?.speed} miles/hour`} />
          </div>
          <div className='w-full md:w-1/6 lg:w-1/6'>
            <WeatherCard title='Humidity' icon='humid' value={`${weatherData?.main?.humidity} %`} />
          </div>
        </div>
      </div>
        </>
          </>:<div className={`w-full h-[100vh] flex justify-center items-center ${lightTheme ? 'text-black' : 'text-white'}`}>Search The City Name</div>
        )
        
      }
      
    </div>
  );
};

export default Dashboard;
