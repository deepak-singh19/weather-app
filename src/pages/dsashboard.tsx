import React, { useState, useEffect } from "react";
// import BGIMD from "../assets/day.jpeg";
// import BGIMN from "../assets/night.jpeg";
// import WeatherCard from "../component/weatherCard";
import Header from "../component/header";
import { useAppContext } from "../context/contextProvider";
import {
  kelToCel,
  formatDate,
  hourlyData,
  dailyData,
  formatTime,
  convertTimestampToReadableTime
} from "../utils/utilityFunction";
import LoadingSpinner from "../component/loadingSpinner";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FiSunrise, FiSunset, FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [temp, setTemp] = useState<number>();
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [hourly, setHourly] = useState<any>();
  const [daily, setDaily] = useState<any>();

  const {
    setWeatherData,
    weatherData,
    lightTheme,
    setNow,
    loading,
    message,
    foreCast,
    setIsHot, setForeCast
  } = useAppContext();

  useEffect(() => {
    // let rise = convertTimestampToReadableTime(weatherData?.sys?.sunrise);
    // let set = convertTimestampToReadableTime(weatherData?.sys?.sunset);
    // setSunRise(rise);
    // setSunSet(set);
    let currTime= convertTimestampToReadableTime(weatherData?.dt);
    setTime(currTime);
    let tempInCel = kelToCel(weatherData?.main?.temp);
    setTemp(tempInCel);
    if (foreCast) {
      let data = hourlyData(foreCast);
      let dailyForecast = dailyData(foreCast);
      console.log('dailyForecast', dailyForecast);
      setDaily(dailyForecast);
      setHourly(data);
      console.log("data ", data);
      console.log("daily ", dailyForecast);
    }
  }, [weatherData, foreCast]);

  useEffect(() => {
    const storedWeatherData = localStorage.getItem("weatherData");
    const storedForecastData = localStorage.getItem("forecast");
    if (!weatherData && storedWeatherData && storedForecastData) {
      try {
        setNow(false);
        setWeatherData(JSON.parse(storedWeatherData));
        setForeCast(JSON.parse(storedForecastData));
      } catch (error) {
        console.error("Error parsing stored weatherData:", error);
      }
    }
  }, [weatherData]);

  useEffect(()=>{
    let temperature= kelToCel(weatherData?.main?.temp);

    if(temperature >20){
      setIsHot(true);
    }else{
      setIsHot(false);
    }


  },[weatherData, foreCast])

  return (
    <div
      className={`flex flex-col w-full h-full md:h-[100vh] lg:h-[100vh] items-center mx-2 py-2`}
    >
      <div className="w-full h-[10%]">
        <Header />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : weatherData ? (
        <div className={`w-full h-full md:h-[90%] lg:-[90%]`}>
          {/* <div className="w-full h-full hidden md:block lg:block">
            <img
              src={BGIMN}
              alt="background_image"
              className="w-full h-full object-cover md:object-fill lg:object-fillblur-sm "
            />
          </div> */}
          <div
            className={`flex flex-col w-full h-[90%] font-semibold my-4 ${
              lightTheme ? "text-black" : "text-white"
            }`}
          >
            <div className="flex md:flex-row lg:flex-row flex-col w-full h-[1/2] ">
              <div className={` flex flex-col w-full md:w-1/2 lg:w-1/2 justify-center items-center border rounded-md ${lightTheme?"border-black":"border-white"} p-2 md:my-0 md:mr-2 my-2 `}>
                <h1
                  className={` text-3xl font-semibold  ${
                    lightTheme ? "text-black" : "text-white"
                  }`}
                >{`${weatherData?.name} , ${weatherData?.sys?.country}`}</h1>
                <h1
                  className={` text-lg ${
                    lightTheme ? "text-black" : "text-white"
                  }`}
                >{convertTimestampToReadableTime(foreCast.current.last_updated)}</h1>
                <h1
                  className={` text-[80px] ${
                    lightTheme ? "text-black" : "text-white"
                  }`}
                >
                  {temp} °C
                </h1>
                <div className="flex w-full justify-center items-center">
                <h1
                  className={`  text-3xl font-semibold ${
                    lightTheme ? "text-black" : "text-white"
                  }`}
                >
                  {weatherData?.weather[0]?.main}
                </h1>
                <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`} alt="icon"/>

                </div>
              </div>
              <div className=" flex md:flex-row lg:flex-row flex-col w-full md:w-1/2 lg:w-1/2 justify-center items-center font-sans font-medium italic">
                <div className={`flex flex-col w-full md:w-1/2 lg:w-1/2 justify-center items-center border rounded-md ${lightTheme?"border-black":"border-white"} p-2 md:my-0 md:mr-2 my-2  `}>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <MdArrowUpward size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Highest {kelToCel(weatherData?.main?.temp_max)} °C
                    </h1>
                  </div>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <MdArrowDownward size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Lowest {kelToCel(weatherData?.main?.temp_min)} °C
                    </h1>
                  </div>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <FiSunrise size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Sunrise{" "}
                      {formatDate(
                        weatherData?.sys?.sunrise,
                        weatherData?.timezone,
                        "hh:mm "
                      )}
                    </h1>
                  </div>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <FiSunset size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Sunset{" "}
                      {formatDate(
                        weatherData?.sys?.sunset,
                        weatherData?.timezone,
                        "hh:mm "
                      )}
                    </h1>
                  </div>
                </div>
                <div className={`flex flex-col w-full md:w-1/2 lg:w-1/2 justify-items-start items-start border rounded-md ${lightTheme?"border-black":"border-white"} p-2 md:my-0 md:mr-2 my-2 `}>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <WiHumidity size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Humidity {`${weatherData?.main?.humidity} %`}
                    </h1>
                  </div>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <FiWind size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Wind {`${weatherData?.wind?.speed} miles/hour`}
                    </h1>
                  </div>
                  <div
                    className={`flex md:justify-start justify-center w-full items-center ${
                      lightTheme ? "text-black" : "text-white"
                    }`}
                  >
                    <FaTemperatureHigh size={30} />
                    <h1
                      className={` text-lg p-4 ${
                        lightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      Feels Like {`${kelToCel(weatherData?.main?.feels_like)}`}{" "}
                      °C
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col md:flex-row lg:flex-row cursor-default  w-full md:h-1/2 lg:h-1/2 justify-between my-1 mt-4 `}
            >
              <div className={`md:w-1/2 lg:w-1/2 w-full flex flex-col md:h-full h-[400px] lg:h-full border p-2 rounded-md mb-1 md:mb-0 lg:mr-1 md:mr-1 ${lightTheme ? "border-black" : "border-white"}`}>
                <div className="flex w-full justify-center items-center">
                  <p className="text-lg font-semibold underline underline-offset-4">HOURLY DATA</p>
                </div>
                <div className="flex flex-col w-full overflow-y-auto my-2">
                  {hourly &&
                    hourly.map((data: any, i: number) => (
                      <div
                        className="flex flex-row justify-between items-center m-2"
                        key={i}
                      >
                        <p>{formatTime(data.time)}</p>
                        <img
                          src={`https://${data.condition.icon}`}
                          alt={data.condition.text}
                        />
                        <p>{data.temp_c} °C</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className={`md:w-1/2 lg:w-1/2 w-full flex flex-col  md:h-full h-[400px] lg:full border p-2 rounded-md mt-2 md:mt-0 md:ml-1 ${lightTheme ? "border-black" : "border-white"}`}>
                <div className="flex w-full justify-center items-center">
                  <p className="text-lg font-semibold underline underline-offset-4">Daily Data</p>
                </div>
                <div className="flex flex-col w-full overflow-y-auto my-2">
                  {daily &&
                    daily.map((data: any, i: number) => (
                      <div
                        className="flex flex-row justify-between items-center m-2"
                        key={i}
                      >
                        <p>{data?.date}</p>
                        <img
                          src={`https://${data.day.condition.icon}`}
                          alt={data.day.condition.text}
                        />
                        <p>{data.day.avgtemp_c} °C</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full h-[100vh] flex justify-center items-center ${
            lightTheme ? "text-black" : "text-white"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
