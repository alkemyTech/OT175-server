const models = require('../models');
const { Contact } = models;

const welcomeMail = require('../services/welcomeMail');

const contactText =
  "Contactanos por los siguientes canales: Mail: somosfundacionmas@gmail.com, Instagram: SomosMás, Facebook: Somos_Más, Teléfono de contacto: 1160112988";

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
        } catch (err) {
            res.json({msg: 'Error to create contact'});
        };
        welcomeMail.sendWelcomeMail(
            email, 
            "Contact Added", 
            "thank you for adding Contanct info",
            'Your current contact info is ' + phone,
            contactText
            )
        res.json({ 'msg': 'Contact created' });
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