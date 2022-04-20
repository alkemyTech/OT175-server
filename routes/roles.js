var express = require("express");
var router = express.Router();
var roleController = require("../controllers/roleController");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  res.send("Ruta de roles para prueba " + (await roleController.isAdmin(1)));
});

module.exports = router;
