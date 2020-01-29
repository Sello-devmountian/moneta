import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getTransactions } from "./../../redux/reducers/transactionsReducer";
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import dateFormat from "dateformat";
import Printer from "./OneTransaction/Printer";
import './Transactions.scss'

const Transactions = props => {
  
  // const idSort = (a, b) => b.t_id - a.t_id
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, selectTransaction] = useState();
  const [showOneTransaction, toggleShowOT] = useState(false);
  const [sorter, setSorter]  = useState({sorter: () => {}})
  const [defaultSort, toggleDefaultSort]  = useState(true)
  const [aToZ, toggleAToZ]  = useState(false)
  const [asc, toggleAsc]  = useState(false)
  const [isPaid, toggleIsPaid] = useState(false)
  useEffect(() => {
    getTransactions();
  }, []);
  console.log(transactions)
  useEffect(() => {
console.log('sorter', sorter)
  },[sorter])
  const getTransactions = () => {
    axios
      .get("/api/transactions")
      .then(res => {
        // props.getTransactions(res.data)
        setTransactions(res.data);
      })
      .catch(err => console.log(err));
  };
  console.log(props);
  return (
    <div className='whole-table'
     style={{ marginTop: "50px" }}>
      {showOneTransaction ? (
        <Printer transaction={selectedTransaction} />
      ) : (
        <Table striped bordered hover>
          {/* <div > */}
          <thead>
            <tr className='header-row'>
              <th
              
               onClick={() => {
                toggleDefaultSort(!defaultSort)
                setSorter({sorter: (a,b) => a.t_id - b.t_id})
                }}>ID</th>

              {/* onClick={() => {
                  // toggleDefaultSort(!defaultSort)
                 setSorter({sorter: (a,b) => a.t_id - b.t_id})
                }} */}
              <th onClick={() => {

                if(asc){
                  toggleDefaultSort(false)
                 setSorter({sorter: (a,b) => b.total - a.total}) 
                 toggleAsc(false)
                }  
                else {
                  toggleDefaultSort(false)
                 setSorter({sorter: (a,b) => a.total - b.total})
                 toggleAsc(true)
                }
                    
                  
                }}>Total</th>
              <th onClick={() => {
                if(isPaid){
                  toggleDefaultSort(false)
                 setSorter({sorter: (a,b) => b.paid - a.paid})
                }
                }}>Paid</th>
              <th onClick={() => {
                if(isPaid){
                  toggleDefaultSort(!defaultSort)
                 setSorter({sorter: (a,b) => a.t_id - b.t_id})
                 toggleIsPaid(false)
                } else {
                  toggleDefaultSort(!defaultSort)
                 setSorter({sorter: (a,b) => b.t_id - a.t_id})
                 toggleIsPaid(true)

                }
                  
                }}>Time</th>
              <th onClick={() => {
                  toggleDefaultSort(false)
                if(aToZ){
                  setSorter({sorter: function(a, b){
                  if(a.first_name.length > 0 && a.first_name < b.first_name) { return -1;}
                  if(a.first_name.length > 0 && a.first_name > b.first_name) { return 1; }
                  return 0;
              }})
                  toggleAToZ(false)
                } else {
                  setSorter({sorter: function(a, b){
                    if(a.first_name.length > 0 && b.first_name < a.first_name) { return -1;}
                    if(a.first_name.length > 0 && b.first_name > a.first_name) { return 1; }
                    return 0;
                }})
                  toggleAToZ(true)
                }

                
                }}>First Name</th>
              <th onClick={() => {
                  toggleDefaultSort(false)
                if(aToZ){
                  setSorter({sorter: function(a, b){
                  if(a.first_name.length > 0 && a.first_name < b.first_name) { return -1;}
                  if(a.first_name.length > 0 && a.first_name > b.first_name) { return 1; }
                  return 0;
              }})
                  toggleAToZ(false)
                } else {
                  setSorter({sorter: function(a, b){
                    if(a.first_name.length > 0 && b.first_name < a.first_name) { return -1;}
                    if(a.first_name.length > 0 && b.first_name > a.first_name) { return 1; }
                    return 0;
                }})
                  toggleAToZ(true)
                }

                
                }}>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions[0] &&
              transactions.sort(
                defaultSort ? (a, b) => b.t_id - a.t_id 
                :
                sorter.sorter
                )
                .map((t, i) => {
                  console.log(typeof t.t_date);
                  return (
                    <tr
                      onClick={() => {
                        // props.getTransactions(t.t_id)
                        // selectTransaction(t);
                        // toggleShowOT(true);
                        props.history.push(`/receipt/${t.t_id}`)
                      }}
                      key={i}
                    >
                      <td>{t.t_id}</td>
                      <td>${t.total}</td>
                      <td>{t.paid ? "True" : "False"}</td>
                      <td>{dateFormat(t.t_date, "m/d/yy h:MM TT")}</td>
                      <td>{t.first_name}</td>
                      <td>{t.last_name}</td>
                    </tr>
                  );
                })}
          </tbody>
          {/* </div> */}
        </Table>
      )}
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps, { getTransactions })(Transactions);
