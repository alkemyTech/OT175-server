const {Router} = require('express');

const OrganizationController = require('../controllers/organizations.controller');
const Organization = new OrganizationController();

const {validateOrganization} = require('../middlewares/validators');

const router = Router();

router.get('/', Organization.getOrganizations);

router.get('/public/:id', Organization.getOrganization);

router.post('/', validateOrganization , Organization.createOrganization);

router.put('/:id', validateOrganization , Organization.updateOrganization);

router.delete('/:id', Organization.deleteOrganization);



module.exports = router;
