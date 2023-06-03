import React from 'react'
import NavBar from './NavBar'
import banner from '../assets/hero.webp'

const Home = () => {
  return (
    <>
        <NavBar />
        <div className="banner">
          {/* <img src={banner} alt="hero" /> */}
          <h1 className='fs-1 mt-6 text-white'>Home Page</h1>
        </div>
    </>
  )
}

export default Home