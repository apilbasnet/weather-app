'use client'
import Weather from '@/components/Weather';

import React from 'react';
import '@edge-ui/react/styles.css';



const page = () => {
  return (
    <div className='bg-[url(https://littlevisuals.co/images/a_mile.jpg)] bg-cover  '>
      <div className='backdrop-blur-sm h-full bg-slate-200 bg-opacity-5'>

        <Weather />
      </div>


    </div>
  );
};

export default page;