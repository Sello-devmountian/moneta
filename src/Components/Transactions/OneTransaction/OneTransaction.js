import React,{useState, useEffect,useRef} from 'react';

import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {render} from 'react-dom'
import ReactToPrint from 'react-to-print';





const OneTransaction = (props) => {
    const [transaction, setTransaction] = useState([])
    const componentRef = useRef();
    useEffect(() => {
        getOneTransaction()
    }, [])
    console.log(props)
   const  getOneTransaction = () => {
        Axios.get(`/api/transactions/${+props.match.params.t_id}`)
        .then(res => setTransaction(res.data))
    }
    console.log(transaction)
    return (
        <div style={{marginTop: '50px'}}>
        <div>{transaction[0] && transaction[0].t_id}</div>
        <span>{transaction[0] && transaction[0].first_name} {transaction[0] && transaction[0].last_name}</span>
        {transaction[0] && transaction.map((o,i) => {
            return (
                <div>
                    <span>{o.name}</span>
                    <span>{o.price}</span>
                </div>
            )
        })}
         <div>
        {/* <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <OneTransaction ref={componentRef} /> */}
      </div>
        </div>
    )
     
}

// export const Example = () => {
//     const componentRef = useRef();
//     return (
//       <div>
//         <ReactToPrint
//           trigger={() => <button>Print this out!</button>}
//           content={() => componentRef.current}
//         />
//         <OneTransaction ref={componentRef} />
//       </div>
//     );
//   };

export default withRouter(OneTransaction);