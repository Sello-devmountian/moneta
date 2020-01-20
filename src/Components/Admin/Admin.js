import React, { Component } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className='admin-'>
      <div className='add-product'><span>add product</span></div>
      <div className='edit-products'><span>edit products</span></div>
      <div className='delete-product'><span>delete product</span></div>
      <div className='add-employee'><span>add employee</span></div>
      <div className='delete-employee'><span>delete employee</span></div>
    </div>
  );
};
