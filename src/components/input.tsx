import { InputProps } from '../utils/interface';

const HomeInput = ({ type, placeholder, label }: InputProps) => {
  return (
    <div>
      <label className='text-[14px] mb-8'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className='h-[46px] border-2 border-gray-100
       outline-none w-full bg-white placeholder:px-2  '
      />
    </div>
  );
};

export default HomeInput;
