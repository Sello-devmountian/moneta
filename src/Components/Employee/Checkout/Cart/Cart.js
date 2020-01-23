import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";


const Cart = props => {
  const removeFromCart = async i => {
    await props.cart.splice(i, 1);
    Axios.put("/api/co/cart", props.cart).then(res => props.setCart(res.data));
  };

  return (
    <div className="cart-container">
      <div>
        Customer:{" "}
        <span>
          {props.employee.employee.customer &&
            props.employee.employee.customer.first_name}{" "}
          {props.employee.employee.customer &&
            props.employee.employee.customer.last_name}
        </span>
      </div>
      <section className="cart-items">
        {props.cart[0] &&
          props.cart.map((item, i) => {
            return (
              <div index={i} key={i}>
                <span>{item.name}</span>
                <span>{item.price}</span>
                <button onClick={() => removeFromCart(i)}>X</button>
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
        <button>Submit</button>
      </section>
      <button onClick={() => props.history.push("/payment")}>Checkout</button>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default withRouter(connect(mapStateToProps)(Cart));
