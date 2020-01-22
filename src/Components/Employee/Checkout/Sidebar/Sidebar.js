import React from "react";
import { connect } from "react-redux";

const Sidebar = props => {
  
  return (
    <div className="sidebar-container">
      <section className='options-container'>
        <span className="sidebar-options" onClick={() => props.renderTypeFn('scoops')}>scoops</span>
        <span className="sidebar-options"  onClick={() => props.renderTypeFn('soft-serve')}>soft-serve</span>
        <span className="sidebar-options"  onClick={() => props.renderTypeFn('toppings')}>toppings</span>
        <span className="sidebar-options"  onClick={() => props.renderTypeFn('cones')}>cones</span>
      </section>
    </div>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps)(Sidebar);
