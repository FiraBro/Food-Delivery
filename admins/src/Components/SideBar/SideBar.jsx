import React from "react";
import "./SideBar.css";
import plusIcan from "./../../assets/plus.svg";
import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
          <img src={plusIcan} alt="" />
          <p>Add List</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={plusIcan} alt="" />
          <p>List Items</p>
        </NavLink>
    
      </div>
    </div>
  );
}
