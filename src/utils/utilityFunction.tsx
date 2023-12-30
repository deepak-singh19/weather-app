// Importing image files
import image01d from '../assets/01d@2x.png';
import image01n2 from '../assets/01n@2x.png';
import image02d from '../assets/02d@2x.png';
import image02n2 from '../assets/02n@2x.png';
import image03d from '../assets/03d@2x.png';
import image03n from '../assets/03n@2x.png';
import image04d from '../assets/04d@2x.png';
import image04n from '../assets/04n@2x.png';
import image09d from '../assets/09d@2x.png';
import image09n from '../assets/09n@2x.png';
import image10d from '../assets/10d@2x.png';
import image10n from '../assets/10n@2x.png';
import image11d from '../assets/11d@2x.png';
import image11n from '../assets/11n@2x.png';
import image13d from '../assets/13d@2x.png';
import image13n from '../assets/13n@2x.png';
import image50d from '../assets/50d@2x.png';
import image50n from '../assets/50n@2x.png';
import Sunrise from "../assets/sunrise.svg";
import Sunset from '../assets/sunset.svg';
import Wind from '../assets/wind-removebg-preview.png';
import Humidity from '../assets/humidity-removebg-preview.png';


type ImagesType = {
    [key: string]: string;
  };
// Create an object mapping file names to import statements
export const Images: ImagesType  = {
    "01d": image01d,
    "01n": image01n2,
    "02d": image02d,
    "02n": image02n2,
    "03d": image03d,
    "03n": image03n,
    "04d": image04d,
    "04n": image04n,
    "09d": image09d,
    "09n": image09n,
    "10d": image10d,
    "10n": image10n,
    "11d": image11d,
    "11n": image11n,
    "13d": image13d,
    "13n": image13n,
    "50d": image50d,
    "50n": image50n,
    "sunrise": Sunrise,
    "sunset" : Sunset,
    "wind" : Wind,
    "humid" : Humidity
  };


// You can use these imported variables as image sources in your components


export const kelToCel = (k: number): number => {
    const result = k - 273.15;
    return Number(result.toFixed(2));
  };

  export function convertTimestampToReadableTime(timestamp: number): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const date = new Date(timestamp * 1000);
  
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    const readableTime = `${dayOfWeek}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    return readableTime;
  }


  
//   {weatherData && (
//     <div>
//       <h2>{weatherData.name}</h2>
//       <p>Temperature: {temp} °C</p>
//       <p>Humidity: {weatherData.main.humidity}%</p>
//       <p>Sun rise: {sunRise}</p>
//       <p>Sun set: {sunSet}</p>
//       {/* Add more weather details as needed */}
//     </div>
//   )}