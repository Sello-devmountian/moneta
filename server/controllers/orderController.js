module.exports = {
    addToCart:  (req,res) => {
        const {t_id, c_id,p_id, qty} = req.body 
        const db = req.app.get('db')
        db.orders.create_order({t_id, c_id,p_id, qty}).then(
            order => {
                console.log(order)
                res.status(200).send(order)
            }
        ).catch(err => console.log(err))
    
    },
    createTransaction: (req,res) => {
        console.log('create transaction hit')
        const {c_id, total, paid} = req.body 
        const db = req.app.get('db')
        db.orders.create_transaction({c_id, total, paid}).then(
            order => res.status(200).send(order)
        ).catch(err => console.log(err))
    },
    getCart: (req,res) => {
        const {t_id} = req.params
        // const {} = req.body
        // console.log('req', req.params)
        const db = req.app.get('db')
        db.orders.get_cart(t_id).then(
            cart => {
                res.status(200).send(cart)
                // console.log(cart)
            } 
        ).catch(err => console.log(err))
        
    }

}
