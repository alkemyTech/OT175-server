const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');

const PostController = require('../controllers/posts');

router.get('/', PostController.getPosts);

router.get('/:id', PostController.getPostById);

router.put('/:id', [
    check('title', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('title', 'name must be string').isString().trim().escape(),
    check('body', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('body', 'name must be string').isString().trim().escape(),
    check('image', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('image', 'name must be string').isString().trim().escape(),
    fieldsValidate
], PostController.updatePostById);

router.delete('/:id', PostController.deletePostById);

router.post('/', [
    check('title', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('title', 'name must be string').isString().trim().escape(),
    check('body', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('body', 'name must be string').isString().trim().escape(),
    check('image', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('image', 'name must be string').isString().trim().escape(),
    fieldsValidate
], PostController.createPost);

module.exports = router;
