import React from "react";
import { connect } from "react-redux";

const Sidebar = props => {
  return (
    <div className="sidebar-container">
      <section className='options-container'>
        <span className="sidebar-options">scoops</span>
        <span className="sidebar-options">soft-serve</span>
        <span className="sidebar-options">toppings</span>
        <span className="sidebar-options">cones</span>
      </section>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps)(Sidebar);
