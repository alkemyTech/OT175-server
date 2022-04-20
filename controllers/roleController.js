const models = require("../models");
const { Role } = models;

class RoleController {
  postRole(name, description) {
    try {
      await Role.create({ name: name, description: description });

      return { status: "ok" };
    } catch (error) {
      return { error: error };
    }
  }

  async isAdmin(roleId) {
    try {
      let data = await Role.findByPk(roleId);
      return data.dataValues.name === "Admin";
    } catch (error) {
      return { error: error };
    }
  }
}

module.exports = new RoleController();
