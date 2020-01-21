
module.exports = {
    getCustomers: (req, res) => {
        const db = req.app.get('db');
        db.customers.get_customers().then(customers => {res.status(200).send(customers)})
        .catch(err => res.status(500).send(err))
    },

    editCustomer: (req, res) => {
        const {c_id} = req.params; 
        const {email, phone, first_name, last_name} = req.body; 
        console.log(req.params); 
        console.log(req.body); 
        const db =req.app.get('db'); 
        db.customers.edit_customer(c_id, email, phone, first_name, last_name)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))


    }
}