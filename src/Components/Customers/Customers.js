import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'; 
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import "./customers.css";

const Customers = props => {
  const [sessCust, setSessCust] = useState({}) ;
  //onClick={() => setEditUser(!editUser)}
  // {editUser ? () : ()}

  useEffect(() => {
    getCustomer();
    getSessCustomer()
  }, [sessCust.c_id]);

  let getCustomer = () => {
    axios.get("/api/customer").then(res => {
      props.getCustomer(res.data);
    });
  };

  let getSessCustomer = () => {
      axios.get('/api/customerSess').then(res => {
          setSessCust(res.data); 
      })
  }

  let passId = (c_id) => {
      axios.get(`/api/customer/${c_id}`).then(res => {
          getSessCustomer(res.data); 
        //   console.log(c_id); 
        //   console.log(res.data); 
      });
  }

  let email = props.customer.customer.length
    ? props.customer.customer.map((el, index) => <div className='customer-info' >{el.email}</div>)
    : null; 
  let phone = props.customer.customer.length
    ? props.customer.customer.map((el, index) => <div className='customer-info'>{el.phone}</div>)
    : null;
  let first_name = props.customer.customer.length
    ? props.customer.customer.map((el, index) => <div className='customer-info'>{el.first_name}</div>)
    : null;
  let last_name = props.customer.customer.length
    ? props.customer.customer.map((el, index) => <div className='customer-info'>{el.last_name}</div>)
    : null;
  let editButton = props.customer.customer.length
    ? props.customer.customer.map((el, index) => <Link to={`/customers/${el.c_id}`}><button className='customer-info'>Customer ID:{el.c_id}</button></Link>)
    : null;
    let anotherButton = props.customer.customer.length ? props.customer.customer.map((el, index) => <button className='customer-info' onClick={() => passId(el.c_id)}>CLICK ME! {el.c_id}</button>): null; 

//   console.log(props);
//   console.log(editUser); 
  console.clear(); 
  console.log(sessCust); 
  return (
    <div className="customers-page">
      <div className="customers-table">
        <div>
          <div className="table-info">Email</div>
            <div>
                {email}
            </div>
        </div>

        <div>
          <div className="table-info">Phone Number</div>
             <div>
                {phone}
             </div>
        </div>

        <div>
          <div className="table-info">First Name</div>
             <div>
                 {first_name}
             </div>
        </div>

        <div>
          <div className="table-info">Last Name</div>
            <div>
                {last_name}
            </div>
        </div>

        <div>
          <div className="table-info">Edit</div>
            <div>
                {editButton}
            </div>
        </div>

        <div>
          <div className="table-info">Last Name</div>
            <div>
                {anotherButton}
            </div>
        </div>

      </div>

      


    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { getCustomer })(Customers);
