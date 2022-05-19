const router = require('express').Router();
const AuthControllers = require('../controllers/authControllers')
const { check } = require('express-validator'); 
const { fieldsValidate } = require('../middlewares/fieldsValidate');

router.post(
    '/register', 
    check('firstName', 'Please enter a valid First Name').isString().not().isEmpty(), 
    check('lastName', 'Please enter a valid Last Name').isString().not().isEmpty(), 
    check('email', 'Please enter a valid mail').isEmail().not().isEmpty(), 
    check('image', 'Please enter the url of your photo').isURL().not().isEmpty(), 
    check('password', 'Please enter a valid password').isAlphanumeric().not().isEmpty(),
    fieldsValidate,
    AuthControllers.signin
);

router.get('/me', AuthControllers.getDataUser);

router.post("/login", 
    check("email",'Please enter a valid mail').isEmail().not().isEmpty(), 
    check("password", 'Please enter a valid password').isLength({ min: 1 }).not().isEmpty(),
    fieldsValidate, 
    AuthControllers.login    
);

module.exports = router;