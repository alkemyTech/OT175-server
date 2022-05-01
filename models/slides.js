'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
    static associate(models) {
      Slides.belongsTo(models.Organization);
    }
  }
  Slides.init(
    {
      imageUrl: DataTypes.TEXT,
      text: DataTypes.TEXT,
      order: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Slides',
    }
  );
  return Slides;
};
