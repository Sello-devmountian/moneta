require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  gradient = require("gradient-string"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(gradient.atlas("DB Cooper"));
});


// ----------ENDPOINTS----------

// AUTH

app.post("/auth/login");
app.post("auth/register");
app.post("/auth/logout");

// PRODUCTS

app.post("api/product");
app.put("api/product/:p_id");
app.get("api/product");
app.delete("api/product/:p_id");

// CUSTOMERS

app.post("/api/customer");
app.get("/api/customer");
app.get("/api/customer/:c_id");
app.put("/api/customer/:c_id");
app.delete("/api/customer/:c_id");

// TRANSACTIONS

app.post("/api/transactions");
app.get("/api/transactions");
app.put("/api/transactions/:t_id");
app.delete("/api/transactions/:t_id");

// CUSTOMER_ORDERS

app.post("/api/co");
app.get("/api/co");
app.delete("/api/co/:co_id");
app.put("/api/co/:co_id");

// RECEIPT

app.get("/api/receipt");


const port = SERVER_PORT;
app.listen(port, () => console.log(gradient.pastel(`Point of Sale is online at ${port}`)))