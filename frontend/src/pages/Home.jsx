import React from 'react'
import  bgimage  from '../assets/bgimg.png'
import wave from '../assets/wave.png'

import  PackagesDisplay  from '../components/PackagesDisplay'
const Home = () => {
  return (
    <div className=''>
        <div className="relative w-full h-[90vh]">
      <img
        src={bgimage} // Replace with your image URL
        alt="Hero"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold">Welcome to Travel Agency</h1>
        <p className="text-white mt-4 text-center max-w-xl">
          Discover the world's best destinations and book your next adventure with us.
        </p>
      </div>
    </div>
    
    <PackagesDisplay />
    </div>
  )
}

export default Home