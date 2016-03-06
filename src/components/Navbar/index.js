import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <header className="header">
    <div className="container">
      <div className="header-left">
        <Link className="header-item title" to="/">
          Bryan Lackey
        </Link>
      </div>

      <span className="header-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div className="header-right header-menu">
        {/* <span className="header-item">
          <a href="#">Portfolio</a>
        </span>*/}
        <span className="header-item">
          <Link to="blog">Blog</Link>
        </span>
      </div>
    </div>
  </header>
);

export default Navbar;
