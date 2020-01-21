module.exports = {
    addToCart: (req,res) => {
        req.session.user.cart = [...req.session.user.cart, req.body.item]
        console.log(req.session.user.cart)
        
    }
}
