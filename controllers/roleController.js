const roleModel = require("../models/role");

class RoleController {
  postRole(name, description) {
    console.log("class rolecontroller, method postRole");

    roleModel.create({ name: "a", description: "b" });

    return "ok";
  }
}

module.exports = new RoleController();
