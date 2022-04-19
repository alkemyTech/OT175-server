var express = require("express");
var router = express.Router();
var roleController = require("../controllers/roleController");

/* GET users listing. */
router.post("/", function (req, res, next) {
  roleController.postRole();
  res.send("Ruta de roles para prueba");
});

module.exports = router;
