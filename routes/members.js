const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userAuth = require('../middlewares/userAuth')

const {
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    postMember,
} = require('../controllers/members');

const { fieldsValidate } = require('../middlewares/fieldsValidate');

/* GET members listing. */
router.get('/', getMembers);

/* POST members. */
router.post('/', [
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('name', 'name must be string').isString().trim().escape(),
    check('facebookUrl').trim(),
    check('instagramUrl').trim(),
    check('linkedinUrl').trim(),
    check('image', 'image can´t be empty').not().isEmpty().trim(),
    check('image', 'image must be string').isString().trim(),
    check('description').trim().escape(),
    fieldsValidate
],postMember);

/* GET member by ID */
router.get('/:id', getMember);

/* PUT member by ID */
router.put('/:id', [
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('name', 'name must be string').isString().trim().escape(),
    check('facebookUrl').trim(),
    check('instagramUrl').trim(),
    check('linkedinUrl').trim(),
    check('image', 'image can´t be empty').not().isEmpty().trim(),
    check('image', 'image must be string').isString().trim(),
    check('description').trim().escape(),
    fieldsValidate
],updateMember);

/* DELETEE member by ID */
router.delete('/:id', userAuth([1, 2]), deleteMember);

module.exports = router;