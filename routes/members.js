const express = require('express');
const router = express.Router();

const {
    getMembers,
    getMember,
    updateMember
} = require('../controllers/members');

/* GET members listing. */
router.get('/', getMembers);

/* GET member by ID */
router.get('/:id', getMember);

/* PUT member by ID */
router.put('/:id', updateMember);

module.exports = router;