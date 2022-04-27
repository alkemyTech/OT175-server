'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    name: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Activity',
    paranoid: true
  });
  return Activity;
};