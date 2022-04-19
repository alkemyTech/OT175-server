var express = require('express');
var router = express.Router();
const selfAuth = require('../middlewares/selfAuth')
const UserController = require('../controllers/userControllers')

router.delete('/:id',
  selfAuth,
  UserController.deleteUser
)

module.exports = router;
