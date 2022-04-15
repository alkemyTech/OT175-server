const {Router} = require('express');
const {check} = require('express-validator');

const { getOrganizations, getOrganization, updateOrganization, createOrganization, deleteOrganization, getOrganizationDeleted } = require('../controllers/organizations');
const { validarCampos } = require('../middlewares/validar-campo');


const router = Router();

//Get all
router.get('/', getOrganizations);

//Get organization by ID
router.get('/:id', getOrganization); //validation ID in the controller

//Get all organizations including deleted ones || admin only access
router.post('/admin', getOrganizationDeleted);

//Create organization
router.post('/',[
    check(['name', 'image', 'email', 'welcomeText'], 'fields name, image, email, welcome Text are required').not().isEmpty(),
    validarCampos
], createOrganization);

//Update organization
router.put('/:id',[
    check(['name', 'image', 'email', 'welcomeText'], 'fields name, image, email, welcome Text are required').not().isEmpty(),
    validarCampos
], updateOrganization); //validation ID in the controller

//Delete organization
router.delete('/:id', deleteOrganization); //validation ID in the controller



module.exports = router;
