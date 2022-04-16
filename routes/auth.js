const router = require('express').Router();
const authControllers = require('../controllers/authControllers')
const usersControllers = require('../controllers/userControllers')
const { body, validationResult } = require('express-validator'); 

// console.log(authControllers.validation)

// router.post('/login', usersControllers.logIn);

router.post(
    '/register', 
    body('firstName', 'Please enter a valid First Name').isAlpha(), 
    body('lastName', 'Please enter a valid Last Name').isAlpha(), 
    body('email', 'Please enter a valid mail').isEmail(), 
    body('photo', 'Please enter the url of your photo').isURL(), 
    body('password', 'Please enter a valid password').isAlphanumeric(),
    authControllers.signin
);

module.exports = router;