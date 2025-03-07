

import React, { useContext, useState } from "react";
import "../../Components/Login/Login.css";
import axios from "axios";
import { StoreContext } from "../../Context/Context";

export default function Login({ setLogin, setShowpop }) {
  const [status, setStatus] = useState("Login");
  const { setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnchange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const loginUrl = "http://localhost:3000/api/v1/user/login";
  const registerUrl = "http://localhost:3000/api/v1/user/register";

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = status === "Login" ? loginUrl : registerUrl;
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setLogin(true); // Set user as logged in
        setShowpop(false); // Hide the login popup
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-bg">
      <form className="login" onSubmit={(e) => onLogin(e)}>
        <div className="login-header">
          <h2>{status}</h2>
          <button type="button" onClick={() => setShowpop(false)}>
            x
          </button>
        </div>
        <div className="login-input">
          {status === "Sign up" ? (
            <input
              type="text"
              placeholder="Enter Name..."
              onChange={(event) => handleOnchange(event)}
              value={data.name}
              name="name"
              required
            />
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="password"
            onChange={(event) => handleOnchange(event)}
            value={data.password}
            name="password"
            required
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            onChange={(event) => handleOnchange(event)}
            value={data.email}
            name="email"
            required
          />
          <button type="submit">
            {status === "Sign up" ? "Create Account" : "Login"}
          </button>
        </div>
        <div className="login-agree">
          {status === "Sign up" ? (
            <>
              <input type="checkbox" />
              <p>
                By continuing, I agree to the terms of use and privacy policy
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        {status === "Login" ? (
          <div className="new-account">
            <span>Create new account?</span>
            <button type="button" onClick={() => setStatus("Sign up")}>
              Click here
            </button>
          </div>
        ) : (
          <div className="new-account">
            <span>Have an account?</span>
            <button type="button" onClick={() => setStatus("Login")}>
              Click here
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
