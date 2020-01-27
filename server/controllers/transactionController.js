let transactionId;
const {STRIPE_SECRET_KEY} = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

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
        return res.sendStatus(200);
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

    charge: async (req, res) => {
        try {
            const cart = req.session.user.cart;
            const cartTotal = cart.reduce((acc, cartItem) => acc + cartItem.price, 0)*100;
            let stripeChargeResponse = await stripe.charges.create({
                amount: cartTotal,
                currency: 'usd',
                description: 'Test Charge',
                source: req.body.token.id
            });
            // console.log(req.body.token)
            if(stripeChargeResponse.status === 'succeeded'){
                res.json({status: stripeChargeResponse.status})
            }
        } catch (err) {
            console.log('charge error', err);
            res.status(500).end();
        }
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