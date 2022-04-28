const express = require('express');
const router = express.Router();
const usersRoutes = require('./users')
const authRoutes = require('./auth')
const isAdminRole = require('../middlewares/adminAuthentication');
const ContactsController = require('../controllers/contacts');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRoutes)
router.use('/auth', authRoutes)

router.get('/backoffice/contacts', [ isAdminRole ], ContactsController.getContacts );

module.exports = router;
