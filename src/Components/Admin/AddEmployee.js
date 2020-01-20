import React from 'react';
import useInput from '../../hooks/useInput';
import './addemployee.scss';

function AddEmployee() {
    const [username, bindUserName, resetUsername, password, bindPassword, resetPassword, setNewEmployee] = useInput('');
    
    return (
        <div className='add-employee-box'>
        <h1 className='new-employee-title'>add new employee</h1>
            <input placeholder='username' {...bindUserName} />
            <input placeholder='password' type='password' {...bindPassword} />
            <label htmlFor="isAdmin">admin access</label>
            <input type='checkbox' value='isAdmin' />
        <div className='add-employee-btn' onClick={(e) => setNewEmployee(e.target.value)}>add employee</div>
        </div>
    );
}

export default AddEmployee;
