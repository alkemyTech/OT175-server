const router = require("express").Router();
const UserController = require("../controllers/userControllers");
const selfAuth = require("../middlewares/selfAuth");

const { body, param, validationResult } = require("express-validator");

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUserById);

router.put("/update/:id", UserController.updateUser);

router.delete("/:id", selfAuth, UserController.deleteUser);

router.patch(
  "/patch/:id",

  body("email", "debe ser un email válido").isEmail(),
  body("password").isLength({ min: 1 }),
  param("id", "no es integer").isInt,

  UserController.patchUser
);

module.exports = router;
