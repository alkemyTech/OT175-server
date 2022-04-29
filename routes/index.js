const express = require('express');
const router = express.Router();
const usersRoutes = require('./users')
const authRoutes = require('./auth')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRoutes)
router.use('/auth', authRoutes)

module.exports = router;
