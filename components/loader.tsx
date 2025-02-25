import { CircleNotch } from '@phosphor-icons/react';
import React from 'react';

const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center w-full'>
      <CircleNotch size={40} className='animate-spin text-primary' />
    </div>
  );
};

export default Loader;