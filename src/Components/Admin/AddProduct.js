import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import "./addproduct.scss";
import axios from "axios";

function AddProduct() {
  const [name, bindName, resetName] = useInput("");
  const [p_image, bindP_image, resetP_image] = useInput("");
  const [price, bindPrice, resetPrice] = useInput("");
  const [p_type, setType] = useState("");
  const [available, bindAvailable] = useState(true);

  let setNewProduct = () => {
    axios
      .post("/api/products", {
        name,
        p_image,
        price,
        p_type,
        available
      })
      .then(() => {
        alert("New product added");
      })
      .catch(err => {
        console.log("Product not added", err);
      });
  };

// console.log(p_type)

  return (
    <div className="add-product-box">
      <h1 className="new-product-title">add new product</h1>
      <input placeholder="name" {...bindName} type='text'/>
      <input placeholder="image url" {...bindP_image} type='url'/>
      <input placeholder="price" {...bindPrice} type='number'/>
      <select
        onChange={(e) => setType(e.target.value)}
        className="product-type-dropdown"
        value={p_type}
      >
        <option value="scoops">scoops</option>
        <option value="soft-serve">soft-serve</option>
        <option value="toppings">toppings</option>
        <option value="cones">cones</option>
      </select>

      <label className='new-product-availability' htmlFor='available'>product available</label>
      <input 
        onChange={() => bindAvailable(!available)} 
        type='checkbox'
        value='available'
      />

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
    </div>
  );
}

export default AddProduct;
