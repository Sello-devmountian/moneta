import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getEmployee } from "../../redux/reducers/employeeReducer";
import "./deleteemployee.scss";

const DeleteEmployee = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, [users.length]);

  let getAllEmployees = () => {
    axios.get("/api/admin/users").then(res => setUsers(res.data));
  };

  const deleteEmployee = user_id => {
    axios
      .delete(`/api/admin/users/${user_id}`)
      .then(res => {
        // console.log(res.data)
        getAllEmployees();
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='del-employee-page'>
      <div className="del-employee-title">delete employee</div>

      <div className="del-employee-box">
        {users.map((user, i) => {
          return (
            <div className="employee-box">
              <label for="username">username: </label>
              <div className="employee-name" key={i}>
                {user.username}
              </div>
              <div
                className="del-employee-btn"
                onClick={e =>
                  window.confirm(
                    "Are you sure you would like to delete this employee?"
                  ) && deleteEmployee(user.user_id)
                }
                // style={{marginTop: '50px'}}
              >
                delete employee
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps, { getEmployee })(DeleteEmployee);
