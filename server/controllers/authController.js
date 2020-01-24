const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password, is_admin} = req.body;
        const {session} = req;
        let user = await db.users.check_user(username);
        user = user[0];
        if(user){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.users.register_user({username, hash, is_admin});
        newUser = newUser[0]
        session.user = {username: newUser.username, is_admin: newUser.is_admin, id: newUser.user_id};
        res.status(200).send(session.user);
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        const {session} = req;
        let user = await db.users.check_user(username);
        user = user[0];
        if(!user){
            return res.status(400).send('Username no found')
        }
        const authenticated = bcrypt.compareSync(password, user.password);
        if(authenticated){
            delete user.password;
            session.user = user;
            session.user.customer = {
                c_id: 5,
                first_name: 'Default',
                last_name: '',
            }
            session.user.cart = [];
            res.status(200).send(session.user);
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    checkSession: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send({message: 'Please log in'})
        }
    }
}