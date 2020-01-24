require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require('express-session'),
  adminCtrl = require('./controllers/adminController'),
  authCtrl = require('./controllers/authController'),
  productCtrl = require('./controllers/productController'),
  customerController = require('./controllers/customerController'),
  orderCtrl = require('./controllers/orderController'),
  tCtrl = require('./controllers/transactionController'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));


massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
});


// ----------ENDPOINTS----------

// AUTH

app.post('/api/auth/login', authCtrl.login);
app.post('/api/auth/logout', authCtrl.logout);
app.post('/api/auth/register', authCtrl.register);
app.get('/api/auth/checkSession', authCtrl.checkSession);


// PRODUCTS

app.post("/api/product");
app.put("/api/product/:p_id");
app.get("/api/product",productCtrl.getProducts);
app.delete("/api/product/:p_id");

// CUSTOMERS

app.post("/api/customer");
app.get("/api/customer", customerController.getCustomers);
app.get("/api/customer/:c_id" ,customerController.getCustomer);
app.put("/api/customer/:c_id", customerController.editCustomer);
app.delete("/api/customer/:c_id");
app.get('/api/customerSess', customerController.getSessCustomer); 

// TRANSACTIONS

app.post("/api/transactions", tCtrl.createTransaction);
app.get("/api/transactions", tCtrl.getTransactions);
app.get("/api/transactions/:t_id", tCtrl.getOneTransaction);
app.put("/api/transactions/:t_id");
app.delete("/api/transactions/:t_id");

// CUSTOMER_ORDERS

app.post("/api/co");
app.get("/api/co");
app.delete("/api/co/:co_id");
app.put("/api/co/:co_id");
app.get("/api/co/cart", orderCtrl.getCart);
app.post('/api/co/cart', orderCtrl.addToCart)
app.put('/api/co/cart', orderCtrl.updateCart)



// RECEIPT

app.get("/api/receipt");


// ADMIN

app.post('/api/admin/product', adminCtrl.addProduct)
app.put('/api/admin/products', adminCtrl.editProduct)
app.delete('/api/admin/products', adminCtrl.deleteProduct)

app.post('/api/admin/users', authCtrl.register)
app.delete('/api/admin/users/:user_id', adminCtrl.deleteEmployee);



const port = SERVER_PORT || 6789
app.listen(port, () => console.log(`Server running on ${port}`));
