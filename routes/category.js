var express = require('express');
var router = express.Router();
const CategoryController= require('../controllers/category');
const restrictUnauthorizedRoles = require('../middlewares/userAuth')

/* GET categories listing. */

router.get('/', CategoryController.list)
// router.get('/:name', CategoryController.find)
router.post('/create', CategoryController.create)
router.put('/:id',
restrictUnauthorizedRoles([1]),
CategoryController.update)
router.delete('/remove', CategoryController.remove)

module.exports = router;