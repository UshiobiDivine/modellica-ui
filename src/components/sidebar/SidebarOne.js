import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Lica-white.png';
import './SidebarOne.css';

function SidebarOne() {
  return (
    <div className="sidebarone-container">
      <div className="logo-container">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>
      </div>

      <div className="sidebar-body">
        <div className="body-head">Get loans instantly</div>
        <div className="body-text">
          Getting loans has never been this easy. &nbsp; Apply for loans from
          the comfort of your home and get instant approval.
        </div>
        <div className="body-foot">
          <div className="body-foot-dot-one" />
          <div className="body-foot-dot-two" />
          <div className="body-foot-dot-three" />
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-privacy">Privacy Policy</div>
        <div className="sidebar-footer-terms">Terms &amp; Conditions</div>
      </div>
    </div>
  );
}

export default SidebarOne;
