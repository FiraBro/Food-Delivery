

import React, { useContext } from "react";
import "./../../Components/Navbar/Navbar.css";
import search from "../../asset/search_icon.png"; // Unused, can remove if not needed
import cart from "../../asset/basket_icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/Context";

export default function Navbar({ setShowpop, setLogin }) {
  // Added setLogin
  const { setToken, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(""); // Clear token in context
    localStorage.removeItem("token"); // Remove token from local storage
    setLogin(false); // Set user as logged out
    navigate("/"); // Navigate to home page (optional)
  };

  return (
    <div className="navbar">
      <div className="logo">
        <button onClick={() => navigate("/")}>
          <span>Fira</span>
          <span className="span1">Fruit</span>
        </button>
      </div>
      <div className="nav-links">
        {" "}
        {/* Changed from navbar to avoid class conflict */}
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
      <div className="authenticate">
        <button onClick={() => navigate("/cart")}>
          <img src={cart} alt="Cart" />
        </button>
        {!token ? (
          <button onClick={() => setShowpop(true)}>Signup</button> // Fixed typo
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}
