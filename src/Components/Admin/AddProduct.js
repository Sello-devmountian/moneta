import React from "react";
import useInput from "../../hooks/useInput";
import "./addproduct.scss";

function AddProduct() {
  const [name, bindName, p_image, bindP_image, price, bindPrice, setNewProduct] = useInput("");

  return (
    <div className="add-product-box">
      <h1 className="new-product-title">add new product</h1>
      <input placeholder="name" {...bindName}></input>
      <input placeholder="image url" {...bindP_image}></input>
      <input placeholder="price" {...bindPrice}></input>
      <div
        className="add-product-btn"
        onClick={e => setNewProduct(e.target.value)}>
        add product
      </div>
    </div>
  );
}

export default AddProduct;
