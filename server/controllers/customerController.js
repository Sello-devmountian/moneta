
module.exports = {
    getCustomers: (req, res) => {
        const db = req.app.get('db');
        db.customers.get_customers().then(customers => {res.status(200).send(customers)})
        .catch(err => res.status(500).send(err))
    }
}