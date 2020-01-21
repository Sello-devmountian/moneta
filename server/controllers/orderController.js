module.exports = {
    addToCart:  (req,res) => {
        const {t_id, c_id,p_id, qty} = req.body 
        const db = req.app.get('db')
        db.orders.create_order({t_id, c_id,p_id, qty}).then(
            order => res.status(200).send(order)
        ).catch(err => console.log(err))
    
    },
    createTransaction: (req,res) => {
        console.log('create transaction hit')
        const {c_id, total, paid} = req.body 
        const db = req.app.get('db')
        db.orders.create_transaction({c_id, total, paid}).then(
            order => res.status(200).send(order)
        ).catch(err => console.log(err))
    }

}
