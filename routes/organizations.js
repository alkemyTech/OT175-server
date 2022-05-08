const { Router } = require('express');

const OrganizationController = require('../controllers/organizations.controller');
const Organization = new OrganizationController();
const isAdminRole = require('../middlewares/adminAuthentication');
const { validateOrganization } = require('../middlewares/validators');
const restrictUnauthorizedRoles = require('../middlewares/userAuth');
const { fieldsValidate } = require('../middlewares/fieldsValidate');
const { check } = require('express-validator');

const router = Router();

router.get('/', Organization.getOrganizations);

router.get('/public/:id', Organization.getOrganization);

router.post(
  '/public',
  restrictUnauthorizedRoles(["Admin"]),
  validateOrganization,
  Organization.createOrganization
);

router.post('/', validateOrganization, Organization.createOrganization);

router.put(
  '/:id',
  [isAdminRole],
  [
    check('name', 'name can´t be empty').not().isEmpty().trim().escape().isString().optional({nullable: true}),
    check('address', 'address can´t be empty').not().isEmpty().trim().escape().optional({nullable: true}),
    check('address', 'address must be an string').isString().optional({nullable: true}),
    check('image', 'image must be an url').isURL().trim().isEmpty().optional({nullable: true}),
    check('phone', 'phone must be a number').not().isEmpty().isNumeric().trim().escape().optional({nullable: true}),
    check('email', 'email must be an email').isEmail().trim().escape().optional({nullable: true}),
    check('aboutUsText', 'aboutUsText can´t be empty').not().isEmpty().isString().trim().escape().optional({nullable: true}),
    check('urlFacebook', 'urlFacebook must be an url').isURL().trim().escape().optional({nullable: true}),
    check('urlLinkedin', 'urlLinkedin must be an url').isURL().trim().escape().optional({nullable: true}),   
    check('urlInstagram', ' urlInstagram must be an url').isURL().trim().escape().optional({nullable: true}),
    fieldsValidate,
  ],
  Organization.updateOrganization
);

router.delete('/:id', Organization.deleteOrganization);

module.exports = router;
