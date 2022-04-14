const express = require('express');
const router = express.Router();

const {
    getMembers,
    getMember
} = require('../controllers/members');

/* GET members listing. */
router.get('/', getMembers);

/* GET member by ID */
router.get('/:id', getMember);

module.exports = router;