var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/category');
const restrictUnauthorizedRoles = require('../middlewares/userAuth');
const validateId = require('../middlewares/validateId');
const isAdminRole = require('../middlewares/adminAuthentication');


router.get('/', CategoryController.list);

router.post('/', [isAdminRole], CategoryController.create);

router.put('/:id', [isAdminRole, restrictUnauthorizedRoles(['Admin']) ], CategoryController.update);

router.delete(
  '/:id',
  [isAdminRole, validateId, restrictUnauthorizedRoles([1])],
  CategoryController.remove);


module.exports = router;
