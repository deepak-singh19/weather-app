import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  city: string;
  lightTheme: boolean;
  setCity: (city: string) => void;
  setlightTheme: (lightTheme: boolean) => void;
  weatherData: any;
  setWeatherData:Function;
  foreCast: any;
  setForeCast:(weatherData: any) => void;
  // dailyData: any;
  // setDailyData:(weatherData: any) => void;
  now: boolean;
  setNow: (now : boolean)=>void;
  loading: boolean;
  setLoading: (loading: boolean)=> void;
  message: string;
  setMessage: (message:string)=>void;
  isHot: boolean;
  setIsHot: Function;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [city, setCity] = useState('London');
  const [lightTheme, setlightTheme] = useState<boolean>(false);
  const [weatherData, setWeatherData]= useState<any>();
  const [foreCast, setForeCast]= useState<any>();
  // const [hourlyData, setHourlyData]= useState<any>();
  const [now, setNow] = useState<boolean>(false);
  const [isHot, setIsHot] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage]= useState("Search the city...")

  const contextValue: AppContextProps = {
    city,
    lightTheme,
    setForeCast,
    setCity,
    setlightTheme,
    foreCast,
    weatherData,
    setWeatherData,
    now, 
    setNow,
    loading,
    setLoading,
    message,
    setMessage,
    isHot,
    setIsHot
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};



