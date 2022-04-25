const express = require('express');
const Activities = require('../controllers/activities')
const router = express.Router();

router.post('/', Activities.post);
router.get('/', Activities.index);
router.get('/:id',Activities.get);
router.patch('/:id',Activities.update);
router.delete('/:id',Activities.delete);

module.exports = router;