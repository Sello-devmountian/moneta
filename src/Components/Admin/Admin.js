import React from "react";
import { Link } from "react-router-dom";
import './admin.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="add-product">
        <Link to="/addproduct">
          <span>add product</span>
        </Link>
      </div>

      <div className="edit-products">
        <Link to="/editproducts">
          <span>edit products</span>
        </Link>
      </div>

      <div className="delete-product">
        <Link to="/deleteproduct">
          <span>delete product</span>
        </Link>
      </div>

      <div className="add-employee">
        <Link to="/addemployee">
          <span>add employee</span>
        </Link>
      </div>

      <div className="delete-employee">
        <Link to="/deleteemployee">
          <span>delete employee</span>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
