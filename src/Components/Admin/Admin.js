import React from "react";
import { Link } from "react-router-dom";
import './admin.scss';

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="add-product">
        <Link to="/admin/addproduct">
          <span>add product</span>
        </Link>
      </div>

      <div className="edit-products">
        <Link to="/admin/editproducts">
          <span>edit products</span>
        </Link>
      </div>

      <div className="delete-product">
        <Link to="/admin/deleteproduct">
          <span>delete product</span>
        </Link>
      </div>

      <div className="add-employee">
        <Link to="/admin/addemployee">
          <span>add employee</span>
        </Link>
      </div>

      <div className="delete-employee">
        <Link to="/admin/deleteemployee">
          <span>delete employee</span>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
