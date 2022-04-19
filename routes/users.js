var express = require('express');
var router = express.Router();
const adm = require('../middlewares/adminAuthentication')

/* GET users listing. */
router.get('/',adm, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
