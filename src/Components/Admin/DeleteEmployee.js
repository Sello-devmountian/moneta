// import React, { useState } from 'react';
// import axios from 'axios';
// // import './deleteemployee.scss';

// function DeleteEmployee(){

//     const [users, setUsers] = useState({});

//     const deleteEmployee = (user_id) => {

//         axios.delete(`/api/admin/users/${user_id}`)
//         .then(res => {
//             console.log(res.data)
//             // setUsers({ users: res.data })
//         })
//         .catch(error => console.log(error))
//     }
//     return (
//         <div>
//             {users.map((user, i) => {
//                 return (
//                     <div key={i}></div>
//                 )
//             })}
//             <button onClick={(e) => deleteEmployee(e.target.value)}
//             style={{marginTop: '50px'}}>delete employee</button>
//         </div>
//     )
// }

// export default DeleteEmployee;
