let LoginController = require("../controllers/loginControllers");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

router.post("/", body("email").isEmail(), body("password").isLength({ min: 1 }), LoginController.login);

module.exports = router;
