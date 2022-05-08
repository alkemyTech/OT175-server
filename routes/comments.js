const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const restrictUnauthorizedRoles = require('../middlewares/userAuth')

const CommentController = require('../controllers/comments');

router.create('/',
    restrictUnauthorizedRoles(['Admin', 'Standard']),
    CommentController.createPost);

// router.get('')

router.put('/:id', [
    check('body', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('body', 'name must be string').isString().trim().escape(),
    fieldsValidate
], CommentController.updateCommentById);

module.exports = router;