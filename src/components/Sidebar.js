import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faG, faB, faF, faO, faN, faS, faC } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing

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
        <li>
          <NavLink to="/" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faG} className="mr-2" />
            {!isCollapsed && <span>Graphical Method</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/Bisection" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faB} className="mr-2" />
            {!isCollapsed && <span>Bisection Method</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/FalsePosition" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faF} className="mr-2" />
            {!isCollapsed && <span>False-position Method</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/Onepoint" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faO} className="mr-2" />
            {!isCollapsed && <span>One-point Iteration</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/Newton" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faN} className="mr-2" />
            {!isCollapsed && <span>Newton-raphson Method</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/Secant" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faS} className="mr-2" />
            {!isCollapsed && <span>Secant Method</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/Cramer" className={`hover:bg-base-300 flex items-center p-4 ${isCollapsed ? 'w-12' : ''}`}>
            <FontAwesomeIcon icon={faC} className="mr-2" />
            {!isCollapsed && <span>Cramer's Rule</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
