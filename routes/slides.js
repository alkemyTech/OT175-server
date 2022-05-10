const express = require('express');
const Slides = require('../controllers/slidesController');
const router = express.Router();
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const isAdminRole = require('../middlewares/adminAuthentication');

router.delete('/:id', Slides.delete);
router.get('/:id', [isAdminRole], Slides.getSlideByPk);
router.post(
  '/',
  [
    isAdminRole,
    check('text', 'text must be string').isString().trim().escape(),
    check('imageBase64', 'image can´t be empty').not().isEmpty().trim(),
    check('imageBase64', 'image must be in base64').isBase64().trim(),
    check('organizationId', 'organizationId can´t be empty and must be a number')
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
  Slides.creationSlide
);

module.exports = router;
