var express = require('express');
var router = express.Router();
const CategoryController= require('../controllers/category')
const isAdminRole = require('../middlewares/adminAuthentication');

/* GET categories listing. */

router.get('/', CategoryController.list)
// router.get('/:name', CategoryController.find)
router.post('/', [ isAdminRole ], CategoryController.create)
router.put('/update', CategoryController.update)
router.delete('/remove', CategoryController.remove)

module.exports = router;