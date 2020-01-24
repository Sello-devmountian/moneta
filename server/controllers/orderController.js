module.exports = {
    // addToCart:  (req,res) => {
    //     const {t_id, c_id,p_id, qty} = req.body 
    //     console.log('req.body', req.body)
    //     const db = req.app.get('db')
    //     db.orders.create_order({t_id, c_id,p_id, qty}).then(
    //         order => {
    //             // console.log(order)
    //             res.status(200).send(order)
    //         }
    //     ).catch(err => console.log(err))
    
    // },
    addToCart: async (req,res) => {
        let reassign = () => {
        req.session.user.cart = [...req.session.user.cart,req.body]
        }
        reassign()
        res.status(200).send(req.session.user.cart)
    
    },
    updateCart: (req,res) => {
        req.session.user.cart = req.body
        res.status(200).send(req.session.user.cart)
    },
    clearCart: (req,res) => {
        req.session.user.cart = []
        res.status(200).send(req.session.user.cart)
    },
    // createTransaction: (req,res) => {
    //     console.log('create transaction hit')
    //     const {c_id, total, paid} = req.body 
    //     const db = req.app.get('db')
    //     db.orders.create_transaction({c_id, total, paid}).then(
    //         order => res.status(200).send(order)
    //     ).catch(err => console.log(err))
    // },
    // getCart: (req,res) => {
    //     const {t_id} = req.params
    //     // const {} = req.body
    //     // console.log('req', req.params)
    //     const db = req.app.get('db')
    //     db.orders.get_cart(t_id).then(
    //         cart => {
    //             res.status(200).send(cart)
    //             // console.log(cart)
    //         } 
    //     ).catch(err => console.log(err))
        
    // }
    getCart: (req, res) => {
        res.status(200).send(req.session.user.cart)
    }

}
