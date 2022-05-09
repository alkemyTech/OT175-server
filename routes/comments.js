const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const isAdminRole = require('../middlewares/adminAuthentication');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const restrictUnauthorizedRoles = require('../middlewares/userAuth')
const CommentController = require('../controllers/comments');

router.post('/',
    check('body', 'issue in body').isString().not().isEmpty().trim().escape(),
    check('postId', 'issue in postId').isInt().not().isEmpty().escape(),
    fieldsValidate,
    restrictUnauthorizedRoles(['Admin', 'Standard']),
    CommentController.createComment);


router.put(
  '/:id',
  [
    isAdminRole,
    check('body', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('body', 'name must be string').isString().trim().escape(),
    fieldsValidate
  ],
  CommentController.updateCommentById
);

module.exports = router;
