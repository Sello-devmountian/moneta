import React from 'react';
import './authentication.css';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import {connect} from 'react-redux';
import {getEmployee} from '../../redux/reducers/employeeReducer';

const Authentication = (props) => {
    const [username, bindUsername, resetUsername] = useInput('');
    const [password, bindPassword, resetPassword] = useInput('');

    let login = () => {
        axios.post('/api/auth/login', {username: username, password: password}).then(res => {
            props.getEmployee(res.data);
            //props.history.push('/')
            resetUsername()
            resetPassword()
        })
    }

    return (
        <div className='auth-container'>
            <input 
                {...bindUsername}
                type='text'
                placeholder='Enter Username'
            />
            <input 
                {...bindPassword}
                type='password'
                placeholder='Enter Password'
            />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default connect(null, {getEmployee})(Authentication);