const {Router} = require('express');
const {check} = require('express-validator');

const OrganizationController = require('../controllers/organizations.controller');

const { validarCampos } = require('../middlewares/validar-campo');

const Organization = new OrganizationController();

const router = Router();

//Get all
router.get('/', Organization.getOrganizations);

//Get organization by ID
 router.get('/:id', Organization.getOrganization); //validation ID in the controller

 //Create organization
 router.post('/',[
     check(['name', 'image', 'email', 'welcomeText'], 'fields name, image, email, welcome Text are required').not().isEmpty(),
     validarCampos
 ], Organization.createOrganization);

//Update organization
router.put('/:id',[
    check(['name', 'image', 'email', 'welcomeText'], 'fields name, image, email, welcome Text are required').not().isEmpty(),
    validarCampos
], Organization.updateOrganization); //validation ID in the controller

//Delete organization
router.delete('/:id', Organization.deleteOrganization); //validation ID in the controller



module.exports = router;
