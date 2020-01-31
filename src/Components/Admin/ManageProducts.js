import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../../redux/reducers/productReducer";
import Product from "./Product";
import "./manageproducts.scss";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageProducts = props => {
  const { products } = props.product;

  const MySwal = withReactContent(Swal);


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
        // console.log(res.data);

        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "Product updated"
        });

        // alert("Product updated");
        getAllProducts()
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
      <div className='stats'>
      <div className='product-count'>current number of products: {products.length}</div>
      </div>
      <div className='wrap-all-products'>
      {products.sort((a, b) => b.p_id - a.p_id).map((p, i) => {
        return (
          <div className="product-display-box" key={i}>


          <div className='product-img-box'>
          <img className="product-img" src={p.p_image} />
            </div>

              <div className='product-wrapper'>
            <Product
              key={i}
              p={p}
              editProduct={editProduct} 
              // deleteProduct={deleteProduct}
              />
              </div>
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
