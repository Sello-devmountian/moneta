import React, { useState } from "react";
import axios from "axios";
import useInput from "../../hooks/useInput";
import "./addemployee.scss";

function AddEmployee() {
  const [username, bindUserName, resetUsername] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const [is_admin, bindIsAdmin] = useState(false);

  let setNewEmployee = () => {
    axios
      .post("/api/admin/users", {
        username,
        password,
        is_admin
      })
      .then(() => {
        alert("New employee added");
      })
      .catch(err => {
        console.log("Employee not added", err);
      });
  };

  return (
    <div className="add-employee-box">
      <h1 className="new-employee-title">add new employee</h1>
      <input placeholder="username" {...bindUserName} />
      <input placeholder="password" type="password" {...bindPassword} />
      <label className='admin-access' htmlFor="is_admin">admin access</label>
      <input
        onChange={() => bindIsAdmin(!is_admin)}
        type="checkbox"
        value="is_admin"
      />
      <div
        className="add-employee-btn"
        onClick={() => {
          setNewEmployee();
          resetUsername();
          resetPassword();
        }}
      >
        add employee
      </div>
    </div>
  );
}

export default AddEmployee;
