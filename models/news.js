'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Category)
    }
  };News.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        allowNull:false,
        type: DataTypes.STRING
    },
    content:{
        allowNull:false,
        type: DataTypes.TEXT
    },
    image:{
        allowNull: false,
        type: DataTypes.STRING
    },
    categoryId:{
        allowNull:false,
        type: DataTypes.INTEGER
    },
    type:{
      defaultValue:"news",
      type: DataTypes.VIRTUAL}
}, {
    sequelize,
    modelName: 'News',
    freezeTableName: true,
    paranoid: true
  });
  return News;
};