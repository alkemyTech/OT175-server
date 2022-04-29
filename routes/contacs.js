const express = require('express');
const ContactsController = require('../controllers/contacts');
const router = express.Router();
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');

router.post('/', [
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('phone', 'phone can´t be empty').not().isEmpty().trim().escape(),
    check('email', 'email invalid').isEmail(),
    check('email', 'email can´t be empty').not().isEmpty().trim().escape(),
    check('message', 'message can´t be empty').not().isEmpty().trim().escape(),
    fieldsValidate
], ContactsController.create);

module.exports = router;