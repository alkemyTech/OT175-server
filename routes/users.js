const router = require('express').Router();
const UserController = require('../controllers/userControllers');
const selfAuth = require('../middlewares/selfAuth');

const { body, param, validationResult } = require('express-validator');

const { fieldsValidate } = require('../middlewares/fieldsValidate');

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.put('/update/:id', UserController.updateUser);

router.delete('/:id', selfAuth, UserController.deleteUser);

router.patch(
  '/patch/:id',
  [
    selfAuth,
    body('firstName').optional({ nullable: true }).isLength({ min: 1 }),
    body('lastName').optional({ nullable: true }).isLength({ min: 1 }),

    body('image').optional({ nullable: true }).isURL(),

    body('email', 'Email must be a valid email')
      .optional({ nullable: true })
      .isEmail(),
    body('password', 'Password must be minimun 5 character long')
      .optional({ nullable: true })
      .isLength({ min: 5 }),
    param('id', 'Id must be a number')
      .optional({ nullable: true })
      .exists()
      .toInt()
      .custom((id) => !isNaN(id)),
    body('roleId', 'roleId must be a number')
      .optional({ nullable: true })
      .toInt()
      .custom((id) => !isNaN(id)),
    fieldsValidate,
  ],

  UserController.patchUser
);

module.exports = router;
