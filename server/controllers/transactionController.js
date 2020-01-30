let transactionId;
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {
    createTransaction: async (req,res, next) => {
        const {total} = req.body 
        const {c_id} = req.session.user.customer;
        const newDate = new Date()
        // console.log(total)
        // const {}
        const db = req.app.get('db')
        let transaction = await db.orders.create_transaction({c_id, total,t_date: newDate})
        transaction = transaction[0]
        transactionId = transaction.t_id
        if(!transaction){
            return res.status(400).send('Bad Transaction')
        }
        // console.log(typeof transaction.t_id)
        let cart = req.session.user.cart.map(async (item) => {
            await db.orders.create_order({t_id: transactionId, c_id, p_id: item.p_id ,qty: 1})
            // .then(order => res.status(200).send(order))
        })
        res.status(200).send(transaction);
        next()
    },
    getTransactions: (req, res) => {
        const db = req.app.get('db')
        db.transactions.get_transactions()
        .then(transactions => res.status(200).send(transactions))
    },
    getOneTransaction: (req, res) => {
        const {t_id} = req.params
        const db = req.app.get('db')
        db.transactions.get_one_transaction({t_id})
        .then(transaction => res.status(200).send(transaction))
    },

    charge: (req, res) => {
        const {id} = req.body.token.token;
            const cart = req.session.user.cart;
            const cartTotal = cart.reduce((acc, cartItem) => acc + (+cartItem.price), 0)*100;
            // console.log(cartTotal)
            stripe.charges.create({
                amount: cartTotal,
                currency: 'usd',
                source: id,
                description: 'Test Charge'
            });
            // console.log(req.body.token)
            (err, charge) => {
            if(err){
                // console.log(err)
                return res.status(500).send(err)
            } else {
                // console.log('successful payment', charge)
                return res.status(200).send(charge)
            }
        }
    },
    getOneCustomerTransactions : (req,res) => {
        const db = req.app.get('db')
        const {c_id} = req.params

        db.transactions.get_one_customer_transactions(c_id)
        .then(transactions => res.status(200).send(transactions))
        .catch(err => console.log(err))
    }


    // getOrder: (req, res) => {
    //     const db = req.app.get('db');
    //     console.log(transactionId);
    //     db.orders.get_order(transactionId).then(order => {
    //         console.log(order)
    //         res.status(200).send(order)
    //     }).catch(err => console.log(err))
    // }
}