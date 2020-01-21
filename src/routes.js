import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './Components/Authentication/Authentication';
import Customers from './Components/Customers/Customers'; 
import Checkout from './Components/Employee/Checkout/Checkout'; 
import Transactions from './Components/Admin/Transactions';

import Admin from './Components/Admin/Admin';
import AddProduct from './Components/Admin/AddProduct';
import ManageProducts from './Components/Admin/ManageProducts';
import AddEmployee from './Components/Admin/AddEmployee';
import DeleteEmployee from './Components/Admin/DeleteEmployee';


export default (
    <Switch>
        <Route exact path='/' component={Authentication} />
        <Route path='/customers' component={Customers} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/transactions' component={Transactions} />

        {/* ----------ADMIN PAGE ROUTES---------- */}

        <Route exact path='/admin' component={Admin} />

        <Route path='/admin/addproduct' component={AddProduct} />
        <Route path='/admin/manageproducts' component={ManageProducts} />
        <Route path='/admin/addemployee' component={AddEmployee} />
        <Route path='/admin/deleteemployee' component={DeleteEmployee} />
    </Switch>
);