import React from 'react';  
import {Link} from 'react-router-dom'; 
import './header.css'


const Header = (props) => {

    return(
        <header className='nav-bar'>
            <div className='nav-buttons'>
                <Link className='nav-button' to='/customers'>Customers</Link>
                <Link className='nav-button' to='/checkout'>Checkout</Link>
                <Link className='nav-button' to='/transactions'>Transactions</Link>
            </div>
        </header>
    )
}

export default Header; 


//