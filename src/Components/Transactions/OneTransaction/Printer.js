import React, { useState, useEffect, useRef, Component } from "react";
import ReactToPrint from "react-to-print";
import OneTransaction from './OneTransaction.js'
import { render } from "react-dom";


export class Printer extends Component {
    render() {
      return (
        <div style={{ marginTop: "50px" }}>
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => this.componentRef}
          />
          <OneTransaction transaction={this.props.transaction} ref={el => (this.componentRef = el)} />
        </div>
      );
    }
  }
  
  
  export default Printer;