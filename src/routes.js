import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Authentication from './Components/Authentication/Authentication';
import Customers from './Components/Customers/Customers'; 
import Checkout from './Components/Employee/Checkout/Checkout'; 
import Transactions from './Components/Admin/Transactions'; 

export default (
    <Switch>
        <Route exact path='/' component={Authentication}/>
        <Route path='/customers' component={Customers} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/transactions' component={Transactions} />
        
    </Switch>
);