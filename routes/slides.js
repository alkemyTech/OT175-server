const router = require('express').Router();
const SlideController = require('../controllers/SlideController');
const { body, param, validationResult } = require('express-validator');

router.put(
  '/update/:id',
  [isAdminRole],
  param('id', 'Id must be a number')
    .optional({ nullable: true })
    .exists()
    .toInt()
    .custom((id) => !isNaN(id)),
  SlideController.updateSlide
);

module.exports = router;
