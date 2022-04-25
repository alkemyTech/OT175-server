const router = require('express').Router();
const AuthControllers = require('../controllers/authControllers')
const { body, validationResult } = require('express-validator'); 
const createJwt = require('../middlewares/jwtCreation')

router.post(
    '/register', 
    body('firstName', 'Please enter a valid First Name').isAlpha(), 
    body('lastName', 'Please enter a valid Last Name').isAlpha(), 
    body('email', 'Please enter a valid mail').isEmail(), 
    body('image', 'Please enter the url of your photo').isURL(), 
    body('password', 'Please enter a valid password').isAlphanumeric(),
    AuthControllers.signin,
    createJwt
);

router.get('/me', AuthControllers.getDataUser);

module.exports = router;