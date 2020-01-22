import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import {withRouter} from 'react-router-dom'

const Cart = props => {
  useEffect(() => {
  }, []);

  console.log(props)

  return (
    <div className="cart-container">
      <section className="cart-items">
        { props.cart[0] &&
          props.cart.map((item, i) => {
            return (
              <div key={i}>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            );
          })}
      </section>
      <span>
        Total:{" "}
        {props.cart[0] &&
          props.cart.reduce((acc, b) => acc + +b.price, 0).toFixed(2)}
      </span>
      <section>
        discount code
        <input type="text" />
        <button >Submit</button>
      </section>
      <button onClick={() => props.history.push('/payment')}>Checkout</button>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default withRouter(connect(mapStateToProps)(Cart));
