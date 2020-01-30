import React, {useState} from 'react';
import './cash.scss';
import useInput from '../../../../hooks/useInput';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {withRouter} from 'react-router-dom';

const Cash = (props) => {
    const [amount, setAmount] = useState('');

    const MySwal = withReactContent(Swal);

    let total = props.order.reduce((acc, b) => acc + (+b.price * 1.088), 0).toFixed(2);

    let transaction = () => {
        axios.post('/api/transactions/cash', {total}).then(res => {
            // props.history.push(`/transactions/${res.data.t_id}`)
            props.setResFn(res.data)
            props.clearCartFn()
        })
    }

    let customerChange = (amount, total) => {
        var Money = +amount - +total;
        let newTotal = (Money * 100);
        var Twenty = Math.floor(newTotal/2000);
        newTotal -= (2000*Twenty);
        var Ten = Math.floor(newTotal/1000);
        newTotal -= (1000*Ten);
        var Five = Math.floor(newTotal/500);
        newTotal -= (500*Five);
        var One = Math.floor(newTotal/100);
        newTotal -= (100*One);
        var Quarter = Math.floor(newTotal/25);
        newTotal -= (25*Quarter);
        var Dime = Math.floor(newTotal/10);
        newTotal -= (10*Dime);
        var Nickel = Math.floor(newTotal/5);
        newTotal -= (5*Nickel);
        var obj = {Money,Twenty,Ten,Five,One,Quarter,Dime,Nickel,Penny: Math.floor(newTotal)}
        let myChange = Object.keys(obj).filter(k=>obj[k]).reduce((o,k)=>{
            o[k] = obj[k];
            return o
        },{})
        transaction()
        props.togglePaidFn()
        setAmount('')
        props.clearCartFn()
        return (
            props.setChangeFn(myChange) 
        )
    }

    // let total = props.order.reduce((acc, b) => acc + (+b.price * 1.088), 0).toFixed(2);
    // console.log(typeof total)
    // console.log(change);
    return (
        <div id='cash-container'>
            <h1>Cash</h1>
            <form>
                <div className='payment-flex'>
                    <label>$</label>
                    <input 
                        value= {amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type='text'
                        placeholder='Amount'
                    />
                </div>
                <div className='payment-flex'>
                    <input 
                        value={`$${total}`}
                        placeholder='Total'
                        readOnly
                    />
                </div>
               <div className="form-actions">
                    <button 
                        className="payment-button"
                        onClick={() => customerChange(amount, total)}
                    >
                        PAY
                    </button>
                    <small>or</small>
                    <button onClick={props.toggleCashFn} className='payment-button'>CARD</button>
                    {/* <div>
                        {change}
                    </div> */}
                </div>
            </form>
        </div>
    )
}

export default withRouter(Cash);