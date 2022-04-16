const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    postMember,
    createForm
} = require('../controllers/members');

const { fieldsValidate } = require('../middlewares/fieldsValidate');

/* GET members listing. */
router.get('/', getMembers);

/* Form create member */
router.get('/create', createForm);

/* POST members. */
router.post('/', [
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('name', 'name must be string').isString().trim().escape(),
    check('facebookUrl').trim().escape(),
    check('instagramUrl').trim().escape(),
    check('linkedinUrl').trim().escape(),
    check('image', 'image can´t be empty').not().isEmpty().trim().escape(),
    check('image', 'image must be string').isString().trim().escape(),
    check('description').trim().escape(),
    fieldsValidate
],postMember);

/* GET member by ID */
router.get('/:id', getMember);

/* PUT member by ID */
router.put('/:id', [
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('name', 'name must be string').isString().trim().escape(),
    check('facebookUrl').trim().escape(),
    check('instagramUrl').trim().escape(),
    check('linkedinUrl').trim().escape(),
    check('image', 'image can´t be empty').not().isEmpty().trim().escape(),
    check('image', 'image must be string').isString().trim().escape(),
    check('description').trim().escape(),
    fieldsValidate
],updateMember);

/* DELETEE member by ID */
router.delete('/:id', deleteMember);

module.exports = router;