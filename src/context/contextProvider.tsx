import { loading } from '@material-tailwind/react/types/components/button';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  city: string;
  lightTheme: boolean;
  setCity: (city: string) => void;
  setlightTheme: (lightTheme: boolean) => void;
  weatherData: any;
  setWeatherData:(weatherData: any) => void;
  now: boolean;
  setNow: (now : boolean)=>void;
  loading: boolean;
  setLoading: (loading: boolean)=> void;
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
  const [now, setNow] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const contextValue: AppContextProps = {
    city,
    lightTheme,
    setCity,
    setlightTheme,
    weatherData,
    setWeatherData,
    now, 
    setNow,
    loading,
    setLoading
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};



