const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD} = process.env;

module.exports = {
    email: async (req, res) => {
        let text = 'Thank you for using Moneta, here is your receipt!'
        try {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            let info = await transporter.sendMail({
                from: EMAIL,
                to: `${req.session.customer.email}`,
                subject: 'Order Reciept',
                html: `<h2>${text}</h2>`
            },
            (err, res) => {
                if(err){
                    console.log('err', err);
                } else {
                    console.log('res', res)
                    res.status(200).send(info)
                }
            }
            )
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}