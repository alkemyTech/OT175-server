'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      this.belongsTo(models.Categories,{as: category})
    }
  };News.init({
    id: {
        allowNull: false,
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
    }
}, {
    sequelize,
    modelName: 'News',
    freezeTableName: true
  });
  return News;
};