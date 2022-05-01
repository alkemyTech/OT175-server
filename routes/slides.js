const router = require('express').Router();
const SlideController = require('../controllers/SlideController');

router.put('/update/:id', [isAdminRole], SlideController.updateSlide);

module.exports = router;
