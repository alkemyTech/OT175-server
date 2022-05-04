const router = require('express').Router();
const SlideController = require('../controllers/SlideController');
const { body, param, validationResult } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const isAdminRole = require('../middlewares/adminAuthentication');

router.put(
  '/update/:id',
  [
    isAdminRole,
    param('id', 'Id must be a number')
      .optional({ nullable: true })
      .exists()
      .toInt()
      .custom((id) => !isNaN(id)),

    body('imageUrl', 'imageUrl must exist and be a URL').isURL(),

    body('text', 'text must exist and be minimum length 1').isLength({
      min: 1,
    }),

    body('order', 'order must exist and be a number')
      .toInt()
      .custom((order) => !isNaN(order)),

    body('organizationId', 'organizationId must exist and be a number')
      .toInt()
      .custom((organizationId) => !isNaN(organizationId)),

    fieldsValidate,
  ],
  SlideController.updateSlide
);
module.exports = router;