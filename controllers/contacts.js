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

    async getContacts( req, res ) {
        try {
            const contacts = await Contact.findAll({});

            if ( !contacts.length ) return res.json({msg: 'Not exists contacts registered'}); 

            res.json({ contacts });
        } catch (err) {
            res.json({msg: 'Error to get all contacts'});
        }
    }
}

module.exports = new ContactsController();