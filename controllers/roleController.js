const models = require("../models");
const { Role } = models;

class RoleController {
  async postRole(name, description) {
    try {
      await Role.create({ name: name, description: description });

      return { status: "ok" };
    } catch (error) {
      return { error: error };
    }
  }

  async getAllRoles() {
    try {
      let data = await Role.findAll();
      return data;
    } catch (error) {
      return { error: error };
    }
  }

  async getRoleById(roleId) {
    try {
      let data = await Role.findByPk(roleId);
      if (data != null) {
        return data;
      } else {
        return { status: "id not found" };
      }
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
