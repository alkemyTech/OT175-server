const { check } = require('express-validator');
const { validateFields } = require('../common/validateFields');

   exports.validateOrganization = [ 
            check('name', 'The name field cannot be empty')
            .not()
            .isEmpty()
            .bail(),
            check('image', 'The image field is incorrect or empty')
            .isURL({require_protocol: true})
            .not()
            .isEmpty()
            .bail(),
            check('email', 'The email field is incorrect or empty')
            .isEmail()
            .not()
            .isEmpty()
            .bail(),
            check('welcomeText', 'The welcomeText field cannot be empty')
            .not()
            .isEmpty()
            .bail(),
            validateFields
   ]
     