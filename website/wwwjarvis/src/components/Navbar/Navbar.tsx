import React from 'react';
import badge from '../../assets/badge.svg';

function Navbar() {
    return (
        <div className="fixed top-0 p-6 w-full flex items-center justify-center backdrop-blur z-50">
            <img src={badge} alt="Jarvis" className="w-8" />
        </div>
    );
}

export default Navbar;
