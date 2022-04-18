const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    postMember,
    createForm,
} = require('../controllers/members');

const { fieldsValidate } = require('../middlewares/fieldsValidate');

/* GET members listing. */
router.get('/', getMembers);

/* Form edit member */
router.get('/edit/:id', getMember);

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


/* PUT member by ID */
router.post('/update/:id', [
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
router.get('/delete/:id', deleteMember);

module.exports = router;