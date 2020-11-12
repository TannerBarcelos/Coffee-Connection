import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function Nav({ userAgent, setUser }) {

  const [open, setOpen] = useState(false);

  function logOutToggler() {
    setUser('guest', false, null); // set auth state to false and the role back to guest
    // // NEED TO SEND CREDENTIALS - this will need to be added to any requests later for sending authenticated requests
    fetch('https://coffee-connection.herokuapp.com/auth/logout', {method:'GET', credentials: 'same-origin'}).then(res => res.json()).then(data => console.log(data))
  }
  if (userAgent === "guest") {
    return (
      <nav className="navbar">
        <NavLink to="/" className="logo nav-link">
          <i className="fas fa-mug-hot"></i>
        </NavLink>
        {/* Move the sidebar in based off if the hamburger was clicked in the media query
        if it has been triggered. We have the box -500px moved on X so what we can do here
        is move it back to 0px or do nothing (so nav bar does not break)
        */}
        <ul className="nav-links" style={{transform: open ? "translateX(0px)" : ""}}>
          <li className="nav-li">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/locations" className="nav-link">Find</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </li>
          <li className="nav-li">
          <NavLink to="/register" className="nav-link">Register</NavLink>
          </li>
        </ul>
        <i className="fas fa-bars burger" onClick={() => setOpen(!open)}></i>
      </nav>
    );
  } else if (userAgent === "member") {
    return (
      <nav className="navbar">
        <ul className="nav-links" style={{transform: open ? "translateX(0px)" : ""}}>
          <NavLink to="/" className="nav-link">
            <i className="fas fa-mug-hot"></i>
          </NavLink>
          <li className="nav-li">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/locations" className="nav-link">Find</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
          </li>
          <li className="nav-li" onClick={() => logOutToggler()}>
          <NavLink to="/" className="nav-link">Logout</NavLink>
          </li>
        </ul>
        <i className="fas fa-bars burger" onClick={() => setOpen(!open)}></i>
      </nav>
    );
  } else if (userAgent === "admin") {
    return (
      <nav className="navbar">
        <NavLink to="/" className="logo nav-link">
            <i className="fas fa-mug-hot"></i>
        </NavLink>
        <ul className="nav-links" style={{transform: open ? "translateX(0px)" : ""}}>
          <li className="nav-li">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/locations" className="nav-link">Find</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          </li>
          <li className="nav-li"> 
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
          </li>
          <li className="nav-li" onClick={() => logOutToggler()}>
            <NavLink to="/" className="nav-link">Logout</NavLink>
          </li>
        </ul>
        <i className="fas fa-bars burger" onClick={() => setOpen(!open)}></i>
      </nav>
    );
  }
}
export default Nav;
