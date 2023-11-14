import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import screenshot from '../../assets/screenshot.png';
import Lightbulb from '../../assets/3dicons/Lightbulb.png';
import Bell from '../../assets/3dicons/Bell.png';
import { IoIosDownload } from 'react-icons/io';
import './IndexRoute.css';
import Navbar from '../../components/Navbar/Navbar';


function IndexRoute() {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update the rotateX and scale properties based on the scroll position
    const maxRotateX = 40; // Initial rotateX
    const maxScale = 0.5; // Maximum scale value
    const maxScroll = 300; // Maximum scroll before rotateX becomes 0 and scale becomes 0.8

    const rotateX = Math.max(maxRotateX - (scrollY / maxScroll) * maxRotateX, 0);
    const scale = () => {
      const scale = Math.max(1 - (scrollY / maxScroll) * 0.1, maxScale);
      console.log(scale);

      if (scale < 0.8) {
        return 0.8
      }
      return scale
    }

    controls.start({
      rotateX: rotateX,
      scale: scale(),
    });
  }, [scrollY, controls]);

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

        {/* Use motion.div to apply 3D rotation to the image */}
        <motion.div
          className='screenshot-overlay'
          style={{ perspective: '1000px' }} // Set perspective for 3D effect
        >
          <motion.img
            src={screenshot}
            alt='Screenshot'
            initial={{ rotateX: 40, scale: 1 }}
            animate={controls}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <section className='featureSection'>
          <div className='badge_outer'>          <div className='badge_inner'>Features</div></div>
        </section>

      </div>
    </>
  );
}

export default IndexRoute;