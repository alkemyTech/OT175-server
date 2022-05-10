const express = require('express');
const router = express.Router();
const SlideController = require('../controllers/slidesController');
const { body, param, validationResult, check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const isAdminRole = require('../middlewares/adminAuthentication');

router.delete('/:id', SlideController.delete);
router.get('/:id', [isAdminRole], SlideController.getSlideByPk);
router.get('/', [isAdminRole], SlideController.index);

router.put(
  '/:id',
  [
    isAdminRole,
    param('id', 'Id must be a number')
      .optional({ nullable: true })
      .exists()
      .toInt()
      .custom(id => !isNaN(id)),

    body('imageUrl', 'imageUrl must exist and be a URL').isURL(),

    body('text', 'text must exist and be minimum length 1').isLength({
      min: 1,
    }),

    body('order', 'order must exist and be a number')
      .toInt()
      .custom(order => !isNaN(order)),

    body('organizationId', 'organizationId must exist and be a number')
      .toInt()
      .custom(organizationId => !isNaN(organizationId)),

    fieldsValidate,
  ],
  SlideController.updateSlide
);

router.delete('/:id', [isAdminRole], SlideController.delete);

router.post(
  '/',
  [
    isAdminRole,
    check('text', 'text must be string').isString().trim().escape(),
    check('imageBase64', 'image can´t be empty').not().isEmpty().trim(),
    check('imageBase64', 'image must be in base64').isBase64().trim(),
    check(
      'organizationId',
      'organizationId can´t be empty and must be a number'
    )
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isInt(),
    check('order', 'order can´t be empty and must be a number')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isInt(),
    fieldsValidate,
  ],
  SlideController.creationSlide
);

module.exports = router;
