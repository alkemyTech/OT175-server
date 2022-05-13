const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const isAdminRole = require('../middlewares/adminAuthentication');

const MemberController = require('../controllers/members');

const { fieldsValidate } = require('../middlewares/fieldsValidate');
const validateUrl = require('../helpers/validateUrl');

/* GET members listing. */
router.get('/', [isAdminRole], MemberController.getMembers);

/* POST members. */
router.post(
  '/',
  [
    isAdminRole,
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('name', 'name must be string').isString().trim().escape(),
    check('facebookUrl').trim(),
    check('instagramUrl').trim(),
    check('linkedinUrl').trim(),
    check('image', 'image can´t be empty').not().isEmpty().trim(),
    check('image', 'image must be string').isString().trim(),
    check('image', 'URL invalid').custom( validateUrl ),
    check('description').trim().escape(),
    fieldsValidate
  ],
  MemberController.postMember
);

/* GET member by ID */
router.get('/:id', MemberController.getMemberById);

/* PUT member by ID */
router.put(
  '/:id',
  [
    isAdminRole,
    check('name', 'name can´t be empty').not().isEmpty().trim().escape(),
    check('name', 'name must be string').isString().trim().escape(),
    check('facebookUrl').trim(),
    check('instagramUrl').trim(),
    check('linkedinUrl').trim(),
    check('image', 'image can´t be empty').not().isEmpty().trim(),
    check('image', 'image must be string').isString().trim(),
    check('image', 'URL invalid').custom( validateUrl ),
    check('description').trim().escape(),
    fieldsValidate
  ],
  MemberController.updateMemberById
);

router.delete('/:id', [isAdminRole], MemberController.deleteMemberById);

module.exports = router;
