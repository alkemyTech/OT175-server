const express = require('express');
const Slides = require('../controllers/slidesController')
const router = express.Router();

router.delete('/:id',Slides.delete);

module.exports = router;