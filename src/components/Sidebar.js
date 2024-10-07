// Sidebar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faG, faB, faF, faO, faN , faS, faC} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-base-200 text-base-content transition-all duration-300 p-2 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 text-center text-2xl font-semibold flex justify-between items-center">
        {!isCollapsed && 
          <div>
            <span className='text-2xl text-left'>Numerical</span>
            <p className='text-2xl text-left'>Method</p>
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
          <a href="/Bisection" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faB} className="mr-2" />
            {!isCollapsed && <span>Bisection method</span>}
          </a>
        </li>
        <li className="">
          <a href="/False-position" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faF} className="mr-2" />
            {!isCollapsed && <span>False-position method</span>}
          </a>
        </li>
        <li className="">
          <a href="/One-point" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faO} className="mr-2" />
            {!isCollapsed && <span>One-point iteration</span>}
          </a>
        </li>
        <li className="">
          <a href="/Newton-raphson" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faN} className="mr-2" />
            {!isCollapsed && <span>Newton-raphson method</span>}
          </a>
        </li>
        <li className="">
          <a href="/Secant" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faS} className="mr-2" />
            {!isCollapsed && <span>Secant method</span>}
          </a>
        </li>
        <li className="">
          <a href="/Cramer" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faC} className="mr-2" />
            {!isCollapsed && <span>Secant method</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
