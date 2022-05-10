const express = require('express');
const Slides = require('../controllers/slidesController')
const router = express.Router();
const isAdminRole = require('../middlewares/adminAuthentication');

router.delete('/:id',Slides.delete);
router.get('/:id',[isAdminRole], Slides.getSlideByPk);
router.get('/',[isAdminRole],Slides.index);

module.exports = router;