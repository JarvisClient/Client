import React, { useEffect } from 'react';
import screenshot from '../../assets/screenshot_11.png';
import { IoIosDownload } from 'react-icons/io';

import './IndexRoute.css';
import Navbar from '../../components/Navbar/Navbar';

function IndexRoute() {

  return (
    <>
      <div className='IndexRoute'>
        <Navbar />

        <section className='hero_section'>
          <div className='hero_section_children'>
            <h1 className='font-bold text-[71.36px] leading-[80px]'>
              Jenkins for the <br />21st Century
            </h1>
            <p className='text-[26.55px] mt-8 mb-5'>Boost your Project with Jarvis</p>
            <div className='button'>
              <IoIosDownload size={20} />
              <p className='text-[18.92px]'>Download</p>
            </div>
          </div>
        </section>
        <div className="screenshot-overlay">
          <img className='screenshot-overlay border-3 border-[#313132]' src={screenshot} alt='Screenshot' />
        </div>
      </div>
    </>
  );
}

export default IndexRoute;
