/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Styles/ListProduct.css";
import cross_icon from "../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <section className="list_product">
      <h1>All Products List</h1>
      <div className="list_product-formate-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list_product-allproducts">
        <hr />
        {allProducts.map(
          ({ id, name, image, old_price, new_price, category }, index) => {
            return (
              <div key={index}>
                <div className="list_product-formate-main list_product-formate">
                  <img
                    className="list_product-product-icon"
                    src={image}
                    alt="Product_Image"
                  />
                  <p>{name}</p>
                  <p>${old_price}</p>
                  <p>${new_price}</p>
                  <p>{category}</p>
                  <img
                    onClick={() => {
                      removeProduct(id);
                    }}
                    className="list_product-remove-icon"
                    src={cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default ListProduct;
