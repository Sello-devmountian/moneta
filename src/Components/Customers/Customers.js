import React, { useEffect } from 'react'; 
import axios from 'axios'; 
import {getCustomer} from '../../redux/reducers/customerReducer'; 
import {connect} from 'react-redux'; 
import  './customers.css'; 



const Customers = (props) => {

    useEffect(() => {
        getCustomer()
    }, [])

    let getCustomer = () => {
        axios.get('/api/customer').then(res => {
            props.getCustomer(res.data)
        })
    }
    
    console.log(props.customer); 
    return(
        <div className='customers-page'>
            <div>
               {props.customer.customer[0] && props.customer.customer.map(customers => {
                   return(
                       <div className='customers-table'>
                           <div>{customers.email}</div>
                           <div>{customers.phone}</div>
                           <div>{customers.first_name}</div>
                           <div>{customers.last_name}</div>
                       </div>
                   )
               } )}
            </div>
           
        </div>
    ) 
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps, {getCustomer})(Customers);