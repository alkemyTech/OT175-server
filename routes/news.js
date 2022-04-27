const express = require("express");
const router = express.Router();
const NewsCtrl = require("../controllers/news.controllers");
const restrictUnauthorizedRoles = require("../middlewares/userAuth");
const validateId = require("../middlewares/validateId");
const isAdminRole = require('../middlewares/adminAuthentication');

const controller = new NewsCtrl();

router.route("/").get(controller.getAll).post(controller.create);

router
  .route("/:id")
  .delete(validateId, restrictUnauthorizedRoles([1]), controller.deleteOne)
  .get([ isAdminRole ], controller.getNewById)
  .patch(controller.update)
  .put(controller.update);

router.route("/category/:categoryId").get(controller.getByCategory);

module.exports = router;
