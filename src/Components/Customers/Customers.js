import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import "./customers.css";

const Customers = props => {
  const [editUser, setEditUser] = useState(false);
  //onClick={() => setEditUser(!editUser)}
  // {editUser ? () : ()}

  useEffect(() => {
    getCustomer();
  }, []);

  let getCustomer = () => {
    axios.get("/api/customer").then(res => {
      props.getCustomer(res.data);
    });
  };

  let email = props.customer.customer.length
    ? props.customer.customer.map((el, i) => <div className='customer-info'>{el.email}</div>)
    : null;
  let phone = props.customer.customer.length
    ? props.customer.customer.map((el, i) => <div className='customer-info'>{el.phone}</div>)
    : null;
  let first_name = props.customer.customer.length
    ? props.customer.customer.map((el, i) => <div className='customer-info'>{el.first_name}</div>)
    : null;
  let last_name = props.customer.customer.length
    ? props.customer.customer.map((el, i) => <div className='customer-info'>{el.last_name}</div>)
    : null;
  let extra = props.customer.customer.length
    ? props.customer.customer.map((el, i) => <button className='customer-info'>Customer ID:{el.c_id}</button>)
    : null;

  console.log(props);
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
                {extra}
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
