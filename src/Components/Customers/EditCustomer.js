import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import "./customers.css";


const EditCustomer = props => {
    const [editUser, setEditUser] = useState(false);
    let [currentCustomer] = props.customer.customer.filter( ele => +ele.c_id === +props.match.params.c_id)
    const [email, setEmail] = useState(currentCustomer.email)
    const [phone, setPhone] = useState(currentCustomer.phone)
    const [first_name, setfirst_name] = useState(currentCustomer.first_name)
    const [last_name, setlast_name] = useState(currentCustomer.last_name)
    console.log(email); 
    

    let editCustomer = () => {
        axios.put(`/api/customer/${props.match.params.c_id}`, {email, phone, first_name, last_name}).then(res => {
            props.history.push('/customers')
        })
    }

    console.log(props)
    return(
        <div className='customers-page'>
            {editUser ? ( <div>

                <div>
                EMAIL: <input className='customer-input' value={email} onChange={(e) => setEmail(e.target.value)}></input><br/>
                PHONE: <input className='customer-input' value={phone} onChange={(e) => setPhone(e.target.value)} ></input><br/>
                F-NAME: <input className='customer-input' value={first_name} onChange={(e) => setfirst_name(e.target.value)}></input><br/>
                L-NAME: <input className='customer-input' value={last_name} onChange={(e) => setlast_name(e.target.value)}></input>
                </div>
                <button onClick={() => editCustomer()}>SAVE DA CHANGES</button>
            </div>   ): (<button onClick={() => setEditUser(!editUser)}>PRESS ME... MAKE MY DAY</button>)}
           

           
        </div>

    )
}

const mapStateToProps = reduxState => {
    return reduxState;
  };

export default withRouter(connect(mapStateToProps, {getCustomer})(EditCustomer))