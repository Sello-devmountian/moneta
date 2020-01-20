import React from 'react';
import useInput from '../../hooks/useInput';


function AddEmployee() {
    const [username, bindUserName, resetUsername, password, bindPassword, resetPassword, setNewEmployee] = useInput('');
    
    return (
        <div>
        <input {...bindUserName}></input>
        <input {...bindPassword}></input>
        <div onClick={(e) => setNewEmployee(e.target.value)}></div>
        </div>
    );
}

export default AddEmployee;