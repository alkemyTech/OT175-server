const models = require('../models');
const { Contact } = models;

class ContactsController {
    async create( req, res) {
        const { name, phone, email, message } = req.body;
        try {
        await Contact.create({
            name,
            phone,
            email,
            message
        });

            res.json({ 'msg': 'Contact created' });
        } catch (err) {
            res.json({msg: 'Error to create contact'});
        }
    }
}

module.exports = new ContactsController();