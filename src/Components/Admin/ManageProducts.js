import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { connect } from "react-redux";
import { getProducts } from "../../redux/reducers/productReducer";
// import useInput from "../../hooks/useInput";
import "./manageproducts.scss";

const ManageProducts = props => {
  const { products } = props.product;

  useEffect(() => {
    getAllProducts();
  }, [products.length]);

  let getAllProducts = () => {
    axios.get("/api/product").then(res => props.getProducts(res.data));
  };

  const editProduct = (id, p) => {
    axios
      .put(`/api/products/${id}`, p)
      .then(res => {
        console.log(res.data);

        alert("Product updated");
      })
      .catch(error => console.log(error));
  };

  // const deleteProduct = p => {
  //   axios
  //     .delete(`/api/products/${p.p_id}`)
  //     .then(res => {
  //       getAllProducts()
  //     })
  //     .catch(error => console.log(error));
  // };

  return (
    <div className='manage-products-box'>
      <div className='product-count'>current number of products: {products.length}</div>
      <div className='wrap-all-products'>
      {products.map((p, i) => {
        return (
          <div className="product-display-box" key={i}>
            <div className="product-labels">
              <img className="product-img" src={p.p_image} />
              <span>{p.name}</span>
              <span>${p.price} </span>
              <span>{p.p_type}</span>
            </div>
            <Product
              key={i}
              p={p}
              editProduct={editProduct} 
              // deleteProduct={deleteProduct}
              />
          </div>
        );
      })}
      </div>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { getProducts })(ManageProducts);
