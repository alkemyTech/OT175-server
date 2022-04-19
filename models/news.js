'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      this.belongsTo(models.Category,{as: 'category'})
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
    category_id:{
        allowNull:false,
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'News',
    freezeTableName: true,
    paranoid: true
  });
  return News;
};