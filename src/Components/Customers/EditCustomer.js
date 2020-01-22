import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import "./customers.css";


const EditCustomer = props => {
    console.log('your still a mook')
    let [currentCustomer] = props.customer.customer.filter( ele => +ele.c_id === +props.match.params.c_id)
    console.log(props); 
    console.log(currentCustomer)
    return(
        <div className='customers-page'>
            <div>
                EMAIL: <input className='customer-input' value={currentCustomer.email}></input><br/>
                PHONE: <input className='customer-input' value={currentCustomer.phone}></input><br/>
                F-NAME: <input className='customer-input' value={currentCustomer.first_name}></input><br/>
                L-NAME: <input className='customer-input' value={currentCustomer.last_name}></input>
            </div>   

           <button>SAVE DA CHANGES</button>
        </div>

    )
}

const mapStateToProps = reduxState => {
    return reduxState;
  };

export default withRouter(connect(mapStateToProps, {getCustomer})(EditCustomer))