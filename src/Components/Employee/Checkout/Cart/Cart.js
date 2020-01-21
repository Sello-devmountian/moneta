import React from "react";
import { connect } from "react-redux";

const Cart = props => {
  return (
    <div className="cart-container">
      <section className='cart-items'>
        <div>cart items</div>
        <span>cart items</span>
        <span>cart items</span>
        <span>cart items</span>
        <span>cart items</span>
      </section>
      <section>
          discount code          
          <input type="text"/><button>Submit</button>
      </section>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps)(Cart);
