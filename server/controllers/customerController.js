
module.exports = {
    getCustomers: (req, res) => {
        const db = req.app.get('db');
        db.customers.get_customers().then(customers => {res.status(200).send(customers)})
        .catch(err => res.status(500).send(err))
    },

    getCustomer: (req, res) => {
        const {c_id} = req.params
        const db = req.app.get('db');
        db.customers.get_customer(c_id).then(customer => {
            req.session.user.customer = customer[0]
            res.status(200).send(customer)
            console.log(req.session.user.customer)
        })
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


    },

    getSessCustomer: (req, res) => {
        res.status(200).send(req.session.user.customer)
    }
    
}