import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCustomer } from "../../redux/reducers/customerReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./customers.scss";
import { Table } from "react-bootstrap";
import dateFormat from "dateformat";
// import Printer from "../Transactions/OneTransaction/Printer";

const EditCustomer = props => {
  const [editUser, setEditUser] = useState(false);
  let [currentCustomer] = props.customer.customer.filter(
    ele => +ele.c_id === +props.match.params.c_id
  );
  const [email, setEmail] = useState(currentCustomer.email);
  const [phone, setPhone] = useState(currentCustomer.phone);
  const [first_name, setfirst_name] = useState(currentCustomer.first_name);
  const [last_name, setlast_name] = useState(currentCustomer.last_name);
  console.log(email);
  const [transactions, setTransactions] = useState([]);
  const [sorter, setSorter] = useState({ sorter: () => {} });
  const [defaultSort, toggleDefaultSort] = useState(true);
  const [asc, toggleAsc] = useState(false);
  const [isPaid, toggleIsPaid] = useState(false);
  useEffect(() => {
    getTransactions();
  }, []);
  console.log(transactions);
  useEffect(() => {
    console.log("sorter", sorter);
  }, [sorter]);
  const getTransactions = () => {
    axios
      .get(`/api/transactions/customer/${props.match.params.c_id}`)
      .then(res => {
        setTransactions(res.data);
      })
      .catch(err => console.log(err));
  };

  let editCustomer = () => {
    axios
      .put(`/api/customer/${props.match.params.c_id}`, {
        email,
        phone,
        first_name,
        last_name
      })
      .then(res => {
        props.history.push("/customers");
      });
  };

  console.log(props);
  return (
    <div className="customers-page">
      {editUser ? (
        <div className="edit-form">
          <div className="form-row">
            <span>EMAIL: </span>{" "}
            <input
              className="customer-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-row">
            <span>PHONE:</span>{" "}
            <input
              className="customer-input"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="form-row">
            <span>FIRST NAME:</span>{" "}
            <input
              className="customer-input"
              value={first_name}
              onChange={e => setfirst_name(e.target.value)}
            ></input>
          </div>
          <div className="form-row">
            <span>LAST NAME:</span>{" "}
            <input
              className="customer-input"
              value={last_name}
              onChange={e => setlast_name(e.target.value)}
            ></input>
          </div>
          <button className="save-button" onClick={() => editCustomer()}>
            SAVE EDIT
          </button>
        </div>
      ) : (
        <button
          className="edit-customer-button"
          onClick={() => setEditUser(!editUser)}
        >
          EDIT CUSTOMER
        </button>
      )}
      <div className="whole-table" >
        <Table  striped bordered hover>
          <thead>
            <tr className="header-row">
              <th
                onClick={() => {
                  toggleDefaultSort(!defaultSort);
                  setSorter({ sorter: (a, b) => a.t_id - b.t_id });
                }}
              >
                ID
              </th>

              <th
                onClick={() => {
                  if (asc) {
                    toggleDefaultSort(false);
                    setSorter({ sorter: (a, b) => b.total - a.total });
                    toggleAsc(false);
                  } else {
                    toggleDefaultSort(false);
                    setSorter({ sorter: (a, b) => a.total - b.total });
                    toggleAsc(true);
                  }
                }}
              >
                Total
              </th>
              <th
                onClick={() => {
                  if (isPaid) {
                    toggleDefaultSort(false);
                    setSorter({ sorter: (a, b) => b.paid - a.paid });
                  }
                }}
              >
                Paid
              </th>
              <th
                onClick={() => {
                  if (isPaid) {
                    toggleDefaultSort(!defaultSort);
                    setSorter({ sorter: (a, b) => a.t_id - b.t_id });
                    toggleIsPaid(false);
                  } else {
                    toggleDefaultSort(!defaultSort);
                    setSorter({ sorter: (a, b) => b.t_id - a.t_id });
                    toggleIsPaid(true);
                  }
                }}
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions[0] &&
              transactions
                .sort(defaultSort ? (a, b) => b.t_id - a.t_id : sorter.sorter)
                .map((t, i) => {
                  console.log(typeof t.t_date);
                  return (
                    <tr
                      onClick={() => {
                        props.history.push(`/transactions/${t.t_id}`);
                      }}
                      key={i}
                    >
                      <td>{t.t_id}</td>
                      <td>${t.total}</td>
                      <td>{t.paid ? "True" : "False"}</td>
                      <td>{dateFormat(t.t_date, "m/d/yy h:MM TT")}</td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default withRouter(
  connect(mapStateToProps, { getCustomer })(EditCustomer)
);
