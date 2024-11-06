import React from 'react';
import Spinner from './Spinner';

export default function LoadingPage() {
  return (
    <div className='flex gap-4 items-center justify-center h-screen'>
      <Spinner size={34} />
    </div>
  );
}
