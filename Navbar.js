import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <h1>Social Stock App</h1>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/watchlist" className="nav-link">
          Watchlist
        </Link>
        <Link to="/portfolio" className="nav-link">
          Portfolio
        </Link>
        <Link to="/chat" className="nav-link">
          Chat
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
