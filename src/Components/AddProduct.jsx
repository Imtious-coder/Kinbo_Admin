/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/AddProduct.css";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    type: "",
    brand: "",
    size: "",
    colors: "",
    tags: "",
    availability: "available",
    description: "",
    total_items: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  // SELECTED IMAGE DISPLAY FUNCTION
  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 4) {
      toast.error("Please select 4 images", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else if (files.length > 4) {
      toast.error("Maximum 4 Images", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setImages(files);
    setProductDetails({ ...productDetails, image: files });
  };

  // PRODUCT DETAILS HANDLER FUNCTIONALITY
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProductDetails((prevDetails) => {
        const newSize = checked
          ? [...prevDetails.size, value]
          : prevDetails.size.filter((size) => size !== value);
        return { ...prevDetails, size: newSize };
      });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
    console.log(productDetails);
  };

  // ADD PRODUCT FUNCTIONALITY
  const addProduct = async () => {
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    images.forEach((image) => {
      formData.append("product", image);
    });
    // image upload api
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
        console.log(responseData);
      });

    // app product api
    if (responseData.success) {
      product.image = responseData.image_urls;
      console.log({ product });
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success
            ? toast.success("Product Added Successfully 🥰", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            : console.log("Something went wrong");
        });
    }
  };

  return (
    <section className="addproduct">
      <ToastContainer />
      <div className="fields title">
        <p>Product Title :</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          id=""
          className="inputs"
          placeholder="Ex: Smart watch 9 pro . . ."
        />
      </div>
      <div className="double-fields price">
        <div className="fields">
          <p>Price:</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            className="inputs"
            placeholder="$120.99"
          />
        </div>
        <div className="fields">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            id=""
            className="inputs"
            placeholder="$99.99"
          />
        </div>
      </div>
      <div className="fields images">
        <p>Images:</p>
        <div className="thumbnail-container">
          {images.length === 4 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                className="preview-images"
                alt={`Thumbnail ${index + 1}`}
              />
            ))
          ) : (
            <label htmlFor="file-input">
              <img src={upload_area} className="upload-image" alt="Thumbnail" />
            </label>
          )}
        </div>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
          multiple
        />
      </div>
      <div className="fields description">
        <p>Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          rows="5"
          cols="50"
          placeholder="Minimum 20 words."
        />
      </div>
      <div className="fields size">
        <p>Size:</p>
        <div className="checkbox-group">
          {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={productDetails.size.includes(size)}
                onChange={changeHandler}
                className="size-input"
              />
              {size}
            </label>
          ))}
        </div>
      </div>
      <div className="double-fields category-stock">
        <div className="fields">
          <p>Product Category:</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="addproduct-selector"
          >
            <option value="women">Women 💃🏻</option>
            <option value="men">Men 🙎🏻</option>
            <option value="kid">Kid 👶🏻</option>
          </select>
        </div>
        <div className="fields">
          <p>Availability:</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="addproduct-selector"
          >
            <option value="available">Available 📦</option>
            <option value="stock_out">Stock Out 😞</option>
          </select>
        </div>
      </div>
      <div className="double-fields type-brand">
        <div className="fields">
          <p>Type:</p>
          <input
            value={productDetails.type}
            onChange={changeHandler}
            type="text"
            name="type"
            className="inputs"
            placeholder="Ex: Watch"
          />
        </div>
        <div className="fields">
          <p>Brand:</p>
          <input
            value={productDetails.brand}
            onChange={changeHandler}
            type="text"
            name="brand"
            className="inputs"
            placeholder="Ex: Naviforce, Apple, H&M"
          />
        </div>
      </div>
      <div className="fields tags-brands">
        <p>Tags:</p>
        <input
          value={productDetails.tags}
          onChange={changeHandler}
          type="text"
          name="tags"
          id=""
          className="inputs"
          placeholder="Ex:  Smart watch, Phone, Top's"
        />
      </div>
      <div className="double-fields colors-total_items">
        <div className="fields">
          <p>Colors:</p>
          <input
            value={productDetails.colors}
            onChange={changeHandler}
            type="text"
            name="colors"
            id=""
            className="inputs"
            placeholder="Ex: Red, White, Pink"
          />
        </div>
        <div className="fields">
          <p>Total Items:</p>
          <input
            value={productDetails.total_items}
            onChange={changeHandler}
            type="number"
            name="total_items"
            id=""
            className="inputs"
            placeholder="Ex: 122"
          />
        </div>
      </div>
      <button
        onClick={() => {
          addProduct();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </section>
  );
};

export default AddProduct;
