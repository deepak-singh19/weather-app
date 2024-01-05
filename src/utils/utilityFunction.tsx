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
import { DateTime } from "luxon";


type ImagesType = {
    [key: string]: string;
  };

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




export const kelToCel = (k: number): number => {
    const result = k - 273.15;
    return Number(result.toFixed(2));
  };

  export function convertTimestampToReadableTime(timestamp: number): string {
    const originalDateTime = new Date(timestamp);
  
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric' as const, 
      month: 'long' as const, 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };
  
    return originalDateTime.toLocaleString('en-US', options);
  }
  
  export const formatDate=(secs: any, zones: any, format="cccc, dd LLL yyyy' | Local time: 'hh:mm a")=>{
    return DateTime.fromSeconds(secs).setZone(zones).toFormat(format);

  }

  export const hourlyData=(data: any)=>{

    return data.forecast.forecastday[0].hour;
  }

  export const dailyData=(data: any)=>{

    return data.forecast.forecastday.splice(1,4);
  }

  export const formatTime =(dateTimeString: string)=> {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
  
    // Format the time
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    return formattedTime;
  }


