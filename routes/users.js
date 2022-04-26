const router = require('express').Router();
const UserController = require('../controllers/userControllers')
const selfAuth = require('../middlewares/selfAuth')

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.put('/update/:id', UserController.updateUser);

router.delete('/:id',
  selfAuth,
  UserController.deleteUser
)

module.exports = router;