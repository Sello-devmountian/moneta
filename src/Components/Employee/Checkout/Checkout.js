import React, { useEffect, useState } from "react";
import axios from "axios";
import "./checkout.scss";
import { connect } from "react-redux";
import { getProducts } from "./../../../redux/reducers/productReducer";
import Sidebar from "./Sidebar/Sidebar";
import Cart from "./Cart/Cart";
import {css} from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const Checkout = props => {
  const { products } = props.product;
  const [cart, setCart] = useState([]);
  const [type, setType] = useState("scoops");

  useEffect(() => {
    getAllProducts();
  }, [products.length]);

  useEffect(() => {
    getCart();
  }, []);

  let getAllProducts = () => {
    axios.get("/api/product").then(res => props.getProducts(res.data));
  };

  const addToCart = p => {
    axios
      .post("/api/co/cart", p)
      .then(res => getCart())
      .catch(err => console.log(err));
  };
  const getCart = () => {
    axios
      .get("/api/co/cart")
      .then(res => {
        setCart(res.data);
      })
      .catch(err => console.log(err));
  };

  const renderType = p_type => {
    setType(p_type);
  };

  console.log(props)

  return (
    <div style={{ paddingTop: "50px" }} className="checkout-container">
      <Sidebar renderTypeFn={renderType} />
      <div className="all-products-container">
        {products[0] ? (
          products
            .filter(p => {
              return p.p_type === type && p.available;
            })
            .map((p, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    addToCart(p);
                  }}
                  onDragEnd={() => addToCart(p)}
                  className="product-container"
                >
                  <img className="product-image" src={p.p_image} alt="" />
                  <section className="product-text">
                    <span className="product-name">{p.name}</span>
                    <span className="product-price">${p.price}</span>
                  </section>
                </div>
              );
            })
        ) : (
          <div>
            <ClipLoader 
              color={'#408dff'}
              loading={props.product.loading}
              size={300}
            />
          </div>
        )}
      </div>
      <Cart setCart={setCart} cart={cart} />
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps, { getProducts })(Checkout);
