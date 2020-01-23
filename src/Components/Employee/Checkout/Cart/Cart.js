import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import {withRouter} from 'react-router-dom'
import { getCustomer } from "../../../../redux/reducers/customerReducer";

const Cart = props => {
  useEffect(() => {
  }, []);

  console.log(props)
  const getCustomer = () => {
    
  }
  return (
    <div className="cart-container">
    <div>Customer:{' '}
      <span> 
         {props.employee.employee.customer && props.employee.employee.customer.first_name } {
          props.employee.employee.customer && props.employee.employee.customer.last_name 
        }
        </span></div>
      <section className="cart-items">
        { props.cart[0] &&
          props.cart.map((item, i) => {
            return (

              <div index={i} key={i}>
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
