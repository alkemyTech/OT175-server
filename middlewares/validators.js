const { validationResult, check } = require('express-validator');

   exports.validateOrganization = [ 
            check('name', 'The name field cannot be empty')
            .not()
            .isEmpty()
            .bail(),
            check('image', 'The image field cannot be empty')
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
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                  return res.status(422).json({errors: errors.array()});
                next();
              }
   ]
     