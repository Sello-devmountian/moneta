import React, {Component} from 'react';
import 'react-credit-cards/lib/styles.scss';
import './payment.scss';
import Cards from 'react-credit-cards';
import Cash from './Cash/Cash';
import {connect} from 'react-redux';
import axios from 'axios';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from './utils/utils';

class Payment extends Component {
    constructor(){
        super();
        this.state = {
            cvc: '',
            expiry: '',
            focused: '',
            name: '',
            number: '',
            issuer: '',
            formData: null,
            cash: false,
            order: []
        }
    }

    componentDidMount(){
        axios.get('/api/co/cart').then(res => {
            this.setState({
                order: res.data
            })
        })
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      };
    
      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };
    
      handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
          target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
          target.value = formatCVC(target.value);
        }
    
        this.setState({ [target.name]: target.value });
      };
    
      handleSubmit = e => {
        e.preventDefault();
        // const formData = [...e.target.elements]
        //   .filter(d => d.name)
        //   .reduce((acc, d) => {
        //     acc[d.name] = d.value;
        //     return acc;
        //   }, {});
    
        // this.setState({ formData });
        // this.form.reset();
        
      };

      toggleCash = () => {
        this.setState({
            cash: !this.state.cash
        })
      }
    

    render(){
        const {formData, cash} = this.state;
        // console.log(this.props.employee.employee)
        // console.log(req.session.user)


        return (
            <div style={{margin: '100px'}} id='PaymentForm'>
                {cash ? (
                    <>
                    <Cash cash={cash} toggleCashFn={this.toggleCash}/>
                    </>
                ) : (
                    <div className='card-container'>
                <h1>Card</h1>
                    <Cards 
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focused}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <form onSubmit={this.handleSubmit}>
                        <div className='payment-flex'>
                            <input 
                                type='tel'
                                name='number'
                                placeholder='Card Number'
                                pattern='[\d| ]{16,22}'
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className='payment-flex'>
                            <input 
                                type='text'
                                name='name'
                                placeholder='Name'
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <input 
                                    type='tel'
                                    name='expiry'
                                    placeholder='Valid Thru'
                                    pattern='\d\d/\d\d' 
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className='col-6'>
                                <input 
                                    type='tel'
                                    name='cvc'
                                    placeholder='CVC'
                                    pattern='\d{3,4}'
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type='hidden' name='issuer' value={this.state.issuer}/>
                        <div className="form-actions">
                            <button className="payment-button">PAY</button>
                            <small>or</small>
                            <button onClick={this.toggleCash} className='payment-button'>CASH</button>
                        </div>
                    </form>
                    {/* {formData && (
                        <div className="App-highlight">
                            {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
                        </div>
                    )} */}
                </div>
                )}
                <div className='cart-payment'>
                    <h1 style={{color: '#232323', fontSize: '40px', fontWeight: 'bold'}}>
                        Order
                    </h1>
                   <div id='order-container'>
                        {this.state.order[0] && this.state.order.map((item, i) => {
                            return (
                                <div key={i} className='orders'>
                                    <span>{item.name}</span>
                                    <span>{item.price}</span>
                                </div>
                            )
                        })}
                        <span style={{color: '#232323', fontSize: '20px', fontWeight: 'bold'}}>
                            Total: ${" "}
                            {this.state.order[0] &&
                            this.state.order.reduce((acc, b) => acc + +b.price, 0).toFixed(2)}
                        </span>
                   </div>
                   <button onClick={() => this.props.history.goBack()}>GO BACK</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        employee: reduxState.employee
    }
}

export default connect(mapStateToProps)(Payment);