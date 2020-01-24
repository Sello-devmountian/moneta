import React from 'react';  
import {Link} from 'react-router-dom'; 
import './header.css'
import Axios from 'axios';


const Header = (props) => {
    const logout = () => {
        Axios.post('/api/auth/logout')
    }

    return(
        <header className='nav-bar'>
            <div className='nav-buttons'>
                <Link className='nav-button' to='/checkout'>Checkout</Link>
                <Link className='nav-button' to='/customers'>Customers</Link>
                <Link className='nav-button' to='/transactions'>Transactions</Link>
                <Link onClick={logout} className='nav-button' to='/'>Log Out</Link>
            </div>
        </header>
    )
}

export default Header; 


//