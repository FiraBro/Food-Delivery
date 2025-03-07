
import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import { StoreContext } from "./Context/Context";
import AboutUs from "./Pages/AboutUS/AboutUS";

export default function App() {
  const [login, setLogin] = useState(false); // Tracks login status (true = logged in)
  const [showpop, setShowpop] = useState(false); // Controls login popup visibility
  const { setToken } = useContext(StoreContext); // Access setToken from context

  // Check for token in localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Restore token in context
      setLogin(true); // Set user as logged in
    }
  }, [setToken]); // Run once on mount, depends on setToken

  return (
    <>
      {showpop ? <Login setLogin={setLogin} setShowpop={setShowpop} /> : <></>}
      <div className="layout">
        <Navbar setShowpop={setShowpop} setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart login={login} />} />
          <Route path="/about" element={<AboutUs />}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}
