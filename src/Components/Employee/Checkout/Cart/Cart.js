import React,{useEffect, useState} from 'react'; 
import { connect } from "react-redux";
import Axios from 'axios';


const Cart = props => {
  useEffect(
    
    () => {},
  []
  )
  
  const getCart = () => {
    Axios.get('/api/co/cart').then(
      res => console.log(props.cart)
    )
    
  }
console.log(props.cart)
console.log('emp', props.employee)
  return (
    <div className="cart-container">
      <section className="cart-items">
        {props.cart.map((item,i) => {
          return (
            <div key={i}>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
            // console.log('hit', item)
          )
        })
        
        }
        
      </section>
<span>Total: {props.cart[0] && props.cart.reduce((acc, b) => acc + +b.price
,0).toFixed(2)}</span>
      <section>
        discount code
        <input type="text" />
        <button onClick={() => getCart()}>Submit</button>
      </section>
      <button>Checkout</button>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps)(Cart);
