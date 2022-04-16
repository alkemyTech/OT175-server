const express = require('express');
const router = express.Router();
const {getAll, getOne, deleteOne, update, getByCategory, create} = require('../controllers/news.controllers')

router.route('/')
    .get(getAll)
    .post(create);

router.route('/:id')
    .delete(deleteOne)
    .get(getOne)
    .patch(update)
    .put(update);

router.route('/category/:categoryId')
    .get(getByCategory);

    module.exports = router;
