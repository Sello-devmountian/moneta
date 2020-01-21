module.exports = {
    addToCart:  (req,res) => {
        req.session.user.cart = [...req.session.user.cart, req.body.item];
        res.status(200).send(req.session.user)
        console.log(req.session.user);
        
    },
    getCart: (req,res) => {
        res.status(200).send(req.session.user.cart)
    }
}
