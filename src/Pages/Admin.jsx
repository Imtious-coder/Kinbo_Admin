/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../Components/AddProduct";
import ListProduct from "../Components/ListProduct";
import Sidebar from "../Components/Sidebar";
import "../Styles/Admin.css";

const Admin = () => {
  return (
    <section className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/listproduct" element={<ListProduct />}></Route>
      </Routes>
    </section>
  );
};

export default Admin;
