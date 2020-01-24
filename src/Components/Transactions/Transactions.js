import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import dateFormat from 'dateformat'

const Transactions = props => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions();
  }, []);
  const getTransactions = () => {
    axios
    .get("/api/transactions")
    .then(res => setTransactions(res.data))
    .catch(err => console.log(err));
  };
  console.log(transactions)
  return (
    <Table style={{ marginTop: "50px" }} striped bordered hover  >
      {/* <div > */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Time</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {transactions[0] &&
          transactions.map((t, i) => {
            console.log(typeof t.t_date)
            return (
              <tr key={i}>
                <td>{t.t_id}</td>
            <td>{t.total}</td>
            <td>{t.paid ? 'True' : 'False'}</td>
                <td>{dateFormat(t.t_date, 'm/d/yy h:MM TT')}</td>
                <td>{t.first_name}</td>
                <td>{t.last_name}</td>
              </tr>
            );
          })}
      </tbody>
      {/* </div> */}
    </Table>
  );
};
export default Transactions;
