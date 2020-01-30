import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const Cart = props => {
  const [remove, setRemove] = useState(false);
  const [selProd, setSelProd] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);


  useEffect(() => {
    let sub = props.cart[0] && props.cart.reduce((acc, b) => acc + +b.price, 0).toFixed(2)
    setSubtotal(sub)
    setTax((sub*.088).toFixed(2))
    setTotal((sub*1.088).toFixed(2))

  },[props.cart.length])

  const removeFromCart = async (i, num) => {
    await props.cart.splice(i, num);
    Axios.put("/api/co/cart", props.cart).then(res => props.setCart(res.data));
  };
  const toggleRemove = () => {
    setRemove(!remove);
  };
  const selectProduct = i => {
    setSelProd(i);
    setRemove(!remove);
  };

  return (
    <div className="cart-container">
      <section className="cart-items">
        {props.cart[0] &&
          props.cart.map((item, i) => {
            return (
              <div onClick={() => selectProduct(i)} id="item" index={i} key={i}>
                <span id="item-name">{item.name}</span>
                <section id="price-button">
                  <span style={{ marginRight: "10px" }}>${item.price}</span>

                  {remove ? (
                    selProd === i ? (
                      <button
                        id="remove-item"
                        onClick={() => removeFromCart(i, 1)}
                      >
                        X
                      </button>
                    ) : null
                  ) : null}
                </section>
              </div>
            );
          })}
      </section>

      <strong className="checkout-total">
        Subtotal: {props.cart[0] ? `$${subtotal}` : '$0'} 
      </strong>
      <strong className="checkout-total">
        Tax: {props.cart[0] ? `$${tax}` : '$0'} 
      </strong>
      <strong className="checkout-total">
        Total: {props.cart[0] ? `$${total}` : '$0'} 
      </strong>
      <div className="selected-customer-container">
        <span>Customer: </span>
        <span>
          {props.employee.employee.customer &&
            props.employee.employee.customer.first_name}{" "}
          {props.employee.employee.customer &&
            props.employee.employee.customer.last_name}
        </span>
        <button onClick={() => props.history.push('/customers')} className='add-customer-button'>ADD CUSTOMER</button>
      </div>
      {/* <section>
        discount code
        <input type="text" />f
        <button>Submit</button>
      </section> */}
      <section
        style={{
          display: "flex",
          marginTop: "10px",
          justifyContent: "space-between"
        }}
      >
        <button
          className="clear-button"
          onClick={() => removeFromCart(0, props.cart.length)}
        >
          CLEAR
        </button>
        <button
          className="checkout-button"
          onClick={() => props.history.push("/payment")}
        >
          CHECKOUT
        </button>
      </section>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default withRouter(connect(mapStateToProps)(Cart));
