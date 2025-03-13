import { CircleNotch } from '@phosphor-icons/react';
import React from 'react';

interface LoaderProps {
  text?: string;
  variant?: 'big';
}

const Loader: React.FC<LoaderProps> = ({ text, variant }) => {
  const size = variant === 'big' ? 60 : 40;

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <CircleNotch size={size} className='animate-spin text-primary' />
      {text ? <p className='pt-4 text-inputFooterColor text-sm font-normal'>{text}</p> : null}
    </div>
  );
};

export default Loader;