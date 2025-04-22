import { useState } from 'react';
import { InputProps } from '../utils/interface';
import CloseLock from '../assets/svg/closeLock';
import OpenLock from '../assets/svg/openLock';

const HomeInput = ({
  type,
  placeholder,
  label,
  onChange,
  value,
  name,
  border,
  onKeyPress,
}: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setVisible(!visible);
  };
  return (
    <div className='w-full'>
      <h3 className='text-[#1E1E1E] text-[13px] font-roboto mb-2'>{label}</h3>
      <div className='relative items-center'>
        <input
          type={visible ? 'text' : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          className={`h-[52px] w-full  border-solid border-[1px] border-[#E8ECEF] ${border} rounded-[2px] outline-none px-4 placeholder-[#98A9BC] placeholder:text-[14px] placeholder:font-[400]`}
        />
        {type === 'password' && (
          <div
            className='absolute cursor-pointer top-3 right-2'
            onClick={handleTogglePassword}
          >
            {visible ? <OpenLock /> : <CloseLock />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeInput;
