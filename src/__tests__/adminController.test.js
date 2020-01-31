import { addProduct, editProduct, deleteProduct, getAllEmployees, deleteEmployee } from "../../server/controllers/adminController";

test("addProduct sends 200 response with products", async () => {
  const fakedb = {};
  let receivedResponseCode = 404;
  let receivedProducts = [];
  const response = {
    status: code => {
      receivedResponseCode = code;
      return {
        send: products => {
          receivedProducts = products;
        }
      };
    }
  };

  const request = {
    body: {
      name: "coffee",
      p_image: "www.google.com",
      price: 9.0,
      p_type: "gelato",
      available: false
    },
    app: {
      get: () => {
        return {
          admin: {
            add_product: {
              add_product: product =>
                new Promise((res, rej) => {
                  fakedb.product = product;
                  res([product]);
                })
            }
          }
        };
      }
    }
  };
  await addProduct(request, response);
  expect(receivedResponseCode).toBe(200);
  expect(receivedProducts).toStrictEqual([
    {
      name: "coffee",
      p_image: "www.google.com",
      price: 9.0,
      p_type: "gelato",
      available: false
    }
  ]);
});

//////////////////////////////////////////////////////

test("editProduct sends 200 response with product", async () => {
  const fakedb = {};
  let receivedResponseCode = 404;
  let receivedProduct = [];
  const response = {
    status: code => {
      receivedResponseCode = code;
      return {
        send: product => {
          receivedProduct = product;
        }
      };
    }
  };

  const request = {
    params: {
      p_id: 100
    },
    body: {
      name: "pie",
      p_image: "www.yahoo.com",
      price: 0.01,
      p_type: "cake",
      available: true
    },
    app: {
      get: () => {
        return {
          admin: {
            edit_products: {
              edit_products: product =>
                new Promise((res, rej) => {
                  fakedb.product = product;
                  res(product);
                })
            }
          }
        };
      }
    }
  };
  await editProduct(request, response);
  expect(receivedResponseCode).toBe(200);
  expect(receivedProduct).toStrictEqual(
    {
      name: "pie",
      p_image: "www.yahoo.com",
      price: 0.01,
      p_type: "cake",
      available: true,
      p_id: 100
    }
  );
});

//////////////////////////////////////////////////////

test("deleteProduct sends 200 response with a message", async () => {
  const fakedb = {};
  let receivedResponseCode = 404;
  let receivedMessage
  const response = {
    status: code => {
      receivedResponseCode = code;
      return {
        send: message => { receivedMessage = message }
      };
    }
  };

  const request = {
    params: {
      p_id: 999
    },
    app: {
      get: () => {
        return {
          admin: {
            delete_product: {
              delete_product: product =>
                new Promise((res, rej) => {
                  fakedb.product = product;
                  res(product);
                })
            }
          }
        };
      }
    }
  };
  await deleteProduct(request, response);
  expect(receivedResponseCode).toBe(200);
  expect(receivedMessage).toStrictEqual({ Message: "Product has been removed" })
});

//////////////////////////////////////////////////////

test("getAllEmployees sends 200 response with employees", async () => {
  let receivedResponseCode = 500;
  let receivedEmployees = [];
  const response = {
    status: code => {
      receivedResponseCode = code;
      return {
        send: employees => {
          receivedEmployees = employees;
        }
      };
    }
  };

  const request = {
    app: {
      get: () => {
        return {
          users: {
              get_users: () => 
                new Promise((res, rej) => {
                  res(['employee']);
                })
            }
        };
      }
    }
  };
  await getAllEmployees(request, response);
  expect(receivedResponseCode).toBe(200);
  expect(receivedEmployees).toStrictEqual(['employee'
  ]);
});

//////////////////////////////////////////////////////

test("deleteEmployee sends 200 response with a message", async () => {
  const fakedb = {};
  let receivedResponseCode = 404;
  let receivedMessage
  const response = {
    status: code => {
      receivedResponseCode = code;
      return {
        send: message => { receivedMessage = message }
      };
    }
  };

  const request = {
    params: {
      user_id: 888
    },
    app: {
      get: () => {
        return {
          admin: {
            delete_employee: {
              delete_employee: employee =>
                new Promise((res, rej) => {
                  fakedb.employee = employee;
                  res(employee);
                })
            }
          }
        };
      }
    }
  };
  await deleteEmployee(request, response);
  expect(receivedResponseCode).toBe(200);
  expect(receivedMessage).toStrictEqual({ Message: "Employee has been removed" })
});