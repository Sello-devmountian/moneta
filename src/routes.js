  
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './Components/Authentication/Authentication';
import Customers from './Components/Customers/Customers'; 
import EditCustomer from './Components/Customers/EditCustomer'; 
import Checkout from './Components/Employee/Checkout/Checkout'; 
import Transactions from './Components/Transactions/Transactions';
import OneTransaction from './Components/Transactions/OneTransaction/OneTransaction';
// import Printer from './Components/Transactions/OneTransaction/Printer';

import Payment from './Components/Employee/Payment/Payment';
import Receipt from './Components/Employee/Payment/Receipt/Receipt';
import PdfTest from './Components/Employee/Payment/Receipt/PdfTest';

import Admin from './Components/Admin/Admin';
import AddProduct from './Components/Admin/AddProduct';
import ManageProducts from './Components/Admin/ManageProducts';
import AddEmployee from './Components/Admin/AddEmployee';
import DeleteEmployee from './Components/Admin/DeleteEmployee';
// import OneTransaction from './Components/Transactions/OneTransaction/OneTransaction';

export default (
    <Switch>
        <Route exact path='/' component={Authentication} />
        <Route path='/customers/:c_id' component={EditCustomer}/>
        <Route path='/customers' component={Customers} />
        <Route path='/checkout' component={Checkout} />
        <Route exact path='/transactions' component={Transactions} />
        <Route path='/transactions/:t_id' component={OneTransaction} />
        {/* <Route path='/transactions/:t_id' component={Printer} /> */}
        <Route path='/payment' component={Payment}/>
        <Route path='/receipt/:t_id' component={Receipt}/>




        <Route path='/pdf' component={PdfTest}/>




        {/* ----------ADMIN PAGE ROUTES---------- */}

        <Route exact path='/admin' component={Admin} />

        <Route path='/admin/addproduct' component={AddProduct} />
        <Route path='/admin/manageproducts' component={ManageProducts} />
        <Route path='/admin/addemployee' component={AddEmployee} />
        <Route path='/admin/deleteemployee' component={DeleteEmployee} />
    </Switch>
);