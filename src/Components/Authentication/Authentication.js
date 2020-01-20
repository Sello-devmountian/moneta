import React from 'react';
import './authentication.scss';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import {connect} from 'react-redux';
import {getEmployee} from '../../redux/reducers/employeeReducer';
import MonetaLogo from '../../img/MonetaLogo.png';

const Authentication = (props) => {
    const [username, bindUsername, resetUsername] = useInput('');
    const [password, bindPassword, resetPassword] = useInput('');

    let login = () => {
        axios.post('/api/auth/login', {username: username, password: password}).then(res => {
            props.getEmployee(res.data);
            props.history.push('/checkout')
            resetUsername()
            resetPassword()
        })
    }

    return (
        <div className='auth'>
            <img src={MonetaLogo} alt='logo' height='200px'/>
            <div className='auth-container'>
                <div className='welcome'>
                    <div>Welcome back to Moneta!</div>
                    <h2>Log in to get started<i className='right'></i></h2>
                </div>
                <div className='login'>
                    <h1>sign in</h1>
                    <div>
                        <input 
                            {...bindUsername}
                            type='text'
                            placeholder='username'
                        />
                        <input 
                            {...bindPassword}
                            type='password'
                            placeholder='password'
                        />
                    </div>
                    <button onClick={login}>login</button>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {getEmployee})(Authentication);