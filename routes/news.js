const express = require('express');
const router = express.Router();
const NewsCtrl = require('../controllers/news.controllers');

const controller = new NewsCtrl()

router.route('/')
    .get(controller.getAll)
    .post(controller.create);

router.route('/:id')
    .delete(controller.deleteOne)
    .get(controller.getNewById)
    .patch(controller.update)
    .put(controller.update);

router.route('/category/:categoryId')
    .get(controller.getByCategory);

    module.exports = router;
