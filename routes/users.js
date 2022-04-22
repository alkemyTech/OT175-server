const router = require('express').Router();
const UserController = require('../controllers/userControllers')

/* GET users listing. */
router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.put('/update/:id', UserController.updateUser);

router.delete('/delete/:id', UserController.deleteUser);

module.exports = router;