import React, {useState, useEffect} from 'react';
import './payment.scss';
import Cash from './Cash/Cash';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {injectStripe, CardElement} from 'react-stripe-elements';
import Flip from 'react-reveal/Flip';

const MySwal = withReactContent(Swal);

const Payment = (props) => {
    const [order, setOrder] = useState([]);
    const [orderChange, setOrderChange] = useState({});
    const [cash, setCash] = useState(false);
    const [cashPaid, setCashPaid] = useState(false);
    const [response, setResponse] = useState({});

    useEffect(() => {
        axios.get('/api/co/cart').then(res => {
            setOrder(res.data)
        })
    }, [order.length])

    let submit = async (e) => {
        let token = await props.stripe.createToken({name: 'Name'});
        let total = order.reduce((acc, b) => acc + (+b.price * 1.088), 0).toFixed(2)
        axios.post('/api/transactions', {total, token}).then(res => {
            // console.log(res.data.status)
            if(res.data){
                axios.post('/api/email').then(res => console.log('email sent'))
                props.history.push(`/transactions/${res.data.t_id}`)
                MySwal.fire({
                    icon: 'success',
                    title: 'Congrats...',
                    text: 'Order completed'
                })
                clearCart()
            }
        })
    }

     let clearCart = () => {
        axios.delete('/api/co/cart').then(res => {
            setOrder(res.data)
        })
    }

      let setChange = (obj) => {
          setOrderChange(obj)
      }

      let setId = (obj) => {
        setResponse(obj)
      }
    
      
    let toggleCash = () => {
        setCash(!cash)
      }

    let togglePaid = () => {
          setCashPaid(!cashPaid)
          setCash(false)
      }

    let changeCounted = () => {
        props.history.push(`/transactions/${response.t_id}`)
        setCashPaid(false)
        // setOrderChange({})
      }

    //   console.log(props.stripe)
    
        return (
            <div style={{margin: '100px'}} id='PaymentForm'>
                {cash ? (
                    <Flip left duration={1000}>
                    <Cash cash={cash} 
                        toggleCashFn={toggleCash} 
                        togglePaidFn={togglePaid} 
                        setChangeFn={setChange} 
                        setResFn={setId}
                        order={order}
                        clearCartFn={clearCart}
                    />
                    </Flip>
                ) : (
                    <>
                    <Flip left duration={1000}>
                    <div className='card-container'>
                        <h1>Card</h1>
                        <CardElement/>
                        <div className="actions">
                            <button onClick={submit} className='payment-button'>PAY</button>
                            <small>or</small>
                            <button onClick={toggleCash} className='payment-button'>CASH</button>
                        </div>
                    </div>
                    </Flip>
                    </>
                )}
                <div className='cart-payment'>
                    <h1 style={{color: '#232323', fontSize: '40px', fontWeight: 'bold'}}>
                        Order
                    </h1>
                   <div id='order-container'>
                        {order[0] && order.map((item, i) => {
                            return (
                                <div key={i} className='orders'>
                                    <span>{item.name}</span>
                                    <span>{item.price}</span>
                                </div>
                            )
                        })}
                        <span style={{color: '#232323', fontSize: '20px'}}>
                            Subtotal: ${" "}
                            {order[0] &&
                            order.reduce((acc, b) => acc + (+b.price), 0).toFixed(2)}
                        </span>
                        <span style={{color: '#232323', fontSize: '20px'}}>
                            Tax: ${" "}
                            {order[0] &&
                            order.reduce((acc, b) => acc + (+b.price * 0.088), 0).toFixed(2)}
                        </span>
                        <span style={{color: '#232323', fontSize: '20px', fontWeight: 'bold'}}>
                            Total: ${" "}
                            {order[0] &&
                            order.reduce((acc, b) => acc + (+b.price * 1.088), 0).toFixed(2)}
                        </span>
                   </div>
                   <button onClick={() => props.history.goBack()}>GO BACK</button>
                </div>
                {cashPaid ? (
                    <div id="change-display">
                        <span>
                          <div className='change-flex'>
                          <div>
                                  <p>Change:{' '}</p>
                                  <p>${+orderChange.Money.toFixed(2)}</p>

                              </div>
                              <div>
                                  <p>Twenty:{' '}</p>
                                  <p>{orderChange.Twenty}</p>
                              </div>
                              <div>
                                  <p>Ten:{' '}</p>
                                  <p>{orderChange.Ten}</p>
                              </div>
                              <div>
                                  <p>Five:{' '}</p>
                                  <p>{orderChange.Five}</p>
                              </div>
                              <div>
                                  <p>One:{' '}</p>
                                  <p>{orderChange.One}</p>
                              </div>
                              <div>
                                  <p>Quarter:{' '}</p>
                                  <p>{orderChange.Quarter}</p>
                              </div>
                              <div>
                                  <p>Dime:{' '}</p>
                                  <p>{orderChange.Dime}</p>
                              </div>
                              <div>
                                  <p>Nickel:{' '}</p>
                                  <p>{orderChange.Nickel}</p>
                              </div>
                              <div>
                                  <p>Penny:{' '}</p>
                                  <p>{orderChange.Penny}</p>
                              </div>
                          </div>
                          <button onClick={() => changeCounted()}>Okay</button>
                        </span>
                    </div>
                ) : null }
            </div>
        )
    
}

export default injectStripe(Payment);