const express = require('express');
const router = express.Router();

const {
    getMembers,
    getMember,
    updateMember,
    deleteMember
} = require('../controllers/members');

/* GET members listing. */
router.get('/', getMembers);

/* GET member by ID */
router.get('/:id', getMember);

/* PUT member by ID */
router.put('/:id', updateMember);

/* DELETEE member by ID */
router.delete('/:id', deleteMember);

module.exports = router;