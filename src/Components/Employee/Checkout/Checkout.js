import React,{useEffect, useState} from 'react'; 
import axios from 'axios'; 
import './checkout.css'
import {connect} from 'react-redux'
import {getProducts} from '../../../redux/reducers/productReducer'
import {getCart} from '../../../redux/reducers/cartReducer'
import Sidebar from './Sidebar/Sidebar'
import Cart from './Cart/Cart'

// props.getProducts is the product reducer.

const Checkout = (props) => {
    const {products} = props.product
    const [cart, setCart] = useState([])
    useEffect(
    () => {
        getAllProducts()
    }, [products.length]
    )
    useEffect( () => { console.log('cart updated', cart)}, 
     [cart.length]
    )
    let getAllProducts = () => {
        axios.get('/api/product')
        .then(res => props.getProducts(res.data))
    }

    const addToCart = (product) => {
        props.getCart([...props.cart.cart, product])
        console.log('hit')
        setCart([...cart, product])
        console.log(cart)
    }
    console.log(props)
    return(
        <div style={{paddingTop: '50px'}} className='checkout-container'>
        <Sidebar />
        <div className="all-products-container">
            {products[0] ? (
                products.map(p => {
              return (
              <div onClick={() => addToCart(p)} className='product-container'>
                  <img className ='product-image' src={p.p_image} alt=""/> 
                  <section className='product-text'>
                      <span className='product-name'>{p.name}</span>
                    <span>{p.price}</span>
                  </section>
                  
              </div>
              )
            })
            ) : (
                <span>loading...</span>
            )
        }
            
        </div>
        <Cart />
        </div>
    )
}
const mapStateToProps = (reduxState) => {
   return reduxState
}
export default connect(mapStateToProps,{getProducts, getCart})(Checkout);