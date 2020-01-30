import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import Axios from "axios";

import "./OneTransaction.scss";
import dateFormat from "dateformat";

class OneTransaction extends Component {
  constructor() {
    super();
    this.state = {
      transaction: []
    };
  }
  componentDidMount = () => {
    this.getOneTransaction();
  };
  getOneTransaction = () => {
    Axios.get(`/api/transactions/${this.props.match.params.t_id}`).then(res => {
      this.setState({ transaction: res.data });
      console.log(this.state.transaction);
    });
  };
  printContent = async el => {
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(el).innerHTML;
    document.body.innerHTML = printcontent;
    window.print();

    document.body.innerHTML = restorepage;

    this.props.history.push('/checkout')
    //  this.forceUpdate()

    window.location.reload();
  };
  render() {
    console.log(this.props);
    const { transaction } = this.state;
    return (
      <div className="one-transaction-container">
        <button
          className="print-button"
          onClick={() => this.printContent("receipt")}
        >
          Print
        </button>
        {transaction[0] ? (
          <div id="receipt" className="receipt-container">
            <div>Receipt #{transaction[0].t_id}</div>
            <div>
              Customer:{" "}
              {transaction[0].first_name.length > 0 ? (
                <div>
                  {transaction[0].first_name + " " + transaction[0].last_name}
                </div>
              ) : (
                "None"
              )}
            </div>
            <div>{dateFormat(transaction.t_date, "m/d/yy h:MM TT")}</div>
            <div className="all-receipt-items">
              {transaction.map((o, i) => {
                return (
                  <div className="receipt-item-and-price">
                    <span>{o.name}</span>
                    <span>${o.price}</span>
                  </div>
                );
              })}
            </div>
            <div className="subtotal-total-container">
              <span>
                Subtotal: $
                {transaction
                  .reduce((ac, cv) => {
                    return ac + parseInt(cv.price);
                  }, 0)
                  .toFixed(2)}
              </span>
              <span>
                Tax: $
                {(
                  +transaction[0].total -
                  transaction.reduce((ac, cv) => {
                    return ac + parseInt(cv.price);
                  }, 0)
                ).toFixed(2)}
              </span>
              <span>
                <strong>Total: ${transaction[0].total}</strong>
              </span>
            </div>
          </div>
        ) : (
          <span>loading...</span>
        )}
      </div>
    );
  }
}

export default withRouter(OneTransaction);
