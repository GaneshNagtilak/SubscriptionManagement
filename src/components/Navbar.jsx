import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiList, FiClock } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">💳</span>
        <h1>SubTracker</h1>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }
        >
          <FiPlusCircle />
          <span>Add New</span>
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }
        >
          <FiList />
          <span>All Subscriptions</span>
        </NavLink>
        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }
        >
          <FiClock />
          <span>Upcoming</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;