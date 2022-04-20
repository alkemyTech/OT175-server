//este archivo es provisorio para testear el controller de roles y no debe enviarse al PR

var express = require("express");
var router = express.Router();
var roleController = require("../controllers/roleController");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.json(await roleController.getRoleById(1));
});

module.exports = router;
