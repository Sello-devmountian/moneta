import React,{useEffect, useState} from 'react'; 
import axios from 'axios'; 
import './checkout.css'
import {connect} from 'react-redux'
import {getProducts} from '../../../redux/reducers/productReducer'

// props.getProducts is the product reducer.

const Checkout = (props) => {
    const {products} = props.product
    // const [products, setProducts] = useState([])
    useEffect(
    () => {
        getAllProducts()
    }, [products.length]
    )
    let getAllProducts = () => {
        axios.get('/api/product')
        .then(res => props.getProducts(res.data))
        
    }
    console.log(props)
    return(
        <div className="all-products-container">
            {products[0] ? (
                products.map(p => {
              return (
              <div className='product-container'>
                  <span className='product-name'>{p.name}</span>
                  <img style={{width: '100px'}} src={p.p_image} alt=""/> 
                  <span>{p.price}</span>
              </div>
              )
            })
            ) : (
                <span>loading...</span>
            )
        }
            
        </div>
    )
}
const mapStateToProps = (reduxState) => {
   return reduxState
}
export default connect(mapStateToProps,{getProducts})(Checkout);