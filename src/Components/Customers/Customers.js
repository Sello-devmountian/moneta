import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import {getCustomer} from '../../redux/reducers/customerReducer'; 
import {connect} from 'react-redux'; 
import  './customers.css'; 



const Customers = (props) => {
    const [editUser, setEditUser] = useState(false);
    //onClick={() => setEditUser(!editUser)}
    // {editUser ? () : ()}

    useEffect(() => {
        getCustomer()
    }, [])

    let getCustomer = () => {
        axios.get('/api/customer').then(res => {
            props.getCustomer(res.data)
        })
    }

   
    
    console.log(props); 
    console.log(useState); 
    return(
        <div className='customers-page'>
            <div className='customers-table'>
                
                <div>
                    <div className='table-info'>
                        Email
                    </div>
                    {props.customer.customer[0] && props.customer.customer.map(customers => {
                        return(
                            <div className='customer-info'>
                                <div>{customers.email}</div>
                            </div>
                        )
                    } )}
                </div>

               <div>
                    <div className='table-info'>
                        Phone Number
                    </div>
                    {props.customer.customer[0] && props.customer.customer.map(customers => {
                        return(
                            <div className='customer-info'>
                                <div>{customers.phone}</div>
                            </div>
                        )
                    } )}
                </div>

                <div>
                    <div className='table-info'>
                        First Name
                    </div>
                    {props.customer.customer[0] && props.customer.customer.map(customers => {
                        return(
                            <div className='customer-info'>
                                <div>{customers.first_name}</div>
                            </div>
                        )
                    } )}
                </div>

                <div>
                    <div className='table-info'>
                        Last Name
                    </div>
                    
                        {props.customer.customer[0] && props.customer.customer.map(customers => {
                            return(
                                <div className='customer-info'>
                                    <div>{customers.last_name}</div>
                                    
                                </div>
                                


                            )
                        } )}  
                </div>

                <div>
                    <div className='table-info'>
                        Edit
                    </div>
                    {props.customer.customer[0] && props.customer.customer.map(customers => {
                        return(
                            <div className='customer-info'>
                    <button className='edit-button' onClick={() => setEditUser(!editUser)}>Customer ID:{customers.c_id}</button>
                            </div>
                        )
                    } )}
                </div>
               
            </div>
           
        </div>
    ) 
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps, {getCustomer})(Customers);