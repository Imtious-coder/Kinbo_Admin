/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";
import addIcon from "../assets/Product_Cart.svg";
import productListIcon from "../assets/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addIcon} alt="Add Icon" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={productListIcon} alt="Add Icon" />
          <p>Product List</p>
        </div>
      </Link>
    </section>
  );
};

export default Sidebar;
