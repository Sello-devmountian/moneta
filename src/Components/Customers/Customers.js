import React, { useEffect } from 'react'; 
import axios from 'axios'; 
import {getCustomer} from '../../redux/reducers/customerReducer'; 
import {connect} from 'react-redux'; 



const Customers = (props) => {

    useEffect(() => {
        getCustomer()
    }, [])

    let getCustomer = () => {
        axios.get('/api/customer').then(res => {
            props.getCustomer(res.data)
        })
    }

    return(
        <div>This are Customers page</div>
    )
}

export default connect(null, {getCustomer})(Customers);