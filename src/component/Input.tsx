import React, { ChangeEvent, useState } from 'react';
import { useAppContext } from '../context/contextProvider';

interface InputProps {
  placeholder: string;
  onInputChange: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, onInputChange, className }) => {
  const [value, setValue] = useState('');
  const { lightTheme } = useAppContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onInputChange(e.target.value);
  };

  return (
    <div className=''>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`border px-4 py-2 rounded-md focus:outline-none ${
          lightTheme
            ? 'text-black bg-white'
            : 'text-white bg-black'  
        } ${className}`}
      />
    </div>
  );
};

export default Input;
