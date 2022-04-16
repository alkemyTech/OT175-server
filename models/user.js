'use strict';

const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {as: 'role'});
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photo: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async function (user, options){
          const hashedPass = await bcrypt.hash(user.password, 8)
          user.password = hashedPass
          user.firstName = user.firstName.trim()
          user.lastName = user.lastName.trim()
          user.email = user.email.trim()
      }
  },
  });
  return User;
};


