import React from 'react';
import './cash.scss';
import useInput from '../../../../hooks/useInput';

const Cash = () => {
    const [amount, bindAmount, resetAmount] = useInput('');



    return (
        <div id='cash-container'>
            <h1>Cash</h1>
            <form>
                <div className='payment-flex'>
                    <input 
                        {...bindAmount}
                        type='text'
                        placeholder='Amount'
                    />
                </div>
                <div className='payment-flex'>
                    <input 
                        // value={props.total}
                        placeholder='Total'
                    />
                </div>
               <div className="form-actions">
                    <button className="payment-button">PAY</button>
                </div>
            </form>
        </div>
    )
}

export default Cash;