const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const isAdminRole = require('../middlewares/adminAuthentication');

const CommentController = require('../controllers/comments');

router.put('/:id', [
    check('body', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('body', 'name must be string').isString().trim().escape(),
    fieldsValidate
], CommentController.updateCommentById);

router.get('/', [isAdminRole], CommentController.getAllComments)

module.exports = router;