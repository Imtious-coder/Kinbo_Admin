/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../Styles/AddProduct.css";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  return (
    <section className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" id="" placeholder="Type Here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" id="" placeholder="Type Here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" id="" placeholder="Type Here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className="addproduct-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-image"
            alt="Thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button className="addproduct-btn">ADD</button>
    </section>
  );
};

export default AddProduct;
