const express = require('express');
const Activities = require('../controllers/activities');
const router = express.Router();
const { body } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const isAdminRole = require('../middlewares/adminAuthentication');

router.post(
  '/',
  [
    isAdminRole,
    body('name', "Name can't be empty").notEmpty().trim(),
    body('image', 'Image must be a valid URL').isURL()
  ],
  fieldsValidate,
  Activities.post
);

router.get('/', Activities.index);

router.get('/:id', Activities.get);

router.patch(
  '/:id',
  [isAdminRole, body('image', 'Image must be a valid URL').isURL()],
  fieldsValidate,
  Activities.update
);

router.delete('/:id', [isAdminRole], Activities.delete);

module.exports = router;
