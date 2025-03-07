import React from "react";
import NavBar from "./Components/Header/Navbar";
import SideBar from "./Components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import ListProduct from "./Pages/listProductPage/listProduct";
import AddProduct from "./Pages/addProductPage/addProduct";
import { ToastContainer, toast } from "react-toastify";
export default function App() {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/list" element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
}
