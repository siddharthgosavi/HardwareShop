import React from "react";
import "./Header.scss";
import SaiSnehLogo from './SaiSnehLogo.png'
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
       <img src={SaiSnehLogo} alt="Your Logo" class="logo"/>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <button className="login-btn"><Link to="/login">Login</Link></button>
    </header>
  );
}

export default Header;
