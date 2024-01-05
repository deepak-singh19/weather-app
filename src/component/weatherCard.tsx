import React from 'react';
import { Images } from '../utils/utilityFunction';
import { useAppContext } from '../context/contextProvider';

interface WeatherCardProps {
  title: string;
  icon: string;
  value: String;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, icon, value }) => {
  const { lightTheme } = useAppContext();

  return (
    <div className={`flex w-[100%] h-[280px] flex-col border rounded-md p-5`}>
      <div className='flex items-center w-full justify-center'>
        <p className={`text-2xl ${lightTheme ? 'text-black' : 'text-white'}`}>{title}</p>
      </div>
      <div className='flex flex-row justify-between items-center w-full h-[60%]'>
        <div className='flex justify-center items-center w-full h-full'>
          <img src={Images[icon]} alt='weather_icon' className='w-3/4 h-3/4' />
        </div>
      </div>
      <div className='flex w-full justify-center items-center'>
        <p className={`text-center ${lightTheme ? 'text-black' : 'text-white'}`}>{value}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
