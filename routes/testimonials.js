const express = require('express');
const Testimonials = require('../controllers/testimonials')
const router = express.Router();
const { body } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fieldsValidate');

router.post('/',[
        body("name", "Name can't be empty").notEmpty().trim(),
        body("image", "Image must be a valid URL").isURL()
    ],fieldsValidate, Testimonials.post);

router.get('/', Testimonials.index);

router.get('/:id',Testimonials.get);

router.patch('/:id',[
        body("image", "Image must be a valid URL").isURL()
    ],fieldsValidate,Testimonials.update);

router.delete('/:id',Testimonials.delete);

module.exports = router;
