import React, {useEffect} from 'react';
import './App.css';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {getEmployee} from './redux/reducers/employeeReducer';
import Header from './Components/Header/Header'; 
import {Elements} from 'react-stripe-elements';


function App(props) {
  useEffect(() => {
    axios.get('/api/auth/checkSession').then(res => {
      props.getEmployee(res.data)
    })
  })


  return (
    <div className="App">
        <Elements>
        {props.location.pathname === '/' ? (
          <>
            {routes}
          </>
        ) : (
          <>
          <Header />
          {routes}
          </>
        )}
        </Elements>
    </div>
  );
}

export default withRouter(connect(null, {getEmployee})(App));
