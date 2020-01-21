// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { connect } from "react-redux";
// import { getProducts } from "../../redux/reducers/productReducer";
// import useInput from "../../hooks/useInput";

// const ManageProducts = props => {
//   const { products } = props.product;

//   useEffect(() => {
//     getAllProducts();
//   }, [products.length]);

//   let getAllProducts = () => {
//       axios.get('api/admin/products')
//       .then(res => props.getProducts)
//   }

//   return (<div>
//       <div>
//           {products[0] ? (
//               products.map(p => {
//                   return (
//                       <div>

//                       </div>
//                   )
//               })
//           ) : (
//               <span>loading...</span>
//           )
//           }
//       </div>
//   </div>
    
    
//     )
// };

// const mapStateToProps = (reduxState) => {
//     return reduxState
// }

// export default connect(mapStateToProps, { getProducts }) (ManageProducts);
