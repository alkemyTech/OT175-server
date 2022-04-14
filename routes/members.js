const express = require('express');
const router = express.Router();

const {
    getMembers
} = require('../controllers/members');

/* GET members listing. */
router.get('/', getMembers)

module.exports = router;