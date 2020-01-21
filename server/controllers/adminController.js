const bcrypt = require('bcryptjs');

module.exports = {
  addProduct: (req, res) => {
    const { name, p_image, price, p_type } = req.body;
    const db = req.app.get("db");
    db.admin.add_product
      .add_product({
        name,
        p_image,
        price,
        p_type
      })
      .then(response => res.sendStatus(200))
      .catch(err => console.log(err));
  },

  editProduct: (req, res) => {
    const { id } = req.query;
    let { name, p_image, price, p_type } = req.body;

    const db = req.app.get("db");

    db.admin.edit_products
      .edit_products({
        name,
        p_image,
        price,
        p_type
      })
      .then(product => {
        res.status(200).send(product);
      });
  },

  deleteProduct: (req, res) => {
    let { p_id } = req.params;
    const db = req.app.get("db");
    db.admin.delete_product
      .delete_product({
        p_id
      })
      .then(product => {
        res.status(200).send({ Message: "Product has been removed" });
      });
  },

  // addEmployee: async(req, res) => {
  //   const { username, password, isAdmin } = req.body;
  //   const { session } = req;
  //   const db = req.app.get("db");

  //   let employee = await db.admin.add_employee.check_employee(employee);
  //   employee = employee[0];
  //   if(employee){
  //     return res.status(400).send('Username already exists')
  //   }

  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(password, salt);
  //   let newEmployee = await db.admin.add_employee
  //     .add_employee({
  //       username,
  //       password,
  //       is_admin: isAdmin
  //     });
  //     newEmployee = newEmployee[0];
  //     session.employee = {
  //       username: newEmployee.username,
  //       password: newEmployee.password,
  //       is_admin: newEmployee.isAdmin
  //     }
  //     .then(response => res.sendStatus(200))
  //     .catch(err => console.log(err));
  // },

  deleteEmployee: (req, res) => {
    let { user_id } = req.params;
    const db = req.app.get("db");
    db.admin.delete_trip
      .delete_trip({
        user_id
      })
      .then(employee => {
        res.status(200).send({ Message: "Employee has been removed" });
      });
  }
};
