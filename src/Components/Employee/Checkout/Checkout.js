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

  // const [addTransaction, toggleTransaction] = useState(true);
  // const [transaction, setTransaction] = useState({});
  // const [selectedProduct, setSelProd] = useState({});

  useEffect(() => {
    getAllProducts();
    // console.log(props);
  }, [products.length]);
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    // addToCart(selectedProduct)
    // getCart()
    console.log("cart updated", cart);
  }, [cart.length]);

  // useEffect(() => {
  //   console.log(addTransaction, transaction,selectedProduct);
  //   // addToCart(selectedProduct)
  // }, [addTransaction]);

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
        // console.log(res.data)
        setCart(res.data);
      })
      .catch(err => console.log(err));
  };

  // const checkTransaction = async product => {
  //   if (addTransaction) {
  //     axios
  //       .post("/api/transactions", { c_id: 1, total: 45, paid: false })
  //       .then(async res => {
  //        await setTransaction(res.data[0]);
  //         await toggleTransaction(false);
  //         addToCart(product);
  //       })
  //       .catch(err => console.log(err));
  //   } else {
  //      addToCart(product)
  //   }

  // };
  // const addToCart = product => {
  // console.log("hit 1");
  // axios
  //   .post("/api/co/cart", {
  //     t_id: transaction.t_id,
  //     c_id: 1,
  //     p_id: product.p_id,
  //     qty: 1
  //   })
  //   .then(res => console.log(res.data));
  // console.log("hit2");
  // };

  // const getCart = () => {
  //   axios
  //     .get(`/api/co/cart/1`)
  //     .then(res => setCart(res.data));
  // };

  return (
    <div style={{ paddingTop: "50px" }} className="checkout-container">
      <Sidebar />
      <div className="all-products-container">
        {products[0] ? (
          products.map((p, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  // setSelProd(p);
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
