const express = require('express');
const router = express.Router();

const NewsCtrl = require('../controllers/news.controllers');
const restrictUnauthorizedRoles = require('../middlewares/userAuth');
const validateId = require('../middlewares/validateId');
const controller = new NewsCtrl();
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const isAdminRole = require('../middlewares/adminAuthentication');

router
  .route('/')
  .get(controller.getAll)
  .post(
    [
      isAdminRole,
      check('name', 'name can´t be empty')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .isString(),
      check('content', 'name must be string').isString().trim().escape(),
      check('image', 'image can´t be empty').not().isEmpty().trim(),
      check('image', 'image must be an url').isURL().trim(),
      check('description').trim().escape(),
      check('categoryId', 'categoryId can´t be empty')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .isInt({ min: 0 })
        .withMessage('amount is not int or amount is less than zero'),
      fieldsValidate
    ],
    controller.createNews
  );
router
  .route('/:id')
  .delete([validateId, restrictUnauthorizedRoles([1])], controller.deleteOne)
  .get([isAdminRole], controller.getOne)
  .patch([isAdminRole], controller.update)
  .put([isAdminRole], controller.update);

router.route('/category/:categoryId').get(controller.getByCategory);

module.exports = router;
