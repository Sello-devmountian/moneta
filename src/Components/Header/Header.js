import React from 'react';  
import {Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import axios from 'axios';
import './header.css'
import MonetaLogo from '../../img/simplelogo.png';



const Header = (props) => {
    const logout = () => {
        axios.post('/api/auth/logout')
    }

    return(
        <header className='nav-bar'>
            <img id='header-logo' src={MonetaLogo} alt='moneta logo' />
            <div className='nav-buttons'>
            {props.employee.employee.is_admin ? 
                <Link className='nav-button' to='/admin'>Admin</Link>
                : null
            }
                <Link className='nav-button' to='/checkout'>Checkout</Link>
                <Link className='nav-button' to='/customers'>Customers</Link>
                <Link className='nav-button' to='/transactions'>Transactions</Link> 
                <Link onClick={logout} className='nav-button' to='/'>Log Out</Link>
            </div>
        </header>
    )
}

const mapStateToProps = reduxState => {
    return reduxState;
  };

export default connect(mapStateToProps)(Header); 
