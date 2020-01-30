import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import "./customers.css";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Customers = props => {
  const [editUser, setEditUser] = useState(false);
  const [sessCust, setSessCust] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");

  const MySwal = withReactContent(Swal);
  //onClick={() => setEditUser(!editUser)}
  // {editUser ? () : ()}

  useEffect(() => {
    getCustomer();
    getSessCustomer();
  }, [sessCust.c_id, props.customer.customer.length]);

  let clearInput = () => {
    setEmail("");
    setPhone("");
    setfirst_name("");
    setlast_name("");
  };

  let getCustomer = () => {
    axios.get("/api/customer").then(res => {
      props.getCustomer(res.data);
    });
  };

  let addCustomer = () => {
    axios
      .post("/api/customer", { email, phone, first_name, last_name })
      .then(res => {
        getCustomer();
        clearInput();
        MySwal.fire({
          icon: "success",
          title: "Customer Added"
        });
      });
  };

  let getSessCustomer = () => {
    axios.get("/api/customerSess").then(res => {
      setSessCust(res.data);
    });
  };

  let passId = c_id => {
    axios.get(`/api/customer/${c_id}`).then(res => {
      getSessCustomer(res.data);
      props.history.push('/checkout');
      //   console.log(c_id);
      //   console.log(res.data);
    });
  };

  //   console.log(props);
  //   console.log(editUser);
  console.clear();
  console.log(sessCust);
  return (
    <div style={{ marginTop: "60px" }}>
      {editUser ? (
        <div>
          EMAIL:{" "}
          <input
            className="customer-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></input>
          <br />
          PHONE:{" "}
          <input
            className="customer-input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          ></input>
          <br />
          FIRST NAME:{" "}
          <input
            className="customer-input"
            value={first_name}
            onChange={e => setfirst_name(e.target.value)}
          ></input>
          <br />
          LAST NAME:{" "}
          <input
            className="customer-input"
            value={last_name}
            onChange={e => setlast_name(e.target.value)}
          ></input>
          <br />
          <button
            onClick={() => {
              addCustomer();
              setEditUser(!editUser);
            }}
          >
            SAVE
          </button>
      
        </div>
      ) : (
        <button onClick={() => setEditUser(!editUser)}>ADD CUSTOMER</button>
      )}

      <Table style={{ marginTop: "50px" }} striped bordered hover>
        {/* <div > */}
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Add Customer to Order</th>
          </tr>
        </thead>
        <tbody>
          {props.customer.customer[0] &&
            props.customer.customer
              .sort((a, b) => a.t_id - b.t_id)
              .map((t, i) => {
                console.log(typeof t.t_date);
                return (
                  <tr
                    key={i}
                    onDoubleClick={() =>
                      props.history.push(`/customers/${t.c_id}`)
                    }
                  >
                    {/* <td onDoubleClick={() => props.history.push(`/customers/${t.c_id}`)}>}Customer ID:{t.c_id}</td> */}
                    <td>{t.email}</td>
                    <td>{t.phone}</td>
                    <td>{t.first_name}</td>
                    <td>{t.last_name}</td>
                    <td>
                      <button onClick={() => passId(t.c_id)}>Add To Order</button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
        {/* </div> */}
      </Table>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { getCustomer })(Customers);
