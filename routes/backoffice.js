const express = require('express');
const router = express.Router();
const isAdminRole = require('../middlewares/adminAuthentication');
const ContactsController = require('../controllers/contacts');

router.get('/contacts', [ isAdminRole ], ContactsController.getContacts );

module.exports = router;