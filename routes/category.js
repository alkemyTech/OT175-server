var express = require('express');
var router = express.Router();
const CategoryController= require('../controllers/category')
const restrictUnauthorizedRoles = require('../middlewares/userAuth')
const validateId = require('../middlewares/validateId')
const isAdminRole = require('../middlewares/adminAuthentication');
 

/* GET categories listing. */

router.get('/', CategoryController.list);
router.get('/categoriesNames', restrictUnauthorizedRoles([1]), CategoryController.getCategoryNames)

// router.get('/:name', CategoryController.find)
router.post('/', [ isAdminRole ], CategoryController.create)
router.put('/update', CategoryController.update)
router.delete('/:id', validateId, restrictUnauthorizedRoles([1]), CategoryController.remove)

module.exports = router;