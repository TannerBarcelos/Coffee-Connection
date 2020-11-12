import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="hero__image">
      <div className="hero-text">
        <h1 className="hero__title-h1">Welcome to Coffee Connect!</h1>
        <p className="landing__here-sub">
          Find coffee shops in your area with ease.
        </p>
        <Link to="/locations" className="search__link">
          Search Coffee Shops
        </Link>
      </div>
    </header>
  );
}

export default Header;
