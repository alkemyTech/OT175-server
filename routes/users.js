const router = require('express').Router();
const usersControllers = require('../controllers/userControllers')

/* GET users listing. */
router.get('/', usersControllers.getUsers);

router.get('/:id', usersControllers.getUserById);

// router.post('/login', usersControllers.logIn);

// router.post('/signin', usersControllers.signIn);

router.put('/update/:id', usersControllers.updateUser);

router.delete('/delete/:id', usersControllers.deleteUser);

module.exports = router;
