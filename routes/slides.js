const express = require('express');
const Activities = require('../controllers/activities')
const router = express.Router();

router.delete('/:id',Activities.delete);

module.exports = router;