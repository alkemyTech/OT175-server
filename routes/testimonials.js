const express = require('express');
const Testimonials = require('../controllers/testimonials');
const router = express.Router();

const isAdminRole = require('../middlewares/adminAuthentication');
const { body, param, validationResult } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');

router.post(
  '/',
  [
    isAdminRole,

    body(
      'content',
      'content must exist and be minimum 1 character length'
    ).isLength({
      min: 1
    }),
    body('name', "Name can't be empty").notEmpty().trim(),
    body('image', 'Image must be a valid URL').isURL()
  ],
  fieldsValidate,
  Testimonials.post
);

router.get('/', Testimonials.index);

router.get('/:id', Testimonials.get);

router.patch(
  '/:id',
  [isAdminRole, body('image', 'Image must be a valid URL').isURL()],
  fieldsValidate,
  Testimonials.update
);

router.delete('/:id', [isAdminRole], Testimonials.delete);

module.exports = router;
const isAdminRole = require('../middlewares/adminAuthentication');
