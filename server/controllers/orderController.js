module.exports = {
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
    getCart: (req, res) => {
        res.status(200).send(req.session.user.cart)
    }

}
