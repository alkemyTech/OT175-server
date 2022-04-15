var express = require('express');
var router = express.Router();
const CategoryController= require('../controllers/category')

/* GET categories listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', CategoryController.create)

module.exports = router;