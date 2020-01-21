import React from "react";
import { Link } from "react-router-dom";
import "./admin.scss";

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="product-management-div">
        <Link to="/admin/addproduct">
          <div className="add-product">add product</div>
        </Link>

        <Link to="/admin/manageproducts">
          <div className="manage-products">manage products</div>
        </Link>
      </div>

      <div className="employee-management-div">
        <Link to="/admin/addemployee">
          <div className="add-employee">add employee</div>
        </Link>

        <Link to="/admin/deleteemployee">
          <div className="delete-employee">delete employee</div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
