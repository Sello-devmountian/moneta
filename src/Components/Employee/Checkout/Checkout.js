import React, { useEffect, useState } from "react";
import axios from "axios";
import "./checkout.css";
import { connect } from "react-redux";
import { getProducts } from "./../../../redux/reducers/productReducer";
import Sidebar from "./Sidebar/Sidebar";
import Cart from "./Cart/Cart";





const Checkout = props => {
  const { products } = props.product;
  const [cart, setCart] = useState([]);
  const [type, setType] = useState('scoops');

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

  const renderType = (p_type) => {
    setType(p_type)
  }

  return (
    <div style={{ paddingTop: "50px" }} className="checkout-container">
      <Sidebar renderTypeFn={renderType}/>
      <div className="all-products-container">

        {
        products[0] ? (
          products.filter(p => {
           return p.p_type === type
          })
          .map((p, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  addToCart(p);
                }}
                className="product-container"
              >
                <img className="product-image" src={p.p_image} alt="" />
                <section className="product-text">
                  <span className="product-name">{p.name}</span>
                  <span>{p.price}</span>
                </section>
              </div>
            );
          })
        ) : (
          <span>loading...</span>
        )}
      </div>
      <Cart cart={cart} />
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps, { getProducts })(Checkout);
