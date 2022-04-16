'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  Slides.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageurl: {
        type: DataTypes.STRING
      },
    text: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.TEXT
    },
    organizationid: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Slides',
  }, {
    paranoid: true
  });
  return Slides;
};