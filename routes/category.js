var express = require('express');
var router = express.Router();
const CategoryController= require('../controllers/category')
const auth = require('../middlewares/adminAuthentication')

/* GET categories listing. */

router.get('/', CategoryController.list)
router.get('/categoriesNames', auth, CategoryController.getCategoryNames)
// router.get('/:name', CategoryController.find)
router.post('/create', CategoryController.create)
router.put('/update', CategoryController.update)
router.delete('/:id', auth, CategoryController.remove)

module.exports = router;