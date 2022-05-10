'use strict';

const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { as: 'role' });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async function (user, options) {
          const hashedPass = await bcrypt.hash(user.password, 8);
          user.password = hashedPass;
          user.firstName = user.firstName.trim();
          user.lastName = user.lastName.trim();
          user.email = user.email.trim();
        },
      },
    }
  );
  return User;
};
