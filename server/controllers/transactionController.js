let transactionId;

module.exports = {
    createTransaction: async (req,res, next) => {
        const {total} = req.body 
        const {c_id} = req.session.user.customer;
        // console.log(total)
        // const {}
        const db = req.app.get('db')
        let transaction = await db.orders.create_transaction({c_id, total})
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