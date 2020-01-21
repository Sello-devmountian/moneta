import React, {Component} from 'react';
import 'react-credit-cards/lib/styles.scss';
import './payment.scss';
import Cards from 'react-credit-cards';

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
            formData: null
        }
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
        const formData = [...e.target.elements]
          .filter(d => d.name)
          .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
          }, {});
    
        this.setState({ formData });
        this.form.reset();
      };
    

    render(){
        const {formData} = this.state;
        return (
            <div style={{margin: '100px'}} id='PaymentForm'>
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
                </form>
                {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
            </div>
          )}
          <Cards 
                style={{height: '200px'}}
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focused}
                name={this.state.name}
                number={this.state.number}
            />
            </div>
        )
    }
}

export default Payment;