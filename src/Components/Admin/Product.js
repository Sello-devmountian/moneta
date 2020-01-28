import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../redux/reducers/productReducer";
import "./product.scss";

const Product = props => {
  const [edit, isEditing] = useState(false);

  const [name, setName] = useState("");
  const [p_image, setP_image] = useState("");
  const [price, setPrice] = useState("");
  const [p_type, setType] = useState("");
  const [editItem, setEditItem] = useState({});
  const [available, bindAvailable] = useState(false);


  const { products } = props.product;

  useEffect(() => {
    setName(editItem.name);
    setP_image(editItem.p_image);
    setPrice(editItem.price);
    setType(editItem.p_type);
  }, [editItem.name, editItem.p_image, editItem.price, editItem.p_type]);

  let select = i => {
    setEditItem(i);
    isEditing(!edit);
  };

  let handleSave = () => {
    const { p_id } = editItem;
    props.editProduct(p_id, { name, p_image, price, p_type, available: true });
    cancel();
  };


  let cancel = () => {
    setName("");
    setP_image("");
    setPrice("");
    setType("");
    isEditing(false);
    setEditItem({});
  };

  return (
    <div>
      {!edit ? (
        <div>
            <div className="product-labels-box">
<label className='product-labels'>product name</label>
              <span>{props.p.name}</span>
<label className='product-labels'>product price</label>
       
              <span>${props.p.price} </span>
<label className='product-labels'>product type</label>
       
              <span>{props.p.p_type}</span>
<label className='product-labels'>product available</label>
       
              <span>{props.p.available ? 'true' : 'false'}</span>
              </div>

<div className='edit-btn-box'>

        <div className="edit-product-btn" onClick={() => select(props.p)}>
          edit product
        </div>
</div>
        </div>
      ) : (
        //  <div
        //     onClick={() =>
        //       props.deleteProduct(
        //         props.p,
        //         window.confirm(
        //           "Are you sure you would like to delete this product?"
        //         )
        //       ) && props.deleteProduct(props.p)
        //     }
        //   >
        //     Delete Product
        //   </div>

        <div>
          <input
            className="edit-product-name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <input
            className="edit-product-img"
            onChange={e => setP_image(e.target.value)}
            value={p_image}
          />
          <input
            className="edit-product-price"
            onChange={e => setPrice(e.target.value)}
            value={price}
          />

          <select
            onChange={e => setType(e.target.value)}
            className="product-type-dropdown"
            value={p_type}
          >
            <option value="scoops">scoops</option>
            <option value="soft-serve">soft-serve</option>
            <option value="toppings">toppings</option>
            <option value="cones">cones</option>
          </select>

          <label className='new-product-availability' htmlFor='available'>product available</label>
          <input 
        onChange={() => bindAvailable(true)} 
        type='checkbox'
        value='available'
      />

          <div className="save-cancel-btns">
            <div
              className="save-edits-btn"
              onClick={() => {
                handleSave();
              }}
            >
              save edits
            </div>

            <div className="cancel-edits-btn" onClick={() => cancel()}>
              cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { getProducts })(Product);
