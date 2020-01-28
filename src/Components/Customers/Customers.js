import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'; 
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import "./customers.css";
import {Table} from 'react-bootstrap'; 

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



//   console.log(props);
//   console.log(editUser); 
  console.clear(); 
  console.log(sessCust); 
  return (
    <Table style={{ marginTop: "50px"}} striped bordered hover  >
      {/* <div > */}
      <thead>
        <tr>
          <th>Email</th>
          <th>Phone</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>We don't talk about this button</th>
        </tr>
      </thead>
      <tbody>
        {props.customer.customer[0] &&
          props.customer.customer.sort((a,b) => b.t_id - a.t_id ).map((t, i) => {
            console.log(typeof t.t_date)
            return (
              <tr key={i} onDoubleClick={() => props.history.push(`/customers/${t.c_id}`)}>
                
                {/* <td onDoubleClick={() => props.history.push(`/customers/${t.c_id}`)}>}Customer ID:{t.c_id}</td> */}
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td>{t.first_name}</td>
                <td>{t.last_name}</td>
                <td><button onClick={() => passId(t.c_id)}>CLICK ME!</button></td>
              </tr>
            );
          })}
      </tbody>
      {/* </div> */}
    </Table>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { getCustomer })(Customers);
