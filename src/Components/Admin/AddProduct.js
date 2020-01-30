import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import "./addproduct.scss";
import axios from "axios";

function AddProduct() {
  const [name, bindName, resetName] = useInput("");
  const [p_image, bindP_image, resetP_image] = useInput("");
  const [price, bindPrice, resetPrice] = useInput("");
  const [p_type, setType] = useState("scoops");
  const [available, setAvailable] = useState(false);

  let setNewProduct = () => {
    axios
      .post("/api/products", {
        name,
        p_image,
        price,
        p_type,
        available
      })
      .then(response => {
        console.log(response, "response");
        alert("New product added");
      })
      .catch(err => {
        console.log("Product not added", err);
      });
  };

  return (
    <div className="add-product-box">
      <h1 className="new-product-title">add new product</h1>
      <section className="new-product-inputs">
        <input placeholder="name" {...bindName} type="text" />
        <input placeholder="image url" {...bindP_image} type="url" />
        <input placeholder="price" {...bindPrice} type="number" />
        <select
          onChange={e => setType(e.target.value)}
          className="product-type-dropdown"
          value={p_type}
        >
          <option value="scoops" selected>
            scoops
          </option>
          <option value="soft-serve">soft-serve</option>
          <option value="toppings">toppings</option>
          <option value="cones">cones</option>
        </select>

        <label className="new-product-availability" htmlFor="available">
          product available?
          <select
          className="product-available-dropdown"

            onChange={e => setAvailable(e.target.value)}
            value={available}
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </label>

        {/* 
      <input 
        onChange={() => setAvailable(true)} 
        type='checkbox'
        value={available}
        */}

        <div
          className="add-product-btn"
          onClick={() => {
            setNewProduct();
            resetName();
            resetP_image();
            resetPrice();
          }}
        >
          add product
        </div>
      </section>
    </div>
  );
}

export default AddProduct;
