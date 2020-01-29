import React from "react";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./admin.scss";

const Admin = (props) => {
  
  if (!props.employee.employee.is_admin) {
    return <Redirect from='/admin' to='/' />
}

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

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(Admin);
