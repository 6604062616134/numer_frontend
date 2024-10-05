// Sidebar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faG, faR, faL, faI, faE } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-base-200 text-base-content transition-all duration-300 p-2 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 text-center text-2xl font-semibold flex justify-between items-center">
        {!isCollapsed && 
          <div>
            <span className='text-2xl text-left'>Numerical</span>
            <p className='text-sm text-left'>Method</p>
          </div>
        }
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-base-content hover:text-base-content focus:outline-none">
          {isCollapsed ? '»' : '«'}
        </button>
      </div>
      <ul className="menu w-full p-0">
        <li className="">
          <a href="/" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faG} className="mr-2" />
            {!isCollapsed && <span>Graphical Method</span>}
          </a>
        </li>
        <li className="">
          <a href="/root-equations" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faR} className="mr-2" />
            {!isCollapsed && <span>Root Equations</span>}
          </a>
        </li>
        <li className="">
          <a href="/linear-algebra" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faL} className="mr-2" />
            {!isCollapsed && <span>Linear Algebra</span>}
          </a>
        </li>
        <li className="">
          <a href="/interpolation" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faI} className="mr-2" />
            {!isCollapsed && <span>Interpolation</span>}
          </a>
        </li>
        <li className="">
          <a href="/extrapolation" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faE} className="mr-2" />
            {!isCollapsed && <span>Extrapolation</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
